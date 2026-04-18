import Comparison from '@/components/comparision/Comparison'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/comparison')({
  validateSearch: (search): {
    year?: string;
    groupBy?:string;
    metric?: string;
  } => search,
  component: Comparison,
})

