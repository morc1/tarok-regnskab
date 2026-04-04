# Regression tests

This project uses Playwright for browser regression tests.

## Install

```bash
npm install
npx playwright install
```

## Run

```bash
npm test
```

## Useful variants

```bash
npm run test:headed
npm run test:ui
```

## What is covered initially

- app startup
- dealer fee flow
- pagat home can only be registered once
- pagat home preserves total wealth
- pagat lost preserves total wealth and updates pagat cup
- nolo skips scoring and closes the round directly
- undo after pagat event
```