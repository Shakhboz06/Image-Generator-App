<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 relative">
    <div v-if="loading" class="loading-overlay">
      <LoadingSpinner />
    </div>
    <div :class="{ blurred: loading }" class="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <div class="mb-6 w-3/3 max-w-lg">
        <ImageDisplay :varUrl="imgUrl" class="rounded-lg shadow-lg w-full" />
      </div>

      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 class="text-3xl font-bold text-gray-800 mb-4 text-center">Create Your Variant</h1>
        <p class="text-gray-600 mb-6 text-center">Upload your image and create a unique variant of it.</p>
        <form @submit.prevent="CreateVar" class="flex flex-col items-center space-y-6">
          <div class="w-full">
            <label class="block mb-2 text-sm font-medium text-gray-700">Upload Image</label>
            <input type="file" @change="crVar" accept="image/png"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-green-50 file:text-green-500 hover:file:bg-green-100" />
          </div>

          <UButton type="submit"
            class="w-full flex justify-center bg-green-500 text-white px-5 py-3 rounded-lg font-semibold text-lg hover:bg-green-600 focus:ring-4 focus:ring-green-400 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105">
            Submit
          </UButton>
        </form>
      </div>
    </div>
  </div>
</template>


<script lang="js" setup>
let loading = ref(false)
const imgVar = ref(null)
const imgUrl = ref('')

const crVar = (event) => {
  imgVar.value = event.target.files[0]
}
const CreateVar = async () => {
  const formData = new FormData()
  formData.append('image', imgVar.value)

  try {
    loading.value = true
    const response = await $fetch('/api/img_variation', {
      method: 'POST',
      body: formData
    }
    )
    console.log(response)
    imgUrl.value = response.data[0].url
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

</script>


<style scoped>
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 999; 
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
}

.blurred {
    filter: blur(5px);
    pointer-events: none;
    user-select: none; 
    transition: filter 0.3s ease;
}
</style>
