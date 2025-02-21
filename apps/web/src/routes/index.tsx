import { createFileRoute } from "@tanstack/react-router";

import { Logo } from "@/components/marketing/logo";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-neutral-100">
      <div className="flex flex-col items-start gap-1">
        <div className="flex items-center gap-2">
          <Logo className="h-7 w-7" />
          <h1 className="font-display text-3xl font-bold tracking-tight">
            React Boilerplate
          </h1>
        </div>
        <p className="text-muted-foreground text-base">
          A boilerplate React Web Application with TypeScript, Tanstack Router,
          Tailwind CSS and shadcn/ui.
        </p>
      </div>
    </div>
  );
}
