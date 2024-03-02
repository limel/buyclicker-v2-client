import { getHeroData, getDbAndReqBody } from 'lib/utils/api-routes'
import clientPromise from 'lib/mongodb'
import { IHeroCard } from './Hero.types'

import HeroCard from './HeroCard'

async function fetchHeroData() {
  const { db } = await getDbAndReqBody(clientPromise, null)
  const data = await getHeroData(db)
  return JSON.stringify(data)
}

export default async function Hero() {
  const heros = await fetchHeroData().then((data) => JSON.parse(data))
  return (
    <section className='mt-12 mb-12 '>
      <div className='container grid temapl grid-cols-[0.5fr_1fr_0.5fr] grid-rows-2 gap-x-16 gap-y-8'>
        {heros &&
          heros.map((hero: IHeroCard, index: number) => (
            <HeroCard
              key={String(hero._id) || index}
              title={hero.title}
              slug={hero.slug}
              image={hero.image}
              center={index === 1}
            />
          ))}
      </div>
      <div className='w-full h-1 bg-black mt-24 max-w-[1312px] mx-auto' />
    </section>
  )
}
