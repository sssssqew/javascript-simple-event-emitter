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
console.log(handlers)

// define event handlers 
function handleChange(e){
    socket.emit('displayName', {value: e.target.value})
}
function handleClick(e){
    socket.emit('addItem', {value: 'orange'})
}

// get elements 
const nameEl = document.getElementById('name')
const displayEl = document.getElementById('display')
const btnEl = document.getElementById('add')

// set events 
nameEl.addEventListener('input', handleChange)
btnEl.addEventListener('click', handleClick)


