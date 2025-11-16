import Logo from '@/components/Logo'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { Toaster } from '@/components/ui/sonner'
import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import React, { ReactNode } from 'react'

async function Layout({children}:{children:ReactNode}) {
  const user = await currentUser()
  if(!user){
    return <>{children}</>
  }
  return (
    <div className='flex flex-col min-h-screen min-w-full bg-background max-h-screen'>
        <nav className='flex justify-between items-center border-b border-border h-[60px] px-4 py-2'>
            <Logo></Logo>
            <div className='flex gap-4 items-center'>
                <ThemeSwitcher/>
                <UserButton afterSwitchSessionUrl='/sign-in'></UserButton>
            </div>
   
        </nav>
        <main className='flex w-full flex-grow'>
        {children}
        <Toaster/>
        </main>
    </div>
  )
}

export default Layout