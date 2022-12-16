class Carro{

      constructor(carrito, subtotal = null, gastos_envio = null, total = null){
            this.carrito = carrito;
            if(subtotal == null){
                  this.subtotal = 0;
                  this.gastos_envio = 4.99;
                  this.total = 0;
            }else{
                  this.subtotal = subtotal;
                  this.gastos_envio = gastos_envio;
                  this.total = total;
            }

      }

      añadirProducto(producto,modificar = null){
            if(!this.recorerCarrito(producto,modificar)){
                  this.carrito.push(producto);
            }
            this.comprobarCantidad();
            this.calcularTotal();
      }

      recorerCarrito(producto,modificar){
            for (let element of this.carrito){
                  if(element.id == producto.id && element.talla == producto.talla){
                        if(modificar == null){
                              element.cantidad += producto.cantidad;
                        }else if(modificar == "-"){
                              element.cantidad--
                        }
                        else if(modificar == "+"){
                              element.cantidad++
                        }
                        return true;
                  }
            }
      }

      comprobarCantidad(){
            let lista_mutable = this.carrito;
            for (let element of this.carrito){
                  if(element.cantidad <= 0){
                        lista_mutable.splice(this.carrito.indexOf(element),1);
                  }
            }
            this.carrito = lista_mutable;
      }

      eliminarProducto(producto){
            let lista_mutable = this.carrito;
            for (let element of this.carrito){
                  if(element.id == producto.id && element.talla == producto.talla){
                        lista_mutable.splice(this.carrito.indexOf(element),1);
                  }
            }
            this.carrito = lista_mutable;
            this.calcularTotal();
      }

      calcularTotal(){
            this.subtotal = 0;
            this.total = 0;
            for (let element of this.carrito){
                  this.subtotal += element.precio * element.cantidad
            }
            this.total = this.subtotal + this.gastos_envio;
            this.subtotal = this.subtotal.toFixed(2);
            this.total = this.total.toFixed(2);

      }

      borrarCarrito(){
            this.carrito = [];
            this.subtotal = 0;
            this.total = 0;
      }


}

export {Carro}