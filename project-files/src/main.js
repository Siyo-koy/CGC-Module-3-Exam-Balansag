import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { Water } from 'three/addons/objects/Water.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap


let water

const minPan = new THREE.Vector3(-210,0,-80);
const maxPan = new THREE.Vector3(210,0,100);
const _v = new THREE.Vector3(); 
controls.addEventListener('change',(event)=>{
  _v.copy(controls.target);
  controls.target.clamp(minPan,maxPan);
  _v.sub(controls.target);
  camera.position.sub(_v);
})

scene.background = new THREE.CubeTextureLoader()
	.load( [
  'models/textures/skybox/skyboxSide.png', // right
  'models/textures/skybox/skyboxSide.png', // left
  'models/textures/skybox/skyboxTop.png', // top
  'models/textures/skybox/skyboxBottom.png', // bottom
  'models/textures/skybox/skyboxSide.png', // front
  'models/textures/skybox/skyboxSide.png', // back
],
function (loadedTexture) {
  console.log('Skybox loaded successfully!');
  scene.background = loadedTexture; // Set the skybox once it's loaded
},
undefined, // Optional progress callback
function (error) {
  console.error('Error loading skybox images:', error);
}
);


controls.maxPolarAngle =  Math.PI * 0.45;
controls.maxTargetRadius = 20;
//scene.background = new THREE.Color ( 0x447da0  );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

/// insert code here

// Lighting

const rectLight = new THREE.RectAreaLight( 0x3f7ba0, 4, 500, 500 );
const ambientLight = new THREE.AmbientLight( 0xffffff , 3);
const directionalLight = new THREE.DirectionalLight (0xffffff, 10);

// Enable shadow for directional light
directionalLight.castShadow = true;

// Initialize shadow properties
directionalLight.shadow.mapSize.width = 512; // default
directionalLight.shadow.mapSize.height = 512; // default
directionalLight.shadow.camera.near = 0.5; // default
directionalLight.shadow.camera.far = 500; // default
directionalLight.shadow.camera.left = -500;
directionalLight.shadow.camera.right = 500;
directionalLight.shadow.camera.top = 500;
directionalLight.shadow.camera.bottom = -500;
directionalLight.shadow.opacity = 1.0; // Set shadow opacity to make it darker

directionalLight.position.set(0, 10, 0);

// Set shadow bias to avoid self-shadowing artifacts (optional)
directionalLight.shadow.bias = -0.01;

scene.add(ambientLight);
scene.add(directionalLight);
scene.add(rectLight);
scene.fog = new THREE.FogExp2( 0xA9B0B5, 0.014 );

rectLight.position.z = 200;

//Imports from items.js
//import { createWater } from './items';
import { createWaterBottom } from './items';
import { createRock } from './items';
import { createHouse } from './items';
import { createTree } from './items';
import { createFoundation } from './items';
import { createBush } from './items';

// Constants
//const room = createRoom();
//const water = createWater();
const waterBottom = createWaterBottom();
const house = createHouse();
const rock = createRock();
const tree = createTree();
const foundation = createFoundation();
const bush1 = createBush();
const bush2 = createBush();
const bush3 = createBush();

// Add to scene
//scene.add(water);
scene.add(waterBottom);
scene.add(house);
scene.add(rock);
scene.add(tree);
scene.add(foundation);
scene.add(bush1);
scene.add(bush2);
scene.add(bush3);

// Function to generate a random position within a radius
// Define the target position (e.g., around the house)
const spawnCenter1 = new THREE.Vector3(-7, 2, -7); // Use the position of the house or another point in the scene

// Function to generate a random position within a radius around the spawn center
function getRandomPositionAroundTarget(radius, center) {
  const x = Math.random() * radius * 2 - radius; // Random x within radius
  const z = Math.random() * radius * 2 - radius; // Random z within radius
  return new THREE.Vector3(center.x + x, center.y, center.z + z); // Offset by the center position
}

// Set the radius within which bushes will be placed
const bushSpawnRadius1 = 2;

// Create and position multiple bushes randomly
const numBushes1 = 10; // Number of bushes to spawn
for (let i = 0; i < numBushes1; i++) {
  const bush = createBush(); // Create a new bush
  const randomPosition = getRandomPositionAroundTarget(bushSpawnRadius1, spawnCenter1); // Generate a random position around the target
  bush.position.set(randomPosition.x, randomPosition.y, randomPosition.z); // Set the position of the bush
  scene.add(bush); // Add the bush to the scene
}

const numBushes2 = 15; // Number of bushes to spawn
const spawnCenter2 = new THREE.Vector3(-10, 1.55, -1); // Use the position of the house or another point in the scene
const bushSpawnRadius2 = 3;
for (let i = 0; i < numBushes2; i++) {
  const bush = createBush(); // Create a new bush
  const randomPosition = getRandomPositionAroundTarget(bushSpawnRadius2, spawnCenter2); // Generate a random position around the target
  bush.position.set(randomPosition.x, randomPosition.y, randomPosition.z); // Set the position of the bush
  scene.add(bush); // Add the bush to the scene
}

const numBushes3 = 15; // Number of bushes to spawn
const spawnCenter3 = new THREE.Vector3(20, 1.4, -15); // Use the position of the house or another point in the scene
const bushSpawnRadius3 = 3;
for (let i = 0; i < numBushes3; i++) {
  const bush = createBush(); // Create a new bush
  const randomPosition = getRandomPositionAroundTarget(bushSpawnRadius3, spawnCenter3); // Generate a random position around the target
  bush.position.set(randomPosition.x, randomPosition.y, randomPosition.z); // Set the position of the bush
  scene.add(bush); // Add the bush to the scene
}
// Positions
house.position.set(-5.4,2.9,-13);
tree.position.y = 2;
foundation.position.set(-5.7,.9,-13);
bush1.position.set(-5,2,-6);
bush2.position.set(-3,2.1,-7);
bush3.position.set(-7,2.1,-7);

// Camera positioning
camera.position.set(14,14,14);
camera.lookAt(0,0,0);

// Shadows
house.castShadow = true;
house.recieveShadow = true;
rock.receiveShadow = true;

// Water

const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

water = new Water(
  waterGeometry,
  {
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load( 'models/textures/waternormals.jpg', function ( texture ) {

      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    } ),
    sunDirection: new THREE.Vector3(),
    sunColor: 0xffffff,
    waterColor: 0x5a90a8,
    distortionScale: 3.7,
    fog: scene.fog !== undefined
  }
);

water.rotation.x = - Math.PI / 2;

scene.add( water );


// Rain

let stars, starGeo;
particles();

function particles() {
  const points = [];

  for (let i = 0; i < 60000; i++) {
    let star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    points.push(star);
  }

  starGeo = new THREE.BufferGeometry().setFromPoints(points);

  let starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.2,
    transparent: 0.5,
  });

  stars = new THREE.Points(starGeo, starMaterial);
  scene.add(stars);
}

function animateParticles() {
  let positions = starGeo.attributes.position.array; 
  for (let i = 1; i < positions.length; i += 3) { 
    positions[i] -= 0.9; 
    if (positions[i] < -300) positions[i] = 300; 
  }

  starGeo.attributes.position.needsUpdate = true; 
}

function animate() {
  requestAnimationFrame(animate); 
  
  controls.update();
  animateParticles();
  render();
  renderer.render(scene, camera); 
}

function render() {

  const time = performance.now() * 0.001;

  water.material.uniforms[ 'time' ].value += 0.2 / 60.0;

}

animate();
