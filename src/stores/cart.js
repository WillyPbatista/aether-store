import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const totalItems = computed(() =>
    items.value.reduce((sum, i) => sum + i.qty, 0)
  )

  const subtotal = computed(() =>
    items.value.reduce((sum, i) => sum + i.price * i.qty, 0)
  )

  function addItem(product) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.qty++
    } else {
      items.value.push({ ...product, qty: 1 })
    }
  }

  function removeItem(id) {
    items.value = items.value.filter(i => i.id !== id)
  }

  function updateQty(id, delta) {
    const item = items.value.find(i => i.id === id)
    if (!item) return
    item.qty = Math.max(1, item.qty + delta)
  }

  function clear() {
    items.value = []
  }

  return { items, totalItems, subtotal, addItem, removeItem, updateQty, clear }
})