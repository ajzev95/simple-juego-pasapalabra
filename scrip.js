//total de preguntas del juego
const TOTAL_PREGUNTAS = 10;

//variable que lleva la cantidad acertada
var cantidadAcertadas = 0;

//variable que controla la pregunta actual
var numPreguntaActual = -1;

//que pregunta se respondio y que no
var estadoPreguntas = [0,0,0,0,0,0,0,0,0,0];

//creamos la base de datos de las preguntas
const bd_juego = [
    {
        id:'A',
        pregunta:"Empresa reconocida que se dedica a los servidores",
        respuesta:"amazon"
    },
    {
        id:'B',
        pregunta:"Término en inglesque hace referencia a una copia de seguridad",
        respuesta:"backup"
    },
    {
        id:'C',
        pregunta:"Nombre de la memoria que almacena temporalmente los datos de la computadora",
        respuesta:"cache"
    },
    {
        id:'D',
        pregunta:"Archivo que controla los periféricos que se conectan a la computadora",
        respuesta:"driver"
    },
    {
        id:'E',
        pregunta:"Mezclar los datos para protegerlos como medida de seguridad, es decir, convertir texto normal a texto cifrado",
        respuesta:"encriptar"
    },
    {
        id:'F',
        pregunta:"Famosa red social cread por Mark Zuckerberg",
        respuesta:"facebook"
    },
    {
        id:'G',
        pregunta:"Lenguaje de programación crado por Google",
        respuesta:"go"
    },
    {
        id:'H',
        pregunta:"lenguaje utilizado para la estructura a las páginas web",
        respuesta:"html"
    },
    {
        id:'I',
        pregunta:"Aspecto que presentan los programas tras su ejecución mediante el cual ejercemos la comunicación con éstos",
        respuesta:"interfaz"
    },
    {
        id:'J',
        pregunta:"Lenguaje de programación con el cual se diseño el sistema operativo Android",
        respuesta:"java"
    },
]


//variabla para controlar el tiempo
const timer = document.getElementById("tiempo");
//tiempo del juego en segundo
const TIEMPO_DEL_JUEGO = 5;
//variable que indica el tiempo del juego restante
let timeLeft = TIEMPO_DEL_JUEGO;
//variable que maneja el contador
var countdown;

//creamos las letras
const container = document.querySelector(".container");
for(let i=1; i<= TOTAL_PREGUNTAS; i++){
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.textContent = String.fromCharCode(i + 96);
    circle.id = String.fromCharCode(i + 96).toUpperCase();
    container.appendChild(circle);

    const angle = ((i-1) / TOTAL_PREGUNTAS) * Math.PI * 2 - (Math.PI / 2);
    const x = Math.round(95 + 120 * Math.cos(angle));
    const y = Math.round(95 + 120 * Math.sin(angle));
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
}

//boton comenzar
var comenzar = document.getElementById("comenzar");
comenzar.addEventListener("click", function(event){
    document.getElementById("pantalla-inicial").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";

    //alargamos el tiempo
    largarTiempo();
    cargarParegunta();
})

function largarTiempo(){
    countdown = setInterval(()=> {
        timeLeft--;
        timer.innerText = timeLeft;

        if(timeLeft<0){
            clearInterval(countdown);
            //alert("se acabo el tiempo");
            mostrarPantallaFinal();
        }
    },1000);
}

function cargarParegunta(){
    numPreguntaActual++;
    if(numPreguntaActual >= TOTAL_PREGUNTAS){
        numPreguntaActual = 0;
    }
    
    if(estadoPreguntas.indexOf(0)>=0){
        while(estadoPreguntas[numPreguntaActual]==1){
            numPreguntaActual++;
            if(numPreguntaActual>=TOTAL_PREGUNTAS){
                numPreguntaActual=0;
            }
        }

        document.getElementById("letra-pregunta").textContent = bd_juego[numPreguntaActual].id;
        document.getElementById("pregunta").textContent = bd_juego[numPreguntaActual].pregunta;
        var letra = bd_juego[numPreguntaActual].id;
        document.getElementById(letra).classList.add("pregunta-actual");
    } else {
        clearInterval(countdown);
        mostrarPantallaFinal();    
    }
}

var respuesta = document.getElementById("respuesta");
respuesta.addEventListener("keyup", function(event){
    if(event.keyCode ===13){
        if(respuesta.value==""){
            alert("Debe Ingresar un valor");
            return;
        }

        var txtRespuesta = respuesta.value;
        controlarRespuesta(txtRespuesta.toLowerCase());
    }
})

function controlarRespuesta(txtRespuesta){
    if(txtRespuesta == bd_juego[numPreguntaActual].respuesta){
        //alert("Respuesta correcta");
        cantidadAcertadas++;
        estadoPreguntas[numPreguntaActual] = 1;

        var letra = bd_juego[numPreguntaActual].id;
        document.getElementById(letra).classList.remove("pregunta-actual");
        document.getElementById(letra).classList.add("bien-respondida");
    } else {
        estadoPreguntas[numPreguntaActual] = 1;
        var letra = bd_juego[numPreguntaActual].id;
        document.getElementById(letra).classList.remove("pregunta-actual");
        document.getElementById(letra).classList.add("mal-respondida");
    }

    //limpiamos el input
    respuesta.value="";
    cargarParegunta();
}

var pasar = document.getElementById("pasar");
pasar.addEventListener("click", function(event){
    var letra = bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.remove("pregunta-actual");

    cargarParegunta();
})

function mostrarPantallaFinal(){
    document.getElementById("acertadas").textContent = cantidadAcertadas;
    document.getElementById("score").textContent = (cantidadAcertadas*100)/10 + "% de acierto";
    document.getElementById("pantalla-juego").style.display = "none";
    document.getElementById("pantalla-final").style.display = "block";
}

//para volver a comenzar a jugar
var recomenzar = document.getElementById("recomenzar");
recomenzar.addEventListener("click", function(event){
    numPreguntaActual = -1;
    timeLeft = TIEMPO_DEL_JUEGO;
    timer.innerText = timeLeft;
    cantidadAcertadas = 0;
    estadoPreguntas = [0,0,0,0,0,0,0,0,0,0];

    var circulos = document.getElementsByClassName("circle");
    for(i=0; i<circulos.length;i++){
        circulos[i].classList.remove("pregunta-actual");
        circulos[i].classList.remove("bien-respondida");
        circulos[i].classList.remove("mal-respondida");
    }

    document.getElementById("pantalla-final").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    respuesta.value="";

    largarTiempo();
    cargarParegunta();
})


