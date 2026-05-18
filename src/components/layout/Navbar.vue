<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
    style="background: rgba(7,7,15,0.7); border-bottom: 1px solid rgba(255,255,255,0.10); backdrop-filter: blur(32px);"
  >
    <RouterLink to="/" class="gradient-text font-black text-2xl tracking-tight no-underline">
      ÆTHER Store
    </RouterLink>

    <div class="flex gap-2">
      <RouterLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 no-underline"
        style="color: rgba(241,240,247,0.55); border: 1px solid transparent;"
        active-class="nav-link-active"
      >
        {{ link.label }}
      </RouterLink>
    </div>

    <RouterLink to="/cart" class="relative no-underline">
      <button
        class="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
        style="background: linear-gradient(135deg, #7c3aed, #06b6d4); border: none; cursor: pointer;"
      >
        🛍️ Carrito
        <span
          v-if="cart.totalItems > 0"
          class="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-white font-bold"
          style="background: #ef4444; font-size: 10px; border: 2px solid #07070f;"
        >
          {{ cart.totalItems }}
        </span>
      </button>
    </RouterLink>
  </nav>
</template>

<script setup>
import { useCartStore } from '../../stores/cart.js'

const cart = useCartStore()

const links = [
  { to: '/',        label: 'Inicio'   },
  { to: '/catalog', label: 'Catálogo' },
]
</script>

<style scoped>
.nav-link-active {
  color: rgba(241,240,247,1) !important;
  background: rgba(255,255,255,0.04);
  border-color: rgba(255,255,255,0.10) !important;
}
</style>