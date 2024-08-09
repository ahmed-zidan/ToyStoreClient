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
  sellPrice: number
  mainPrice: number
  isSale:boolean
  isNew:boolean
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
  maxPrice: number
  minPrice: number
  sizes: number[]
  colors: number[]
}
