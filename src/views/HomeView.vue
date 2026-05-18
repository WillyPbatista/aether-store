<template>
  <div class="relative z-10">

    <section class="min-h-screen flex flex-col justify-center px-8 pt-28 pb-20 max-w-6xl mx-auto">
      <div
        class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 w-fit"
        style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.10); color: #67e8f9;"
      >
        <span class="w-2 h-2 rounded-full animate-pulse" style="background: #06b6d4; box-shadow: 0 0 8px #06b6d4;" />
        Nueva Colección 2025
      </div>

      <h1 class="font-black leading-none tracking-tight mb-6" style="font-family: 'Syne', sans-serif; font-size: clamp(48px, 7vw, 88px); letter-spacing: -2px;">
        <span class="block text-white">El Futuro del</span>
        <span class="block gradient-text">Estilo Digital</span>
      </h1>

      <p class="text-lg mb-12 max-w-lg" style="color: rgba(241,240,247,0.55); line-height: 1.7;">
        Productos diseñados para quienes exigen lo extraordinario. Tecnología, moda y arte en un solo lugar.
      </p>

      <div class="flex gap-4 flex-wrap mb-12">
        <RouterLink to="/catalog">
          <button
            class="px-9 py-4 rounded-full text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
            style="background: linear-gradient(135deg, #7c3aed, #5b21b6); border: none; cursor: pointer; box-shadow: 0 0 40px rgba(124,58,237,0.35);"
          >
            Explorar Colección
          </button>
        </RouterLink>
        <RouterLink to="/catalog">
          <button
            class="glass px-9 py-4 rounded-full text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
            style="cursor: pointer;"
          >
            Ver Ofertas
          </button>
        </RouterLink>
      </div>

      <div class="flex gap-3 flex-wrap">
        <span v-for="tag in tags" :key="tag" class="glass px-4 py-2 rounded-full text-sm" style="color: rgba(241,240,247,0.55);">
          {{ tag }}
        </span>
      </div>
    </section>

    <div class="mx-8 mb-16 max-w-4xl" style="border: 1px solid rgba(255,255,255,0.10); border-radius: 16px; overflow: hidden;">
      <div class="grid grid-cols-2 md:grid-cols-4" style="background: rgba(255,255,255,0.10); gap: 1px;">
        <div
          v-for="stat in stats" :key="stat.label"
          class="flex flex-col items-center justify-center py-7 px-6 text-center"
          style="background: rgba(7,7,15,0.9);"
        >
          <div class="font-black gradient-text mb-1" style="font-family: 'Syne', sans-serif; font-size: 36px;">
            {{ stat.value }}
          </div>
          <div class="text-xs" style="color: rgba(241,240,247,0.55);">{{ stat.label }}</div>
        </div>
      </div>
    </div>

    <section class="px-8 pb-16 max-w-6xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h2 class="font-bold text-white" style="font-family: 'Syne', sans-serif; font-size: 28px; letter-spacing: -0.5px;">
          Categorías
        </h2>
        <RouterLink to="/catalog" class="text-sm font-semibold no-underline" style="color: #a78bfa;">
          Ver todo →
        </RouterLink>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-16">
        <RouterLink
          v-for="cat in categories"
          :key="cat.name"
          :to="{ name: 'catalog', query: { category: cat.name } }"
          class="glass glass-hover rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 no-underline hover:-translate-y-1"
        >
          <div class="text-4xl mb-3">{{ cat.emoji }}</div>
          <div class="font-bold text-white text-sm mb-1" style="font-family: 'Syne', sans-serif;">{{ cat.name }}</div>
          <div class="text-xs" style="color: rgba(241,240,247,0.40);">{{ cat.count }} productos</div>
        </RouterLink>
      </div>
    </section>

    <section class="px-8 pb-24 max-w-6xl mx-auto">
      <div class="flex items-center justify-between mb-8">
        <h2 class="font-bold text-white" style="font-family: 'Syne', sans-serif; font-size: 28px; letter-spacing: -0.5px;">
          Destacados
        </h2>
        <RouterLink to="/catalog" class="text-sm font-semibold no-underline" style="color: #a78bfa;">
          Ver catálogo →
        </RouterLink>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <ProductCard v-for="product in featured" :key="product.id" :product="product" />
      </div>
    </section>

    <footer class="text-center py-12 text-xs" style="border-top: 1px solid rgba(255,255,255,0.10); color: rgba(241,240,247,0.30);">
      <div class="gradient-text font-black text-xl mb-2" style="font-family: 'Syne', sans-serif;">ÆTHER Store</div>
      © 2025 ÆTHER Store Store — Todos los derechos reservados
    </footer>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { products, categories } from '../data/products.js'
import ProductCard from '../components/ui/ProductCard.vue'

const featured = computed(() =>
  products.filter(p => p.badge === 'hot' || p.badge === 'new').slice(0, 4)
)

const tags = ['✦ Envío gratis +$50', '⟳ 30 días devolución', '🔒 Pago seguro', '★ 4.9/5 rating']

const stats = [
  { value: '2.4K+', label: 'Productos'       },
  { value: '98K',   label: 'Clientes felices' },
  { value: '4.9★',  label: 'Calificación'    },
  { value: '24/7',  label: 'Soporte'          },
]
</script>