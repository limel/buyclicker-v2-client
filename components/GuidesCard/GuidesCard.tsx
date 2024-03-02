import React from 'react'
import Link from 'next/link'
import ImageWithFallback from 'components/ImageWithFallback'

export default function GuidesCard({
  img,
  title,
}: {
  img: string
  title: string
}) {
  return (
    <article className='flex items-center justify-center flex-col '>
      <Link href='/'>
        <div className='border-r-[1px] border-dashed border-divider h-[248px] absolute top-0 -right-8' />
        <ImageWithFallback
          src={img}
          alt='img'
          width={280}
          height={248}
          className='mb-6 rounded-xl overflow-hidden'
        />
        <h1 className='text-h4 '>{title}</h1>
      </Link>
    </article>
  )
}
