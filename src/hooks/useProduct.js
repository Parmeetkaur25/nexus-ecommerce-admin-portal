// src/hooks/useProducts.js
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct, updateProduct, deleteProduct } from '../services/productService'



const PRODUCTS_KEY = ['products']

export function useCreateProduct() {
  const queryClient = useQueryClient() 

  return useMutation({
    mutationFn: createProduct,
    onSuccess: (newProduct) => {
      // If the backend doesn't persist, update client cache optimistically
      queryClient.setQueryData(PRODUCTS_KEY, (old = []) => [
        // some APIs return created object inside 'product' or directly
        newProduct?.product ?? newProduct ?? {},
        ...old,
      ])
    },
  })
}

export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    
    mutationFn: ({ id, productData }) => updateProduct(id, productData),
    onSuccess: (updated) => {
      // update the cached products list with updated product
      const updatedProduct = updated?.product ?? updated
      queryClient.setQueryData(PRODUCTS_KEY, (old = []) =>
        old.map((p) => (p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p))
      )
    },
  })
}

export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: (deleted) => {
      // deleted may be an object with id or the deleted product
      const deletedId = deleted?.id ?? deleted?.product?.id
      if (deletedId == null) {
        // fallback: do a full invalidation
        queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY })
        return
      }

      queryClient.setQueryData(PRODUCTS_KEY, (old = []) => old.filter((p) => p.id !== deletedId))
    },
  })
}