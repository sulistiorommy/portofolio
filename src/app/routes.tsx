import { createBrowserRouter } from "react-router";
import { Root } from "./layout/Root";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Achievements } from "./pages/Achievements";
import { Project } from "./pages/Project";
import { Dashboard } from "./pages/Dashboard";
import { Contact } from "./pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "achievements", Component: Achievements },
      { path: "project", Component: Project },
      { path: "dashboard", Component: Dashboard },
      { path: "contact", Component: Contact },
    ],
  },
]);