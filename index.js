import {Vistas} from "./Vistas.js";

window.addEventListener('load', () => {
      var vista = new Vistas();
      iniciar(vista);
})

function iniciar(vista){
      vista.vistaPrincipal();
      document.getElementsByClassName("logo")[0].addEventListener("click", () => {
            vista.vistaPrincipal();
      });
      document.getElementsByClassName("vistas")[0].addEventListener("click", () => {
            vista.lanzarPeticion("categorias","men's clothing");
      });
      document.getElementsByClassName("vistas")[1].addEventListener("click", () => {
            vista.lanzarPeticion("categorias","women's clothing");
      });
      document.getElementsByClassName("vistas")[2].addEventListener("click", () => {
            vista.lanzarPeticion("categorias","jewelery");
      });
      document.getElementsByClassName("vistas")[3].addEventListener("click", () => {
            vista.lanzarPeticion("categorias","electronics");
      });
      document.getElementById("carrito").addEventListener("click", () => {
            vista.vistaCarrito();
      });
      document.getElementById("inicio-sesion").addEventListener("click", () => {
            vista.vistaLogin();
      });
}
