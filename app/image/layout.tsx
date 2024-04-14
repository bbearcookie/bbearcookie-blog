export const metadata = {
  title: 'Image',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-image-background">{children}</div>
  )
}
