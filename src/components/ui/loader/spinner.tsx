import React from 'react'
import './spinner.css'

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  showText?: boolean
  theme?: string
}

const Spinner: React.FC<SpinnerProps> = ({ showText, theme = 'primary', ...rest }) => {
  return (
    <div className="flex flex-col items-center" {...rest}>
      <div className={`custom-loader ${theme}`}></div>
      {showText && <span className="text-[#2f82e0]"> &nbsp; Loading...</span>}
    </div>
  )
}

export default Spinner
