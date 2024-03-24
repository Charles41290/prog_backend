class ProductManager {
    // creo un atributo privado que se inicializa como un array vacio en el constructor
    #products;

    // metodo constructor 
    constructor() {
        // inicializo products como un array vacío
        this.#products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        // creo un nuevo producto
        const newProduct ={
            id : this.#products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }

        // valido que todos los atributos de newProduct no sean undefined
        if(Object.values(newProduct).includes(undefined)) {
            console.log("Todos los atributos son obligatorios");
            return;
        }

        // valido que no se repita el atributo code
        if(this.#products.find(prod => prod.code === code)){
            console.log(`El producto ${title} con el código ${code} ya existe`);
            return;
        }
        // si todo está OK ingreso el producto el array products
        this.#products.push(newProduct);
    }

    // metodo para obtener los productos
    getProducts(){
        // si no hay productos en el array me muestra un mensaje
        if(this.#products.length === 0)
        {
            console.log("No hay productos existentes");
        }
        return this.#products;
    }

    getProductById(id){
        const product = this.#products.find(prod => prod.id === id);
        if (!product) {
            console.log(`El producto con el ${id} no pudo ser encontrado`);
            return;
        }
        return product;
    }
}

// ************ Pruebas ************

// instancio un objeto a partir de la clase ProductManager
const productManager = new ProductManager();
// Agrego 2 productos
productManager.addProduct("Remera", "Remera manga larga", 30000, "www.images.com", "NP1",15);
productManager.addProduct("Pantalon", "Pantalon Jean", 15000, "www.images.com", "NP2",7);
// console.log(productManager.getProducts());

// realizo la búsqueda según el id 1
//console.log(productManager.getProductById(2));

// intento agregar un producto con un codigo ya existente
// productManager.addProduct("Gorra", "Gorra clásica",6000, "www.images.com", "NP2",4);

// pruebo agregar un producto con únicamente 2 atributos
productManager.addProduct("Gorra", "Gorra clásica");