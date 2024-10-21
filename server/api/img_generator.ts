export default defineEventHandler(async event => {
    const config = useRuntimeConfig()
    const reqbody = await readBody(event)


        const response = await $fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${config.API_KEY}`
            },
            body: JSON.stringify({
                model: "dall-e-3",
                prompt: reqbody.prompt,
                n: 1,
                size: "1024x1024"
                
            })
        })


        return response
})