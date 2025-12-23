import productsRaw from './products.json'

// Map JSON image paths to Vite asset URLs so components can use them directly.
export const products = productsRaw.map(p => ({
  ...p,
  image: new URL(`../${p.image}`, import.meta.url).href
}))