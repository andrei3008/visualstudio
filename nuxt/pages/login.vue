<script setup lang="ts">
const router = useRouter()
const form = reactive({ email: '', password: '' })
function login() {
  // Placeholder: add real auth later
  router.push('/projects')
}
</script>

<template>
  <main class="container">
    <h1>Autentificare</h1>
    <form @submit.prevent="login">
      <label>Email
        <input v-model="form.email" type="email" required>
      </label>
      <label>Parolă
        <input v-model="form.password" type="password" required>
      </label>
      <button type="submit">Intră în cont</button>
    </form>
  </main>
</template>

<style>
.container { max-width: 480px; margin: 40px auto; padding: 0 16px; }
form { display: grid; gap: 12px; }
input { width: 100%; padding: 8px; }
button { padding: 8px 12px; font-weight: 600; }
</style>

