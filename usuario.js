class Usuario{

      constructor(nombre_usuario = null, contraseña = null, nombre = null, apellidos = null, correo = null, telefono = null, carrito = null) {
            this.nombre_usuario = nombre_usuario;
            this.contraseña = contraseña;
            this.nombre = nombre;
            this.apellidos = apellidos;
            this.correo = correo;
            this.telefono = telefono;
            this.carrito = carrito
      }
}
export{Usuario}