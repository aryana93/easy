//******************************************************************************
//get nodes
//******************************************************************************

//get font size button nodes
let btnincfontsize = document.querySelector('#btnincfontsize')
let btndecfontsize = document.querySelector("#btndecfontsize")

//get line height button nodes
let btninclineheight = document.querySelector('#btninclineheight')
let btndeclineheight = document.querySelector("#btndeclineheight")

//get width resize button nodes 
let btnincwidth = document.querySelector("#btnincwidth")
let btndecwidth = document.querySelector("#btndecwidth")

//get arabic english checkbox node
let chkboxaren = document.querySelector("#chkboxaren")

//get color picker nodes
let clrfg = document.querySelector('#clrfg')
let clrbg = document.querySelector('#clrbg')

//get paste button node
let btnpaste = document.querySelector("#btnpaste")

//get textarea input node
let textareainput = document.querySelector("#textareainput")

//get easy text output div node
let easyoutput = document.querySelector("#easyoutput")

//get main wrapper node
//this is for adjusting width with buttons
let mainwrapper = document.querySelector("#mainwrapper")

//name of arabic font
//this will help quickly use a new font from CSS
//maybe use a font selector later
// let arabicfont = "Noto Sans Arabic"
// let arabicfont = "Scheherazade New"
// let arabicfont = "Noto Naskh Arabic"
let arabicfont = "IBM Plex Sans Arabic"

//******************************************************************************
//define functions
//******************************************************************************

//function for processing input text
//returns cleaned up text
function cleanuptext(txt){
  txt = txt.replace(/-$\n/gm, "")
  txt = txt.replace(/([^\.\?\!\:»])$\n/gm, "$1 ")
  txt = txt.replace(/([\.\?\!\:»])$/gm, "$1\n")
  return txt
}

//******************************************************************************
//localStorage lookups
//******************************************************************************

//lookup localStorage for fontsize
//if there is, use it
//if not set font size to 1rem
if (localStorage.getItem('fontsize')) {
  easyoutput.style.fontSize = localStorage.getItem('fontsize')
} else {
  easyoutput.style.fontSize = "1rem"
}

//lookup localStorage for lineheight
//if there is, use it
//if not set font size to 1rem
if (localStorage.getItem('lineheight')) {
  easyoutput.style.lineHeight = localStorage.getItem('lineheight')
} else {
  easyoutput.style.lineHeight = "1rem"
}

//lookup for arabic english checkbox value in localStorage
if (localStorage.getItem('arabic')) {
  if (localStorage.getItem('arabic') === 'checked') {
    easyoutput.style.fontFamily = arabicfont
    easyoutput.style.direction = "rtl"
    chkboxaren.checked = true
  } else if (localStorage.getItem('arabic') === 'unchecked') {
    easyoutput.style.fontFamily = "Merriweather"
    easyoutput.style.direction = "ltr"
    chkboxaren.checked = false
  }
}

//lookup if there is text in localStorage for easy display
//if there is, display it
if (localStorage.getItem('easyoutput')) {
  easyoutput.innerText = localStorage.getItem('easyoutput')
}

//lookup localStorage for font color
//if there is, set color of easy text and color picker for text color
//if not, set it to black
if (localStorage.getItem('color')) {
  easyoutput.style.color = localStorage.getItem('color')
  clrfg.value = localStorage.getItem('color')
} else {
  easyoutput.style.color = "#000000"
}

//lookup localStorage for background color
//if there is, set background color and color picker for background
//if not, set it to white
if (localStorage.getItem('backgroundcolor')) {
  easyoutput.style.backgroundColor = localStorage.getItem('backgroundcolor')
  clrbg.value = localStorage.getItem('backgroundcolor')
} else {
  easyoutput.style.backgroundColor = "#ffffff"
}

//lookup for maxWidth in localStorage
//if not present assign 50rem to maxWidth
if(localStorage.getItem('maxwidth')){
  mainwrapper.style.maxWidth=localStorage.getItem('maxwidth')
}else{
  mainwrapper.style.maxWidth='50rem'
}

//******************************************************************************
//add event listeners to nodes
//******************************************************************************

