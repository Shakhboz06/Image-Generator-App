<template>
    <div>
        <slot />
    </div>
</template>


<script lang="ts" setup>
useHead({
    title: 'Image Generator',
    link: [
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Inter&display=swap',
            crossorigin: ''
        }
    ]
})
</script>

<style>
body {
    font-family: 'Inter';
    /* background-color: #000; */
}
</style>