<template>
  <div class="relative z-10 pt-28 pb-24 max-w-6xl mx-auto px-8">

    <!-- BACK -->
    <button
      class="flex items-center gap-2 text-sm mb-10 transition-colors duration-150 hover:text-white"
      style="background: none; border: none; cursor: pointer; color: rgba(241,240,247,0.45);"
      @click="router.back()"
    >
      ← Volver
    </button>

    <!-- NOT FOUND -->
    <div v-if="!product" class="glass rounded-2xl flex flex-col items-center py-24 text-center">
      <div class="text-6xl mb-4 opacity-30">📦</div>
      <div class="font-bold text-white text-xl mb-2" style="font-family:'Syne',sans-serif;">Producto no encontrado</div>
      <RouterLink to="/catalog">
        <button class="mt-4 px-6 py-2.5 rounded-full text-sm font-semibold text-white"
          style="background:linear-gradient(135deg,#7c3aed,#06b6d4);border:none;cursor:pointer;">
          Ir al catálogo
        </button>
      </RouterLink>
    </div>

    <!-- DETAIL -->
    <div v-else class="grid gap-16" style="grid-template-columns: 1fr 1fr; align-items: start;">

      <!-- LEFT — Image -->
      <div>
        <div
          class="glass rounded-3xl flex items-center justify-center relative overflow-hidden mb-4"
          style="height: 420px; font-size: 140px;"
        >
          <div class="absolute inset-0" style="background: radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%);" />
          {{ product.emoji }}
        </div>

        <!-- Thumbnails -->
        <div class="flex gap-3 justify-center">
          <div
            v-for="(thumb, i) in thumbnails"
            :key="i"
            class="w-16 h-16 rounded-xl flex items-center justify-center text-2xl cursor-pointer transition-all duration-150"
            :style="activeThumb === i
              ? 'background:rgba(124,58,237,0.15);border:1px solid #7c3aed;'
              : 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.10);'"
            @click="activeThumb = i"
          >
            {{ thumb }}
          </div>
        </div>
      </div>

      <!-- RIGHT — Info -->
      <div>
        <div class="text-xs font-bold uppercase tracking-widest mb-3" style="color: #a78bfa;">
          {{ product.category }}
        </div>

        <h1 class="font-black text-white mb-4" style="font-family:'Syne',sans-serif; font-size:40px; line-height:1.1; letter-spacing:-1px;">
          {{ product.name }}
        </h1>

        <!-- Rating -->
        <div class="flex items-center gap-3 mb-6">
          <span style="color:#fbbf24; letter-spacing:2px;">★★★★★</span>
          <span class="text-sm" style="color:rgba(241,240,247,0.55);">{{ product.rating }} (2,847 reseñas)</span>
        </div>

        <!-- Price -->
        <div class="font-black mb-6 gradient-text" style="font-family:'Syne',sans-serif; font-size:48px;">
          ${{ product.price }}
          <span v-if="product.oldPrice" class="text-xl font-normal line-through ml-3" style="-webkit-text-fill-color:rgba(241,240,247,0.30); color:rgba(241,240,247,0.30);">
            ${{ product.oldPrice }}
          </span>
        </div>

        <!-- Specs -->
        <div class="flex gap-2 flex-wrap mb-6">
          <span
            v-for="spec in product.specs" :key="spec"
            class="px-3 py-1.5 rounded-full text-xs"
            style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.10);color:rgba(241,240,247,0.55);"
          >
            {{ spec }}
          </span>
        </div>

        <p class="text-sm mb-8" style="color:rgba(241,240,247,0.55);line-height:1.8;">
          {{ product.desc }}
        </p>

        <!-- Color -->
        <div class="mb-6">
          <div class="text-xs font-bold uppercase tracking-widest mb-3" style="color:rgba(241,240,247,0.30);">Color</div>
          <div class="flex gap-3">
            <button
              v-for="color in colors" :key="color"
              class="w-9 h-9 rounded-full transition-all duration-150"
              :style="`background:${color}; border:none; cursor:pointer;
                ${selectedColor === color
                  ? 'box-shadow:0 0 0 3px #07070f, 0 0 0 5px rgba(255,255,255,0.4); transform:scale(1.1);'
                  : ''}`"
              @click="selectedColor = color"
            />
          </div>
        </div>

        <!-- Size (solo Moda) -->
        <div v-if="product.category === 'Moda'" class="mb-6">
          <div class="text-xs font-bold uppercase tracking-widest mb-3" style="color:rgba(241,240,247,0.30);">Talla</div>
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="size in sizes" :key="size"
              class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150"
              :style="selectedSize === size
                ? 'background:rgba(124,58,237,0.15);border:1px solid #7c3aed;color:#a78bfa;cursor:pointer;'
                : 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.10);color:rgba(241,240,247,0.55);cursor:pointer;'"
              @click="selectedSize = size"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <!-- Quantity -->
        <div class="flex items-center gap-5 mb-8">
          <div class="flex items-center overflow-hidden rounded-xl" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.10);">
            <button
              class="w-11 h-11 text-xl font-light text-white transition-colors duration-150 hover:bg-white/10"
              style="background:none;border:none;cursor:pointer;"
              @click="qty = Math.max(1, qty - 1)"
            >−</button>
            <span class="w-12 text-center font-bold text-white" style="font-family:'Syne',sans-serif;">{{ qty }}</span>
            <button
              class="w-11 h-11 text-xl font-light text-white transition-colors duration-150 hover:bg-white/10"
              style="background:none;border:none;cursor:pointer;"
              @click="qty++"
            >+</button>
          </div>
          <span class="text-sm" style="color:rgba(241,240,247,0.45);">✓ En stock</span>
        </div>

        <!-- Actions -->
        <div class="flex gap-3">
          <button
            class="flex-1 py-4 rounded-xl text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
            style="background:linear-gradient(135deg,#7c3aed,#5b21b6);border:none;cursor:pointer;box-shadow:0 0 30px rgba(124,58,237,0.4);"
            @click="handleAddToCart"
          >
            Agregar al carrito
          </button>
          <button
            class="w-14 rounded-xl text-xl transition-all duration-150"
            style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.10);cursor:pointer;"
            @click="wished = !wished"
          >
            {{ wished ? '♥' : '♡' }}
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { products } from '../data/products.js'
import { useCartStore } from '../stores/cart.js'
import { useToastStore } from '../stores/toast.js'

const route  = useRoute()
const router = useRouter()
const cart   = useCartStore()
const toast  = useToastStore()

const product = computed(() => products.find(p => p.id === Number(route.params.id)))

const qty          = ref(1)
const wished       = ref(false)
const selectedColor = ref('#7c3aed')
const selectedSize  = ref('M')
const activeThumb   = ref(0)

const colors = ['#7c3aed', '#06b6d4', '#f59e0b', '#f1f0f7']
const sizes  = ['XS', 'S', 'M', 'L', 'XL']

const thumbnails = computed(() =>
  product.value ? [product.value.emoji, '🔍', '✨', '📐'] : []
)

function handleAddToCart() {
  if (!product.value) return
  for (let i = 0; i < qty.value; i++) {
    cart.addItem(product.value)
  }
  toast.show(`${product.value.emoji} ${product.value.name} agregado al carrito`)
}
</script>