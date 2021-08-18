const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const bassDrum = document.querySelector('#bass-drum')
const cymbalCrash = document.querySelector('#cymbal-crash')
const tom1 = document.querySelector('#tom1')
const cymbalRide = document.querySelector('#cymbal-ride')
const hihat = document.querySelector('#hihat')
const snare = document.querySelector('#snare')
const tom2 = document.querySelector('#tom2')


cymbalCrash.addEventListener('click', function() {

  if (audioContext.state === 'suspended'){
    audioContext.resume();
  }
  notas(330, 0.006);
})

hihat.addEventListener('click', function() {

  if (audioContext.state === 'suspended'){
    audioContext.resume();
  }
  notas(310, 0.006);
})

cymbalRide.addEventListener('click', function() {

  if (audioContext.state === 'suspended'){
    audioContext.resume();
  }
  notas(350, 0.006);
})

snare.addEventListener('click', function() {

  if (audioContext.state === 'suspended'){
    audioContext.resume();
  }
  notas(175, 0.005);
})

tom1.addEventListener('click', function() {

  if (audioContext.state === 'suspended'){
    audioContext.resume();
  }
  notas(150, 0.005);
})

tom2.addEventListener('click', function() {

  if (audioContext.state === 'suspended'){
    audioContext.resume();
  }
  notas(120, 0.005);
})

bassDrum.addEventListener('click', function() {

  if (audioContext.state === 'suspended'){
    audioContext.resume();
  }
  notas(80, 0.0025);
})

// const audioContext = new AudioContext();

function notas (frecuency, vGain){
  
  // Crear un nodo oscilador
  let osc = audioContext.createOscillator();
  // type = sine, triangle, square, sawtooth
  osc.type = 'sine'

  osc.frequency.value = frecuency;
  // osc.frequency.exponentialRampToValueAtTime(10, audioContext.currentTime + 1);

  let gain = audioContext.createGain();
  gain.gain.value = 2;
  gain.gain.exponentialRampToValueAtTime(vGain, audioContext.currentTime + 1);

  let analyser = audioContext.createAnalyser();
  analyser.fftSize = 1024;
  analyser.connect(audioContext.destination)
  let dataArray = new Uint8Array(analyser.frequencyBinCount);

  //Conectar el audio del nodo a la salida
  osc.connect(gain).connect(analyser);

  osc.start(0);
  osc.stop(audioContext.currentTime + 1);
  
  let canvas = document.querySelector("canvas");
  ctx = canvas.getContext('2d');
  let cw = canvas.width = 200;
  let ch = canvas.height = 100;
  ctx.fillStyle = "#fff"

  let barras = [];// crea el array de barras
  // barras.style.background = 'white'
  let bNum = 20;

  for(let i= 0; i < bNum; i++){
    // crea un nuevo objeto barra
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

