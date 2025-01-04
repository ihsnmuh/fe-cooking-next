
import Navbar from '@/components/navbar'
import React from 'react'

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {

  return (
    <main className='font-jakarta-sans'>
      <Navbar/>
      <div className='layout'>
        {children}
      </div>
    </main>
  )
}

export default Layout