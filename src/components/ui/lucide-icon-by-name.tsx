import { cn } from '@/lib/utils'
import * as lucideIcons from 'lucide-react'

const LucideIconByName = ({ icon, ...props }: { icon: string } & lucideIcons.LucideProps) => {
  const Icon = lucideIcons[icon as keyof typeof lucideIcons] as React.ComponentType<lucideIcons.LucideProps>

  if (!Icon) {
    console.warn(`Icon "${icon}" does not exist in lucide-react.`)
    return null
  }

  return <Icon {...props} className={cn('', props.className)} />
}

export default LucideIconByName
