let txt = document.querySelector("#text")
let easy = document.querySelector("#easy")
let paste = document.querySelector("#paste")
let inc = document.querySelector("#inc")
let dec = document.querySelector("#dec")
let incwidth = document.querySelector("#incwidth")
let decwidth = document.querySelector("#decwidth")
let bg = document.querySelector('#bg')
let fg = document.querySelector('#fg')
let wrapper = document.querySelector("#wrapper")
let arabiccheck = document.querySelector("#arabic")
let arabicfont = "Noto Sans Arabic"

if(localStorage.getItem('maxwidth')){
  wrapper.style.maxWidth=localStorage.getItem('maxwidth')
}else{
  wrapper.style.maxWidth='50rem'
}

incwidth.addEventListener('click',function(e){
  wrapper.style.maxWidth = String(Number(wrapper.style.maxWidth.replace('rem', '')) + 0.25) + 'rem'
  localStorage.setItem('maxwidth',wrapper.style.maxWidth)
})

decwidth.addEventListener('click',function(e){
  wrapper.style.maxWidth = String(Number(wrapper.style.maxWidth.replace('rem', '')) - 0.25) + 'rem'
  localStorage.setItem('maxwidth',wrapper.style.maxWidth)
})

arabiccheck.addEventListener('input', function(e) {
  if (e.target.checked) {
    easy.style.fontFamily = arabicfont
    easy.style.direction = "rtl"
    localStorage.setItem('arabic', 'checked')
  } else {
    easy.style.fontFamily = "easy"
    easy.style.direction = "ltr"
    localStorage.setItem('arabic', 'unckecked')
  }
})

if (localStorage.getItem('arabic')) {
  if (localStorage.getItem('arabic') === 'checked') {
    easy.style.fontFamily = arabicfont
    easy.style.direction = "rtl"
    arabiccheck.checked = true
  } else if (localStorage.getItem('arabic') === 'unchecked') {
    easy.style.fontFamily = "easy"
    easy.style.direction = "ltr"
    arabiccheck.checked = false
  }
}

if (localStorage.getItem('maxwidth')) {
  wrapper.style.maxWidth = localStorage.getItem('maxwidth')
}

if (localStorage.getItem('easy')) {
  easy.innerText = localStorage.getItem('easy')
}

if (localStorage.getItem('color')) {
  easy.style.color = localStorage.getItem('color')
  fg.value = localStorage.getItem('color')
} else {
  easy.style.color = "#000000"
}

if (localStorage.getItem('background')) {
  easy.style.backgroundColor = localStorage.getItem('background')
  bg.value = localStorage.getItem('background')
} else {
  easy.style.backgroundColor = "#ffffff"
}

fg.addEventListener('input', function(e) {
  easy.style.color = (e.target.value)
  localStorage.setItem('color', e.target.value)
})

bg.addEventListener('input', function(e) {
  easy.style.backgroundColor = (e.target.value)
  localStorage.setItem('background', e.target.value)
})

txt.addEventListener("input", function() {
  text = txt.value.replace(/-$\n/gm, "")
  text = text.replace(/([^\.\?\!\:»])$\n/gm, "$1 ")
  text = text.replace(/([\.\?\!\:»])$/gm, "$1\n")
  easy.innerText = text
  localStorage.setItem('easy', text)
})

paste.addEventListener("click", function() {
  navigator.clipboard.readText().then(function(text) {
    text = text.replace(/-$\n/gm, "")
    text = text.replace(/([^\.\?\!\:»])$\n/gm, "$1 ")
    text = text.replace(/([\.\?\!\:»])$/gm, "$1\n")
    easy.innerText = text
    localStorage.setItem('easy', text)
  })
})

if (localStorage.getItem('fontsize')) {
  easy.style.fontSize = localStorage.getItem('fontsize')
} else {
  easy.style.fontSize = "1rem"
}

inc.addEventListener("click", function(e) {
  easy.style.fontSize = String(Number(easy.style.fontSize.replace("rem", "")) + 0.25) + "rem"
  localStorage.setItem('fontsize', easy.style.fontSize)
})

dec.addEventListener("click", function(e) {
  easy.style.fontSize = String(Number(easy.style.fontSize.replace("rem", "")) - 0.25) + "rem"
  localStorage.setItem('fontsize', easy.style.fontSize)
})

document.body.addEventListener("keydown", function(ev) {

  // function to check the detection
  ev = ev || window.event; // Event object 'ev'
  let key = ev.which || ev.keyCode; // Detecting keyCode

  // Detecting Ctrl
  let ctrl = ev.ctrlKey ? ev.ctrlKey : ((key === 17) ? true : false);

  // If key pressed is V and if ctrl is true.
  if (key == 86 && ctrl) {
    // print in console.
    navigator.clipboard.readText().then(function(text) {
      text = text.replace(/-$\n/gm, "")
      text = text.replace(/([^\.\?\!\:»])$\n/gm, "$1 ")
      text = text.replace(/([\.\?\!\:»])$/gm, "$1\n")
      easy.innerText = text
      localStorage.setItem('easy', text)
      window.scrollTo(0,0)
    })
  }

}, false);
