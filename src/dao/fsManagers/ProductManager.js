//const fs = require('fs');
import fs from "fs";

class ProductManager {
    // creo un atributo privado que se inicializa como un array vacio en el constructor
    #products;
    #path;

    // metodo constructor 
    constructor() {
        this.#path = "./src/dao/fsManagers/data/productos.json";
        this.init();
    }

    // el método init() se ejecuta al instanciarse un objeto ProductManager
    init(){
        try {
            // verifico que exista el archivo en la ruta especificada
            const exists =fs.existsSync(this.#path)
            // si el archivo no existe lo creo con un array vacío
            if (!exists) {
                fs.writeFileSync(this.#path, JSON.stringify([],null,2));
                // leo el archivo recién creado y le asigno su valor a 
                // this.#products
                this.#products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
                console.log("File created");
            }else{ // en caso que el archivo exista, leo su contenido y se lo asigno
                // #products
                console.log("fs connected");
                this.#products = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
            }
        } catch (error) {
            // ocurren cuando no existe el path especificado
            console.log(error.message);
        }
    }

    async addProduct(product) {
        const {title, description, price, thumbnail, code, stock} = product;
        // creo un nuevo producto a partir de los atributos de product
        const newProduct = {
            id: this.#products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            status:true
        }

        // valido que todos los atributos de newProduct no sean undefined
        if (Object.values(newProduct).includes(undefined)) {
            console.log("Todos los atributos son obligatorios");
            return undefined;
        }

        // valido que no se repita el atributo code
        if (this.#products.find(prod => prod.code === code)) {
            console.log(`El producto ${title} con el código ${code} ya existe`);
            return undefined;
        }
        // si todo está OK ingreso el producto el array products
        this.#products.push(newProduct);
        await fs.promises.writeFile(this.#path, JSON.stringify(this.#products));
        return newProduct;
    }

    async getProducts(limit) {
        // utilizo try-catch para  considerar la excepcion que sucederia
        // al intentar leer el archivo productos.json y este no exista
        try {
            const productsJson = await fs.promises.readFile(this.#path, "utf8");
            this.#products = JSON.parse(productsJson) || []; // si el .json no tiene productos me asingna un array vacio
            
            // si el limite es undefined
            if (!limit) {
                return this.#products;
            }
            return this.#products.slice(0,limit);
        
        } catch (error) {
            // en caso que suceda la excepción me devuelve un array vacío
            console.log("No hay productos existentes");
            this.#products = [];
        }
    }

    async getProductById(id) {
        // ejecuto el metodo getProducts el cual almacena los productos
        // en el atributo productos
        await this.getProducts();
        if (this.#products.length === 0) {
            // si no hay productos cargados devuelve un array vacio
            return [];
        }
        //hago la busqueda según el id del producto
        const product = this.#products.find(prod => prod.id === id);
        if (!product) {
            console.log(`El producto con el ID ${id} no pudo ser encontrado`); // si el producto no existe muestro este mensaje
            return undefined;
        }
        return product;
    }

    async updateProduct(id, product) {
        // utilizo el metodo getProductById para verificar que el producto
        // que se desea modificar existe
        const productToUpdate = await this.getProductById(id);
        if (productToUpdate) {
            // obtengo el indice correspondiente al producto que quiero utilizar
            // productToUpdate
            const index = this.#products.findIndex(prod => prod.id === productToUpdate.id);
            // obtenido el indice lo utilizamos para acceder al elemento y modificarlo
            this.#products[index] = {
                ...productToUpdate, // creo una copia del producto a actualizar
                ...product // sobreescribo las propiedades con las de product
            }
            // sobre-escribo el archivo
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#products));
            return productToUpdate;
        }
        return undefined;
    }

    async deleteProduct(id){
        // obtengo el producto a borrar
        const productToDelete = await this.getProductById(id);
        if (productToDelete) {
            // filtro todos los productos cuyos ids sean distinto a productToDelete.id
            this.#products = this.#products.filter(prod => prod.id != productToDelete.id);
            // sobre-escribo el archivo
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#products));
            return productToDelete;
        }
        // el producto no pudo ser encontrado
        return undefined;
        
    }
}

const productManager = new ProductManager();
export default productManager;





