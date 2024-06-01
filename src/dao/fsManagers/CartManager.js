import fs from "fs";
import productManager from "./ProductManager.js";
import { log } from "console";

class CartManager {
    // creo un atributo privado que se inicializa como un array vacio en el constructor
    #carts;
    #path;

    // metodo constructor 
    constructor() {
        this.#path = "./src/dao/fsManagers/data/carts.json";
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
                this.#carts = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
                console.log("File created");
            }else{ // en caso que el archivo exista, leo su contenido y se lo asigno
                // #products
                console.log("fs connected");
                this.#carts = JSON.parse(fs.readFileSync(this.#path, "utf-8"));
            }
        } catch (error) {
            // ocurren cuando no existe el path especificado
            console.log(error.message);
        }
    }

    async addCart() {
        await this.getCarts();
        // creo un nuevo producto
        const newCart = {
            id: this.#carts.length + 1,
            products : []
        }
      
        this.#carts.push(newCart);
        await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts));
        return newCart
    }

    async getCarts() {
        // utilizo try-catch para  considerar la excepcion que sucederia
        // al intentar leer el archivo productos.json y este no exista
        try {
            const productsJson = await fs.promises.readFile(this.#path, "utf8");
            this.#carts = JSON.parse(productsJson) || []; // si el .json no tiene carts me asingna un array vacio
            return this.#carts;
        } catch (error) {
            // en caso que suceda la excepción me devuelve un array vacío
            console.log("No hay carts existentes");
            this.#carts = [];
        }
    }

    async getCartById(id) {
        // ejecuto el metodo getProducts el cual almacena los productos
        // en el atributo productos
        await this.getCarts();
        // si no hay carts cargados devuelve un array vacio
        if (this.#carts.length === 0) {
            return [];
        }
        //hago la busqueda según el id del producto
        const cart = this.#carts.find(c => c.id === id);
        if (!cart) {
            console.log(`El cart con el ID ${id} no pudo ser encontrado`); // si el producto no existe muestro este mensaje
            return undefined;
        }
        return cart;
    }

    async addProductToCart(cid, pid) {
        await productManager.getProducts()
        await this.getCarts()
        const index = this.#carts.findIndex(c => c.id === cid)
        // si no existe el cid
        if(index === -1){
            return {cart:false}
        }
        const product = await productManager.getProductById(pid);
        // si no existe el pid
        if(!product){
            return {prod:false}
        }
        const prodIndex =this.#carts[index].products.findIndex(p => p.productId == pid)
        // si el producto no existe
        if (prodIndex === -1) {
            this.#carts[index].products.push({
                productId : pid,
                quantity: 1
            })
        // si producto ya existe toma la cantidad actual y la aumenta en 1
        }else{
            this.#carts[index].products[prodIndex].quantity += 1;
        }


        await fs.promises.writeFile(this.#path, JSON.stringify(this.#carts));
        return this.#carts[index]
    }
}

const cartManager = new CartManager();

export default cartManager;