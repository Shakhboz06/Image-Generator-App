 export default defineEventHandler(async event => {
    
    const config = useRuntimeConfig()
    const formData = await readMultipartFormData(event)
  
    const image = formData?.find(file => file.name === 'image')
    const mask = formData?.find(file => file.name === 'mask')
    const prompt = formData?.find(item => item.name === 'prompt')?.data?.toString()
  
    if (!image?.data || !prompt) {
      throw new Error("data is missing")
    }
  
    const apiFormData = new FormData()
    
    apiFormData.append('image', new Blob([image.data]), image?.filename || 'image.png')
    apiFormData.append('prompt', prompt)

    if (mask?.data) {
        apiFormData.append('mask', new Blob([mask.data]), mask?.filename || 'mask.png')
    }
    try{
        const response = await $fetch('https://api.openai.com/v1/images/edits', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${config.API_KEY}`
          },
          body: apiFormData
        })

        return response
    }catch(err){
        console.error(err)
    }
  
  })
  