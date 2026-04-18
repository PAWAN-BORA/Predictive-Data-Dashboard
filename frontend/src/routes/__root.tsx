import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { Toaster } from '@/components/ui/sonner'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: ()=>{
    return (
      <div className="h-screen flex flex-col overflow-hidden">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </div>
        </div>
        <Toaster position='top-right' richColors />
      </div>
    )
  },
})
