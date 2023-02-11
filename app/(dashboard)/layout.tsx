import GlassPane from '@/components/GlassPane'
import Sidebar from '@/components/Sidebar'
import '@/styles/global.css'

export default function DashboardRootLayout({ children }) {
  return (
    <html lang='en'>
      <head />
      <body className='candy-mesh h-screen w-screen p-6'>
        <GlassPane className='flex h-full w-full items-center '>
          <Sidebar />
          {children}
        </GlassPane>
      </body>
    </html>
  )
}
