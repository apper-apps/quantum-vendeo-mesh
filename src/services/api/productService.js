import productsData from "@/services/mockData/products.json"

class ProductService {
  constructor() {
    this.products = [...productsData]
    this.nextId = Math.max(...this.products.map(p => p.Id)) + 1
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 200))
  }

  async getAll() {
    await this.delay()
    return [...this.products]
  }

  async getById(id) {
    await this.delay()
    const product = this.products.find(p => p.Id === id)
    return product ? { ...product } : null
  }

  async getSellerProducts(sellerId) {
    await this.delay()
    return this.products
      .filter(p => p.sellerId === sellerId)
      .map(p => ({ ...p }))
  }

  async create(productData) {
    await this.delay()
    const newProduct = {
      ...productData,
      Id: this.nextId++,
      createdAt: new Date().toISOString()
    }
    this.products.push(newProduct)
    return { ...newProduct }
  }

  async update(id, updates) {
    await this.delay()
    const index = this.products.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error("Product not found")
    }
    
    this.products[index] = { ...this.products[index], ...updates }
    return { ...this.products[index] }
  }

  async delete(id) {
    await this.delay()
    const index = this.products.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error("Product not found")
    }
    
    const deleted = this.products.splice(index, 1)[0]
    return { ...deleted }
  }
}

export const productService = new ProductService()