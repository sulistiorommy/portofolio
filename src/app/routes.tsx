import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
import { Root } from "./layout/Root";
import { Home } from "./pages/Home";

// Lazy-load pages that aren't needed on initial render
const About = lazy(() => import("./pages/About").then((m) => ({ default: m.About })));
const Achievements = lazy(() => import("./pages/Achievements").then((m) => ({ default: m.Achievements })));
const Project = lazy(() => import("./pages/Project").then((m) => ({ default: m.Project })));
const Dashboard = lazy(() => import("./pages/Dashboard").then((m) => ({ default: m.Dashboard })));
const Contact = lazy(() => import("./pages/Contact").then((m) => ({ default: m.Contact })));

function LazyPage({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", element: <LazyPage><About /></LazyPage> },
      { path: "achievements", element: <LazyPage><Achievements /></LazyPage> },
      { path: "project", element: <LazyPage><Project /></LazyPage> },
      { path: "dashboard", element: <LazyPage><Dashboard /></LazyPage> },
      { path: "contact", element: <LazyPage><Contact /></LazyPage> },
    ],
  },
]);