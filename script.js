let txt = document.querySelector("#text")
let easy = document.querySelector("#easy")
let butt = document.querySelector("#butt")
txt.addEventListener("input",function(){easy.innerText=txt.value})
butt.addEventListener("click",function(){
navigator.clipboard.readText().then(text => easy.innerText=text)
})

