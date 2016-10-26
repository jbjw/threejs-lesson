// ThreeJS scene
'use strict';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// position, rotation, scale
// THREE.Vector3( x, y, z );
// THREE.Euler( x, y, z );

// https://raw.githubusercontent.com/jbjw/threejs-lesson/master/wood.jpg
// https://raw.githubusercontent.com/jbjw/threejs-lesson/master/dirt.jpg

const texture = THREE.ImageUtils.loadTexture("https://raw.githubusercontent.com/jbjw/threejs-lesson/master/wood.jpg");
const material1 = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
const material2 = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
let cube = new THREE.Mesh( geometry, material1 );
scene.add( cube );

camera.position.z = 5;

var render = function () {
	requestAnimationFrame( render );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
	cube.position.x += 0.01;


	renderer.render(scene, camera);
};

render();
