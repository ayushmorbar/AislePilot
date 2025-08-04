import productsData from "@/data/products.json"

export interface Product {
  id: string
  name: string
  price: number
  stock: number
  aisle: string
  category: string
  image: string
  recommendations: string[]
}

export function findSKU(query: string): Product | null {
  const products = productsData.products as Product[]

  // Simple fuzzy matching - in real app this would use semantic search
  const lowercaseQuery = query.toLowerCase()

  const exactMatch = products.find((p) => p.name.toLowerCase().includes(lowercaseQuery))

  if (exactMatch) return exactMatch

  // Fallback to category matching
  const categoryMatch = products.find((p) => p.category.toLowerCase().includes(lowercaseQuery))

  return categoryMatch || null
}

export function getRandomProduct(): Product {
  const products = productsData.products as Product[]
  return products[Math.floor(Math.random() * products.length)]
}

export function getProductById(id: string): Product | null {
  const products = productsData.products as Product[]
  return products.find((p) => p.id === id) || null
}

export function getRecommendations(productId: string): Product[] {
  const products = productsData.products as Product[]
  const product = products.find((p) => p.id === productId)

  if (!product) return []

  return product.recommendations.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[]
}
