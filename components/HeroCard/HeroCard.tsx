import React from 'react'
import Link from 'next/link'
import ImageWithFallback from 'components/ImageWithFallback'
import clsx from 'clsx'
import { IHeroCard } from 'types/Hero.types'

export default async function HeroCard({
  title,
  center,
  slug,
  image,
}: IHeroCard) {
  const { src, alt } = image
  return (
    <article
      className={clsx(
        'flex items-center justify-center flex-col w-full border-b-[1px] border-dashed border-divider group/hero [&:nth-of-type(n+4)]:border-none',
        center &&
          'min-w-[624px] grid-row-1 grid-col-2 col-span-1 row-span-2 border-none self-start'
      )}
    >
      <Link href={slug ? slug : '/'} title={title}>
        <div className='mb-4 rounded-xl overflow-hidden'>
          <ImageWithFallback
            src={src}
            width={center ? 624 : 280}
            height={center ? 400 : 280}
            priority={true}
            alt={alt || title}
            className='group-hover/hero:scale-110 transition-transform duration-300 ease-in-out transform-gpu '
          />
        </div>
        <h1
          className={clsx(
            'text-h5 pb-8',
            center &&
              'text-h2 pb-0 pt-6 mt-8 border-t-4 border-solid border-black'
          )}
        >
          {title}
        </h1>
      </Link>
    </article>
  )
}
