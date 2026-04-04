<template>
  <div
    class="glass glass-hover rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 relative"
    style="border-radius: 16px;"
    @click="router.push({ name: 'product', params: { id: product.id } })"
  >
    <div
      class="relative flex items-center justify-center text-7xl border-b"
      style="height: 200px; background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.10);"
    >
      <div
        class="absolute inset-0"
        style="background: radial-gradient(ellipse at center, rgba(124,58,237,0.10) 0%, transparent 70%);"
      />
      <span v-if="product.badge" :class="badgeClass" class="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
        {{ badgeLabel }}
      </span>
      <button
        class="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-200"
        style="background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.10);"
        @click.stop="toggleWish"
      >
        {{ wished ? '♥' : '♡' }}
      </button>
      {{ product.emoji }}
    </div>

    <div class="p-5">
      <div class="text-xs font-bold uppercase tracking-widest mb-1" style="color: rgba(241,240,247,0.30);">
        {{ product.category }}
      </div>
      <div class="font-black text-lg mb-2 text-white" style="font-family: 'Syne', sans-serif; letter-spacing: -0.3px;">
        {{ product.name }}
      </div>
      <div class="text-sm mb-4 line-clamp-2" style="color: rgba(241,240,247,0.55); line-height: 1.5;">
        {{ product.desc }}
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-baseline gap-2">
          <span class="font-black text-xl text-white" style="font-family: 'Syne', sans-serif;">
            ${{ product.price }}
          </span>
          <span v-if="product.oldPrice" class="text-sm line-through" style="color: rgba(241,240,247,0.30);">
            ${{ product.oldPrice }}
          </span>
        </div>
        <button
          class="w-10 h-10 rounded-full flex items-center justify-center text-white text-xl font-light transition-all duration-200 hover:scale-110"
          style="background: linear-gradient(135deg, #7c3aed, #06b6d4); border: none; cursor: pointer;"
          @click.stop="addToCart"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../../stores/cart.js'
import { useToastStore } from '../../stores/toast.js'

const props = defineProps({
  product: { type: Object, required: true },
})

const router = useRouter()
const cart = useCartStore()
const toast = useToastStore()
const wished = ref(false)

const badgeLabel = computed(() => {
  if (props.product.badge === 'new')  return 'Nuevo'
  if (props.product.badge === 'sale') return 'Oferta'
  if (props.product.badge === 'hot')  return '🔥 Popular'
  return ''
})

const badgeClass = computed(() => ({
  'badge-new':  props.product.badge === 'new',
  'badge-sale': props.product.badge === 'sale',
  'badge-hot':  props.product.badge === 'hot',
}))

function toggleWish() {
  wished.value = !wished.value
  toast.show(wished.value ? `♥ Guardado en favoritos` : `♡ Eliminado de favoritos`)
}

function addToCart() {
  cart.addItem(props.product)
  toast.show(`${props.product.emoji} ${props.product.name} agregado al carrito`)
}
</script>

<style scoped>
.badge-new  { background: rgba(124,58,237,0.3);  color: #a78bfa; border: 1px solid rgba(124,58,237,0.4); }
.badge-sale { background: rgba(239,68,68,0.25);  color: #fca5a5; border: 1px solid rgba(239,68,68,0.35); }
.badge-hot  { background: rgba(249,115,22,0.25); color: #fdba74; border: 1px solid rgba(249,115,22,0.35); }

div[class*="glass"]:hover {
  box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.2);
  transform: translateY(-4px);
}
</style>