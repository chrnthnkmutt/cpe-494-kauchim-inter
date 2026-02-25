# Kau Chim Simulator

A beautiful, interactive Chinese fortune stick (Kau Chim) simulator built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Interactive Shaking Animation:** Physics-based animations using Framer Motion to simulate shaking the fortune cylinder.
- **Traditional Theme:** Culturally respectful UI with temple-inspired colors (deep reds, golds) and a festive background.
- **Randomized Fortunes:** Draws a random stick from 1 to 100.
- **Data-Driven:** Fortunes are loaded from a clean, easily extensible JSON file (`src/data/fortunes.json`).
- **Responsive Design:** Works beautifully on both desktop and mobile devices.

## Tech Stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Motion (Framer Motion)](https://motion.dev/)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Customizing Fortunes

To add or modify fortunes, simply edit the `src/data/fortunes.json` file. Each fortune follows this structure:

```json
{
  "1": {
    "number": 1,
    "title": "Fortune Title",
    "type": "Great Blessing | Good Fortune | Average | Bad Fortune | Great Misfortune",
    "verse": "Poetic verse here...",
    "interpretation": "Modern interpretation here..."
  }
}
```
