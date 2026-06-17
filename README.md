**Project Overview**

Simple product listing and details React app with a filter page, category-driven filtering, and client-side pagination.

**Setup Instructions**
- **Install dependencies**: run

```bash
npm install
```

- **Add router (if missing)**: ensure `react-router-dom` is installed. If you see runtime errors, run:

```bash
npm install react-router-dom
```

- **Run dev server**:

```bash
npm run dev
```

- **Files to inspect**: main routes and pages are in [src/App.jsx](src/App.jsx) and [src/main.jsx](src/main.jsx). The filter page is at [src/Pages/FilterPage.jsx](src/Pages/FilterPage.jsx).

**Assumptions Made**

- **API shape**: `https://dummyjson.com/products` returns an object with a `products` array where each product includes `id`, `title`, `price`, `thumbnail`, `rating`, and `category`.
- **Category normalization**: categories fetched from `https://dummyjson.com/products/categories` are normalized to match product `category` strings (the sidebar emits slugs used for filtering).
- **Client-side dataset**: the app fetches the full products list once and paginates/filter on the client.

**Architectural Decisions**

- **Single-page routing**: routing is handled with `react-router-dom`; routes are defined in [src/App.jsx](src/App.jsx).
- **Filter page as a route**: the sidebar/filter UI lives on a dedicated route at `/filter` implemented in [src/Pages/FilterPage.jsx](src/Pages/FilterPage.jsx) instead of an overlay.
- **Controlled Sidebar**: sidebar selection is lifted up via `onCategoryChange` to `FilterPage` which performs filtering — see [src/Components/SideBar/Sidebar.jsx](src/Components/SideBar/Sidebar.jsx).
- **Reusable card**: product presentation is a reusable `ProductCard` component at [src/Components/ProductCard/ProductCard.jsx](src/Components/ProductCard/ProductCard.jsx).
- **Client-side pagination**: pagination is implemented in `FilterPage` (9 items per page) and shows a sliding window of 5 page numbers.

**Improvements If Given More Time**

- **Server-side pagination / filtering**: support API queries with page/limit and category filters to avoid loading the full dataset at once.
- **Accessibility**: improve keyboard navigation, ARIA attributes for pagination, and semantic HTML for screen readers.
- **UI polish & responsiveness**: refine breakpoints, card aspect ratios, and image loading placeholders.

If you want, I can add a short development checklist, CI steps, or wire up React Query and tests next.# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
