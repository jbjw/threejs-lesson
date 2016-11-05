// ThreeJS Lesson
'use strict';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xdddddd, 1);
document.body.appendChild( renderer.domElement );
const loader = new THREE.TextureLoader();
// loader.crossOrigin = 'anonymous';

var skyLoader = new THREE.CubeTextureLoader();
skyLoader.setPath( 'textures/sky/' );

var skyTexture = skyLoader.load( [
	'px.png', 'nx.png',
	'py.png', 'ny.png',
	'pz.png', 'nz.png'
] );

var skyMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );

// position, rotation, scale
// THREE.Vector3( x, y, z );
// THREE.Euler( x, y, z );

// https://raw.githubusercontent.com/jbjw/threejs-lesson/master/wood.jpg
// https://raw.githubusercontent.com/jbjw/threejs-lesson/master/dirt.jpg

init();

function init() {
	const woodTexture = loader.load( 'https://raw.githubusercontent.com/jbjw/threejs-lesson/master/wood.jpg' );
	woodTexture.anisotropy = renderer.getMaxAnisotropy()
	woodTexture.wrapS = THREE.RepeatWrapping; woodTexture.wrapT = THREE.RepeatWrapping;
	const woodMaterial = new THREE.MeshBasicMaterial( { map: woodTexture } );

	const dirtTexture = loader.load( 'https://raw.githubusercontent.com/jbjw/threejs-lesson/master/dirt.jpg' );
	dirtTexture.anisotropy = renderer.getMaxAnisotropy()
	dirtTexture.wrapS = THREE.RepeatWrapping; dirtTexture.wrapT = THREE.RepeatWrapping;
	const dirtMaterial = new THREE.MeshBasicMaterial( { map: dirtTexture } );
	const dirtPlaneMaterial = new THREE.MeshBasicMaterial( { map: dirtTexture, side: THREE.DoubleSide} );

	const wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );

	const boxGeometry = new THREE.BoxGeometry( 5, 5, 5, );
	let cube = new THREE.Mesh( boxGeometry, woodMaterial );
	cube.position.z = 5;
	scene.add( cube );

	const planeGeometry = new THREE.PlaneGeometry( 100, 100, 32, 32 );
	let plane = new THREE.Mesh( planeGeometry, dirtPlaneMaterial );
	scene.add( plane );

	var light = new THREE.PointLight( 0xFFFF00 );
	light.position.set( 10, 0, 10 );
	scene.add( light );

	camera.position.z = 10;
	camera.position.x = 0;
	camera.position.y = -20;

	camera.rotation.x = 1;

	var tick = 0;
	var speed = 0.01;

	render();

	function render() {
		requestAnimationFrame( render );

		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;

		cube.position.x = 10 * Math.sin(tick*speed);
		cube.position.y = 10 * Math.cos(tick*speed);

		light.position.x = 10 * Math.sin(tick*speed);
		light.position.y = 10 * Math.sin(tick*speed);

		// camera.lookAt( cube.position );

		tick++;
		renderer.render(scene, camera);
	};
}
