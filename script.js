let txt = document.querySelector("#text")
let easy = document.querySelector("#easy")
let butt = document.querySelector("#butt")

txt.addEventListener("input", function(){
  text = txt.value.replace(/-$\n/gm, "")
  easy.innerText = text
})

butt.addEventListener("click",function(){
  navigator.clipboard.readText().then(function(text) {
    text = text.replace(/-$\n/gm, "")
    easy.innerText = text
  })
})

