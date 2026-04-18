import Comparision from '@/components/comparision/Comparison'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/comparision')({
  component: Comparision,
})

