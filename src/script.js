import './style.css'
import * as THREE from 'three';
import gsap from 'gsap';

// Scene

// Cursor
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener(
    'mousemove',
    (event) => {
        cursor.x = event.clientX / 500 - 0.5;
        cursor.y = -(event.clientY / 500 - 0.5);
        console.log(cursor.y);
    }
    );

const scene = new THREE.Scene();


//Group
// const group = new THREE.Group();
// scene.add( group );

// const cube1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial({color: 0xffff00}),
// );
// const cube2 = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial({color: 0xff0000}),
// );
// cube2.position.set(1,0,0);
// const cube3 = new THREE.Mesh(
//     new THREE.BoxGeometry(1,1,1),
//     new THREE.MeshBasicMaterial({color: 0x0000ff}),
// );
// cube3.position.set(2,0,0);

// group.add( cube1 );
// group.add( cube2 );
// group.add( cube3 );
// group.position.set(0,0,0);
// group.rotation.set(0,0,0);
//Object
const group = new THREE.Group();
scene.add( group );
const geometry= new THREE.BoxGeometry(1,1,1);
const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0x000000}));
const material = new THREE.MeshBasicMaterial({color: 0xffff00,  side: THREE.BackSide});
const mesh = new THREE.Mesh(geometry, material);
scene.add( line );
scene.add( mesh );
group.add( line );
group.add( mesh );
group.rotation.reorder('YXZ');
group.position.set(0,0,0);
group.rotation.set(0,0,0);
group.scale.set(0.5,0.5,0.5);


// Axes helper

const axesHelper = new THREE.AxesHelper(1);
scene.add( axesHelper );

// Camera
const camera = new THREE.PerspectiveCamera(50, 1, 0.1 , 100);
// const camera = new THREE.OrthographicCamera(-1,1,1,-1,0.1,100); 
camera.position.set(0,0,4);
camera.rotation.set(0,0,0);
// camera.lookAt(mesh.position);
scene.add( camera );

// Rendererp
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize( 500, 500 );

renderer.render( scene, camera );

// Clock
const clock = new THREE.Clock();

// GSAP
// gsap.to( 
//     group.position,
//     { 
//         duration: 1,
//         delay: 1,
//         x: 2
//     }
// )
// gsap.to( 
//     group.position,
//     { 
//         duration: 1,
//         delay: 3,
//         x: 1
//     }
// )
// Animations
const animationLoop = () => {

    //sync with screen refresh rate
    const elapsedTime = clock.getElapsedTime();

    //add animation
    // group.rotation.y = elapsedTime;
    
    // Camera sync with event
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
    // camera.lookAt(group.position);

    renderer.render( scene, camera );

    requestAnimationFrame(animationLoop);
    
};
animationLoop();