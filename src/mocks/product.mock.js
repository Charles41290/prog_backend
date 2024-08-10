import { fakerES as faker } from '@faker-js/faker';
import { productModel } from '../persistences/mongo/models/product.model.js';

export const generateProductsMocks = (amnt) => { 
    const  products = [];

    for (let i = 0; i < amnt; i++) {
        const product = {
            _id: faker.database.mongodbObjectId(),
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            thumbnail: faker.system.commonFileName('jpg'),
            code: faker.string.hexadecimal({length:6, casing:'lower'}),
            stock: faker.number.int({min:0,max: 100}),
            status: faker.datatype.boolean(),
            category: faker.commerce.department()
        }
        products.push(product);
    }
    productModel.insertMany(products);
    return products;
}

