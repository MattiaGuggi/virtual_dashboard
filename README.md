# Virtual Hub 🌐🕹️

A 2D/3D management dashboard to orchestrate, start, stop, and launch local web applications. Think of it as a spatial menu for your local development environment.

## 🚀 Features
* **Dual Interface:** Switch seamlessly between a practical 2D dashboard and a 3D interactive "Wreck-it Ralph" style hub.
* **Process Orchestration:** Start and stop local Node/Next.js/React servers directly from the browser using a local API.
* **Spatial Navigation:** Walk into a 3D arcade cabinet or portal to open the respective local web app.

## 🛠️ Tech Stack
* **Framework:** Next.js (App Router) + TypeScript
* **3D Engine:** Three.js + React Three Fiber + React Three Drei
* **Physics:** React Three Rapier (for 3D collisions)
* **State Management:** Zustand
* **Styling:** Tailwind CSS

## 📦 Initial Setup

1. **Create the project:**
   ```bash
   npx create-next-app@latest virtual-hub
   ```
   *(Select Yes for TypeScript, ESLint, Tailwind CSS, App Router. Select No for `src/` directory)*

2. **Install dependencies:**
   ```bash
   cd virtual-hub
   npm install three @react-three/fiber @react-three/drei
   npm install @react-three/rapier
   npm install zustand lucide-react
   ```

## 🗺️ Roadmap
- Phase 1: Define Project Configuration & Data Structure
- Phase 2: Build the Next.js API Orchestrator (Node `child_process`)
- Phase 3: Develop the 2D Dashboard MVP
- Phase 4: Build the 3D Virtual Hub Room
- Phase 5: Production/Portability Polish

## ⚠️ Notes on Local vs. Production
This application relies on Node.js `child_process` to manage local server ports. In a production environment, the terminal execution features will be disabled, and portals will route directly to live URLs.