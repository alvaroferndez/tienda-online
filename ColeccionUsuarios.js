import { Usuario } from "./usuario.js"
class ColeccionUsuarios{

      constructor(usuarios){
            this.usuarios = usuarios
      }

      añadirUsuario(usuario){
            this.usuarios.push(usuario);
            this.actualizarLocalStorage()
            return true
      }

      actualizarLocalStorage(){
            localStorage.usuarios = JSON.stringify(this.usuarios)
      }
}
export{ColeccionUsuarios}