//listen for input on width adjustment buttons
btnincwidth.addEventListener('click',function(e){
  mainwrapper.style.maxWidth = String(Number(mainwrapper.style.maxWidth.replace('rem', '')) + 0.1) + 'rem'
  localStorage.setItem('maxwidth',mainwrapper.style.maxWidth)
})

btndecwidth.addEventListener('click',function(e){
  mainwrapper.style.maxWidth = String(Number(mainwrapper.style.maxWidth.replace('rem', '')) - 0.1) + 'rem'
  localStorage.setItem('maxwidth',mainwrapper.style.maxWidth)
})

//listen for arabic english checkbox
chkboxaren.addEventListener('input', function(e) {
  if (e.target.checked) {
    easyoutput.style.fontFamily = arabicfont
    easyoutput.style.direction = "rtl"
    localStorage.setItem('arabic', 'checked')
  } else {
    easyoutput.style.fontFamily = "Merriweather"
    easyoutput.style.direction = "ltr"
    localStorage.setItem('arabic', 'unckecked')
  }
})

//event listener for color picker for text color
clrfg.addEventListener('input', function(e) {
  easyoutput.style.color = (e.target.value)
  localStorage.setItem('color', e.target.value)
})

//event listener for color picker for background color
clrbg.addEventListener('input', function(e) {
  easyoutput.style.backgroundColor = (e.target.value)
  localStorage.setItem('backgroundcolor', e.target.value)
})

//get input from textarea, clean it up and display
textareainput.addEventListener("input", function(e) {
  let txt = cleanuptext(e.target.value)
  easyoutput.innerText = txt
  localStorage.setItem('easyoutput', txt)
})

//get input from clipboard when paste button is clicked
btnpaste.addEventListener("click", function() {
  navigator.clipboard.readText().then(function(txt) {
    txt=cleanuptext(txt)
    easyoutput.innerText = txt
    localStorage.setItem('easyoutput', txt)
  })
})

//increase font size when button is clicked
//update localstorage value of fontsize
btnincfontsize.addEventListener("click", function(e) {
  easyoutput.style.fontSize = String(Number(easyoutput.style.fontSize.replace("rem", "")) + 0.1) + "rem"
  localStorage.setItem('fontsize', easyoutput.style.fontSize)
})

//decrease font size when button is clicked
//update localstorage value of fontsize
btndecfontsize.addEventListener("click", function(e) {
  easyoutput.style.fontSize = String(Number(easyoutput.style.fontSize.replace("rem", "")) - 0.1) + "rem"
  localStorage.setItem('fontsize', easyoutput.style.fontSize)
})

//increase line height when button is clicked
//update localstorage value of line height
btninclineheight.addEventListener("click", function(e) {
  easyoutput.style.lineHeight = String(Number(easyoutput.style.lineHeight.replace("rem", "")) + 0.1) + "rem"
  localStorage.setItem('lineheight', easyoutput.style.lineHeight)
})

//decrease line height when button is clicked
//update localstorage value of fontsize
btndeclineheight.addEventListener("click", function(e) {
  easyoutput.style.lineHeight = String(Number(easyoutput.style.lineHeight.replace("rem", "")) - 0.1) + "rem"
  localStorage.setItem('lineheight', easyoutput.style.lineHeight)
})

//handle Ctrl + V keyboard input
document.body.addEventListener("keydown", function(ev) {
  // function to check the detection
  ev = ev || window.event; // Event object 'ev'
  let key = ev.which || ev.keyCode; // Detecting keyCode
  // Detecting Ctrl
  let ctrl = ev.ctrlKey ? ev.ctrlKey : ((key === 17) ? true : false);
  // If key pressed is V and if ctrl is true.
  if (key == 86 && ctrl) {
    // print in console.
    navigator.clipboard.readText().then(function(txt) {
      txt = cleanuptext(txt)
      easyoutput.innerText = txt
      localStorage.setItem('easyoutput', txt)
      window.scrollTo(0,0)
    })
  }

}, false);

//event listener for storing current location before closing tab
window.addEventListener('unload',function (e) {
  localStorage.setItem('currentposition', document.documentElement.scrollTop || document.body.scrollTop)
})

window.addEventListener('load', function (e) {
  window.scrollTo(0,localStorage.getItem('currentposition'))
})
