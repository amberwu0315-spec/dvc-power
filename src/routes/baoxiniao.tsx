import { Navigate, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/baoxiniao")({
  component: LegacyBaoxiniaoPageRedirect,
})

export function LegacyBaoxiniaoPageRedirect() {
  return <Navigate to="/cases/baoxiniao-carbon-cockpit" replace />
}
