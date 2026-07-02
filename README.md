# wax-alcor-v2-tick-cross-velocity — Alcor v2 Tick Cross Velocity Visualizer

> **Status:** 🔒 Private (In Development) | Target Public Release: August 2026  
> **Category:** Advanced DeFi & Concentrated Liquidity Visualizers (Alcor v2)  
> **Parent Catalog:** [pixel-journey/wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

**Real-time bar-charting UI that measures the frequency at which price crosses key concentrated liquidity tick boundaries during high volatility on WAX Alcor v2.**

---

## 1. Overview & Goal

This blueprint delivers a high-performance, real-time visualization dashboard that tracks how frequently the spot price of a concentrated liquidity pool crosses critical tick boundaries. It helps LPs and traders understand volatility patterns, identify "hot zones" where price action is most active, and make better-informed range decisions.

**Why it matters for WAX/Antelope:**
Alcor v2's concentrated liquidity model (similar to Uniswap v3) makes tick-level price action critical. Understanding cross frequency helps LPs optimize ranges for fee generation vs impermanent loss, and gives traders insight into market microstructure.

It exclusively uses **public infrastructure**:
- Alcor public AMM endpoints and tick math
- Hyperion for historical swap and price action data
- No custom smart contracts

**Target users:** Liquidity providers, active traders, DeFi analysts, yield farmers on WAX.

**Success metrics:**
- Sub-2s load time for live tick-cross bars
- Smooth 1s refresh on high-volatility pairs
- Clear visual distinction of high vs low activity zones

---

## 2. Concepts & Inspiration

**Core blockchain concepts:**
- Concentrated Liquidity (CL) ticks and ranges on Alcor v2
- Tick math and price <-> tick conversion (from Alcor docs and Uniswap v3 style math)
- Historical swap streams via Hyperion actions
- Real-time price updates from pool state

**User pain points:**
Current Alcor UI shows basic charts but lacks granular tick-cross frequency analysis. LPs often choose ranges blindly or based on simple historical volatility, missing the nuance of how often price "ticks" through their range.

**Inspirations:**
- TradingView volume profile + footprint charts
- Uniswap v3 LP position managers (e.g. Gamma, Arrakis dashboards)
- High-frequency trading heatmaps

**Related blueprints:** Pairs beautifully with `wax-lp-impermanent-loss-heat-map`, `wax-concentrated-liquidity-roi-matrix`, and `wax-alcor-lp-behavioral-profiler`.

---

## 3. Design Specifications (Pixel Journey Standards)

### 3.1 Visual & Interaction Design
- Clean dashboard layout: Sidebar controls + main canvas with live bar chart
- Color palette: Indigo accents for active crosses, emerald for high fee zones, amber for warning volatility
- Typography: Inter + monospace for numbers (from Pixel Journey Design System)
- Micro-interactions: Smooth bar growth animations on update, hover tooltips with exact cross count + timestamp
- Responsive: Desktop-first with collapsible sidebar on mobile

### 3.2 Key Views / Components
- `TickCrossVelocityChart.tsx` — Main Recharts or custom Canvas bar chart showing crosses per tick bucket over time windows (1m / 5m / 15m / 1h)
- `PoolSelector.tsx` — Searchable dropdown for Alcor v2 pools with live TVL and volume
- `TimeWindowControls.tsx` — Toggle buttons + custom range picker
- `VolatilityGauge.tsx` — Small radial or linear gauge for current cross intensity
- `TopTicksTable.tsx` — Sortable table of most crossed ticks with fee estimate impact

### 3.3 Accessibility (A11y) & Inclusive Design
- WCAG 2.2 AA
- Keyboard navigation for all controls
- Screen reader labels for chart regions and data points
- Reduced motion mode (ties into `wax-reduced-motion-dashboard`)
- Colorblind-safe patterns (hatched bars + labels)

### 3.4 Performance & Optimization Targets
- Lighthouse 95+
- Chart updates via efficient React Query polling or WebSocket if available
- Virtualization for long tick lists
- Bundle < 250kb initial

---

## 4. Technical Architecture

### 4.1 Core Tech Stack (Standardized)
- **Framework:** Next.js 15 (App Router) + TypeScript (strict)
- **Styling:** Tailwind CSS + shadcn/ui + framer-motion
- **State & Data:** @tanstack/react-query + zod
- **Wallet:** @wharfkit/session (read-only for now)
- **Blockchain Data:**
  - Alcor public endpoints for current pool state and ticks
  - Hyperion (`https://api.waxsweden.org`) for historical swap actions to compute crosses
- **Visualization:** Recharts for bars + custom Canvas for high-density tick heat
- **Utilities:** date-fns, lucide-react, sonner

### 4.2 Data Flow Diagram
```
Alcor Pool State (current sqrtPrice, active tick)
    ↓ poll
Hyperion Swap History (recent swaps)
    ↓ parse
Client Tick Cross Calculator (pure TS)
    ↓
React Query Cache
    ↓
Beautiful Bar Chart + Gauges + Table
```

### 4.3 Folder Structure
```
app/
├── (dashboard)/
│   └── page.tsx
├── components/
│   ├── chart/
│   │   ├── TickCrossVelocityChart.tsx
│   │   └── VolatilityGauge.tsx
│   ├── controls/
│   │   ├── PoolSelector.tsx
│   │   └── TimeWindowControls.tsx
├── hooks/
│   ├── useAlcorPoolData.ts
│   └── useTickCrossData.ts
├── lib/
│   ├── wax/
│   │   ├── alcor-client.ts
│   │   ├── hyperion-client.ts
│   │   └── tick-math.ts
│   └── utils.ts
├── types/
│   └── index.ts
public/
└── mock-data/
```

### 4.4 Security & Privacy Notes
- Read-only data fetching
- No secrets or keys stored
- Clear disclaimers on data freshness

---

## 5. Implementation Examples & Code Snippets

**1. Core tick cross calculation hook (simplified)**
```ts
// lib/wax/tick-cross-calculator.ts
export function calculateTickCrosses(swaps: SwapAction[], currentTick: number, windowMs: number) {
  // Group swaps by tick buckets and count crosses
  // Return array of { tickBucket, crossCount, feeImpact }
}
```

**2. Live data fetching with React Query**
```ts
// hooks/useTickCrossData.ts
export function useTickCrossData(poolId: string, timeWindow: string) {
  return useQuery({
    queryKey: ['tick-crosses', poolId, timeWindow],
    queryFn: () => fetchAlcorTickCrosses(poolId, timeWindow),
    refetchInterval: 5000,
  })
}
```

**3. Example Alcor pool tick math integration**
(Reference public Alcor SDK or direct REST for sqrtPrice to tick conversion)

---

## 6. Demo & Testing Strategy
- Live Demo Toggle: Mock Data ↔ Mainnet (with "LIVE" badge and last updated timestamp)
- Storybook for chart components
- Playwright e2e for pool switching and time window changes
- Vitest for calculator logic
- Vercel preview on every push

---

## 7. Roadmap & Development Phases

**Phase 0 — Scaffold (1 day)**
- Repo init, Tailwind + shadcn, basic layout, WharfKit read-only session

**Phase 1 — Data Layer (3 days)**
- Alcor + Hyperion clients, tick math parser, cross calculation engine, TypeScript types

**Phase 2 — Core UI (4 days)**
- Interactive bar chart, controls, gauges, table, responsive polish

**Phase 3 — Polish & Edge Cases (2 days)**
- Loading/error/empty states, a11y audit, performance, mobile

**Phase 4 — Documentation & Release (2 days)**
- Full README, screenshots/GIFs, make public, update catalog

**Future Enhancements**
- Integration with other Alcor blueprints
- Exportable reports
- Multi-pool comparison mode

---

## 8. Visual References & Mockups
The main chart should feel like a professional trading terminal volume profile meets a GitHub contribution heatmap — clean, information-dense, but not overwhelming. Bars glow brighter with higher cross frequency. Active price line pulses subtly.

---

## 9. Related Blueprints & Ecosystem Fit
- `wax-lp-impermanent-loss-heat-map` — Perfect companion for visualizing IL risk alongside tick activity
- `wax-concentrated-liquidity-roi-matrix` — Use cross data to power ROI predictions
- `wax-alcor-lp-behavioral-profiler` — Correlate LP behavior with tick volatility

---

## 10. License, Contributing & Credits
- MIT License
- Built with public WAX infrastructure (Alcor, Hyperion operators)
- Special thanks to the Alcor team for excellent public endpoints
- Pixel Journey Design System attribution

**Pixel Journey — Beautiful interfaces for public blockchain data.**
