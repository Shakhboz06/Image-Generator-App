<template>
<div>
    <img :src="urlMessage || resMessage || varUrl || '../images/2.webp'" alt="Image from API" />
</div>
</template>

<script lang="js" setup>
const props = defineProps({
    urlMessage: {
    type: String,
  },
  resMessage:{
    type: String,
  },
  varUrl:{
    type: String,
  }
})</script>