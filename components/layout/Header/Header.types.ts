export interface ICategory {
  _id: string
  name: string
  slug: string
  description: string
  translation: ITranslation
  subcategories?: ISubcategories[]
}

export interface ISubcategories extends ICategory {
  'parrent-category': string
}

interface ITranslation {
  [lang: string]: {
    name: string
    slug: string
  }
}

export interface IHeaderCategoryItem {
  index: number
  active: boolean
  data: ICategory
}
