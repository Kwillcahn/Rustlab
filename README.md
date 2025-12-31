# RustLab Dashboard

A professional, minimal homelab dashboard built with React and TypeScript — rust‑themed UI cards, collapsible sidebar, and real‑time mock monitoring for servers, VMs, and network activity.

## Features

- Polished, semi‑transparent Rust-colored card UI with subtle glow and hover effects
- Collapsible sidebar and responsive grid layout
- Mock real‑time updates for:
  - Host / hypervisor / VM resource metrics (CPU, RAM, Storage)
  - Network throughput, latency, and historical sparklines
  - Pi‑Hole statistics and top blocked domains
  - Logs & alerts viewer with severity highlighting
- Theme toggling (dark / light) and small visual customization points
- Small, focused component set for easy extension

## Quick Start

Prerequisites:
- Node.js (LTS or newer)
- npm (or your preferred package manager)

Install dependencies:
```bash
npm install
```

Run in development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview a production build locally:
```bash
npm run preview
```

If you want to provide runtime configuration (API endpoints, credentials, etc.), create a `.env.local` and add whatever variables your custom integration requires. The repo runs out‑of‑the‑box using built‑in mock data so no external services are required.

## Project Structure

- index.html — app entry, basic global styles and Tailwind CDN inclusion
- index.tsx — React mount point
- App.tsx — application root and view routing (Dashboard / Storage / Activity / Settings)
- types.ts — shared TypeScript interfaces
- components/ — UI building blocks and view components:
  - DashboardCard.tsx — reusable card wrapper with expand/collapse and visual effects
  - Sidebar.tsx — collapsible navigation
  - ServerCard.tsx, PiHoleCard.tsx, NetworkCard.tsx, LogCard.tsx — dashboard widgets
  - StorageView.tsx, ActivityView.tsx, SettingsView.tsx — full views
  - StatBar.tsx, Sparkline.tsx, NetworkSummary.tsx, LogViewer.tsx — smaller UI pieces

## Mock Data & Real-Time Simulation

The app ships with mock data and a small simulation loop that updates metrics every few seconds to emulate live monitoring. This makes it useful as a UI scaffold before wiring real APIs.

To integrate real telemetry:
- Replace or augment the internal mock generators in App.tsx with fetch/websocket clients to your monitoring APIs.
- Map incoming payloads to the shapes defined in `types.ts`.

## Theming & Styling

- Tailwind is used for rapid styling (CDN included in index.html for demo convenience).
- Theme state is stored in the app and toggles class sets across components. You can adapt this to use CSS variables, a theme provider, or a design system as needed.

## Development Notes

- Built with React + TypeScript and Vite for fast development.
- TypeScript target and JSX configuration are in `tsconfig.json`.
- Components are intentionally small and composable to make customization straightforward.
- The UI uses a few handcrafted animations and utility classes; feel free to extract these into a design token file or Tailwind plugin.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes and open a pull request describing the change.
4. Keep changes focused and update types where necessary.

Please run the app locally and ensure changes don't break the example mock flows.

## License

MIT — see LICENSE file (or add one) for details.

## Acknowledgements

This project is a UI scaffold intended for homelab monitoring and visualization — designed to be easy to adapt, extend, and integrate with your own monitoring backends.