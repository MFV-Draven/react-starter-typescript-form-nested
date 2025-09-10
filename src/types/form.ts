export interface Department {
  name: string
  type: string
}

export interface Category {
  name: string
  descriptions: string
  departments: Department[]
}

export interface FormData {
  categories: Category[]
}

// Avoid DOM FormData name collision in generics
export type CategoriesFormData = FormData

export interface FormErrors {
  categories?: {
    name?: string
    descriptions?: string
    departments?: {
      name?: string
      description?: string
      enabled?: string
      type?: string
    }[]
  }[]
}
