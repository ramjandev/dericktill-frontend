# Feasible – Real Estate Deal Analyzer

A full-featured real estate deal analysis tool built with React 19, TypeScript, and Tailwind CSS.

## Features

- **BRRRR Calculator** – Buy, Rehab, Rent, Refinance, Repeat strategy analysis
- **Turnkey Calculator** – Buy & Hold rental property analysis  
- **Section 8 Calculator** – Government-subsidized housing analysis
- **Real-time Deal Analysis** – Instant calculations as you adjust inputs
- **Deal Rating System** – Automatic GOOD / ALRIGHT / BAD classification
- **Save Deals** – Save and manage analyzed deals locally
- **Adjustable Settings** – Live sliders for vacancy, maintenance, CapEx, property management

## Metrics Calculated

- Monthly & Annual Cash Flow
- Cash-on-Cash Return (CoC)
- Cap Rate
- DSCR (Debt Service Coverage Ratio)
- 1% Rule check
- Net Operating Income (NOI)
- Annual ROI

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- **React 19** – UI framework
- **TypeScript** – Type safety
- **Tailwind CSS 3** – Utility-first styling
- **Vite** – Build tool
- **Lucide React** – Icons

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── HeroBackground.tsx
│   ├── DealInputsPanel.tsx
│   ├── DealResultsPanel.tsx
│   ├── AdjustableSettings.tsx
│   └── SaveDealModal.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── AnalyzePage.tsx
│   ├── SavedDealsPage.tsx
│   └── LoginPage.tsx
├── types/
│   └── index.ts
├── utils/
│   └── calculations.ts
├── App.tsx
├── main.tsx
└── index.css
```
# dericktill-frontend
# dericktill-frontend
