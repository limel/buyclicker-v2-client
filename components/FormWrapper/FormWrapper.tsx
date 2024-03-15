import React from 'react'

export default function FormWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <span />
      {children}
    </div>
  )
}
