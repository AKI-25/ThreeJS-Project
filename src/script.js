import './style.css'
import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
// const geometry = new THREE.Geometry();
// for (let i = 0; i < 100; i++) {
//     for (let j = 0; j < 3; j++) {
//         geometry.vertices.push(new THREE.Vector3(
//             (Math.random() - 0.5) * 4, 
//             (Math.random() - 0.5) * 4, 
//             (Math.random() - 0.5) * 4
//             )
//         );
//     }
//     geometry.faces.push(new THREE.Face3(
//         i*3, 
//         i*3+1, 
//         i*3+2
//     ));
// }
const geometry= new THREE.BoxBufferGeometry(1,1,1,2,2,2);

// const positionsArray = new Float32Array([
//     0,0,0, //0
//     0,1,0, //1
//     1,0,0, //2
// ]);



// const count = 4;
// const positionsArray = new Float32Array(count * 3 * 3);
// for (let i = 0; i < count * 3 * 3; i++) {
//     positionsArray[i] = (Math.random() - 0.5) * 4;
// }
// const geometry = new THREE.BufferGeometry();
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
// geometry.setAttribute('position', positionsAttribute);

const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0x000000}));
const material = new THREE.MeshBasicMaterial({
    color: 0xffff00,  
    side: THREE.BackSide,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add( line );
scene.add( mesh );
group.add( line );
group.add( mesh );
group.rotation.reorder('XYZ');
group.position.set(0,0,0);
group.rotation.set(0,0,0);
group.scale.set(0.5,0.5,0.5);


// Axes helper

const axesHelper = new THREE.AxesHelper(1);
scene.add( axesHelper );

const canvasDimension = {
    width: window.innerWidth,
    height: window.innerHeight
};

// Camera
const camera = new THREE.PerspectiveCamera(50, canvasDimension.width/canvasDimension.height, 0.1 , 100);
// const camera = new THREE.OrthographicCamera(-1,1,1,-1,0.1,100); 
camera.position.set(0,0,4);
camera.rotation.set(0,0,0);
// camera.lookAt(mesh.position);
scene.add( camera );


// Renderer
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

window.addEventListener('resize', () => {
    // Update sizes
    canvasDimension.width = window.innerWidth;
    canvasDimension.height = window.innerHeight;

    // Update camera
    camera.aspect = canvasDimension.width / canvasDimension.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize( canvasDimension.width, canvasDimension.height );
    renderer.setPixelRatio( Math.min(window.devicePixelRatio, 3) );
});
window.addEventListener('dblclick', () => {
    const target= camera.position;
    if(Math.abs(target.z)>0.01 && Math.abs(target.y)>0.01 && Math.abs(target.x)>0.01){
        gsap.to( 
            camera.position,
            { 
                duration: 1.5,
                delay: 0,
                x: 0,
                y: 0,
                z: 4
            }
        )
    }
});
renderer.setSize( canvasDimension.width, canvasDimension.height );
renderer.setPixelRatio( Math.min(window.devicePixelRatio, 3) );
renderer.render( scene, camera );

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// Clock
const clock = new THREE.Clock();

// GSAP

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

    // Update controls
    controls.update();

    renderer.render( scene, camera );

    requestAnimationFrame(animationLoop);
    
};
animationLoop();