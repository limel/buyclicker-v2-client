import { getHeroData, getDbAndReqBody } from 'lib/utils/api-routes'
import clientPromise from 'lib/mongodb'
import HeroCard from 'components/HeroCard'
import { IHeroCard } from 'types/Hero.types'
import { getLocale } from 'next-intl/server'

async function fetchHeroData() {
  const { db } = await getDbAndReqBody(clientPromise, null)
  const data = await getHeroData(db)
  return JSON.stringify(data)
}

export default async function Hero() {
  const locale = await getLocale()
  const heros = await fetchHeroData().then((data) => JSON.parse(data))
  return (
    <section className='mt-12 mb-12'>
      <div className='container grid grid-cols-[0.5fr_1fr_0.5fr] grid-rows-2 gap-x-16 gap-y-8 mb-24'>
        {heros &&
          heros.map((hero: IHeroCard, index: number) => (
            <HeroCard
              key={String(hero._id) || index}
              title={
                locale === 'uk'
                  ? hero.title
                  : (hero.translation && hero.translation[locale]?.title) || '' // Type guard for 'translations'
              }
              slug={hero.slug}
              image={hero.image}
              center={index === 1}
            />
          ))}
      </div>
      <div className='divider' />
    </section>
  )
}
