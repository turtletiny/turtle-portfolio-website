import { lazy, type ComponentType, type LazyExoticComponent } from "react";

type ComponentModule<T extends ComponentType<any>> = { default: T };

type LazyComponentWithPreload<T extends ComponentType<any>> =
  LazyExoticComponent<T> & {
    preload: () => Promise<ComponentModule<T>>;
  };

function lazyWithPreload<T extends ComponentType<any>>(
  importer: () => Promise<ComponentModule<T>>,
): LazyComponentWithPreload<T> {
  const Component = lazy(importer) as LazyComponentWithPreload<T>;
  Component.preload = importer;
  return Component;
}

export const lazyRoutes = {
  Index: lazyWithPreload(() => import("@/pages/Index")),
  About: lazyWithPreload(() => import("@/pages/About")),
  Projects: lazyWithPreload(() => import("@/pages/Projects")),
  Callback: lazyWithPreload(() => import("@/pages/Callback")),
  NotFound: lazyWithPreload(() => import("@/pages/NotFound")),
  Terminal: lazyWithPreload(() => import("@/pages/Terminal")),
};

const routePreloaders: Record<string, () => Promise<unknown>> = {
  "/": () => lazyRoutes.Terminal.preload(),
  "/main": () => lazyRoutes.Index.preload(),
  "/about": () => lazyRoutes.About.preload(),
  "/projects": () => lazyRoutes.Projects.preload(),
  "/terminal": () => lazyRoutes.Terminal.preload(),
  "/callback": () => lazyRoutes.Callback.preload(),
};

export function preloadRoute(pathname: string) {
  const preload = routePreloaders[pathname];
  if (!preload) return;
  void preload();
}

export function preloadPrimaryRoutes() {
  preloadRoute("/main");
  preloadRoute("/about");
  preloadRoute("/projects");
  preloadRoute("/terminal");
}
