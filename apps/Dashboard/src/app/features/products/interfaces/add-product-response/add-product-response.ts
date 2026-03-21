export interface AddProductResponse {
    message: string
    product: Product
}

export interface Product {
    title: string
    slug: string
    description: string
    imgCover: string
    images: string[]
    price: number
    priceAfterDiscount: number
    discount: number
    rateAvg: number
    rateCount: number
    quantity: number
    category: string
    occasion: string
    isSuperAdmin: boolean
    _id: string
    createdAt: string
    updatedAt: string
    __v: number
    id: string
}



