// ThreeJS scene
'use strict';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


let sky = new THREE.Sky();
scene.add( sky.mesh );

// Add Sun Helper
let sunSphere = new THREE.Mesh(
	new THREE.SphereBufferGeometry( 20000, 16, 8 ),
	new THREE.MeshBasicMaterial( { color: 0xffffff } )
);

sunSphere.position.y = -700000;
sunSphere.visible = false;
scene.add( sunSphere );

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
	render();
}

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
