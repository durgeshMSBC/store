import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

const STORAGE_KEY = 'store_cart_v1'
const META_KEY = 'store_cart_meta_v1'

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [shipping, setShipping] = useState(0)
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [hasOrdered, setHasOrdered] = useState(false)

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
      const raw = localStorage.getItem(META_KEY)
      if (raw) {
        const meta = JSON.parse(raw)
        if (meta.appliedCoupon) setAppliedCoupon(meta.appliedCoupon)
        if (meta.hasOrdered) setHasOrdered(Boolean(meta.hasOrdered))
      }
    } catch (e) {
      console.warn('Failed to read cart meta from localStorage', e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems))
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e)
    }
  }, [cartItems])

  

  useEffect(() => {
    try {
      const meta = { appliedCoupon, hasOrdered }
      localStorage.setItem(META_KEY, JSON.stringify(meta))
    } catch (e) {
      console.warn('Failed to save cart meta to localStorage', e)
    }
  }, [appliedCoupon, hasOrdered])

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

  const clearCart = () => {
    setCartItems([])
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (e) {
      console.warn('Failed to remove cart from localStorage', e)
    }
    try {
      localStorage.removeItem(META_KEY)
    } catch (e) {
      console.warn('Failed to remove cart meta from localStorage', e)
    }
    // reset applied coupon and shipping when user clears cart
    setAppliedCoupon(null)
    setShipping(0)
  }

  const COUPONS = {
    FIRST10: { code: 'FIRST10', kind: 'percent', value: 10, description: '10% off for first-time customers', firstTimeOnly: true },
    WELCOME50: { code: 'WELCOME50', kind: 'flat', value: 50, description: '₹50 off on orders over ₹500', minSubtotal: 500 },
    FREESHIP: { code: 'FREESHIP', kind: 'shipping', value: 0, description: 'Free standard shipping' }
  }

  const formatPrice = (value) => {
    try {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)
    } catch (e) {
      return `₹${Number(value).toFixed(2)}`
    }
  }

  const computeDiscount = (subtotal) => {
    if (!appliedCoupon) return 0
    const c = appliedCoupon
    if (c.kind === 'percent') {
      return Math.min(subtotal, (subtotal * (c.value / 100)))
    }
    if (c.kind === 'flat') {
      if (c.minSubtotal && subtotal < c.minSubtotal) return 0
      return Math.min(subtotal, c.value)
    }
    return 0
  }

  const applyCoupon = (code, subtotal = 0) => {
    if (!code) return false
    const key = code.trim().toUpperCase()
    const coupon = COUPONS[key]
    if (!coupon) return false
    // first time only check
    if (coupon.firstTimeOnly && hasOrdered) return false
    // min subtotal check handled in computeDiscount, but we can validate here as well
    if (coupon.minSubtotal && subtotal < coupon.minSubtotal) return false
    setAppliedCoupon(coupon)
    // if coupon is shipping, optionally set shipping to 0 here (Cart UI will respect appliedCoupon)
    return true
  }

  const removeCoupon = () => setAppliedCoupon(null)

  const markOrderPlaced = () => {
    setHasOrdered(true)
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
    applyCoupon,
    removeCoupon,
    computeDiscount,
    formatPrice,
    markOrderPlaced,
    hasOrdered
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export default CartContext
