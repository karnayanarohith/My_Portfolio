// Blog temporarily hidden — will be re-enabled when real posts are ready.
// To restore: replace this file with a real BlogPage component and
// re-enable the nav entry in Nav.tsx and the GoDeeper card in work.tsx.
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/work/blog")({
  loader: () => {
    throw redirect({ to: "/work" });
  },
});