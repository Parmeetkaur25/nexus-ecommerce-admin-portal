
const BASE_URL = 'https://dummyjson.com/products'


export async function getAllProducts() {
  const response = await fetch(BASE_URL)

  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }

  const data = await response.json()
  return data.products
}

export async function getProductById(id) {
  const response = await fetch(`${BASE_URL}/${id}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch product with id ${id}`)
  }

  return response.json() 
}


export async function searchProducts(query) {
  const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`)

  if (!response.ok) {
    throw new Error('Failed to search products')
  }

  const data = await response.json()
  return data.products
}