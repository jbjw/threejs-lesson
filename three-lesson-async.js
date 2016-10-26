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
// base 64 encode textures?

// var img = new Image();
// img.crossOrigin = "anonymous";
// img.src = "https://graph.facebook.com/1387819034852828/picture?width=150&height=150";

const loader = new THREE.TextureLoader();
loader.crossOrigin = 'anonymous';

const woodTexture = loader.load( 'https://raw.githubusercontent.com/jbjw/threejs-lesson/master/wood.jpg' );
woodTexture.anisotropy = renderer.getMaxAnisotropy()
woodTexture.wrapS = THREE.RepeatWrapping;
woodTexture.wrapT = THREE.RepeatWrapping;

const dirtTexture = loader.load( 'https://raw.githubusercontent.com/jbjw/threejs-lesson/master/dirt.jpg' );
dirtTexture.anisotropy = renderer.getMaxAnisotropy()
dirtTexture.wrapS = THREE.RepeatWrapping;
dirtTexture.wrapT = THREE.RepeatWrapping;

init();

function init() {
	const woodMaterial = new THREE.MeshBasicMaterial( { map: woodTexture } );
	const dirtMaterial = new THREE.MeshBasicMaterial( { map: dirtTexture } );
	const dirtPlaneMaterial = new THREE.MeshBasicMaterial( { map: dirtTexture, side: THREE.DoubleSide} );
	const wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );

	const boxGeometry = new THREE.BoxGeometry( 5, 5, 5 );
	let cube = new THREE.Mesh( boxGeometry, woodMaterial );
	cube.position.z = 2.5;
	scene.add( cube );

	const planeGeometry = new THREE.PlaneGeometry( 100, 100, 32, 32 );
	let plane = new THREE.Mesh( planeGeometry, dirtPlaneMaterial );
	scene.add( plane );

	camera.position.z = 10;
	camera.position.x = 0;
	camera.position.y = -20;

	camera.rotation.x = 1;

	render();

	function render() {
		requestAnimationFrame( render );

		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;
		cube.position.x += 0.01;

		renderer.render(scene, camera);
	};

}
