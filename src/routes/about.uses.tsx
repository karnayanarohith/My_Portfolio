import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/about/uses")({
  loader: () => {
    throw redirect({ to: "/about" });
  },
});