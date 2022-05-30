// 소켓 정의 
const socket = {}
const handlers = {}

socket.on = function(event, handler){
    handlers[event] = handler
}
socket.emit = function(event, data){
    console.log(data)
    handlers[event](data)
}

const fruits = []

// 이벤트핸들러 정의 
socket.on('displayName', function(data){
    console.log(data.value)
    displayEl.innerText = data.value 
})
socket.on('addItem', function(data){
    console.log(data.value)
    fruits.push(data.value)
    displayEl.innerText = fruits.join(' ')
})
console.log(handlers)

function handleChange(e){
    socket.emit('displayName', {value: e.target.value})
}
function handleClick(e){
    socket.emit('addItem', {value: 'orange'})
}

const nameEl = document.getElementById('name')
const displayEl = document.getElementById('display')
const btnEl = document.getElementById('add')

nameEl.addEventListener('input', handleChange)
btnEl.addEventListener('click', handleClick)


