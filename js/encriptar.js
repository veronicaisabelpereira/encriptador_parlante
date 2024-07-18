
//---Seleccion de elementos del DOM ----//
const btnEncriptar = document.querySelector(".btn-encriptar");//Boton encriptar
const btnDesencriptar = document.querySelector(".btn-desencriptar");//Boton desencriptar
const btnCopiar = document.querySelector(".btn-copiar");//Boton copiar
const txEncriptar = document.querySelector(".encriptar");//Texto ingresado por el usuario
const aviso = document.querySelector(".texto-aviso");//Avisos
const tarjeta = document.querySelector(".tarjeta-contenedor");//Contenedor de imagen y 2 parrafos del lado derecho
const resultado = document.querySelector(".evaluar"); //Textarea de resultado
const btnParlante = document.querySelector(".parlante");//Boton de parlante
const tarjetaDos = document.querySelector(".tarjeta");//Contenedor de imagen y 2 parrafos del lado derecho

//

function validar(){
    let texto = txEncriptar.value;
    let txt = texto.normalize("NFD").replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~¡¿¡·,.:;!?()-]/g, " ");
    if(texto == ""){
        aviso.style.background = "#0A3871";
        aviso.style.color="#fff";
        aviso.style.fontWeight="800";
        aviso.textContent = "El campo de texto no puede estar vacío";
        setTimeout(() => {
            aviso.removeAttribute("style")
        }, 1500)
    }
    else if(texto !== txt){
        aviso.style.background = "#0A3871";
        aviso.style.color="#fff";
        aviso.style.fontWeight="800";
        aviso.textContent = "No debe tener acentos o caracteres especiales";
        setTimeout(() => {
            aviso.removeAttribute("style")
        }, 1500)

    }
    else if(texto !== texto.toLowerCase()){
        aviso.style.background = "#0A3871";
        aviso.style.color="#fff";
        aviso.style.fontWeight="800";
        aviso.textContent = "El texto debe estar en minúsculas";
        setTimeout(() => {
            aviso.removeAttribute("style")
        }, 1500)
} else {return true}
}
 //

function mostrarTextoProcesado(text) {
    resultado.innerHTML = text;
    btnCopiar.style.visibility = "inherit";
    btnParlante.style.visibility = "inherit";
    tarjeta.remove()
}
//
function encriptar() {
    let texto = txEncriptar.value;
 
texto = texto.replace(/e/mg, "enter");
texto = texto.replace(/i/mg, "imes");
texto = texto.replace(/a/mg, "ai");
texto = texto.replace(/o/mg, "ober");
texto = texto.replace(/u/mg, "ufat");

   mostrarTextoProcesado(texto)
}
function desencriptar() {
    let texto = txEncriptar.value;

texto = texto.replace(/enter/mg, "e");
texto = texto.replace(/imes/mg, "i");
texto = texto.replace(/ai/mg, "a");
texto = texto.replace(/ober/mg, "o");
texto = texto.replace(/ufat/mg, "u");

   mostrarTextoProcesado(texto)
}

function copiar() {
    let texto = resultado.textContent;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(texto)
            .then(() => {
                alert("Texto copiado al portapapeles");
            })
            .catch((err) => {
                console.error("Error al copiar el texto: ", err);
            });
    } else {
        console.error("La API de portapapeles no es compatible con este navegador.");
    }
}


//Escucha de eventos de los botones
btnEncriptar.addEventListener("click", e=>{
    e.preventDefault();
if (validar()){
    encriptar()
    tarjetaDos.style.background = "#E5E5E5";
}
  
  });
  btnDesencriptar.addEventListener("click", e=>{
      e.preventDefault();
      if (validar()){
        desencriptar()
        tarjetaDos.style.background = "#E5E5E5";
    }

  });
  btnCopiar.addEventListener("click", e=>{
      e.preventDefault();
      copiar();
      tarjetaDos.style.background = "#E5E5E5";
  });

//Vacia el campo de resultado cuando el usuario borra el campo de texto
  txEncriptar.addEventListener('input', function() {
    if (txEncriptar.value === '') {
        mostrarTextoProcesado("")
    }
});



btnParlante.addEventListener("click", e => {
    e.preventDefault();
    console.log("funciona")
    const voz = resultado.value
    tarjetaDos.style.background = "#0a38718a";
    responsiveVoice.speak(voz, "Spanish Female", {pitch: 0.2, rate: 0.8});
})

