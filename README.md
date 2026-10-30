# Aperture — Crypto Research & Intelligence Dashboard

### UI/UX Designer Assignment · 1:1 Implementation of Figma Screens in Pure HTML/CSS/JS

---

## 📌 Project Overview
**Aperture** is an institutional-grade cryptocurrency research dashboard benchmarked against **CoinGecko** and **CoinGlass**. This codebase is a 1:1, pixel-accurate conversion of the Figma design screens into pure, standards-compliant **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)** with **zero external libraries, no build step, and zero npm runtime dependencies**.

---

## 📁 Standard Project Folder Structure

```
crypto/
├── assets/
│   └── favicon.svg              # Aperture brand favicon
│
├── css/
│   └── style.css                # Aperture design system, layout, components, and animations
│
├── js/
│   └── script.js                # Core interactive logic, chart renderer, live search, and filters
│
├── index.html                   # Main application entry point (double-click to open)
├── package.json                 # Project configuration & npm scripts
├── server.js                    # Zero-dependency local Node.js development server
└── README.md                    # Project documentation and run guide
```

---

## 🚀 How to Run

### Method 1: Direct File (Offline / No Server Required)
Simply **double-click** `index.html` or open it with any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).  
*No terminal, Node.js, or build commands required!*

### Method 2: Local Development Server
If you prefer running via HTTP:
```bash
npm start
# or
node server.js
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

---

## 🖥️ Implemented Screens & Features

### 1. Header & Navigation (At the Top)
* **Brand**: `aperture` with the 4-bar aperture icon.
* **Navigation Tabs**: **Markets**, **Research**, **Watchlist**, **Compare** with seamless active underline transitions.
* **Global Search (`⌘K` / `Ctrl+K`)**: Live filtering modal across the cryptocurrency catalog.
* **Currency Switcher**: `USD`, `EUR`, `GBP`, `BTC` with dynamic value recalculation.
* **Notification Bell**: Interactive dropdown with recent market alerts.
* **User Profile (`AK`)**: Profile actions and full dataset export.

### 2. Global Ticker Bar (Directly Below Header)
* Real-time metrics: Market Cap `$3.24T` (+1.04%), 24h Volume `$108.62B`, BTC Dominance `59.9%`, ETH Gas `3.2 Gwei`.
* Live status: Pulsing green status dot + timestamp.

### 3. Screen 1: Research (Coin Overview)
* **Hero**: Bitcoin (BTC) Rank #1 with actions (`In watchlist`, `Compare`, `Set alert`).
* **4 Metric Cards**: Price `$97,842.60` (+2.34%), Market Cap `$1.94T`, 24h Volume `$34.82B`, Circulating Supply `19.82M`.
* **Sub-Tabs**: `Overview`, `Markets`, `Historical data`, `On-chain`, `News`.
* **TradingView-Style Chart**:
  * Candlestick and Market Cap area modes.
  * Timeframes: `5H`, `4H`, `1D` (active), `1W`, `1M`, `ALL`.
  * Indicators: `MA(20)`, `EMA(50)`, `Volume Bars`.
  * Interactive crosshair with live price HUD.
  * Fullscreen toggle `⛶`.
* **Bottom Cards**:
  * **Holder distribution**: `54.82M` non-zero addresses, segmented bar, 4 tiers.
  * **Token supply**: `94.38%` of maximum supply, progress bar, Circulating/Total/Max supply.
* **Sidebar**: Coin information (ATH, ATL, Consensus, Genesis) and About Bitcoin tags.

### 4. Screen 2: Market Explorer
* **3 Macro Cards**: Global market cap, Trading volume, Layer 1 market breadth `7 / 1` advancing/declining.
* **Category Tabs**: `All assets`, `Categories`, `Trending`, `New listings`.
* **Filter Toolbar**: Instant search with `✕` clear, category/mcap/volume dropdowns, sorting.
* **Interactive Data Table**: 8 assets with prices, 24h%, 7d%, market caps, volumes, and custom SVG sparklines.
* **CSV Export**: Click `⤓ Export data` to download table as CSV.

### 5. Screen 3: Watchlist ("Your market, in focus.")
* **Dynamic Metrics**: Average 24h change, Advancing/Declining ratio, Strongest performer, Price alerts count.
* **Watchlist Tabs**: `Main watchlist · 6`, `Layer 1 research · 4`, and `+ New list` creator.
* **Price Alert Monitor**: Active alerts with `Watching` status.
* **Research Notebook**: Click `✎ Edit note` to edit and save personal notes.
* **Export**: `⤓ Export list` downloads watchlist as CSV.

### 6. Screen 4: Compare Assets
* **Asset Selector Chips**: Side-by-side asset chips with `✕` removal.
* **Relative Price Performance Chart**: Multi-line normalized return curves over time.
* **Fundamentals Matrix**: Side-by-side comparison across Valuation, Liquidity, and Network supply.
* **Share & Export**: `↗ Share view` copies link; `⤓ Export CSV` downloads matrix.

### 7. Responsive Mobile Layout
* Clean collapse to single-column cards on mobile screens (`<768px`).
* Fixed bottom navigation bar with thumb-accessible icons.

---

## 🛠️ Technology Stack
* **HTML5**: Semantic markup, accessible attributes, clean structure.
* **CSS3**: Custom properties (CSS variables), modern flexbox and grid, smooth animations, zero external CSS frameworks.
* **JavaScript (ES6+)**: Pure vanilla JS, event delegation, SVG vector math, modular organization.

