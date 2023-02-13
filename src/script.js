import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap';
import * as dat from 'dat.gui';

/**
 * Base
 */
const parameters = {
    color: 0xff0000,
    spin: () =>
    {
        gsap.to(
            group.rotation, 
            1, 
            { 
                y: group.rotation.y + Math.PI * 2 
            }
        )
    },
    save: () =>
    {
        console.log('save');
    }
}




// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const group = new THREE.Group();
scene.add( group );
const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0x000000}));
const material = new THREE.MeshBasicMaterial({
    color: parameters.color,  
    side: THREE.BackSide,
});
console.log(material.color);
console.log(material.color.getHexString());
const mesh = new THREE.Mesh(geometry, material);
scene.add( line );
scene.add( mesh );
group.add( line );
group.add( mesh );

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Debug
 */
const gui = new dat.GUI({
    closed: true,
    width: 400
})
// gui.hide()
gui.add(mesh.position, 'y')
    .min(- 3)
    .max(3)
    .step(0.01)
    .name('elevation')
gui.add(mesh, 'visible').name('cube visibility');
gui.add(material, 'wireframe');
gui.add(line, 'visible')
    .name('edges visibility');
gui.addColor(parameters, 'color')
    .onChange(() =>
    {
        line.material.color.set(parameters.color)
    })
    .name('edges color');
// gui.add(parameters, 'line color')
gui.addColor(parameters, 'color')
    .onChange(() =>
    {
        material.color.set(parameters.color)
    })

gui.add(parameters, 'spin')

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()