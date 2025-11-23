export interface Testimonials {
  message: string
  metadata: Metadata
  testimonials: Testimonial[]
}

export interface Metadata {
  currentPage: number
  totalPages: number
  limit: number
  totalItems: number
}

export interface Testimonial {
  _id: string
  user: User
  rating: number
  content: string
  status: string
  featured: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface User {
  _id: string
  firstName: string
  lastName: string
  photo: string
}
