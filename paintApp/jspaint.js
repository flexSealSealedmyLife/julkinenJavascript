let canvas;
let ctx;
let savedImage;
let dragging = false;
let strokeColor = 'black';
let fillColor = 'black';
let lineWidth = 2;
let polygonSides = 6;
let currentTool = 'brush';
let canvasWidth = 600;
let canvasHeight = 600;

let usingBrush = false;
let brushXPoints = new Array();
let brushYPoints = new Array();
let brushDownPos = new Array();


class ShapeBox{
    constructor(left, top, width, height ) {
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
    }
}

class MouseDownPosition{
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

class Location{
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

class PolygonPoint{
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

let shapeBox = new ShapeBox(0,0,0,0);
let mouseDown = new MouseDownPosition(0,0);
let loca = new Location(0,0);

document.addEventListener('DOMContentLoaded', setupCanvas);

function setupCanvas() {
    canvas = document.getElementById("my-canvas");
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    canvas.addEventListener("mousedown", ReactToMouseDown);
    canvas.addEventListener("mousemove", ReactToMouseMove);
    canvas.addEventListener("mouseup", ReactToMouseUp);
}

function ChangeTool(toolClicked) {
    document.getElementById('open').className = "";
    document.getElementById('save').className = "";
    document.getElementById('brush').className = "";
    document.getElementById('line').className = "";
    document.getElementById('rectangle').className = "";
    document.getElementById('circle').className = "";
    document.getElementById('ellipse').className = "";    
    document.getElementById('polygon').className = "";
    document.getElementById(toolClicked).className = 'selected';
    currentTool = toolClicked;
}

function GetMousePosition(x,y) {
    let canvasSizeData = canvas.getBoundingClientRect();
    return { x: (x - canvasSizeData.left) * (canvas.width  / canvasSizeData.width),
        y: (y - canvasSizeData.top)  * (canvas.height / canvasSizeData.height)
      };
}

function SaveCanvasImage() {
    savedImageData = ctx.getImageData(0,0,canvas.width,canvas.height);
}

function RedrawCanvasImage() {
    ctx.putImageData(savedImageData,0,0);
}

function UpdateRubberbandSizeData(loca) {
    shapeBox.width = Math.abs(loca.x - mouseDown.x);
    shapeBox.height = Math.abs(loca.y - mouseDown.y);

    if (loca.x > mouseDown.x) {
        shapeBox.left = mouseDown.x;
    }else{
        shapeBox.left = loca.x;
    }

    if (loca.y > mouseDown.y) {
        shapeBox.top = mouseDown.y;
    }else{
        shapeBox.top = loca.y;
    }
}

function GetAngleUsingXAndY(mouselocaX, mouselocay) {
    let adjacent = mouseDown.x - mouselocaX;
    let opposite = mouseDown.y -mouselocay;
    return RadiansToDegress(Math.atan2(opposite, adjacent));
}

function RadiansToDegress(rad) {
    return (rad * (180 / Math.PI)).toFixed(2);
}

function DegreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function ReactToMouseDown(e) {
    canvas.style.cursor = "crosshair";
    loca = GetMousePosition(e.clientX, e.clientY);
    SaveCanvasImage();
    mouseDown.x = loca.x;
    mouseDown.y = loca.y;
    dragging = true;

    if (currentTool === "brush") {
        usingBrush = true;
        AddBrushPoint(loca.x, loca.y);
    }

} 

function ReactToMouseMove(e) {
    canvas.style.cursor = "crosshair";
    loca = GetMousePosition(e.clientX, e.clientY);

    if(currentTool === "brush" && dragging && usingBrush) {
        if(loca.x > 0 && loca.x < canvasWidth && loca.y > 0 && loca.y < canvasHeight) {
            AddBrushPoint(loca.x ,loca.y, true);
        }
        RedrawCanvasImage();
        DrawBrush();
    }else {
        if (dragging) {
            RedrawCanvasImage();
            UpdateRubberbandOnMovement(loca);
        }
    }
    
}

function ReactToMouseUp(e){
    canvas.style.cursor = "default";
    loca = GetMousePosition(e.clientX, e.clientY);
    RedrawCanvasImage();
    UpdateRubberbandOnMovement(loca);
    dragging = false;
    usingBrush = false;
}

function SaveImage(){
    var imageFile = document.getElementById("img-file");
    imageFile.setAttribute('download', 'kuva.png');
    imageFile.setAttribute('href', canvas.toDataURL());
}

function OpenImage(){
    let img = new Image();
    img.onload = function(){
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.drawImage(img,0,0);
    }
    img.src = 'kuva.png';
    
}

function UpdateRubberbandOnMovement(loca) {
    UpdateRubberbandSizeData(loca);
    drawRubberbandShape(loca);
}

function drawRubberbandShape(loca) {
    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = fillColor;

    if (currentTool === "brush") {
        DrawBrush();
    } else if(currentTool === "line") {
        ctx.beginPath();
        ctx.moveTo(mouseDown.x,mouseDown.y);
        ctx.lineTo(loca.x, loca.y);
        ctx.stroke();
    } else if (currentTool === "rectangle") {
        ctx.strokeRect(shapeBox.left, shapeBox.top,
            shapeBox.width, shapeBox.height);
    } else if (currentTool === "circle") {
        let radius = shapeBox.width;
        ctx.beginPath();
        ctx.arc(mouseDown.x, mouseDown.y, radius, 0, Math.PI * 2);
        ctx.stroke();
    } else if (currentTool === "ellipse") {
        let radiusX = shapeBox.width / 2;
        let radiusY = shapeBox.height / 2;
        ctx.beginPath();
        ctx.ellipse(mouseDown.x,mouseDown.y,radiusX,radiusY, Math.PI / 4,
            0, Math.PI*2);
            ctx.stroke();        
    } else if (currentTool === "polygon") {
        getPolygon();
        ctx.stroke();
    }
   
}

function getPolygonPoints(){
    let angle =  DegreesToRadians(GetAngleUsingXAndY(loca.x, loca.y));
 
    let radiusX = shapeBox.width;
    let radiusY = shapeBox.height;
    let polygonPoints = [];
 
    for(let i = 0; i < polygonSides; i++){
        polygonPoints.push(new PolygonPoint(loca.x + radiusX * Math.sin(angle),
        loca.y - radiusY * Math.cos(angle)));

        angle += 2 * Math.PI / polygonSides;
    }
    return polygonPoints;
}

function getPolygon(){
    let polygonPoints = getPolygonPoints();
    ctx.beginPath();
    ctx.moveTo(polygonPoints[0].x, polygonPoints[0].y);
    for(let i = 1; i < polygonSides; i++){
        ctx.lineTo(polygonPoints[i].x, polygonPoints[i].y);
    }
    ctx.closePath();
}

function AddBrushPoint(x,y,mouseDown) {
    brushXPoints.push(x);
    brushYPoints.push(y);
    brushDownPos.push(mouseDown);
}

function DrawBrush(){
    for(let i = 1; i < brushXPoints.length; i++){
        ctx.beginPath();

        if(brushDownPos[i]){
            ctx.moveTo(brushXPoints[i-1], brushYPoints[i-1]);
        } else {
            ctx.moveTo(brushXPoints[i]-1, brushYPoints[i]);
        }
        ctx.lineTo(brushXPoints[i], brushYPoints[i]);
        ctx.closePath();
        ctx.stroke();
    }
}