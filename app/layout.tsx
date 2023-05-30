import './globals.css'
import { Inter } from 'next/font/google'
import {ExampleNavbarOne} from './Navbar'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FlowNode',
  description: 'Node Editor for Visualization',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
       
      </head>
      <body className={inter.className}>
      <div>
      <ExampleNavbarOne/>
      </div>
        {children}</body>
    </html>
  )
}
