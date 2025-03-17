import React from 'react';

interface DivProps {
  children: React.ReactNode;
  divClassName?: string
}

export const DivJustifyBetween = ({ children, divClassName }: DivProps) => {
  return (
    <div className={`w-full flex flex-wrap-reverse justify-between ${divClassName}`}>
      {children}
    </div>
  )
}

export const DivJustifyStart = ({ children, divClassName }: DivProps) => {
  return (
    <div className={` w-full flex flex-wrap gap-4 justify-start ${divClassName}`}>
      {children}
    </div>
  )
}

export const DivJustifyStartMb1 = ({ children, divClassName }: DivProps) => {
  return (
    <div className={` w-full flex flex-wrap gap-4 justify-start mb-1 ${divClassName}`}>
      {children}
    </div>
  )
}

export const DivJustifyEnd = ({ children, divClassName }: DivProps) => {
  return (
    <div className={`flex flex-wrap gap-6 justify-end ${divClassName}`}>
      {children}
    </div>
  )
}
