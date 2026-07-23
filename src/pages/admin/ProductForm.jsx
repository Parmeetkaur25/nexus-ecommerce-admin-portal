
import { useState } from 'react'
import '../../style/ProductForm.css'

function ProductForm({ initialData, onSubmit, onCancel, isSubmitting }) {
  const [formData, setFormData] = useState({
    title: initialData?.title ?? '',
    description: initialData?.description ?? '',
    category: initialData?.category ?? '',
    price: initialData?.price ?? '',
    stock: initialData?.stock ?? '',
    thumbnail: initialData?.thumbnail ?? '',
  })


  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.title.trim()) newErrors.title = 'Product name is required'
    if (!formData.category.trim()) newErrors.category = 'Category is required'

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number'
    }
    if (formData.stock === '' || Number(formData.stock) < 0) {
      newErrors.stock = 'Stock must be zero or a positive number'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault() 

    if (!validate()) return 


    onSubmit({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-field">
        <label htmlFor="title">Product Name</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && <span className="form-error">{errors.title}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
          {errors.category && <span className="form-error">{errors.category}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="price">Price ($)</label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <span className="form-error">{errors.price}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
          />
          {errors.stock && <span className="form-error">{errors.stock}</span>}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="thumbnail">Image URL</label>
        <input
          id="thumbnail"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="btn btn-outline">
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting} className="btn btn-primary">
          {isSubmitting ? 'Saving...' : 'Save Product'}
        </button>
      </div>
    </form>
  )
}

export default ProductForm