<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 relative">
        <div v-if="loading" class="loading-overlay">
            <LoadingSpinner/>
        </div>
        <div :class="{ blurred: loading }" class="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
            <h1 class="text-3xl font-bold text-gray-800 mb-4">Generate Your Custom Image</h1>
            <p class="text-gray-600 mb-8 text-center max-w-lg">Enter a creative prompt, and we’ll generate an amazing image
                based on your input! Try to be specific for better results.</p>

            <div class="flex flex-col items-center w-3/4">
                <ImageDisplay v-if="imageUrl" :resMessage="imageUrl" class="rounded-lg shadow-xl mb-4 max-w-full" />
                <div v-else class="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg mb-4">
                    <span class="text-gray-500">No image generated yet...</span>
                </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <form @submit.prevent="CreateImg" class="flex flex-col items-center w-full">

                    <UInput type="text" size="sm" v-model="message" placeholder="Enter your prompt..."
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition duration-200 ease-in-out mb-4 text-lg text-gray-700" />

                    <p class="text-sm text-gray-500 mb-6">Example: “A futuristic cityscape at sunset with flying cars.”</p>
                    <UButton type="submit"
                        class="w-full flex justify-center bg-green-500 text-white px-5 py-3 rounded-lg font-semibold text-lg hover:bg-green-600 focus:ring-4 focus:ring-green-400 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105">
                        Generate Image
                    </UButton>
                </form>
            </div>
        </div>
    </div>
</template>





<script lang="js" setup>
const imageUrl = ref('')
const message = ref('')

let loading = ref(false)

const CreateImg = async () => {
    try {
        loading.value = true
        const response = await $fetch('api/img_generator', {
            method: 'POST',
            body: { prompt: message.value },
        }
        )
        imageUrl.value = response.data[0].url
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
        message.value = ''
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
