import Growth from '@/components/growth/Growth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/growth')({
  component: Growth,
})

