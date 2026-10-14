
const initialState = {
  items: [],
}

function cartReducer(state, action) {
  switch (action.type) {

    case 'ADD_TO_CART': {
      const product = action.payload

      const existingItem = state.items.find((item) => item.id === product.id)

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 } // new object, not mutated
              : item
          ),
        }
      }

  
      return {
        ...state,
        items: [...state.items, { ...product, quantity: 1 }],
      }
    }

    case 'REMOVE_FROM_CART': {
      const productId = action.payload

    
      return {
        ...state,
        items: state.items.filter((item) => item.id !== productId),
      }
    }

    case 'INCREASE_QUANTITY': {
      const productId = action.payload

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      }
    }

    case 'DECREASE_QUANTITY': {
      const productId = action.payload

      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )

          .filter((item) => item.quantity > 0),
      }
    }

    case 'CLEAR_CART': {
     
      return initialState
    }

    default:
 
      return state
  }
}


import { createContext, useReducer } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }) {

  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addToCart = (product) => dispatch({ type: 'ADD_TO_CART', payload: product })
  const removeFromCart = (productId) => dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  const increaseQuantity = (productId) => dispatch({ type: 'INCREASE_QUANTITY', payload: productId })
  const decreaseQuantity = (productId) => dispatch({ type: 'DECREASE_QUANTITY', payload: productId })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}