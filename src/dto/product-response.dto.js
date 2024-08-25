export const productDto = (product) => {
    return {
        title: product.title,
        description: product.description,
        thumbnail: product.thumbnail,
        product_code: product.code,
        stock: product.stock,
        price: product.price,
        category: product.category,
        owner: product.owner
    }
}

/*
"response": {
        "_id": "66aecce85cec2a989bf083e8",
        "title": "Tatata matata",
        "description": "Cinturon de cuero modificado",
        "price": 9000,
        "thumbnail": [
            "www.images.com"
        ],
        "code": "NP99654",
        "stock": 10,
        "status": true,
        "category": "Indumentaria",
        "__v": 0
*/