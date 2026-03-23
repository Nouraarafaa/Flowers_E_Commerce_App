export interface GetProducts {
    message: string
    metadata: Metadata
    products: Product[]
}

export interface Metadata {
    currentPage: number
    totalPages: number
    limit: number
    totalItems: number
}

export interface Product {
    _id: string
    title: string
    slug: string
    description: string
    imgCover: string
    images: string[]
    price: number
    priceAfterDiscount: number
    quantity: number
    category: string
    occasion: string
    createdAt: string
    updatedAt: string
    __v: number
    isSuperAdmin: boolean
    sold?: number
    rateAvg: number
    rateCount: number
    favoriteId: any
    isInWishlist: boolean
    discount?: number
}