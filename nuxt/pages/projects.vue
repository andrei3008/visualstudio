<script setup lang="ts">
const { data, pending, error } = await useFetch('/api/projects')
</script>

<template>
  <main class="container">
    <h1>Proiectele mele</h1>
    <div v-if="pending">Se încarcă...</div>
    <div v-else-if="error">Eroare: {{ error?.message }}</div>
    <ul v-else>
      <li v-for="p in data" :key="p.id">
        <strong>{{ p.name }}</strong> — {{ p.status }}
      </li>
    </ul>
  </main>
</template>

<style>
.container { max-width: 760px; margin: 40px auto; padding: 0 16px; }
li { margin: 6px 0; }
</style>

