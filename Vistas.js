import {Carro} from "./Carritio.js";
import {Producto} from "./Producto.js";
import {Usuario} from "./usuario.js";
import {ColeccionUsuarios} from "./ColeccionUsuarios.js";

class Vistas{

      constructor() {
            this.main = $("main");
            this.vista = undefined;
            this.http = new XMLHttpRequest();
            this.productos = undefined;
            this.tipo = undefined;
            if(localStorage.carrito){
                  let lista_carrito = JSON.parse(localStorage.carrito);
                  this.convertirProducto(lista_carrito);
            }else{
                  let carro = []
                  this.carrito = new Carro(carro);
                  this.carrito.actualizarLocalStorage();
            }
            if(localStorage.usuarios){
                  let lista_usuarios = JSON.parse(localStorage.usuarios);
                  this.convertirUsuarios(lista_usuarios);
            }else{
                  let collecion_usuarios = []
                  this.collecion_usuarios = new ColeccionUsuarios(collecion_usuarios);
                  this.collecion_usuarios.actualizarLocalStorage();
            }
      }


      //cambio de vistas
      vistaPrincipal(){
            this.main.html("");
            this.crearVistaPrincipal();
            this.main.append(this.vista);
            this.ejecutarCarrusel();
      }

      vistaHombre(){
            this.tipo = "hombre";
            this.crearVista();
      }

      vistaMujer(){
            this.tipo = "mujer";
            this.crearVista();
      }

      vistaJoyas(){
            this.tipo = "joyas";
            this.crearVista();
      }

      vistaElectronica(){
            this.tipo = "electronica";
            this.crearVista();
      }

      vistaCarrito(){
            this.main.html("");
            this.crearVistaCarrito();
            this.main.append(this.vista);
            this.restarCantidad();
            this.sumarCantidad();
            this.eliminarProducto();
            this.borrarCarrito();
      }

      vistaLogin(){
            this.main.html("");
            this.crearVistaLogin();
            this.main.append(this.vista);
            if($(".cambiar-registrarse")){
                  this.cambiarRegistrarse()
            }
            this.iniciarUsuario();
      }

      vistaCargando(){
            this.main.html("");
            this.vista = `<div class="contenedor-gift"><img class="gift" src= "https://acegif.com/wp-content/uploads/loading-13.gif"></div>`;
            this.main.append(this.vista);
      }


      //eventos
      clickProducto(){
            $(".producto").find(".ver").click((e) => {
                  let id = e.currentTarget.previousElementSibling.value;
                  this.lanzarPeticion("id",id);
            })
            $(".producto").find(".imagen-producto").click((e) => {
                  let id = e.currentTarget.parentElement.nextElementSibling.lastElementChild.previousElementSibling.value;
                  this.lanzarPeticion("id",id);
            })
      }

      hoverProducto(){
            $(".producto").mouseover(function (e){
                  $(".producto").css("opacity","0.5");
                  e.currentTarget.style.opacity = 1;
            })
            $(".producto").mouseout(function (e){
                  $(".producto").css("opacity","1");
            })
      }

      añadirAlCarrito(producto){
            $(".comprar").click((e) => {
                  let talla = e.currentTarget.previousElementSibling.lastElementChild.lastElementChild.lastElementChild.value;
                  let cantidad = e.currentTarget.previousElementSibling.lastElementChild.firstElementChild.lastElementChild.value;
                  let producto_copia = new Producto(producto.id,producto.nombre,producto.imagen,producto.categoria,producto.descripcion,producto.precio,producto.votos,producto.rating)
                  producto_copia.talla = talla;
                  producto_copia.cantidad = parseFloat(cantidad);
                  this.carrito.añadirProducto(producto_copia);
            })
      }

      convertirProducto(lista_producto){
            let carro = [];
            this.carrito = new Carro(carro);
            for(let element of lista_producto){
                  let producto = new Producto(element.id,element.nombre,element.imagen,element.categoria,element.descripcion,element.precio,element.votos,element.rating,element.cantidad,element.talla);
                  this.carrito.carrito.push(producto);
            }
      }

