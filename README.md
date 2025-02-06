# 📝 JavaScript Testing Repository

Dieses Repository enthält eine einfache Webanwendung mit **Unit-Tests** und **E2E-Tests**, um verschiedene Teststrategien und Testwerkzeuge zu demonstrieren.

## 📂 Code-Struktur

```
├── src/             # Hauptverzeichnis für den Code
│   ├── index.html   # Einstiegspunkt für die Webanwendung
│   ├── styles.css   # Basis-Styling
│   ├── Cart.js      # Geschäftslogik für den Warenkorb
│   ├── CartUI.js    # UI-Logik für den Warenkorb (Darstellung & Interaktionen)
│   ├── CartController.js # Steuert die Verbindung zwischen UI und Geschäftslogik
│
├── __tests__/       # Verzeichnis für Unit-Tests
│   ├── cart.spec.js # Tests für die Warenkorb-Logik
│
├── .github/         # Enthält CI/CD Workflows für automatisierte Tests
│
├── package.json     # npm-Abhängigkeiten und Skripte
└── README.md        # Dieses Dokument
```

## 🚀 Wichtige JEST Testfunktionen

`toBe()` → Vergleich für primitive Werte
`toEqual()` → Vergleich für Objekte & Arrays
`toContain()` → Prüft, ob ein Element in einem Array existiert
`toBeTruthy()` / toBeFalsy() → Testet Wahrheitswerte
`toThrow()` → Testet Fehlerhandling

## 🚀 Unit-Tests ausführen

### **1️⃣ Normale Unit-Tests starten**
Führe folgende Befehle aus, um die Tests ohne Coverage-Bericht laufen zu lassen:
```sh
npm test
```

### **2️⃣ Unit-Tests mit Coverage-Bericht starten**
Falls du eine **Testabdeckung (Coverage Report)** erstellen möchtest, nutze diesen Befehl:
```sh
npm run test:coverage
```
Nach der Ausführung findest du den Coverage-Bericht im `coverage/`-Ordner.

## 🔧 Abhängigkeiten installieren
Falls noch nicht geschehen, installiere alle benötigten Abhängigkeiten:
```sh
npm install
```

🚀 Viel Spaß beim Testen! Falls du Fragen hast, melde dich. 😊

