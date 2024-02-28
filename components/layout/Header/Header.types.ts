export interface ICategory {
  _id: string
  name: string
  slug: string
  description: string
  translation: ITranslation
  gender_categories: IGenderCategories[]
}

export interface ISubcategories extends ICategory {
  'parrent-category': string
}

export interface IGenderCategories {
  _id: string
  name: string
  slug: string
  translation: ITranslation
  subcategories: ISubcategories[]
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
