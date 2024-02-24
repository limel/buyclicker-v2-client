export interface ICategory {
  _id: string
  name: string
  subcategories: ISubcategories[]
}

export interface ISubcategories {
  _id: string
  name: string
  categoryId: string
}
