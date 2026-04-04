<template>
  <Transition name="toast">
    <div
      v-if="toast.visible"
      class="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-medium text-white"
      style="background: rgba(13,13,26,0.95); border: 1px solid rgba(124,58,237,0.4); backdrop-filter: blur(20px);"
    >
      <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
           style="background: linear-gradient(135deg, #7c3aed, #06b6d4)">
        ✓
      </div>
      {{ toast.message }}
    </div>
  </Transition>
</template>

<script setup>
import { useToastStore } from '../../stores/toast.js'
const toast = useToastStore()
</script>

<style scoped>
.toast-enter-active, .toast-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateY(24px);
}
</style>