const fs = require('fs');
const path = "./data/productos.json" // ruta del archivo

class ProductManager {
    // creo un atributo privado que se inicializa como un array vacio en el constructor
    #products;

    // metodo constructor 
    constructor() {
        // al crear un objeto ProductManager leo el archivo productos.json
        // en caso que le archivo no exista asigna un array vacío al atributo
        // productos
        try {
            this.#products = JSON.parse(fs.readFileSync(path, "utf-8"));
        } catch (error) {
            this.#products = []
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        // creo un nuevo producto
        const newProduct = {
            id: this.#products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }

        // valido que todos los atributos de newProduct no sean undefined
        if (Object.values(newProduct).includes(undefined)) {
            console.log("Todos los atributos son obligatorios");
            return;
        }

        // valido que no se repita el atributo code
        if (this.#products.find(prod => prod.code === code)) {
            console.log(`El producto ${title} con el código ${code} ya existe`);
            return;
        }
        // si todo está OK ingreso el producto el array products
        this.#products.push(newProduct);
        await fs.promises.writeFile(path, JSON.stringify(this.#products));
    }

    async getProducts() {
        // utilizo try-catch para  considerar la excepcion que sucederia
        // al intentar leer el archivo productos.json y este no exista
        try {
            const productsJson = await fs.promises.readFile(path, "utf8");
            this.#products = JSON.parse(productsJson) || []; // si el .json no tiene productos me asingna un arra vacio
        } catch (error) {
            // en caso que suceda la excepción me devuelve un array vacío
            console.log("No hay productos existentes");
            this.#products = [];
        }
        return this.#products;
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
            return;
        }
        return product;
    }

    async updateProduct(id, product) {
        // utilizo el metodo getProductById para verificar que el producto
        // que se desea modificar existe
        const productToUpdate = await this.getProductById(id);
        // obtengo el indice correspondiente al producto que quiero utilizar
        // productToUpdate
        const index = this.#products.findIndex(prod => prod.id === productToUpdate.id);
        // obtenido el indice lo utilizamos para acceder al elemento y modificarlo
        this.#products[index] = {
            ...productToUpdate, // creo una copia del producto a actualizar
            ...product // sobreescribo las propiedades con las de product
        }
        // sobre-escribo el archivo
        await fs.promises.writeFile(path, JSON.stringify(this.#products));
    }

    async deleteProduct(id){
        // obtengo el producto a borrar
        const productToDelete = await this.getProductById(id);
        // filtro todos los productos cuyos ids sean distinto a productToDelete.id
        this.#products = this.#products.filter(prod => prod.id != productToDelete.id);
        // sobre-escribo el archivo
        await fs.promises.writeFile(path, JSON.stringify(this.#products));
    }

}

// ************ Pruebas ************
// instancio un objeto a partir de la clase ProductManager
const productManager = new ProductManager();

// Agrego 4 productos
// productManager.addProduct("Remera", "Remera manga larga", 30000, "www.images.com", "NP1",15);
// productManager.addProduct("Pantalon", "Pantalon Jean", 15000, "www.images.com", "NP2",7);
// productManager.addProduct("Campera", "Campera de lana", 25000, "www.images.com", "NP3",4);
// productManager.addProduct("Cinturón", "Cinturón de cuero", 5000, "www.images.com", "NP4",10);

// obtengo los productos 
// productManager.getProducts().then(prods => console.log(prods));

// realizo la búsqueda según el id 1
// productManager.getProductById(1).then(val => console.log(val));

// intento agregar un producto con un codigo ya existente
// productManager.addProduct("Gorra", "Gorra clásica",6000, "www.images.com", "NP2",4);

// pruebo agregar un producto con únicamente 2 atributos
//productManager.addProduct("Gorra", "Gorra clásica");

// actualizar el producto
// productManager.updateProduct(4, {
//     description: "Cinturon de cuerina",
//     price: 9000
// });

// elimino el producto con id = 3
productManager.deleteProduct(3);



