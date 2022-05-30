// define event emitter
const socket = {}
const handlers = {}

socket.on = function(event, handler){
    handlers[event] = handler
}
socket.emit = function(event, data){
    console.log(data)
    handlers[event](data)
}

let fruits = []
let files = []

// register event handlers 
socket.on('displayName', function(data){
    fruits = []
    console.log(data.value)
    displayEl.innerText = data.value 
})
socket.on('addItem', function(data){
    nameEl.value = ''
    console.log(data.value)
    fruits.push(data.value)
    displayEl.innerText = fruits.join(' ')
})
socket.on('uploadFile', function(data){
    const file = data.file 
    if(file.type === "application/pdf"){
        displayEl.innerHTML = `
            <embed src=${URL.createObjectURL(file)} type=${file.type} scrolling="auto" width="500" height="500"></embed>
        `
    }else if(file.type.split('/')[0] === "image"){
        displayEl.innerHTML = `
            <img src=${URL.createObjectURL(file)} alt=${file.name} width="300px" height="300px"/>
        `
    }else if(file.type === "application/haansoftdocx"){
        console.log(file)
        displayEl.innerHTML = `
        <iframe src="https://docs.google.com/gview?url=${URL.createObjectURL(file)}&embedded=true"></iframe>
        `
    }
})
console.log(handlers)

// define event handlers 
function handleChange(e){
    socket.emit('displayName', {value: e.target.value})
}
function handleClick(e){
    socket.emit('addItem', {value: 'orange'})
}
function handleUpload(e){
    socket.emit('uploadFile', {file: e.target.files[0]})
}

// get elements 
const nameEl = document.getElementById('name')
const displayEl = document.getElementById('display')
const btnEl = document.getElementById('add')
const fileInputEl = document.getElementById('file-input')

// set events 
nameEl.addEventListener('input', handleChange)
btnEl.addEventListener('click', handleClick)
fileInputEl.addEventListener('change', handleUpload)


