import Trends from '@/components/trends/Trends'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/trends')({
    validateSearch: (search): {
    year?: string;
    groupBy?:string;
    category?: string;
  } => search,

  component: Trends,
})

