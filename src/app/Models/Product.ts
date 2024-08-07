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


export interface Pagination {
  categoryId: number
  search: string
  sorting: string
  pageIdx: number
  pageSize: number
  sizes: number[]
  colors: number[]
}