      convertirUsuarios(lista_usuarios){
            let collecion_usuarios = [];
            this.collecion_usuarios = new ColeccionUsuarios(collecion_usuarios);
            for(let element of lista_usuarios){
                  let usuario = new Usuario(element.nombre_usuario,element.contraseña,element.nombre,element.apellidos,element.correo,element.telefono);
                  this.collecion_usuarios.usuarios.push(usuario);
            }
      }

      restarCantidad(){
            $(".cantidad-producto-carrito-menos").click((e) => {
                  this.carrito.añadirProducto(this.crearProductoIdTalla(e),"-");
                  this.vistaCarrito();
            })
      }

      sumarCantidad(){
            $(".cantidad-producto-carrito-mas").click((e) => {
                  this.carrito.añadirProducto(this.crearProductoIdTalla(e),"+");
                  this.vistaCarrito();
            })
      }

      eliminarProducto(){
            $(".imagen-eliminar").click((e) => {
                  let id = e.currentTarget.parentElement.parentElement.previousElementSibling.previousElementSibling.value;
                  let talla = e.currentTarget.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.value;
                  let producto = new Producto(id);
                  producto.talla = talla;
                  this.carrito.eliminarProducto(producto);
                  this.vistaCarrito();
            })
      }

      borrarCarrito(){
            $(".borrar-carrito").click((e) => {
                  this.carrito.borrarCarrito()
                  this.vistaCarrito();
            })
      }

      crearProductoIdTalla(e){
            let id = e.currentTarget.parentElement.previousElementSibling.previousElementSibling.value;
            let talla = e.currentTarget.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.value;
            let producto = new Producto(id);
            producto.talla = talla;
            return producto
      }

      accionarProductos(){
            this.main.html("");
            this.crearVista()
            this.main.append(this.vista);
            this.clickProducto();
            this.hoverProducto();
      }

      ordenarAscendente(){
            $(".ascendente").click(() => {
                  this.productos.sort().reverse();
                  this.accionarProductos();
                  this.ordenarDescendente();
            })
      }

      ordenarDescendente(){
            $(".descendente").click(() => {
                  this.productos.sort().reverse();
                  this.accionarProductos();
                  this.ordenarAscendente();
            })
      }

      registrarUsuario(){
            $("#registrarse").click((e) => {
                  e.preventDefault()
                  datos_usuario = buscarDatosUsuario();
                  let usuario = new Usuario(datos_usuario[0],datos_usuario[1],datos_usuario[2],datos_usuario[3],datos_usuario[4],datos_usuario[5]);
                  this.collecion_usuarios.añadirUsuario(usuario);
            })
      }

      buscarDatosUsuario(){
            let resultado = [];
            resultado.push($(".usuario").value,$(".contraseña").value,$(".nombre").value,$(".apellidos").value$(".correo").value,$(".telefono").value);
            return resultado;
      }

      iniciarUsuario(){
            $(".sesion-subc")
      }

      //carrusel
      ejecutarCarrusel(){
            const lista_img = [
                  "https://www.instyle.es/medio/2019/03/22/zara-portada_55b4b3ae_1200x630.jpg",
                  "https://media.revistavanityfair.es/photos/60e8369d46da3cf1bc9f9bf7/master/w_1600%2Cc_limit/208556.jpg",
                  "https://images.ecestaticos.com/hkJCvxY4z_UQEaN2U4Zw4CUjjk0=/0x0:2131x1598/1200x899/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fd69%2Ff44%2Fa64%2Fd69f44a64fde34ce0649915abe0b0326.jpg",
                  "https://s.yimg.com/ny/api/res/1.2/b9PUgBC92ASvKCO2s1RDcw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTMyMQ--/https://media.zenfs.com/es/esquire_spain_51/246d71b92c6b41bf858bad9484fd2827",
            ]
            let img = document.getElementById("imagen-carrusel");
            let actual = 0;
      
            playIntervalo();
      
            function pasarFoto() {
                  if(actual >= lista_img.length - 1) {
                  actual = 0;
                  } else {
                  actual++;
                  }
                  renderizarImagen();
            }
      
            function renderizarImagen () {
                  img.src = lista_img[actual]
            }
      
            function playIntervalo() {
                  setInterval(pasarFoto, 2000);
            }
      }


