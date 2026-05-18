<template>
  <div class="relative z-10 pt-28 pb-24">
    <div class="max-w-7xl mx-auto px-8">

      <!-- HEADER -->
      <div class="mb-10">
        <h1
          class="font-black text-white mb-2"
          style="font-family: 'Syne', sans-serif; font-size: 40px; letter-spacing: -1px;"
        >
          Catálogo
        </h1>
        <p class="text-sm" style="color: rgba(241,240,247,0.45);">
          {{ filtered.length }} productos encontrados
        </p>
      </div>

      <div class="flex gap-8">

        <!-- SIDEBAR -->
        <aside
          class="glass rounded-2xl p-7 h-fit shrink-0 hidden md:block"
          style="width: 260px; position: sticky; top: 90px;"
        >
          <div class="font-bold text-white mb-6" style="font-family: 'Syne', sans-serif; font-size: 18px;">
            Filtros
          </div>

          <!-- Category filter -->
          <div class="mb-7">
            <div class="text-xs font-bold uppercase tracking-widest mb-3" style="color: rgba(241,240,247,0.30);">
              Categoría
            </div>
            <div
              v-for="cat in allCategories"
              :key="cat"
              class="flex items-center gap-3 py-2 cursor-pointer text-sm transition-colors duration-150"
              :style="selectedCategory === cat ? 'color: #a78bfa;' : 'color: rgba(241,240,247,0.55);'"
              @click="toggleCategory(cat)"
            >
              <div
                class="w-4 h-4 rounded flex items-center justify-center text-xs shrink-0 transition-all duration-150"
                :style="selectedCategory === cat
                  ? 'background: linear-gradient(135deg,#7c3aed,#06b6d4); border: none;'
                  : 'border: 1.5px solid rgba(255,255,255,0.15);'"
              >
                <span v-if="selectedCategory === cat" class="text-white font-bold">✓</span>
              </div>
              {{ cat }}
            </div>
          </div>

          <!-- Price filter -->
          <div class="mb-7">
            <div class="text-xs font-bold uppercase tracking-widest mb-3" style="color: rgba(241,240,247,0.30);">
              Precio máximo
            </div>
            <input
              v-model="maxPrice"
              type="range" min="50" max="1200" step="50"
              class="w-full cursor-pointer"
              style="accent-color: #7c3aed;"
            >
            <div class="flex justify-between text-xs mt-2" style="color: rgba(241,240,247,0.45);">
              <span>$0</span>
              <span class="font-semibold text-white">${{ maxPrice }}</span>
            </div>
          </div>

          <!-- Badge filter -->
          <div>
            <div class="text-xs font-bold uppercase tracking-widest mb-3" style="color: rgba(241,240,247,0.30);">
              Tipo
            </div>
            <div
              v-for="b in badges"
              :key="b.value"
              class="flex items-center gap-3 py-2 cursor-pointer text-sm transition-colors duration-150"
              :style="selectedBadge === b.value ? 'color: #a78bfa;' : 'color: rgba(241,240,247,0.55);'"
              @click="toggleBadge(b.value)"
            >
              <div
                class="w-4 h-4 rounded flex items-center justify-center text-xs shrink-0 transition-all duration-150"
                :style="selectedBadge === b.value
                  ? 'background: linear-gradient(135deg,#7c3aed,#06b6d4); border: none;'
                  : 'border: 1.5px solid rgba(255,255,255,0.15);'"
              >
                <span v-if="selectedBadge === b.value" class="text-white font-bold">✓</span>
              </div>
              {{ b.label }}
            </div>
          </div>

          <!-- Clear filters -->
          <button
            v-if="hasActiveFilters"
            class="mt-6 w-full py-2 rounded-xl text-sm font-semibold transition-all duration-150"
            style="background: rgba(124,58,237,0.15); border: 1px solid rgba(124,58,237,0.3); color: #a78bfa; cursor: pointer;"
            @click="clearFilters"
          >
            Limpiar filtros
          </button>
        </aside>

        <!-- MAIN -->
        <div class="flex-1 min-w-0">

          <!-- TOP BAR -->
          <div class="flex items-center gap-4 mb-7 flex-wrap">
            <!-- Search -->
            <div
              class="flex items-center gap-3 flex-1 px-5 py-2.5 rounded-full"
              style="min-width: 200px; max-width: 380px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.10);"
            >
              <span style="color: rgba(241,240,247,0.30);">🔍</span>
              <input
                v-model="search"
                type="text"
                placeholder="Buscar productos..."
                class="bg-transparent border-none outline-none text-sm flex-1 text-white placeholder-shown:text-opacity-30"
                style="font-family: 'DM Sans', sans-serif; color: white;"
              >
            </div>

            <!-- Sort -->
            <select
              v-model="sort"
              class="px-5 py-2.5 rounded-full text-sm outline-none cursor-pointer"
              style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.10); color: white; font-family: 'DM Sans', sans-serif;"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="rating">Mejor valorados</option>
            </select>
          </div>

          <!-- ACTIVE FILTER CHIPS -->
          <div v-if="hasActiveFilters" class="flex gap-2 flex-wrap mb-6">
            <span
              v-if="selectedCategory"
              class="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer"
              style="background: rgba(124,58,237,0.2); border: 1px solid rgba(124,58,237,0.4); color: #a78bfa;"
              @click="selectedCategory = ''"
            >
              {{ selectedCategory }} ✕
            </span>
            <span
              v-if="selectedBadge"
              class="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer"
              style="background: rgba(6,182,212,0.15); border: 1px solid rgba(6,182,212,0.35); color: #67e8f9;"
              @click="selectedBadge = ''"
            >
              {{ badges.find(b => b.value === selectedBadge)?.label }} ✕
            </span>
            <span
              v-if="maxPrice < 1200"
              class="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer"
              style="background: rgba(245,158,11,0.15); border: 1px solid rgba(245,158,11,0.35); color: #fcd34d;"
              @click="maxPrice = 1200"
            >
              Máx ${{ maxPrice }} ✕
            </span>
          </div>

          <!-- GRID -->
          <div
            v-if="filtered.length > 0"
            class="grid gap-5"
            style="grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));"
          >
            <ProductCard
              v-for="product in filtered"
              :key="product.id"
              :product="product"
            />
          </div>

          <!-- EMPTY STATE -->
          <div
            v-else
            class="glass rounded-2xl flex flex-col items-center justify-center py-24 text-center"
          >
            <div class="text-6xl mb-6 opacity-30">🔍</div>
            <div class="font-bold text-white text-xl mb-2" style="font-family: 'Syne', sans-serif;">
              Sin resultados
            </div>
            <div class="text-sm mb-6" style="color: rgba(241,240,247,0.45);">
              Prueba con otros filtros o términos de búsqueda
            </div>
            <button
              class="px-6 py-2.5 rounded-full text-sm font-semibold text-white"
              style="background: linear-gradient(135deg, #7c3aed, #06b6d4); border: none; cursor: pointer;"
              @click="clearFilters"
            >
              Limpiar filtros
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products } from '../data/products.js'
import ProductCard from '../components/ui/ProductCard.vue'

