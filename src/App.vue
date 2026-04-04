<template>
  <div class="min-h-screen" style="background: #07070f">
    <div class="ambient" />
    <Navbar />
    <main>
      <RouterView />
    </main>
    <Toast />
  </div>
</template>

<script setup>
import Navbar from './components/layout/Navbar.vue'
import Toast from './components/ui/Toast.vue'
</script>

<style>
.ambient {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background:
    radial-gradient(ellipse 60% 50% at 20% 20%, rgba(124,58,237,0.18) 0%, transparent 60%),
    radial-gradient(ellipse 50% 40% at 80% 80%, rgba(6,182,212,0.12) 0%, transparent 60%);
}

.glass {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.10);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.glass-hover:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.18);
}

.gradient-text {
  background: linear-gradient(135deg, #a78bfa, #67e8f9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>