<template>
  <button class="btn"><slot /></button>
</template>

<style scoped>
.btn {
  padding: 0.5rem 1rem;
  background: #4f46e5;
  color: white;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
</style>