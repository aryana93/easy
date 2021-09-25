let txt = document.querySelector("#text")
let easy = document.querySelector("#easy")
let paste = document.querySelector("#paste")
let inc = document.querySelector("#inc")
let dec = document.querySelector("#dec")
let bg=document.querySelector('#bg')
let fg =document.querySelector('#fg')
let wrapper=document.querySelector("#wrapper")

if (localStorage.getItem('maxwidth')){
  wrapper.style.maxWidth=localStorage.getItem('maxwidth')
}

if (localStorage.getItem('easy')){
  easy.innerText = localStorage.getItem('easy')
}

if(localStorage.getItem('color')){
  easy.style.color=localStorage.getItem('color')
  fg.value = localStorage.getItem('color')
}else{
  easy.style.color="#000000"
}

if(localStorage.getItem('background')){
  easy.style.backgroundColor=localStorage.getItem('background')
    bg.value = localStorage.getItem('background')
}else{
  easy.style.backgroundColor="#ffffff"
}

fg.addEventListener('input',function(e){
  easy.style.color = (e.target.value)
  localStorage.setItem('color', e.target.value)
})

bg.addEventListener('input',function(e){
  easy.style.backgroundColor = (e.target.value)
  localStorage.setItem('background', e.target.value)
})

txt.addEventListener("input", function(){
  text = txt.value.replace(/-$\n/gm, "")
  text = text.replace(/([^\.])$\n/gm, "$1 ")
  text = text.replace(/\.$/gm, ".\n")
  easy.innerText = text
  localStorage.setItem('easy',text)
})

paste.addEventListener("click",function(){
  navigator.clipboard.readText().then(function(text) {
    text = text.replace(/-$\n/gm, "")
    text = text.replace(/([^\.])$\n/gm, "$1 ")
    text = text.replace(/\.$/gm, ".\n")
    easy.innerText = text
    localStorage.setItem('easy',text)
  })
})

if (localStorage.getItem('fontsize')) {
  easy.style.fontSize = localStorage.getItem('fontsize')
}else{
  easy.style.fontSize = "1rem"
}

inc.addEventListener("click", function(e){
  easy.style.fontSize =  String(Number(easy.style.fontSize.replace("rem","")) + 0.25) + "rem"
  localStorage.setItem('fontsize',easy.style.fontSize)
})

dec.addEventListener("click", function(e){
  easy.style.fontSize =  String(Number(easy.style.fontSize.replace("rem","")) - 0.25) + "rem"
    localStorage.setItem('fontsize',easy.style.fontSize)
})

