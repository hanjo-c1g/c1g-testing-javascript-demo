const { toHaveNoViolations } = require("jest-axe");
const axeCore = require("axe-core");
const fs = require("fs");
const path = require("path");
const { TextEncoder, TextDecoder } = require("util");
Object.assign(global, { TextDecoder, TextEncoder });

const { JSDOM } = require("jsdom");
require("@testing-library/jest-dom");

expect.extend(toHaveNoViolations);

describe("Accessibility Tests for Shop", () => {
    let htmlContent;
    let impactLevel = "serious"; // Standard-Level, kann angepasst werden

    beforeAll(() => {
        // Lese die HTML-Datei ein
        const filePath = path.join(__dirname, "../src/index.html");
        htmlContent = fs.readFileSync(filePath, "utf8");
    });

    it("should have no accessibility violations of level: " + impactLevel, async () => {
        // Erstelle eine JSDOM-Instanz
        const { window } = new JSDOM(htmlContent, {
            runScripts: "dangerously",
            resources: "usable"
        });

        // Lade axe-core sicher in JSDOM
        const script = window.document.createElement("script");
        script.textContent = axeCore.source;
        window.document.head.appendChild(script);

        // Sicherstellen, dass axe verfügbar ist
        if (!window.axe) {
            throw new Error("axe-core wurde nicht korrekt geladen");
        }

        // Führe axe-Tests mit Impact-Filter durch
        const results = await window.axe.run(window.document, {
            runOnly: {
                type: "tag",
                values: [impactLevel]
            }
        });
        
        if (results.violations.length > 0) {
            console.error(`Accessibility violations found (Impact Level: ${impactLevel}):`, results.violations.map(v => ({
                id: v.id,
                impact: v.impact,
                description: v.description,
                nodes: v.nodes.map(n => n.html)
            })));
        }
        expect(results.violations.length).toBe(0);
    });

    it("should have a label associated with the discount input field", () => {
        const { document } = new JSDOM(htmlContent).window;
        const input = document.querySelector("#discount-code");
        const label = document.querySelector("label[for='discount-code']");
        expect(label).not.toBeNull();
        expect(input).not.toBeNull();
    });

    it("should have a properly labeled cart section", () => {
        const { document } = new JSDOM(htmlContent).window;
        const cartHeading = document.querySelector("#cart h2");
        expect(cartHeading).not.toBeNull();
        expect(cartHeading.textContent.toLowerCase()).toContain("dein warenkorb");
    });

    it("should have a correct heading structure", () => {
        const { document } = new JSDOM(htmlContent).window;
        const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));
        expect(headings.length).toBeGreaterThan(0);

        let lastLevel = 0;
        headings.forEach((heading) => {
            const level = parseInt(heading.tagName.substring(1));
            expect(level).toBeGreaterThanOrEqual(1);
            expect(level).toBeLessThanOrEqual(6);
            expect(level).toBeGreaterThanOrEqual(lastLevel || 1);
            lastLevel = level;
        });
    });
});
