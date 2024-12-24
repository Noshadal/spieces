import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import BottomNav from './components/BottomNav'
import { FirebaseProvider } from './components/FirebaseProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spices Marketplace Pro',
  description: 'Your premium destination for high-quality spices',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FirebaseProvider>
          <main className="container mx-auto max-w-md h-screen flex flex-col">
            <div className="flex-grow overflow-auto">
              {children}
            </div>
            <BottomNav />
          </main>
        </FirebaseProvider>
      </body>
    </html>
  )
}

