const baseUrl = 'http://localhost:3030';


export const createProduct = async (productData) => {
    try {
        const response = await fetch(`${baseUrl}/create-new-product`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(productData)
        })
        const result = await response.json();
        if (response.ok) {
            return result;
        }else{
            let errorMessage = result.error.split(": ").pop()
            throw new Error({ message: errorMessage})
        }

    } catch (error) {
        throw new Error({ message: error.message })
    }

}