<template>
    <div class="bg-gray-100 font-bold flex flex-col items-center pt-5">
        <NuxtLink to="/" class="text-xl font-bold"> <- Return</NuxtLink>
        <ImageEditorForm />
    </div>
</template>

<script setup>
import ImageEditorForm from '@/components/ImageEditForm.vue'

</script>