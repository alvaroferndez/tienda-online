window.addEventListener('load', () => {
      iniciar()
})

function iniciar(){
      ejecutarCarrusel();
}

function ejecutarCarrusel(){
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
