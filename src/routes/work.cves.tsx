// Layout shell for /work/cves — renders child routes via Outlet.
// Index content lives in work.cves.index.tsx
// Detail content lives in work.cves.$slug.tsx
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/work/cves")({
  component: () => <Outlet />,
});
