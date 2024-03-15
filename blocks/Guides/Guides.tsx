'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import GuidesCard from 'components/GuidesCard'

import 'swiper/css'

export default function Guides() {
  return (
    <section className='mt-12 mb-12'>
      <div className='container mb-24'>
        <div className='max-w-[550px] mb-16'>
          <h2 className='text-h1 mb-4'>Популярні Посібники з Купівлі</h2>
          <p>
            Ознайомтеся з нашими оновленими посібниками з купівлі, розділених на
            дві категорії: Одяг та Аксесуари.
          </p>
        </div>
        <Swiper
          slidesPerView={4}
          modules={[Autoplay]}
          loop
          spaceBetween={64}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <GuidesCard
              img='/images/guides/image1.jpg'
              title='5 Найкращих трендів жіночого одягу на 2023 рік'
            />
          </SwiperSlide>
          <SwiperSlide>
            <GuidesCard
              img='/images/guides/image2.jpg'
              title='10 крутих аксесуарів, які ви можете купити прямо зараз'
            />
          </SwiperSlide>
          <SwiperSlide>
            <GuidesCard
              img='/images/guides/image3.jpg'
              title='5 найкращих спортивних рюкзаків для чоловіків'
            />
          </SwiperSlide>
          <SwiperSlide>
            <GuidesCard
              img='/images/guides/image4.jpg'
              title='12 найкращих трикотажних худі для жінок'
            />
          </SwiperSlide>
          <SwiperSlide>
            <GuidesCard
              img='/images/guides/image1.jpg'
              title='5 Найкращих трендів жіночого одягу на 2023 рік'
            />
          </SwiperSlide>
          <SwiperSlide>
            <GuidesCard
              img='/images/guides/image2.jpg'
              title='10 крутих аксесуарів, які ви можете купити прямо зараз'
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className='divider' />
    </section>
  )
}
