import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { Toaster } from '@/components/ui/sonner'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: ()=>{
    return (
      <>
        <Header/>
        <div className='flex gap-2'>
          <Sidebar/>
          <div className='flex-1'>
            <Outlet />
          </div>
        </div>
        <Toaster />
      </>
    )
  },
})
