<template>
  <main class="container">
    <h1>Client Portal</h1>
    <p>Bine ai venit! Autentifică-te pentru a-ți vedea proiectele.</p>
    <nav>
      <NuxtLink to="/projects">Proiectele mele</NuxtLink>
      <span> · </span>
      <NuxtLink to="/login">Autentificare</NuxtLink>
    </nav>
  </main>
</template>

<style>
.container { max-width: 760px; margin: 40px auto; padding: 0 16px; }
nav a { font-weight: 600; }
</style>

