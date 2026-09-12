import type { ReactNode } from 'react'

type Props = {
  eyebrow?: string
  title: ReactNode
  children: ReactNode
  className?: string
}

export function SectionCard({ eyebrow, title, children, className = '' }: Props) {
  return (
    <section className={`section-card reveal ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {children}
    </section>
  )
}
