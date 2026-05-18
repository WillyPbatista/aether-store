<template>
  <div class="relative z-10 pt-28 pb-24 max-w-5xl mx-auto px-8">

    <h1 class="font-black text-white mb-10" style="font-family:'Syne',sans-serif;font-size:36px;letter-spacing:-1px;">
      Tu Carrito
    </h1>

    <!-- EMPTY -->
    <div v-if="cart.items.length === 0" class="glass rounded-2xl flex flex-col items-center py-24 text-center">
      <div class="text-7xl mb-6 opacity-30">🛍️</div>
      <div class="font-bold text-white text-2xl mb-2" style="font-family:'Syne',sans-serif;">Tu carrito está vacío</div>
      <div class="text-sm mb-8" style="color:rgba(241,240,247,0.45);">Agrega productos para comenzar</div>
      <RouterLink to="/catalog">
        <button class="px-8 py-3 rounded-full text-sm font-semibold text-white"
          style="background:linear-gradient(135deg,#7c3aed,#06b6d4);border:none;cursor:pointer;">
          Ir al catálogo
        </button>
      </RouterLink>
    </div>

    <!-- CART LAYOUT -->
    <div v-else class="flex gap-6 items-start" style="flex-wrap:wrap;">

      <!-- ITEMS -->
      <div class="flex flex-col gap-4" style="flex:1;min-width:300px;">
        <div
          v-for="item in cart.items" :key="item.id"
          class="glass rounded-2xl flex items-center gap-5 p-5 transition-all duration-200 hover:bg-white/[0.06]"
        >
          <!-- Emoji -->
          <div
            class="w-18 h-18 rounded-xl flex items-center justify-center text-4xl shrink-0"
            style="width:72px;height:72px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.10);"
          >
            {{ item.emoji }}
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <div class="font-bold text-white mb-0.5 truncate" style="font-family:'Syne',sans-serif;font-size:16px;">
              {{ item.name }}
            </div>
            <div class="text-xs mb-3" style="color:rgba(241,240,247,0.45);">{{ item.category }}</div>

            <!-- Qty controls -->
            <div class="flex items-center gap-3">
              <div class="flex items-center overflow-hidden rounded-full" style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.10);">
                <button
                  class="w-8 h-8 text-lg font-light text-white hover:bg-white/10 transition-colors"
                  style="background:none;border:none;cursor:pointer;"
                  @click="cart.updateQty(item.id, -1)"
                >−</button>
                <span class="w-8 text-center text-sm font-bold text-white">{{ item.qty }}</span>
                <button
                  class="w-8 h-8 text-lg font-light text-white hover:bg-white/10 transition-colors"
                  style="background:none;border:none;cursor:pointer;"
                  @click="cart.updateQty(item.id, 1)"
                >+</button>
              </div>
              <button
                class="text-lg transition-colors duration-150 hover:text-red-400"
                style="background:none;border:none;cursor:pointer;color:rgba(241,240,247,0.30);"
                @click="cart.removeItem(item.id)"
              >🗑</button>
            </div>
          </div>

          <!-- Price -->
          <div class="font-black text-white shrink-0" style="font-family:'Syne',sans-serif;font-size:20px;">
            ${{ (item.price * item.qty).toLocaleString() }}
          </div>
        </div>
      </div>

      <!-- SUMMARY -->
      <div class="glass rounded-2xl p-7 shrink-0" style="width:340px;position:sticky;top:90px;">
        <div class="font-bold text-white mb-6" style="font-family:'Syne',sans-serif;font-size:20px;">Resumen</div>

        <!-- Promo -->
        <div class="flex gap-2 mb-6">
          <input
            v-model="promoCode"
            type="text"
            placeholder="Código promocional"
            class="flex-1 px-4 py-3 rounded-xl text-sm outline-none text-white"
            style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.10);font-family:'DM Sans',sans-serif;"
            @keyup.enter="applyPromo"
          >
          <button
            class="px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150"
            style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.10);color:rgba(241,240,247,0.55);cursor:pointer;"
            @click="applyPromo"
          >
            Aplicar
          </button>
        </div>

        <!-- Rows -->
        <div class="flex flex-col gap-0">
          <div
            v-for="row in summaryRows" :key="row.label"
            class="flex justify-between items-center py-3 text-sm"
            style="border-bottom:1px solid rgba(255,255,255,0.07);"
          >
            <span style="color:rgba(241,240,247,0.55);">{{ row.label }}</span>
            <span class="font-semibold text-white">{{ row.value }}</span>
          </div>
        </div>

        <!-- Total -->
        <div class="flex justify-between items-center pt-5 pb-6">
          <span class="font-bold text-white text-lg" style="font-family:'Syne',sans-serif;">Total</span>
          <span class="font-black gradient-text" style="font-family:'Syne',sans-serif;font-size:28px;">
            ${{ total.toFixed(2) }}
          </span>
        </div>

        <button
          class="w-full py-4 rounded-xl text-base font-bold text-white mb-3 transition-all duration-200 hover:-translate-y-0.5"
          style="background:linear-gradient(135deg,#7c3aed,#06b6d4);border:none;cursor:pointer;box-shadow:0 0 40px rgba(124,58,237,0.35);"
          @click="checkout"
        >
          Proceder al pago
        </button>

        <div class="flex items-center justify-center gap-2 text-xs" style="color:rgba(241,240,247,0.30);">
          🔒 Pago 100% seguro · SSL · PCI DSS
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cart.js'
import { useToastStore } from '../stores/toast.js'

const cart  = useCartStore()
const toast = useToastStore()

const promoCode    = ref('')
const promoApplied = ref(false)

const discount  = computed(() => promoApplied.value ? cart.subtotal * 0.10 : 0)
const shipping  = computed(() => cart.subtotal > 50 ? 0 : 9.99)
const tax       = computed(() => cart.subtotal * 0.16)
const total     = computed(() => cart.subtotal - discount.value + shipping.value + tax.value)

const summaryRows = computed(() => [
  { label: 'Subtotal',        value: `$${cart.subtotal.toFixed(2)}`  },
  { label: 'Descuento',       value: promoApplied.value ? `-$${discount.value.toFixed(2)}` : '—' },
  { label: 'Envío',           value: shipping.value === 0 ? 'Gratis' : `$${shipping.value.toFixed(2)}` },
  { label: 'Impuesto (16%)', value: `$${tax.value.toFixed(2)}`       },
])

function applyPromo() {
  if (!promoCode.value) return
  promoApplied.value = true
  toast.show('✓ Código aplicado: 10% OFF')
  promoCode.value = ''
}

function checkout() {
  toast.show('🎉 Redirigiendo a pago seguro...')
}
</script>