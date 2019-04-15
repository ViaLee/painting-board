var demo = document.getElementById('demo')
var ctx = demo.getContext('2d');
var ifdown
var lastX = 0
var lastY = 0
var eraser = document.getElementById('eraser')
var usingEraser = false
var pens = document.getElementById('pens')
var pencil = document.getElementById('pencil')
var maobi = document.getElementById('maobi')
var markpen = document.getElementById('markpen')
var colorcase = document.getElementById('colorcase')
var save = document.getElementById('save')
var bin = document.getElementById('bin')
var color
var whichUsing

setWindowSize()
// demo.onresize = function (x) {
window.onresize = function (x) {  //bug
    setWindowSize()
}
listenToMouse()
chooseTool()
touchEvent()

//---------touch事件---------- 
function touchEvent () {
    
    demo.ontouchstart = function (x){
        x.preventDefault();
        var getX = x.touches[0].clientX
        var getY = x.touches[0].clientY
        ifdown = true
        if (whichUsing == 'eraser'){
            ctx.clearRect(getX-8,getY-8,16,16)
        }else{
            // ifdown = true
            lastDot(getX, getY)
        // drawDot(getX, getY)
        }
    }
    demo.ontouchmove = function(x){
        var getX = x.touches[0].clientX
        var getY = x.touches[0].clientY
            if(ifdown){
                if(whichUsing == 'eraser'){
                    ctx.clearRect((getX-12),(getY-1),24,24)
                } else {
            // drawDot(getX, getY)
                drawLine(getX, getY,lastX,lastY)
                lastDot(getX, getY)
                }
            }
    }
    demo.ontouchend = function(){
        ifdown = false
    }
}
//---------鼠标事件---------- 
function listenToMouse () {
//mousepress
// ctx.onmousedown = function (x) {
    demo.onmousedown = function (x) {
        var getX = x.clientX
        var getY = x.clientY
        ifdown = true
        if (whichUsing == 'eraser'){
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
                if(whichUsing == 'eraser'){
                    ctx.clearRect((getX-12),(getY-1),24,24)
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
}
    //---------工具栏点击事件---------
    function chooseTool () {
    eraser.onclick = function (x) {
        whichUsing = 'eraser'
        console.log(whichUsing)
        if(whichUsing == 'eraser'){
            eraser.classList.add('using')
            pencil.classList.remove('using')
            maobi.classList.remove('using')
            markpen.classList.remove('using')
        }
    }
    pencil.onclick = function (x) {
        whichUsing = 'pencil'
        console.log(whichUsing)
        if(whichUsing == 'pencil'){
            pencil.classList.add('using')
            eraser.classList.remove('using')
            maobi.classList.remove('using')
            markpen.classList.remove('using')
        }
    }
    maobi.onclick = function (x) {
        whichUsing = 'maobi'
        if(whichUsing == 'maobi'){
            maobi.classList.add('using')
            eraser.classList.remove('using')
            pencil.classList.remove('using')
            markpen.classList.remove('using')
        }
    }
    markpen.onclick = function (x) {
        whichUsing = 'markpen'
        if(whichUsing == 'markpen'){
            markpen.classList.add('using')
            eraser.classList.remove('using')
            pencil.classList.remove('using')
            maobi.classList.remove('using')
            // ctx.globalAlpha = '0.5'
        }
    }
    colorcase.onclick = function(x) {
        console.log(x)
        color = x.toElement.id
    }
    bin.onclick = function () {
        ctx.clearRect(0,0,1500,1000)
    }
    save.onclick = function () {
        //获取url，创建a标签下载图片
        var url = demo.toDataURL("image/png")
        // var a = document.createElement(a)
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url
        a.download = 'my-paint'
        console.log(a)
        a.target = '_blank'
        a.click() //触发a标签
    }
}

    //---------工具函数----------

function setWindowSize () {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    demo.width = pageWidth
    demo.height = pageHeight
}
// function drawDot (x,y){
//         ctx.beginPath() //*
//         ctx.fillStyle = 'black'
//         ctx.arc(x, y, 2, 0, Math.PI*2)
//         ctx.fill()  //*
//     }
function lastDot (x,y) {
    lastX = x
    lastY = y
}
function drawLine (x, y,lastX,lastY) {
    ctx.beginPath()
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(x,y)
    if(whichUsing == 'pencil'){
        ctx.lineWidth = '1'
    }else if(whichUsing == 'maobi'){
        ctx.lineWidth = '6'
    }else if(whichUsing == 'markpen'){
        ctx.lineWidth = '11'
    }
    if(color){
        if(color == 'evan'){
        ctx.strokeStyle = '#bee2e7'
        }else{
        ctx.strokeStyle = color
        }
    }
    ctx.closePath()
    ctx.stroke(); //*
}