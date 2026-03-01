export interface RelatedProductsResponse {
  message: string
  count: number
  relatedProducts: ProductSummary[]
}

export interface ProductSummary {
  _id: string
  title: string
  imgCover: string
  price: number
  priceAfterDiscount: number
  rateAvg: number
  rateCount: number
  id: string
}