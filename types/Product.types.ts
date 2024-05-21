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
  images: IImage[]
  createdAt: string
}

interface IImage {
  url: string
  alt: string
  order: number
}
