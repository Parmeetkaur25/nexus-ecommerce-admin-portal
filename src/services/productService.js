
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

export async function createProduct(productData) {
  const response = await fetch(`${BASE_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  })

  if (!response.ok) {
    throw new Error('Failed to create product')
  }

  return response.json()
}

export async function updateProduct(id, productData) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  })

  if (!response.ok) {
    throw new Error(`Failed to update product with id ${id}`)
  }

  return response.json()
}

export async function deleteProduct(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error(`Failed to delete product with id ${id}`)
  }

  return response.json()
}