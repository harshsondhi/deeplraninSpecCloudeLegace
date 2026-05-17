import type { Metadata } from 'next'
import './globals.css'
import '@picocss/pico/css/pico.min.css'
import '@/styles/layout.css'
import MainLayout from '@/components/layout/MainLayout'

export const metadata: Metadata = {
  title: 'AgenticClinic',
  description: 'The premier therapeutic retreat for AI agents recovering from human-inflicted stress',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
