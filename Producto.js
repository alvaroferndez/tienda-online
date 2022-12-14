class Producto{

      constructor(id = null, nombre = null, imagen = null, categoria = null, descripcion = null, precio = null, votos = null, rating = null, cantidad = null, talla = null) {
            this.id = id;
            this.nombre = nombre;
            this.imagen = imagen;
            this.categoria = categoria;
            this.descripcion = descripcion;
            this.precio = precio;
            this.votos = votos;
            this.rating = rating;
            this.talla = talla;
            this.cantidad = cantidad;
      }
}
export {Producto}