//import { Input } from './Input.js';
import { Obj3D } from './Obj3D.js';
//import { Canvas3D } from './Canvas3D.js';
//import { CvWireframe } from './CvWireFrame.js';
import { CvHLines } from './CvHLines.js';
import { Rota3D } from './Rota3D.js';
var canvas;
var graphics;
canvas = document.getElementById('circlechart');
graphics = canvas.getContext('2d');
var cv;
var obj;
var ang = 0;
var pza1 = 0;
function leerArchivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    var lector = new FileReader();
    lector.onload = function (e) {
        var contenido = e.target.result;
        mostrarContenido(contenido);
        obj = new Obj3D();
        if (obj.read(contenido)) {
            //sDir = sDir1;
            cv = new CvHLines(graphics, canvas);
            cv.setObj(obj);
            cv.paint();
        }
    };
    lector.readAsText(archivo);
}
function mostrarContenido(contenido) {
    var elemento = document.getElementById('contenido-archivo');
    //
    //readObject(new Input(contenido));
    elemento.innerHTML = contenido;
}
function vp(dTheta, dPhi, fRho) {
    if (obj != undefined) {
        var obj_1 = cv.getObj();
        if (!obj_1.vp(cv, dTheta, dPhi, fRho))
            alert('datos no validos');
    }
    else
        alert('aun no has leido un archivo');
}
function eyeDownFunc() {
    vp(0, 0.1, 1);
}
function eyeUpFunc() {
    vp(0, -0.1, 1);
}
function eyeLeftFunc() {
    vp(-0.1, 0, 1);
}
function eyeRightFunc() {
    vp(0.1, 0, 1);
}
function incrDistFunc() {
    vp(0, 0, 2);
}
function decrDistFunc() {
    vp(0, 0, 0.5);
}
function Abrir() {
    var af = 20;
    if (pza1 <= 3) {
        Rota3D.initRotate(obj.w[16], obj.w[18], -af * Math.PI / 180);
        for (var i = 15; i <= 18; i++) {
            obj.w[i] = Rota3D.rotate(obj.w[i]);
        }
        for (var i = 170; i <= 173; i++) {
            obj.w[i] = Rota3D.rotate(obj.w[i]);
        }
        cv.setObj(obj);
        cv.paint();
        Rota3D.initRotate(obj.w[24], obj.w[26], af * Math.PI / 180);
        for (var i = 24; i <= 27; i++) {
            obj.w[i] = Rota3D.rotate(obj.w[i]);
        }
        cv.setObj(obj);
        cv.paint();
        Rota3D.initRotate(obj.w[29], obj.w[30], -af * Math.PI / 180);
        for (var i = 28; i <= 31; i++) {
            obj.w[i] = Rota3D.rotate(obj.w[i]);
        }
        cv.setObj(obj);
        cv.paint();
        pza1++;
        console.log(pza1);
    }
    else {
        alert('a llegado a su limite,No se puede abrir mas ');
    }
}
function Cerrar() {
    var af = 20;
    if (pza1 > 0 && pza1 <= 4) {
        Rota3D.initRotate(obj.w[16], obj.w[18], +af * Math.PI / 180);
        for (var i = 15; i <= 18; i++) {
            obj.w[i] = Rota3D.rotate(obj.w[i]);
        }
        for (var i = 170; i <= 173; i++) {
            obj.w[i] = Rota3D.rotate(obj.w[i]);
        }
        cv.setObj(obj);
        cv.paint();
        Rota3D.initRotate(obj.w[24], obj.w[26], -af * Math.PI / 180);
        for (var i = 24; i <= 27; i++) {
            obj.w[i] = Rota3D.rotate(obj.w[i]);
        }
        cv.setObj(obj);
        cv.paint();
        Rota3D.initRotate(obj.w[29], obj.w[30], +af * Math.PI / 180);
        for (var i = 28; i <= 31; i++) {
            obj.w[i] = Rota3D.rotate(obj.w[i]);
        }
        cv.setObj(obj);
        cv.paint();
        pza1--;
        console.log(pza1);
    }
    else {
        alert('No se puede cerrar a llegado a su limite');
    }
}
function pza12DerFunc() {
    var af = 10;
    Rota3D.initRotate(obj.w[141], obj.w[142], af * Math.PI / 180);
    for (var i = 81; i <= 8; i++) {
        obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    cv.setObj(obj);
    cv.paint();
}
function pza12IzqFunc() {
    var af = -10;
    console.log(obj.w[29], obj.w[30]);
    Rota3D.initRotate(obj.w[29], obj.w[30], af * Math.PI / 180);
    for (var i = 101; i <= 140; i++) {
        obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    for (var i = 201; i <= 238; i++) {
        obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    cv.setObj(obj);
    cv.paint();
}
document.getElementById('file-input').addEventListener('change', leerArchivo, false);
document.getElementById('eyeDown').addEventListener('click', eyeDownFunc, false);
document.getElementById('eyeUp').addEventListener('click', eyeUpFunc, false);
document.getElementById('eyeLeft').addEventListener('click', eyeLeftFunc, false);
document.getElementById('eyeRight').addEventListener('click', eyeRightFunc, false);
document.getElementById('incrDist').addEventListener('click', incrDistFunc, false);
document.getElementById('decrDist').addEventListener('click', decrDistFunc, false);
//movimiento de piezas
document.getElementById('pza1Izq').addEventListener('click', Abrir, false);
document.getElementById('pza1Der').addEventListener('click', Cerrar, false);
var Pix, Piy;
var Pfx, Pfy;
var theta = 0.3, phi = 1.3, SensibilidadX = 0.02, SensibilidadY = 0.02;
var flag = false;
function handleMouse(evento) {
    Pix = evento.offsetX;
    Piy = evento.offsetY;
    flag = true;
}
function makeVizualization(evento) {
    if (flag) {
        Pfx = evento.offsetX;
        Pfy = evento.offsetY;
        //console.log(Pfx, Pfy)
        var difX = Pix - Pfx;
        var difY = Pfy - Piy;
        vp(0, 0.1 * difY / 50, 1);
        Piy = Pfy;
        vp(0.1 * difX, 0 / 50, 1);
        Pix = Pfx;
        /*if( Piy>Pfy+1 ){
          phi += SensibilidadY;
          vp(0, 0.1*, 1);
          //cv.redibuja(theta, phi, tamanoObjeto);
          Piy=Pfy;
        }
    
        if(Pfy>Piy+1){
          phi -= SensibilidadY;
          vp(0,-0.1, 1);
          //cv.redibuja(theta, phi, tamanoObjeto);
          Piy=Pfy;
        }*/
        /*if (Pix > Pfx + 1) {
          theta += SensibilidadX;
          vp(0.1, 0, 1);
          //cv.redibuja(theta, phi, tamanoObjeto);
          Pix = Pfx;
        }
            
        if (Pfx > Pix + 1) {
          theta -= SensibilidadX;
          vp(-0.1, 0, 1);
          //cv.redibuja(theta, phi, tamanoObjeto);
          Pix = Pfx;
        }*/
    }
}
function noDraw() {
    flag = false;
}
canvas.addEventListener('mousedown', handleMouse);
canvas.addEventListener('mouseup', noDraw);
canvas.addEventListener('mousemove', makeVizualization);