      //creacion de vistas
      crearVistaPrincipal(){
            this.vista = $(`
            <section class='vistas principal'>

                  <!-- banner -->
                  <section class='secciones banner'>

                        <!-- publicidad -->
                        <aside class='publicidad hover'>
                              <img src='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/223-gbl-hbcamp-pr-3000x2000-3-1666272102.jpg?crop=1xw:1xh;center,top&resize=980:*' alt='publicidad fila'>
                        </aside>
                        
                        <!-- eslogan -->
                        <h1 class='eslogan'>La sencillez es belleza</h1>

                        
                        <!-- publicidad -->
                        <aside class='publicidad hover'>
                              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFxHfKMZ190jPYD2nxUemMrje282BUJMvEyg&usqp=CAU' alt='publicidad'>
                        </aside>
                  </section>

                  <!-- carrusel -->
                  <section class='secciones carrusel'>
                        <img id='imagen-carrusel' src='https://www.instyle.es/medio/2019/03/22/zara-portada_55b4b3ae_1200x630.jpg' alt='imagen carrusel'>
                  </section>

                  <!-- sigenos -->
                  <section class='secciones siguenos'>

                        <!-- galeria de imagenes -->
                        <img class='imagenes-siguenos' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3esAlqowW_163F0QHtcc2g86xlUD2ffg0WA&usqp=CAU' alt='imagenes-siguenos'>
                        <img class='imagenes-siguenos' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0w0MMc3DQGRrvc-05oa0vQ8X6EhEtjax5Ww&usqp=CAU' alt='imagenes-siguenos'>
                        <img class='imagenes-siguenos' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCDgKv-kYJ66r__LMKHfVOtSDlfM9fVRkb8w&usqp=CAU' alt='imagenes-siguenos'>
                        
                        <!-- contenido siguenos -->
                        <div class='informacion-siguenos'>
                              <h1 class='titulo-siguenos'>Síguenos</h1>
                              <p class='contenido-siguenos'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit atque facilis exercitationem laboriosam? Odit et mollitia eum, accusantium necessitatibus fuga velit doloremque voluptate repellendus odio? Eos amet quam natus? Neque.</p>
                              <div class='opciones-pago-footer'>
                                    <a href='https://twitter.com/' target='_blank'><i class='fa-brands fa-twitter hover'></i></a>
                                    <a href='https://youtube.com/' target='_blank'><i class='fa-brands fa-youtube hover'></i></a>
                                    <a href='https://facebook.com/' target='_blank'><i class='fa-brands fa-facebook hover'></i></a>
                                    <a href='https://www.instagram.com/' target='_blank'><i class='fa-brands fa-instagram hover'></i></a>
                              </div>
                        </div>
                  </section>

                  <!-- subcripccion -->
                  <section class='secciones subcripcion'>
                        <div class='contenedor-subcripcion'>
                              <h1 id='titulo-subcripcion'>Hazte socio de nuestra marca</h1>
                              <p id='contenido-subcripcion'>Ve a la ultima tendencia con nuestras novedades</p>
                              <input type='email' name='correo-subcripcion' id='correo-subcripcion'>
                              <button class='subcribirse'>Subcribirse</button>
                        </div>
                  </section>
            </section>
            `)
      }

      crearVista(){
            this.vista = `
            <!-- contenendor -->
            <div class="contenedor-categorias">
                  <section class='vistas categoria'>
                        <!-- cabecera -->
                        <section class='cabecera'>
                              <!-- titulo -->
                              <h1 class="titulo-seccion">${this.tipo}</h1>
                              <!-- elegir orden -->
                              <span class="ordenar ascendente">Ascendente</span>
                              <span class="ordenar descendente">Descendente</span>
                        </section>
                        <!-- productos -->
                        <section class='productos'>`;
            
            // creamos la vista segun los productos que nos trae la api
            for (let producto of this.productos){
                  this.vista += `
                  <!-- producto -->
                  <section class='producto'>
                        <div class="contenedor-imagen-producto">
                              <img class="imagen-producto" src="${producto.image}" alt="">
                        </div>
                        <div class="contenedor-contenido-producto">
                              <p class="nombre-producto">${producto.title}</p>
                              <p class="precio-producto">${producto.price}</p>
                              <input type='hidden' class='id-producto' value="${producto.id}">
                              <!-- boton comprar -->
                              <button class="ver">Ver</button>
                        </div>
                  </section>
                  `
            }
            this.vista += `
                        </section>
                  </section>
            </div>`;
      }

