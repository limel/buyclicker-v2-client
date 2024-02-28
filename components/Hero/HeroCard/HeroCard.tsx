import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'

export default function HeroCard({
  title,
  img,
  center,
}: {
  title: string
  img: string
  center?: boolean
}) {
  return (
    <article
      className={clsx(
        'flex items-center justify-center flex-col w-full border-b-[1px] border-dashed border-divider group/hero [&:nth-of-type(n+4)]:border-none',
        center &&
          'min-w-[624px] grid-row-1 grid-col-2 col-span-1 row-span-2 border-none self-start'
      )}
    >
      <Link href='/'>
        <div className='mb-4 rounded-xl overflow-hidden'>
          <Image
            priority={true}
            placeholder='blur'
            blurDataURL='/images/data-placeholder.svg'
            src={img}
            width={center ? 624 : 280}
            height={center ? 400 : 280}
            alt='image'
            className='group-hover/hero:scale-110 transition-transform duration-300 ease-in-out transform-gpu'
          />
        </div>
        <h1
          className={clsx(
            'text-h5 pb-8',
            center && 'pb-0 pt-6 mt-8 border-t-4 border-solid border-black'
          )}
        >
          {title}
        </h1>
      </Link>
    </article>
  )
}
