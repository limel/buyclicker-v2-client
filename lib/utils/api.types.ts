export interface IUser {
  name: string
  lastName: string
  nameInitials: string
  birthdate: string
  email: string
  gender: string
  phone: string
  password: string
  receiveMail: boolean
  years: number
  role: string
  createdAt: string
}

export interface IProduct {
  sku: string
  gender: string
  category: string
  subcategory: string
  name: string
  vendorCode: string
  size: number
  dropPrice: number
  price: number
  quantity: number
  image: string[]
  createdAt: string
}