      crearVistaProducto(producto){
            this.vista = `
            <div class="contenedor-producto">
                  <section class="producto-unico">
                        <h1 class="nombre-producto-unico titulo">${producto.nombre}</h1>
                        <div class="contenendor-imagen-producto-unico">
                              <img class="imagen-producto-unico" src="${producto.imagen}">
                        </div>
                        <h3 class="categoria-producto-unico">${producto.categoria}</h3>
                        <p class="descripcion-producto-unico">${producto.descripcion}</p>
                        <p class="precio-producto-unico">${producto.precio}</p>
                        <div class="rating-producto-unico">${producto.votos}${producto.rating}</div>
                        <div class="caracteristicas-producto-unico">
                              <div class="contenendor-cantidad-producto-unico">
                                    <span>Cantidad: </span>
                                    <select class="cantidad-producto-unico" name="cantidad">
                                          <option value="1">1</option>
                                          <option value="2">2</option>
                                          <option value="3">3</option>
                                          <option value="4">4</option>
                                          <option value="5">5</option>
                                    </select>
                              </div>
                              <div class="contenendor-talla-producto-unico">
                                    <span>Talla: </span>
                                    <select class="talla-producto-unico" name="talla">
                                          <option value="xs">XS</option>
                                          <option value="s">S</option>
                                          <option value="m">M</option>
                                          <option value="l">L</option>
                                          <option value="xl">XL</option>
                                    </select>
                              </div>
                        </div>
                  </section>
                  <button class="comprar">Enviar al carrito</button>
            </div>
      `
      }

      crearVistaCarrito(){
            if(this.carrito.carrito.length != 0){
                  this.vista = `
                  <section class="contenedor-carrito">
                        <div class="carrito-titulo">
                              <h1>Su Carrito</h1>
                        </div>
                        <div class="carrito-contenido">
                  <section class="contenedor-productos-carrito">
                  `
      
                  for(let element of this.carrito.carrito){
                        this.vista += 
                        `
                        <div class="producto-carrito">
                              <input type="hidden" class="id-producto-carrito" value="${element.talla}">
                              <input type="hidden" class="id-producto-carrito" value="${element.id}">
                              <div class="contenedor-imagen-producto-carrito">
                                    <img class="imagen-producto-carrito" src="${element.imagen}" alt="${element.nombre}">
                              </div>
                              <div class="contenedor-informacion-producto-carrito">
                                    <h1 class="nombre-producto-carrito titulo">${element.nombre} (${element.talla})</h1>
                                    <div class="contenedor-imagen-eliminar hover">
                                          <img class="imagen-eliminar" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Red_X.svg/1024px-Red_X.svg.png" alt="eliminar producto">
                                    </div>
                                    <span class="cantidad-producto-carrito-menos">-</span><span class="cantidad-producto-carrito-numero">${element.cantidad}</span><span class="cantidad-producto-carrito-mas">+</span>
                                    <span class="precio-producto-carrito">${element.precio} €</span>
                              </div>
                        </div>
                        `
                  }
      
                  this.vista +=
                  `
                        </section>
                        <section class="contenedor-informacion-carrito">
                              <div class="precio-carrito">
                                    <div class="suma-carrito">
                                          <section class="subtotal-carrito-contenedor">
                                                <span class="subtotal">Subtotal</span>
                                                <span class="euro">${this.carrito.subtotal}€</span>
                                          </section>
                                          <section class="gastos-carrito-contenedor">
                                                <span class="gastos">Gastos</span>
                                                <span class="euro">${this.carrito.gastos_envio}€</span>
                                          </section>
                                    </div>
                                    <div class="total-carrito-contenedor">
                                          <span class="total">Total</span>
                                          <span class="euro">${this.carrito.total}€</span>
                                    </div>
                              </div>
                              <div class="opciones-carrito">
                                    <button class="finalizar-compra">Finalizar Pedido</button>
                                    <button class="borrar-carrito">Borrar carrito</button>
                              </div>
                        </section>
                  `
            }else{
                  this.vista = `<h1>Tu carrito está vacío</h1>`
            }
            
      }

