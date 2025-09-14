export default function Container({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`container px-6 lg:px-8 ${className}`.trim()}>{children}</div>
}

