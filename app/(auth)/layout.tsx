import GlassPane from '@/components/GlassPane'
import '@/styles/global.css'
// import { Inter } from '@next/font/google';

// const inter = Inter({
//     variable: '--font-inter'
// });

export default function AuthRootLayout({ children }) {
  return (
    <html lang='en'>
      <head />
      <body className='rainbow-mesh h-screen w-screen p-6'>
        <GlassPane className='flex h-full w-full items-center justify-center'>{children}</GlassPane>
      </body>
    </html>
  )
}
