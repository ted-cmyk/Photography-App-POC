import './globals.css'

export const metadata = {
  title: 'Charleston Shots - Find Your Photographer',
  description: 'Connect with top Charleston photographers for weddings, portraits, events & more',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
