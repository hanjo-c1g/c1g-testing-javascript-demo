const { axe, toHaveNoViolations } = require("jest-axe");
const fs = require("fs");
const path = require("path");
const { TextEncoder, TextDecoder } = require("util");
Object.assign(global, { TextDecoder, TextEncoder });
const { JSDOM } = require("jsdom");
require("@testing-library/jest-dom");

expect.extend(toHaveNoViolations);

describe("Accessibility Tests for Shop", () => {
    let htmlContent;
    let document;

    beforeAll(() => {
        // Lese die HTML-Datei ein, um sie im Test zu rendern
        const filePath = path.join(__dirname, "../src/index.html");
        htmlContent = fs.readFileSync(filePath, "utf8");
        const dom = new JSDOM(htmlContent, {
            runScripts: "outside-only",
            resources: "usable",
            beforeParse(window) {
                window.TextEncoder = TextEncoder;
                window.TextDecoder = TextDecoder;
            }
        });
        document = dom.window.document;
    });

    it("should have no accessibility violations", async () => {
        const results = await axe(document.body);
        expect(results).toHaveNoViolations();
    });

    it("should have a label associated with the discount input field", () => {
        const input = document.querySelector("#discount-code");
        const label = document.querySelector("label[for='discount-code']");
        expect(label).not.toBeNull();
        expect(input).not.toBeNull();
    });

    it("should have a properly labeled cart section", () => {
        const cartHeading = document.querySelector("#cart h2");
        expect(cartHeading).not.toBeNull();
        expect(cartHeading.textContent.toLowerCase()).toContain("dein warenkorb");
    });

    it("should have a correct heading structure", () => {
        const headings = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"));
        expect(headings.length).toBeGreaterThan(0);
console.log(headings)
        let lastLevel = 0;
        headings.forEach((heading) => {
            const level = parseInt(heading.tagName.substring(1));
            expect(level).toBeGreaterThanOrEqual(1);
            expect(level).toBeLessThanOrEqual(6);
            expect(level).toBeGreaterThanOrEqual(lastLevel || 1);
            lastLevel = level;
        });
    });

    // it("should ensure all buttons are keyboard accessible", () => {
    //     const discountButton = document.querySelector("#apply-discount");
    //     expect(discountButton).not.toBeNull();
    //     expect(discountButton.disabled).toBeFalsy();
    //     expect(discountButton.hasAttribute("tabindex")).toBeTruthy();
    // });
});
