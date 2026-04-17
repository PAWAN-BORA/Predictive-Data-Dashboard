import { createFileRoute } from '@tanstack/react-router'
import Dashboard from '../components/Dashboard'

export const Route = createFileRoute('/')({
  validateSearch: (search): {
    year?: string;
    quarter?: string;
    category?: string;
  } => search,
  component: Dashboard,
})

