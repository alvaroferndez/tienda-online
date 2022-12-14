import {Producto} from "./Producto.js";
class Carro{

      constructor(carrito){
            this.carrito = carrito;
      }

      añadirProducto(producto){
            let metido = false;
        
            if(this.carrito.length != 0){
                  for (let element of this.carrito){
                        if(element.id == producto.id && element.talla == producto.talla){
                              element.cantidad += producto.cantidad;
                              metido = true;
                        }
                  }
            }
            if(!metido){
                  this.carrito.push(producto);
            }
            console.log(this.carrito)
            this.actualizarLocalStorage()
      }

      actualizarLocalStorage(){
            localStorage.carrito = JSON.stringify(this.carrito);
      }
}

export {Carro}