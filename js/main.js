import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.114/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.114/examples/jsm/controls/OrbitControls.js";
import { DragControls } from "https://cdn.jsdelivr.net/npm/three@0.114/examples/jsm/controls/DragControls.js";

// basic frameset template
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000);
let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth-150, window.innerHeight );

let viewport = document.querySelector(".viewport");
viewport.appendChild( renderer.domElement );

// update viewport on window resize
window.addEventListener( 'resize', () => {
    const width = window.innerWidth-150;
    const height = window.innerHeight;

    renderer.setSize( width, height );
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
} );

// create the shape
let geometry = new THREE.BoxGeometry ( 1, 1, 1 );

// create a material, colour or image texture
let material_red = new THREE.MeshBasicMaterial( { color: 0xEE5253, wireframe: true } );
let cube_red = new THREE.Mesh( geometry, material_red );
let material_green = new THREE.MeshBasicMaterial( { color: 0x00FF00, wireframe: true } );
let cube_green = new THREE.Mesh( geometry, material_green );

scene.add( cube_red );
scene.add( cube_green );

let objects = [];
objects.push(cube_red, cube_green);

const orbitControls = new OrbitControls( camera, renderer.domElement ); // THREE.OrbitControls
const dragControls = new DragControls( objects, camera, renderer.domElement ); // THREE.DragControls

// firstly, camera is rendered with all the objects at the same position; need to change that
camera.position.z = 5;
cube_red.position.x = 2.5;
cube_green.position.x = -2.5;

// ambient light isn't important here, 'cause cubes are from basic material
let ambientLight = new THREE.AmbientLight( 0xFFFFFF, 2.0); 
scene.add( ambientLight );

// game logic
let update = () => {
    // animation can be added here
};

// draw Scene
let render = () => {
    renderer.render( scene, camera );
};

// run game loop ( update, render, repeat )
let gameLoop = () => {
    requestAnimationFrame( gameLoop );

    update();
    render();
};

gameLoop();

// panel customize

let panel = document.querySelector(".panel");
let panelWidth = window.innerWidth - ( window.innerWidth - 150 );

panel.style.width = `${panelWidth}px`;

// adding objects
let redBlock = document.querySelector(".cube-red"),
    greenBlock = document.querySelector(".cube-green");

redBlock.onclick = () => {
    addNewObject(cube_red);
};

greenBlock.onclick = () => {
    addNewObject(cube_green);
};

let addNewObject = (object) => {
    let newObject = object.clone();
    objects.push(newObject);
    newObject.position.x = 0;
    newObject.position.y = 0;
    scene.add(newObject);
};

// update OrbitControls when dragging objects
dragControls.addEventListener( 'dragstart',  () => {
    orbitControls.enabled = false;
});

dragControls.addEventListener( 'dragend', () => {
    orbitControls.enabled = true;
});
