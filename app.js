// ------Gif battery section (speakers)------

const sectionBattery = document.querySelector('.battery')
const key = 'jA9MgIKhQp6uag2coyykpk5JVw6eqTf2'


const fetchSpeaker = async () => {

  const url = `https://api.giphy.com/v1/gifs/search?api_key=jA9MgIKhQp6uag2coyykpk5JVw6eqTf2&q=beautyconla&limit=5&offset=0&rating=r&lang=en`
  const  answer = await fetch(url)
  const outcome = await answer.json()
  const imgSrc = outcome.data[0].images.downsized.url

  showGifSpeaker (imgSrc)
}

function showGifSpeaker (src) {

  const divSpeaker1 = document.createElement('div')
  divSpeaker1.classList = 'speaker1'
  divSpeaker1.innerHTML = `
  <img src="${src}" alt="">
  `
  const divSpeaker2 = document.createElement('div')
  divSpeaker2.classList = 'speaker2'
  divSpeaker2.innerHTML = `
  <img src="${src}" alt="">
  `

  sectionBattery.appendChild(divSpeaker1)
  sectionBattery.appendChild(divSpeaker2)
}

fetchSpeaker()


// ------Gif products section ------

const songWalk = document.querySelector('.promotions .gif')

const fetchGifSong = async () => {

  const url = 'https://api.giphy.com/v1/gifs/search?api_key=jA9MgIKhQp6uag2coyykpk5JVw6eqTf2&q=musical+note&limit=10&offset=0&rating=r&lang=en'
  const answer = await fetch(url)
  const outcome = await answer.json()

  const imgSrc = outcome.data[3].images.original.url
  showGifSong(imgSrc)
}

function showGifSong (src){

  const imgGif = document.createElement('img')
  imgGif.src = `${src}`

  songWalk.appendChild(imgGif)
} 
fetchGifSong()


// ------Gif service section ------

const gifService = document.querySelector('.service .gif')

const fetchGifVinil = async () => {

  const url = 'https://api.giphy.com/v1/gifs/search?api_key=jA9MgIKhQp6uag2coyykpk5JVw6eqTf2&q=vinyl+record&limit=200&offset=0&rating=g&lang=en'
  // const url = 'https://api.giphy.com/v1/gifs/search?api_key=jA9MgIKhQp6uag2coyykpk5JVw6eqTf2&q=retro+vinyl+&limit=200&offset=0&rating=g&lang=en'
  const answer = await fetch(url);
  const outcome = await answer.json()
  // showGifVinil(outcome.data[6].images.original.url)
  showGifVinil(outcome.data[35].images.original.url)

}

function showGifVinil (src) {
  const img = document.createElement('img')
  img.src = `${src}`
  gifService.appendChild(img)
}
fetchGifVinil()


// ------Gif portafolio button------

const buttonPortaf = document.querySelector('#portafolio')
const containerGif = document.querySelector('footer .pay')

const fetchGifPort = async () => {

  // const url = 'https://api.giphy.com/v1/gifs/search?api_key=jA9MgIKhQp6uag2coyykpk5JVw6eqTf2&q=flecha+mira&limit=200&offset=0&rating=g&lang=es'
  const url = 'https://api.giphy.com/v1/gifs/search?api_key=jA9MgIKhQp6uag2coyykpk5JVw6eqTf2&q=loop+illustration+click&limit=200&offset=0&rating=g&lang=en'
  const answer = await fetch(url);
  const outcome = await answer.json()

  // showGifButton(outcome.data[5].images.original.url)
  showGifButton(outcome.data[2].images.original.url)
  // console.log(outcome.data)

}

function showGifButton (src) {
  const img = document.createElement('img')
  img.src = `${src}`
  img.classList = 'gifButton'

  containerGif.insertBefore(img, buttonPortaf)

}
fetchGifPort()


// ------Menu Burger------

const menuBurger = document.querySelector('.menu-burger')
const containerMenu = document.querySelector('.container-menu')
const menuClose = document.querySelector('.menu-close')
const menuList = document.querySelector('.menu-list')


menuBurger.addEventListener('click', () => {
  containerMenu.classList.add('visible')
})
menuClose.addEventListener('click', () => {
  containerMenu.classList.remove('visible')
})

menuList.addEventListener('click', () => {
  containerMenu.classList.remove('visible')
})