const route  = useRoute()
const router = useRouter()

const search          = ref('')
const sort            = ref('featured')
const selectedCategory = ref('')
const selectedBadge   = ref('')
const maxPrice        = ref(1200)

const allCategories = [...new Set(products.map(p => p.category))]

const badges = [
  { value: 'new',  label: 'Nuevos'   },
  { value: 'hot',  label: 'Populares' },
  { value: 'sale', label: 'Ofertas'  },
]

// Leer query params al montar — permite llegar desde HomeView con ?category=X
onMounted(() => {
  if (route.query.category) {
    selectedCategory.value = route.query.category
  }
})

// Sincronizar selectedCategory con la URL sin recargar la página
watch(selectedCategory, val => {
  router.replace({ query: val ? { category: val } : {} })
})

const hasActiveFilters = computed(() =>
  !!selectedCategory.value || !!selectedBadge.value || maxPrice.value < 1200
)

const filtered = computed(() => {
  let list = products.filter(p => {
    const matchSearch   = !search.value || p.name.toLowerCase().includes(search.value.toLowerCase()) || p.category.toLowerCase().includes(search.value.toLowerCase())
    const matchCategory = !selectedCategory.value || p.category === selectedCategory.value
    const matchBadge    = !selectedBadge.value    || p.badge    === selectedBadge.value
    const matchPrice    = p.price <= maxPrice.value
    return matchSearch && matchCategory && matchBadge && matchPrice
  })

  if (sort.value === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price)
  if (sort.value === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
  if (sort.value === 'rating')     list = [...list].sort((a, b) => b.rating - a.rating)

  return list
})

function toggleCategory(cat) {
  selectedCategory.value = selectedCategory.value === cat ? '' : cat
}

function toggleBadge(val) {
  selectedBadge.value = selectedBadge.value === val ? '' : val
}

function clearFilters() {
  search.value          = ''
  selectedCategory.value = ''
  selectedBadge.value   = ''
  maxPrice.value        = 1200
  sort.value            = 'featured'
}
</script>