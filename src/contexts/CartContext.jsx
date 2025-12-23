import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

const STORAGE_KEY = 'store_cart_v1'

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [shipping, setShipping] = useState(0)
  const [appliedCoupon, setAppliedCoupon] = useState('')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setCartItems(JSON.parse(raw))
    } catch (e) {
      console.warn('Failed to read cart from localStorage', e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems))
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e)
    }
  }, [cartItems])

  const addToCart = (product, options = {}) => {
    setCartItems(items => {
      const matchIndex = items.findIndex(i => i.id === product.id)
      if (matchIndex > -1) {
        // update existing quantity
        const next = [...items]
        next[matchIndex] = {
          ...next[matchIndex],
          quantity: (next[matchIndex].quantity || 1) + (options.quantity || 1)
        }
        return next
      }

      const item = {
        id: product.id,
        name: product.name,
        code: product.code || product.category || '',
        size: options.size || product.size || '',
        color: options.color || product.color || '',
        price: product.price || 0,
        quantity: options.quantity || 1,
        image: product.image || product.imageUrl || '',
        inStock: product.inStock !== undefined ? product.inStock : true
      }

      return [...items, item]
    })
  }

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(items => items.map(item => item.id === id ? { ...item, quantity: newQuantity } : item))
  }

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const clearCart = () => setCartItems([])

  const applyCoupon = (code) => {
    if (!code) return
    if (code.toLowerCase() === 'save10') {
      setAppliedCoupon('SAVE10')
      return true
    }
    return false
  }

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    shipping,
    setShipping,
    appliedCoupon,
    applyCoupon
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export default CartContext
