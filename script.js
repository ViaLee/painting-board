var demo = document.getElementById('demo')
var ctx = demo.getContext('2d');
var ifdown
var lastX=0
var lastY=0
var eraser = document.getElementById('eraser')
var usingEraser = false
var pens = document.getElementById('pens')
var pen = document.getElementsByClassName('pen')

setWindowSize()
// demo.onresize = function (x) {
window.onresize = function (x) {
    setWindowSize()
}

//---------画笔事件----------
//mousepress
// ctx.onmousedown = function (x) {
    demo.onmousedown = function (x) {
        var getX = x.clientX
        var getY = x.clientY
        ifdown = true
        if (usingEraser){
            ctx.clearRect(getX-8,getY-8,16,16)
        }else{
            // ifdown = true
            lastDot(getX, getY)
        // drawDot(getX, getY)
        }
    }
//mousemove
    demo.onmousemove = function (x) {
        var getX = x.clientX
        var getY = x.clientY
            if(ifdown){
                console.log(123)
                console.log(usingEraser)
                if(usingEraser){
                    console.log(getX)
                    ctx.clearRect((getX-10),(getY-10),20,20)
                } else {
            // drawDot(getX, getY)
                drawLine(getX, getY,lastX,lastY)
                lastDot(getX, getY)
                }
            }
    }
//mouseup
    demo.onmouseup = function (x) {
        ifdown = false
    }
//mouseleave
    demo.onmouseleave = function(x){
        if(ifdown){
            ifdown = false 
        }
    }
    //---------工具栏---------
    eraser.onclick = function (x) {
        console.log('clear')
        usingEraser = !usingEraser
        console.log(usingEraser)
    }

    //---------工具函数----------

function setWindowSize () {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    demo.width = pageWidth
    demo.height = pageHeight
}
function drawDot (x,y){
        ctx.beginPath() //*
        ctx.fillStyle = 'black'
        ctx.arc(x, y, 2, 0, Math.PI*2)
        ctx.fill()  //*
    }
function lastDot (x,y) {
    lastX=x
    lastY=y
}
function drawLine (x, y,lastX,lastY) {
    ctx.beginPath()
    ctx.moveTo(x,y)
    ctx.lineTo(lastX,lastY)
    ctx.lineWidth = '4'
    ctx.fillStyle = 'black'
    ctx.closePath()
    ctx.stroke(); //*
}