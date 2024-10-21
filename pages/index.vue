<template>
  <div class="h-screen">
    <NFlex justify="center" align="center">
      <h1 class="header-title text-2xl m-5">Welcome to my Image Generator, Editor & Variant Creator</h1>
    </NFlex>
    <header class="custom-header">
  
      <NFlex justify="between" align="center" class="header-container">
        <NFlex gap="3" justify="center" align="center" class="nav-links">
          <NuxtLink to="/generate" class="nav-item">Generate Image</NuxtLink>
          <NuxtLink to="/edit" class="nav-item">Edit Image</NuxtLink>
          <NuxtLink to="/variation" class="nav-item">Generate Variation</NuxtLink>
        </NFlex>
      </NFlex>
    </header>
    <div class="images flex justify-center mt-5 gap-4">
      <img src="../public/images/1.webp" alt="" class="w-2/3 h-96 rounded-md">
    </div>
  </div>
</template>


<style scoped>
.custom-header {
  background-color: #333535;
  padding: 10px 20px;
  border-radius: 30px;
  max-width: 70%;
  margin: 10px auto;
  display: flex;
  justify-content: center;
}

.header-title {
  border-width: 700;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}


.nav-links {
  display: flex;
  gap: 20px;
}

.nav-item {
  color: white;
  text-decoration: none;
  /* font-weight: bold; */
  padding: 10px 15px;
  transition: color 0.3s ease;
  font-size: 20px;
}

.nav-item:hover {
  color: gold;
  /* color: #007bff; */
}

.cta-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 20px;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #0056b3;
}
</style>