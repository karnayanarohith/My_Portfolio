import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-surface px-6 overflow-hidden">
      <div className="absolute inset-0 spotlight opacity-70" />
      <div className="relative max-w-2xl text-center">
        <p className="text-[10px] text-accent tracking-[0.4em] uppercase mb-6">Lost signal</p>
        <h1 className="text-[28vw] md:text-[18vw] leading-none font-serif text-foreground">404</h1>
        <p className="mt-6 text-lg text-dim max-w-md mx-auto leading-relaxed">
          This page is somewhere in the dark. Let's get you back into the light.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/"
            className="text-sm font-medium px-6 py-3 ring-1 ring-accent/60 hover:bg-accent/10 hover:ring-accent transition-all rounded-md uppercase tracking-widest"
          >
            Return Home
          </Link>
          <Link
            to="/work"
            className="text-sm font-medium px-6 py-3 text-dim hover:text-foreground transition-colors uppercase tracking-widest"
          >
            View Work →
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <div className="max-w-md text-center">
        <p className="text-[10px] text-accent tracking-[0.4em] uppercase mb-4">Interference</p>
        <h1 className="text-3xl font-serif tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-3 text-sm text-dim">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md ring-1 ring-accent/60 px-4 py-2 text-sm font-medium text-foreground hover:bg-accent/10 transition-colors uppercase tracking-widest"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-dim hover:text-foreground transition-colors uppercase tracking-widest"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
