export interface Product {
  pageCount: number
  pageSize: number
  pageNumber: number
  products: ProductItem[]
}

export interface ProductItem {
  id: number
  name: string
  description: string
  price: number
  categotyId: number
  categoryName: string
  imageUrl: string
}
