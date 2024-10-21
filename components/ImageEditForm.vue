<template>
    <div class="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 relative">
        <div v-if="loading" class="loading-overlay">
            <LoadingSpinner />
        </div>
        <div :class="{ blurred: loading }" class="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
            <div class="mb-6 w-3/3 flex justify-center">
                <ImageDisplay :urlMessage="imgUrl" class="rounded-lg shadow-lg w-full max-w-xl" />
            </div>

            <div class="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
                <form @submit.prevent="EditImg" class="flex flex-col items-center space-y-6">
                    <h3 class="text-2xl font-bold text-gray-800 mb-4">What do you want to change?</h3>

                    <div class="w-full">
                        <label class="block mb-2 text-sm font-medium text-gray-700">Upload Image</label>
                        <input type="file" @change="imgFile" accept="image/png"
                            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-green-50 file:text-green-500 hover:file:bg-green-100" />
                    </div>

                    <div class="w-full">
                        <label class="block mb-2 text-sm font-medium text-gray-700">Upload Mask</label>
                        <input type="file" @change="maskFile" accept="image/png"
                            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-green-50 file:text-green-500 hover:file:bg-green-100" />
                    </div>

                    <UInput type="text" size="sm" v-model="edit_msg" placeholder="Enter your edit message here..."
                        variant="outline"
                        class="w-full p-3 border border-gray-300 rounded-md focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition duration-200 ease-in-out text-lg" />

                    <UButton type="submit"
                        class="w-full flex justify-center bg-green-500 text-white px-5 py-3 rounded-lg font-semibold text-lg hover:bg-green-600 focus:ring-4 focus:ring-green-400 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105">
                        Edit Image
                    </UButton>
                </form>
            </div>
        </div>
    </div>
</template>


<script lang="js" setup>
let loading = ref(false)
let imgfile = ref(null)
let maskfile = ref(null)
const edit_msg = ref('')
const imgUrl = ref('')

const imgFile = (event) => {
    imgfile.value = event.target.files[0]
}

const maskFile = (event) => {
    maskfile.value = event.target.files[0]
}


const EditImg = async () => {
    const formData = new FormData()
    formData.append('image', imgfile.value)
    formData.append('prompt', edit_msg.value)
    if (maskfile.value) formData.append('mask', maskfile.value)

    try {
        loading.value = true
        const response = await $fetch('api/edit_image', {
            method: 'POST',
            body: formData
        }
        )
        // console.log(response)
        imgUrl.value = response.data[0].url
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
        edit_msg.value = ''
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
