const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const bassDrum = document.querySelector('#bass-drum')
const cymbalCrash = document.querySelector('#cymbal-crash')
const tom1 = document.querySelector('#tom1')
const cymbalRide = document.querySelector('#cymbal-ride')
const hihat = document.querySelector('#hihat')
const snare = document.querySelector('#snare')
const tom2 = document.querySelector('#tom2')
const panControl = document.querySelector('#panControl')


cymbalCrash.addEventListener('click', function() {
  notas(330, 0.006);
})
window.addEventListener("keydown", function (e) {
  e.preventDefault();
  if(e.key == 'w'){
    notas(330, 0.006);
  }
});   


hihat.addEventListener('click', function() {
  // notas(310, 0.006);
  hihatSound()
})
window.addEventListener("keydown", function (e) {
  e.preventDefault();
  if(e.key == 'a'){
    // notas(310, 0.006);
    hihatSound()
  }
});


cymbalRide.addEventListener('click', function() {
  // notas(350, 0.006);
  clapSound()
})
window.addEventListener("keydown", function (e) {
  e.preventDefault();
  if(e.key == 'o'){
    // notas(350, 0.006);
    clapSound()
  }
});


snare.addEventListener('click', function() {
  notas(175, 0.005);
})
window.addEventListener("keydown", function (e) {
  e.preventDefault();
  if(e.key == 'k'){
    notas(175, 0.005);
  }
});


tom1.addEventListener('click', function() {
  notas(150, 0.005);
})
window.addEventListener("keydown", function (e) {
  e.preventDefault();
  if(e.key == 'd'){
    notas(150, 0.005);
  }
});


tom2.addEventListener('click', function() {
  notas(120, 0.005);
})
window.addEventListener("keydown", function (e) {
  e.preventDefault();
  if(e.key == ' '){ 
    notas(120, 0.005);
  }
});


bassDrum.addEventListener('click', function() {
  notas(80, 0.0025);
})
window.addEventListener("keydown", function (e) {
  e.preventDefault();
  if(e.key == 'ñ'){
    notas(80, 0.0025);
  }
});



// -----Función para crear el nodo oscilador, gain y paneo ---------

function notas (frecuency, vGain){

  let paneo = audioContext.createStereoPanner(audioContext);
  paneo.pan.value = panControl.value;
  

  let osc = audioContext.createOscillator();
  // type = sine, triangle, square, sawtooth
  osc.type = 'sine'

  osc.frequency.value = frecuency;


  let gain = audioContext.createGain();
  gain.gain.value = 2;
  gain.gain.exponentialRampToValueAtTime(vGain, audioContext.currentTime + 1);

  let analyser = audioContext.createAnalyser();
  analyser.fftSize = 1024;
  analyser.connect(audioContext.destination)
  let dataArray = new Uint8Array(analyser.frequencyBinCount);

  //Conectar el audio del nodo a la salida
  osc.connect(gain).connect(paneo).connect(analyser);

  osc.start(0);
  osc.stop(audioContext.currentTime + 1);


  // ---Visualizador de frecuncias (datos)---------------------

  let canvas = document.querySelector("canvas");
  ctx = canvas.getContext('2d');
  let cw = canvas.width = 200;
  let ch = canvas.height = 100;
  ctx.fillStyle = "#fff"

  let barras = [];// crea el array de barras
  
  let bNum = 20;

  for(let i= 0; i < bNum; i++){

    let barra = {};
    // establece la anchura ( w ) y la altura ( h ) de las barras
    barra.w = cw/bNum;
    barra.h = 0;
    // estallece las coordenadas en x e y de cada barra 
    barra.x = i*barra.w;
    barra.y = ch;

    // añade la barra al final del array barras, utilizando el método push
    barras.push(barra);
  }

  // ---Función para crear el Visualizador de frecuncias----------------

  function Fotograma() {

    requestId = window.requestAnimationFrame(Fotograma);

    /*el método getByteFrequencyData() toma como argumento un array de tipo Uint8Array*/
    analyser.getByteFrequencyData(dataArray);
    ctx.clearRect(0, 0, cw, ch);

    // la doble tilde (~~) es un operador equivalente a Math.floor() o casi
    let n = ~~(analyser.frequencyBinCount / bNum);

    for (let i = 0; i < barras.length; i++) {
      barras[i].h = -dataArray[i * n]; // altura negativa!!
      ctx.beginPath();
      ctx.fillRect(barras[i].x, barras[i].y, barras[i].w - 1, barras[i].h);
    }
  }

  Fotograma();

}


// ---Función para generar el sonido del platillo hihat----------------

let audioBuffer1

function hihatSound(){
  
  const request = new XMLHttpRequest();
  request.open("GET",'https://s3-us-west-2.amazonaws.com/demo-aud-samp/samples/HH_Blofeld_001.wav',true);
  request.responseType = "arraybuffer";
  request.onload = function() {
    audioContext.decodeAudioData(request.response, function(buffer) {
      audioBuffer1 = buffer;
    });
  };
  request.send();

  function reproducirAudio() {
      const fuenteDeReproduccion = audioContext.createBufferSource();
      fuenteDeReproduccion.buffer = audioBuffer1;
      fuenteDeReproduccion.playbackRate.value = .8;
      fuenteDeReproduccion.connect(audioContext.destination);
      fuenteDeReproduccion.start(audioContext.currentTime);
  }
  reproducirAudio()
}


// ---Función para generar el sonido del platillo hihat----------------

let audioBuffer2

function clapSound(){
  
  const request = new XMLHttpRequest();
  request.open("GET",'https://s3-us-west-2.amazonaws.com/demo-aud-samp/samples/Clap_Blofeld_2.wav',true);
  request.responseType = "arraybuffer";
  request.onload = function() {
    audioContext.decodeAudioData(request.response, function(buffer) {
      audioBuffer2 = buffer;
    });
  };
  request.send();

  function reproducirAudio() {
      const fuenteDeReproduccion = audioContext.createBufferSource();
      fuenteDeReproduccion.buffer = audioBuffer2;
      fuenteDeReproduccion.playbackRate.value = .8;
      fuenteDeReproduccion.connect(audioContext.destination);
      fuenteDeReproduccion.start(audioContext.currentTime);
  }
  reproducirAudio()
}