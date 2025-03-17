import { cn } from '../../../lib/utils'
import React from 'react'
import Spinner from './spinner'

interface LoaderProps {
  highindex?: boolean
  showText?: boolean
  className?: string
  [key: string]: any // Allows for any additional props to be passed down
}

const Loader: React.FC<LoaderProps> = ({ highindex = true, showText = true, className, ...props }) => {
  return (
    <div
      className={cn(
        `dot absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center rounded border backdrop-blur-[10px] ${
          highindex ? 'z-40' : ''
        }`,
        className,
      )}
    >
      <Spinner showText={showText} {...props} />
    </div>
  )
}

export default Loader
