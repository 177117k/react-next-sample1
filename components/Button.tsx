import type { ReactNode, ButtonHTMLAttributes, RefObject } from 'react'
import Loader from '@/components/Loader'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'md' | 'sm'

// interface Props extends React.ButtonHTMLAttributes<> { // React Namespace 사용 시..
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?:
    | RefObject<HTMLButtonElement>
    | ((element: Element | null | undefined) => (() => void) | undefined)
  loading?: boolean
  variant?: Variant
  size?: Size
  className?: string
  children?: ReactNode
}

const variants: Record<Variant, string> = {
  primary: 'bg-kb-yellow text-kb-black hover:bg-kb-yellow-strong',
  secondary: 'bg-line text-ink hover:bg-line-2',
  ghost: 'bg-transparent text-ink-2 hover:bg-line',
  danger: 'bg-transparent text-negative hover:bg-negative/10'
}

const sizes: Record<Size, string> = {
  md: 'h-12 px-5 text-[15px]',
  sm: 'h-10 px-4 text-[14px]'
}

export default function Button({
  loading,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...restProps
}: Props) {
  return (
    <button
      {...restProps}
      className={`focus-visible:ring-kb-yellow/60 relative inline-flex items-center justify-center rounded-[12px] font-bold transition outline-none focus-visible:ring-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${sizes[size]} ${className}`}>
      {loading ? (
        <Loader
          size={20}
          color="currentColor"
        />
      ) : (
        children
      )}
    </button>
  )
}
