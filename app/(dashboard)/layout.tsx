import GlassPane from '@/components/GlassPane'
import '@/styles/global.css'

export default function DashboardRootLayout({ children }) {
  return (
    <html lang='en'>
      <head />
      <body className='rainbow-mesh h-screen w-screen p-6'>
        <GlassPane className='flex h-full w-full items-center justify-center'>{children}</GlassPane>
      </body>
    </html>
  )
}