      crearVistaLogin(){
            this.vista=
            `
            <section class="contenedor-login">
                  <section class="iniciar">
                        <h1 class="titulo-inicio titulo">Inicio de sesión</h1>
                        <form action="">
                              <input type="text" class="usuario" placeholder="escriba su usuario">
                              <input type="password" class="contraseña" placeholder="escriba su contraseña">
                              <input type="submit" class="subcribirse" id="iniciar-sesion">
                        </form>
                  </section>
                  <section class="registrarse">
                        <div class="cambiar-registrarse">
                              <h1 class="cambiar hover" >Registrarse</h1>
                        </div>
                  </section>
            </section>
            `
      }
      
      cambiarRegistrarse(){
            $(".cambiar-registrarse").click(() => {
                  this.main.html("");
                  this.vista=`
                  <section class="contenedor-login">
                        <section class="iniciar">
                              <div class="cambiar-iniciar">
                                    <h1 class="cambiar hover">Iniciar sesión</h1>
                              </div>
                        </section>
                        <section class="registrarse">
                              <h1 class="titulo-inicio titulo">Registrarse</h1>
                              <form action="">
                                    <input type="text" class="usuario" placeholder="escriba su usuario">
                                    <input type="text" class="nombre" placeholder="escriba su nombre">
                                    <input type="text" class="apellidos" placeholder="escriba sus apellidos">
                                    <input type="tel" class="telefono" placeholder="escriba su telefono">
                                    <input type="email" class="correo" placeholder="escriba su correo">
                                    <input type="password" class="contraseña" placeholder="escriba su contraseña">
                                    <input type="password" class="repetir-contraseña" placeholder="repita su contraseña">
                                    <input type="submit" class="subcribirse" id="registrarse">
                              </form>
                        </section>
                  </section>
                  `
                  this.main.append(this.vista);
                  this.cambiarIniciar();
                  this.registrarUsuario();
            })
      }

      cambiarIniciar(){
            $(".cambiar-iniciar").click(() => {
                  this.vistaLogin();
            })
      }
      //peticiones
      lanzarPeticion(tipo_peticion,url){
            let peticion = "";
            if(tipo_peticion == "categorias"){
                  peticion="https://fakestoreapi.com/products/category/" + url;
            }else if(tipo_peticion == "id"){
                  peticion="https://fakestoreapi.com/products/" + url;
            }
            this.http.open("GET",peticion,true);
            this.http.onreadystatechange = () =>{
                  if(tipo_peticion == "categorias"){
                        this.trataRespuestaCategoria(url);
                  }else if(tipo_peticion == "id"){
                        this.trataRespuestaId(url);
                  }
            }
            this.http.send();
            this.vistaCargando();
      }

      trataRespuestaCategoria(url){
            if (this.http.status == 200 && this.http.readyState == 4) {
                  let datos = JSON.parse(this.http.responseText);
                  this.productos = datos;

                  //limpiamos el html
                  this.main.html("");

                  //vemos a que vista tenemos que cambiar
                  if(url == "men's clothing"){
                        this.vistaHombre();
                  }else if(url == "women's clothing"){
                        this.vistaMujer();
                  }else if(url == "jewelery"){
                        this.vistaJoyas();
                  }else if(url == "electronics"){
                        this.vistaElectronica();
                  }

                  //añadimos la vista al html y añadimos el evento del click al boton de ver
                  this.main.append(this.vista);
                  this.clickProducto();
                  this.hoverProducto();
                  this.ordenarDescendente();
            }else if(this.http.status != 200 && this.http.readyState == 4){
                  console.log("no mi negro");
            }
      }

      trataRespuestaId(){
            if (this.http.status == 200 && this.http.readyState == 4) {
                  let datos = JSON.parse(this.http.responseText);

                  //creamos un producto con todo lo que trae la api
                  let producto = new Producto(datos.id,datos.title,datos.image,datos.category,datos.description,datos.price,datos.rating.count,datos.rating.rate);
                  
                  //limpiamos el html
                  this.main.html("");

                  //creamos la vista con el prodcuto
                  this.crearVistaProducto(producto);
                  
                  //añadimos la vista al html y añadimos el evento del click al boton de ver
                  this.main.append(this.vista);
                  this.añadirAlCarrito(producto);
            }else if(this.http.status != 200 && this.http.readyState == 4){
                  console.log("no mi negro");
            }else if(this.http.readyState != 4){
                  this.vistaCargando();
            }
      }    
}
export {Vistas}
