import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '../../services/productService'
import { useCreateProduct } from '../../hooks/useProduct'
import ErrorState from '../../components/ErrorState'
import ProductTableSkeleton from './ProductTableSkeleton'
import { useUpdateProduct, useDeleteProduct } from '../../hooks/useProduct'
import ConfirmDialog from '../../components/ConfirmDialog'
import ProductTable from './ProductTable'
import ProductForm from './ProductForm'
import '../../style/ManageProduct.css'

function ManageProducts() {
  const { data: products, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['products'],
    queryFn: getAllProducts,
  })

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)


  const [deletingId, setDeletingId] = useState(null)

  const createMutation = useCreateProduct()
  const updateMutation = useUpdateProduct()
  const deleteMutation = useDeleteProduct()

  const handleAddClick = () => {
    setEditingProduct(null)
    setIsFormOpen(true)
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setIsFormOpen(true)
  }

  const handleDelete = (productId) => {
    setDeletingId(productId)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingProduct(null)
  }

  const handleFormSubmit = (formData) => {
    if (editingProduct) {
      updateMutation.mutate(
        { id: editingProduct.id, productData: formData },
        { onSuccess: handleCloseForm }
      )
    } else {
      createMutation.mutate(formData, { onSuccess: handleCloseForm })
    }
  }


  const handleConfirmDelete = () => {
    deleteMutation.mutate(deletingId, {

      onSuccess: () => setDeletingId(null),
    })
  }

  const handleCancelDelete = () => {
    setDeletingId(null)
  }

  if (isLoading) return <p>Loading products...</p>
  if (isError) return <p>Something went wrong: {error.message}</p>

  const isSubmitting = createMutation.isLoading || updateMutation.isLoading


  const productToDelete = products.find((p) => p.id === deletingId)

  return (
      <div className="manage-products">
      <div className="manage-products-header">
        <div>
          <h1>Manage products</h1>
          <p>
            {isLoading
              ? 'Loading...'
              : `${products?.length ?? 0} products in your catalog`}
          </p>
        </div>
        <button
          onClick={handleAddClick}
          className="btn btn-primary"
          disabled={isLoading || isError}
        >
          + Add Product
        </button>
      </div>
 
      <div className="card">
     
        {isLoading && <ProductTableSkeleton />}
 
        {isError && (
          <ErrorState message={error.message} onRetry={refetch} />
        )}
 
        {!isLoading && !isError && (
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal-content card">
            <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
 
            {(createMutation.isError || updateMutation.isError) && (
              <div className="form-alert">
                {(createMutation.error || updateMutation.error).message}
              </div>
            )}
 
            <ProductForm
              initialData={editingProduct}
              onSubmit={handleFormSubmit}
              onCancel={handleCloseForm}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      )}
 

      {deletingId !== null && (
        <ConfirmDialog
          title="Delete product"
          message={`Are you sure you want to delete "${productToDelete?.title}"? This cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          isConfirming={deleteMutation.isPending}
          errorMessage={deleteMutation.isError ? deleteMutation.error.message : null}
        />
      )}
    </div>
  )

  
}

export default ManageProducts
