# Professional Playwright Framework

A maintainable end-to-end test automation framework built with **Playwright**, **TypeScript**, and the **Page Object Model (POM)** pattern.

This project demonstrates a clean test architecture where:
- page interactions are encapsulated inside page classes
- test data is centralized and reusable
- dynamic input data is generated with **Faker**

## Tech Stack

- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Faker](https://fakerjs.dev/) (`@faker-js/faker`)

## Project Structure

```text
pages/
  basePage.ts
  LoginPage.ts
  ProductPage.ts
  CheckoutPage.ts

tests/
  baseTest.ts
  DataTest.ts
  LoginTest.spec.ts
  PurchaseTest.spec.ts

playwright.config.ts
tsconfig.json
```

## Framework Design

### Page Object Model (POM)

The framework follows POM to improve readability and maintainability:
- `basePage.ts` contains shared reusable browser actions
- feature pages (`LoginPage`, `ProductPage`, `CheckoutPage`) encapsulate locators and page-specific methods
- specs focus on business flow, not low-level selectors

### TypeScript

TypeScript provides:
- strong typing for fixtures, page objects, and test data
- better IDE support and refactor safety
- clearer contracts between test and page layers

### Faker

Faker is used for dynamic test values (for example checkout user info), which helps reduce brittle hardcoded inputs.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Install Playwright browser binaries:

```bash
npx playwright install
```

## Running Tests

This project is currently configured to run on **Chromium** by default.

### Run all tests

```bash
npx playwright test
```

### Run a specific test file

```bash
npx playwright test tests/PurchaseTest.spec.ts
```

### List discovered tests

```bash
npx playwright test --list
```

### Open HTML report

```bash
npx playwright show-report
```

## Notes

- Global Playwright settings are defined in `playwright.config.ts`.
- Shared fixtures are defined in `tests/baseTest.ts`.
- Test data constants are centralized in `tests/DataTest.ts`.

---

If you want, you can add npm scripts (for example `test`, `test:ui`, `test:headed`) in `package.json` for shorter commands.
