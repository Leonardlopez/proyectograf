
//import { Input } from './Input.js';
import { Obj3D } from './Obj3D.js';
//import { Canvas3D } from './Canvas3D.js';
//import { CvWireframe } from './CvWireFrame.js';
import { CvHLines } from './CvHLines.js';
import { Rota3D } from './Rota3D.js';
import { Point3D } from './point3D.js';

let canvas: HTMLCanvasElement;
let graphics: CanvasRenderingContext2D;

canvas = <HTMLCanvasElement>document.getElementById('circlechart');
graphics = canvas.getContext('2d');

let cv: CvHLines;
let obj: Obj3D;
let ang: number=0;
let pza1: number=0;


function leerArchivo(e:any) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
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

function mostrarContenido(contenido:any) {
  var elemento = document.getElementById('contenido-archivo');
  //
  //readObject(new Input(contenido));
  elemento.innerHTML = contenido;
}

function vp(dTheta:number, dPhi:number, fRho:number):void{  // Viewpoint
  if (obj != undefined) {
    let obj: Obj3D = cv.getObj();
    if (!obj.vp(cv, dTheta, dPhi, fRho))
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
  let af = 20;
   if(pza1<=3){
    Rota3D.initRotate( obj.w[16], obj.w[18], -af*Math.PI/180);	

    for (let i = 15; i <= 18; i++){
      obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    for (let i = 170; i <= 173; i++){
      obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    cv.setObj(obj);
    cv.paint();	
	Rota3D.initRotate( obj.w[24], obj.w[26], af*Math.PI/180);	
  for (let i = 24; i <= 27; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  
	cv.setObj(obj);
  cv.paint();	
  
  Rota3D.initRotate( obj.w[29], obj.w[30], -af*Math.PI/180);	
  for (let i = 28; i <= 31; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  
	cv.setObj(obj);
  cv.paint();
  pza1++;
  console.log(pza1);

  }else{alert('a llegado a su limite,No se puede abrir mas ');}
}

function Cerrar() {
  let af = 20;
   if(pza1 > 0 && pza1 <= 4){
    Rota3D.initRotate( obj.w[16], obj.w[18], +af*Math.PI/180);	

    for (let i = 15; i <= 18; i++){
      obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    for (let i = 170; i <= 173; i++){
      obj.w[i] = Rota3D.rotate(obj.w[i]);
    }
    cv.setObj(obj);
    cv.paint();	
	Rota3D.initRotate( obj.w[24], obj.w[26], -af*Math.PI/180);	
  for (let i = 24; i <= 27; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  
	cv.setObj(obj);
  cv.paint();	
  
  Rota3D.initRotate( obj.w[29], obj.w[30], +af*Math.PI/180);	
  for (let i = 28; i <= 31; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  
	cv.setObj(obj);
  cv.paint();
  pza1--;
  console.log(pza1);
  
  }else{alert('No se puede cerrar a llegado a su limite');}
}


function pza12DerFunc() {
  let af = 10;
 	
	Rota3D.initRotate( obj.w[141], obj.w[142], af*Math.PI/180);	

  for (let i = 81; i <= 8; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
	cv.setObj(obj);
  cv.paint();	
}

function pza12IzqFunc() {
  let af = -10;
  console.log(obj.w[29], obj.w[30]);
	Rota3D.initRotate( obj.w[29], obj.w[30], af*Math.PI/180);	
	
  for (let i = 101; i <= 140; i++){
    obj.w[i] = Rota3D.rotate(obj.w[i]);
	}
  for (let i = 201; i <= 238; i++){
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

let Pix: number, Piy: number;
let Pfx: number, Pfy: number;
let theta = 0.3, phi = 1.3, SensibilidadX = 0.02, SensibilidadY = 0.02;
let flag: boolean = false;

function handleMouse(evento: any) {
  Pix=evento.offsetX;
  Piy = evento.offsetY;
  flag = true;
}

function makeVizualization(evento: any) {
  if (flag) {
    Pfx = evento.offsetX;
    Pfy = evento.offsetY;
    //console.log(Pfx, Pfy)
    let difX = Pix - Pfx;
    let difY = Pfy - Piy;
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