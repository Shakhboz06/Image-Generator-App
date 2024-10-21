export default defineEventHandler(async event => {

    const config = useRuntimeConfig()
    const formData = await readMultipartFormData(event)
    const image = formData?.find(file => file.name === 'image')

    if (!image?.data) {
        throw new Error("data is missing")
    }
    const apiData = new FormData()
    apiData.append('image', new Blob([image.data]), image?.filename || 'image.png')


    const response = await $fetch('https://api.openai.com/v1/images/variations', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${config.API_KEY}`
        },
        body: apiData

    })

    return response
})