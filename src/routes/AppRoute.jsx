import { Routes, Route } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import AdminLayout from '../layouts/AdminLayout'
import ProtectedRoute from './ProtectedRoute'

import Home from '../pages/public/Home'
import Products from '../pages/public/Product'
import ProductDetails from '../pages/public/ProductDetails'
import Cart from '../pages/public/Cart'
import AdminDashboard from '../pages/admin/AdminDashboard'
import ManageProducts from '../pages/admin/ManageProducts'
import Login from '../pages/public/Login'


function AppRoutes() {
  return (
    <Routes>
     
      <Route path="/" element={<PublicLayout />}>
      <Route path='login' element={<Login />} />
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
      </Route>


        <Route element={<ProtectedRoute />}>     
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<ManageProducts />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes