export interface IHeroCard {
  _id?: string
  title: string
  image: {
    src: string
    alt: string
  }
  slug: string
  center: boolean
}
