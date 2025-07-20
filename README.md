# Demo Link: https://misison-control.netlify.app/


# Mission Control

Mission Control is a **Space Mission Control Dashboard** designed for real-time telemetry monitoring and operations management. It was developed as part of the Nebula Nexus hackathon. The project leverages modern web technologies to provide a responsive, interactive, and extensible front-end for space operations and data visualization.

## Features

- **Real-time Telemetry Dashboard**: Visualize and monitor ongoing mission parameters with live data updates.
- **Interactive UI Components**: Includes custom UI elements such as carousels, calendars, tables, breadcrumbs, charts, pagination, drawers, switches, and textareas.
- **Chart & Data Visualization**: Integrates with [Recharts](https://github.com/recharts/recharts) for advanced, theme-aware data plotting.
- **Modern Design**: Utilizes [Radix UI](https://www.radix-ui.com/) and other libraries for accessible, highly configurable components.
- **Fast Development Workflow**: Powered by [Vite](https://vitejs.dev/) for rapid prototyping and build performance.
- **TypeScript Support**: Full type safety and modern ES2020+ features.
- **Customizable Themes**: Support for light and dark modes (see chart components).

## Technologies Used

- **TypeScript**
- **React**
- **Vite**
- **Radix UI**
- **Recharts**
- **Vaul (Drawer UI)**
- **Lucide Icons**
- **React-Day-Picker** (Calendar)
- **ESLint** (with TypeScript and React support)

## Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm** or **yarn**

### Installation

```bash
git clone https://github.com/raiakash1204/mission-control.git
cd mission-control
npm install
```

### Running Locally

```bash
npm run dev
# The app will be available at http://localhost:8080
```

### Build for Production

```bash
npm run build
```

## Project Structure

- `/src/components/ui/` — Custom UI components (carousel, calendar, chart, drawer, pagination, table, etc.)
- `/src/lib/` — Shared utilities
- `/index.html` — Entry point, sets up fonts and metadata
- `/vite.config.ts` — Vite configuration with aliasing, plugins, and development server settings
- `/eslint.config.js` — ESLint configuration for code quality

## Usage

The dashboard is designed to be modular. You can import and use individual UI components from `src/components/ui/` in your React views. Example usage:

```tsx
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { Table, TableHeader } from "@/components/ui/table";
// ...other imports

function Dashboard() {
  return (
    <div>
      <Carousel>
        <CarouselItem>Telemetry Panel 1</CarouselItem>
        <CarouselItem>Telemetry Panel 2</CarouselItem>
      </Carousel>
      <Table>
        <TableHeader>...</TableHeader>
        {/* Table body and rows */}
      </Table>
      {/* Additional components */}
    </div>
  );
}
```

## Contribution Guidelines

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes, ensuring code quality and style (`npm run lint`)
4. Commit and push your branch.
5. Open a pull request describing your changes.

### Code Style

- Please follow the ESLint rules defined in `eslint.config.js`.
- Use TypeScript for all new code.
- Prefer functional components and React hooks.

### Issues

If you find a bug or want to request a feature, please open an issue on GitHub.

## License

**This project currently does not specify a license.** Please contact the repository owner for usage permissions.

---

**Nebula Nexus Hackathon Project**  
Developed by [raiakash1204](https://github.com/raiakash1204)
