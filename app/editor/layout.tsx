import styles from './style.module.css'




export const metadata = {
  title: 'Node Editor',
  description: 'A Node Editor for Cash Flow Visualization',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={styles.body}>{children}</body>
    </html>
  )
}
