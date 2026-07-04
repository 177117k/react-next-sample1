import Header from '@/components/Header'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}
export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
