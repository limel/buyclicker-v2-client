'use client'
import { useState } from 'react'
import Image from 'next/image'
export default function ImageWithFallback({
  src,
  alt,
  ...props
}: {
  alt: string
  src?: string
  [key: string]: unknown
}) {
  const [hasError, setHasError] = useState(false)

  const keyStr =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

  const triplet = (e1: number, e2: number, e3: number) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63)

  const rgbDataURL = (r: number, g: number, b: number) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${
      triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`
  return (
    <Image
      {...props}
      blurDataURL={rgbDataURL(112, 112, 122)}
      placeholder='blur'
      src={hasError || !src ? '/images/placeholder.svg' : src}
      onError={() => !hasError && setHasError(true)}
      alt={hasError ? 'placeholder' : alt}
      quality={100}
    />
  )
}
