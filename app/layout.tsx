import { AppSidebar } from '@/components/AppSidebar'
import { ThemeProvider } from '@/components/ThemeProvider'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import StoreProvider from './StoreProvider'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'My App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <StoreProvider>
            <SidebarProvider>
              <AppSidebar />
              <main className="flex-1 w-full">
                <SidebarTrigger />
                {children}
              </main>
            </SidebarProvider>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
