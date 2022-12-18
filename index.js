import {Vistas} from "./Vistas.js";

var abrir = true;

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



      /*menu hamburguesa*/
      document.getElementById("circulo").addEventListener("click",() => {
            abrirMenu()
      })
      document.getElementsByClassName("vistas")[4].addEventListener("click", () => {
            vista.lanzarPeticion("categorias","men's clothing");
      });
      document.getElementsByClassName("vistas")[5].addEventListener("click", () => {
            vista.lanzarPeticion("categorias","women's clothing");
      });
      document.getElementsByClassName("vistas")[6].addEventListener("click", () => {
            vista.lanzarPeticion("categorias","jewelery");
      });
      document.getElementsByClassName("vistas")[7].addEventListener("click", () => {
            vista.lanzarPeticion("categorias","electronics");
      });
      document.getElementById("carrito-hamburguesa").addEventListener("click", () => {
            vista.vistaCarrito();
      });
      document.getElementById("inicio-sesion-hamburguesa").addEventListener("click", () => {
            vista.vistaLogin();
      });
}

function abrirMenu(){
      if(abrir){
            let lienas = document.getElementsByClassName("linea");
            let secciones = document.getElementById("enlace-secciones-hamburguesa");
            let opciones = document.getElementsByClassName("opciones-usuario-hamburguesa")[0];
            
            for (let i=0; i<3; i++){
                  lienas[0].className = "linea_abierta";
            }
            secciones.style.display = "flex";
            opciones.style.display = "flex";
            abrir = false;

      }else{
            let lienas = document.getElementsByClassName("linea_abierta");
            let secciones = document.getElementById("enlace-secciones-hamburguesa");
            let opciones = document.getElementsByClassName("opciones-usuario-hamburguesa")[0];
            
            for (let i=0; i<3; i++){
                  lienas[0].className = "linea";
            }
            secciones.style.display = "none";
            opciones.style.display = "none";
            abrir = true;
      }

}