import React from 'react'
import HeroCard from './HeroCard'

export default function Hero() {
  return (
    <section className='pt-12 pb-24'>
      <div className='container grid temapl grid-cols-[0.5fr_1fr_0.5fr] grid-rows-2 gap-x-8 gap-y-16'>
        <HeroCard title='title' img='/images/hero/banner1.jpg' />
        <HeroCard title='title' img='/images/hero/banner2.jpg' center />
        <HeroCard title='title' img='/images/hero/banner3.jpg' />
        <HeroCard title='title' img='/images/hero/banner4.jpg' />
        <HeroCard title='title' img='/images/hero/banner5.jpg' />
      </div>
    </section>
  )
}
