import Forecast from '@/components/forecast/Forecast'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/forecast')({
  component: Forecast,
})

