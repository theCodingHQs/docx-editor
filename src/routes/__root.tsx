import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="h-content-height overflow-y-auto">
        <Outlet />
      </div>
    </>
  ),
});
