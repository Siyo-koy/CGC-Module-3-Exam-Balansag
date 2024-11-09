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


controls.maxPolarAngle =  Math.PI * 0.475;
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
import { createRoundTree, createWaterBottom } from './items';
import { createRock } from './items';
import { createHouse } from './items';
import { createTree } from './items';
import { createFoundation } from './items';
import { createBush } from './items';
import { createCloud } from './items';

// Constants
//const room = createRoom();
//const water = createWater();
const waterBottom = createWaterBottom();
const house = createHouse();
const rock = createRock();
const tree1 = createTree();
const tree2 = createTree();
const tree3 = createTree();
const tree4 = createRoundTree();
const tree5 = createRoundTree();
const tree6 = createRoundTree();
const foundation = createFoundation();
const bush1 = createBush();
const bush2 = createBush();
const bush3 = createBush();

// Add to scene
//scene.add(water);
scene.add(waterBottom);
scene.add(house);
scene.add(rock);
scene.add(tree1);
scene.add(tree2);
scene.add(tree3);
scene.add(tree4);
scene.add(tree5);
scene.add(tree6);
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
const spawnCenter3 = new THREE.Vector3(20, 1.4, -10); // Use the position of the house or another point in the scene
const bushSpawnRadius3 = 4;
for (let i = 0; i < numBushes3; i++) {
  const bush = createBush(); // Create a new bush
  const randomPosition = getRandomPositionAroundTarget(bushSpawnRadius3, spawnCenter3); // Generate a random position around the target
  bush.position.set(randomPosition.x, randomPosition.y, randomPosition.z); // Set the position of the bush
  scene.add(bush); // Add the bush to the scene
}

const numBushes4 = 30; // Number of bushes to spawn
const spawnCenter5 = new THREE.Vector3(-30, 4.5, -5); // Use the position of the house or another point in the scene
const bushSpawnRadius5 = 8;
for (let i = 0; i < numBushes4; i++) {
  const bush = createBush(); // Create a new bush
  const randomPosition = getRandomPositionAroundTarget(bushSpawnRadius5, spawnCenter5); // Generate a random position around the target
  bush.position.set(randomPosition.x, randomPosition.y, randomPosition.z); // Set the position of the bush
  scene.add(bush); // Add the bush to the scene
}

const numTrees1 = 10; // Number of bushes to spawn
const spawnCenter4 = new THREE.Vector3(-5, 1.4, -17); // Use the position of the house or another point in the scene
const bushSpawnRadius4 = 3;
for (let i = 0; i < numTrees1; i++) {
  const bush = createTree(); // Create a new bush
  const randomPosition = getRandomPositionAroundTarget(bushSpawnRadius4, spawnCenter4); // Generate a random position around the target
  bush.position.set(randomPosition.x, randomPosition.y, randomPosition.z); // Set the position of the bush
  scene.add(bush); // Add the bush to the scene
}

const numTrees2 = 30; // Number of bushes to spawn
const spawnCenter6 = new THREE.Vector3(-30, 6, -5);  // Use the position of the house or another point in the scene
const bushSpawnRadius6 = 10;
for (let i = 0; i < numTrees2; i++) {
  const bush = createTree(); // Create a new bush
  const randomPosition = getRandomPositionAroundTarget(bushSpawnRadius6, spawnCenter6); // Generate a random position around the target
  bush.position.set(randomPosition.x, randomPosition.y, randomPosition.z); // Set the position of the bush
  scene.add(bush); // Add the bush to the scene
}

const numTrees3 = 25; // Number of bushes to spawn
const spawnCenter7 = new THREE.Vector3(15, 1.8, -15);  // Use the position of the house or another point in the scene
const bushSpawnRadius7 = 10;
for (let i = 0; i < numTrees3; i++) {
  const bush = createTree(); // Create a new bush
  const randomPosition = getRandomPositionAroundTarget(bushSpawnRadius7, spawnCenter7); // Generate a random position around the target
  bush.position.set(randomPosition.x, randomPosition.y, randomPosition.z); // Set the position of the bush
  scene.add(bush); // Add the bush to the scene
}


// Positions
house.position.set(-5.4,2.9,-13);
tree1.position.set(-0.2,2.8,-13);
tree2.position.set(1.9,2.4,-13);
tree3.position.set(-28,6.2,6);
tree4.position.set(-10.5,5,-8);
tree5.scale.set(0.6, 0.6, 0.6);
tree5.position.set(-6.5,2,-5);
tree6.scale.set(0.7, 0.7, 0.7);
tree6.position.set(20,4,-10);
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

const numClouds = 150; // Number of bushes to spawn
const cloudHeight = Math.random() * (18 - 14) + 14;
const spawnClouds = new THREE.Vector3(0, cloudHeight, 0);  // Use the position of the house or another point in the scene
const cloudsSpawnRadius = 500;

// Add an array to store cloud objects
const cloudsArray = [];

// Create and position clouds as before, but push them into the cloudsArray
for (let i = 0; i < numClouds; i++) {
  const cloud = createCloud(); // Create a new cloud
  const randomPosition = getRandomPositionAroundTarget(cloudsSpawnRadius, spawnClouds); // Generate a random position
  cloud.position.set(randomPosition.x, cloudHeight, randomPosition.z); // Set the position
  cloudsArray.push(cloud); // Add the cloud to the array and the scene
  scene.add(cloud);
}

// Cloud movement and reset logic
const cloudSpeed = 0.02;  // Adjust for how fast clouds move
const resetThreshold = 250; // Distance threshold for resetting cloud position

function animateClouds() {
  cloudsArray.forEach((cloud) => {
    // Move each cloud randomly along X, Y, and Z axis
    cloud.position.x += (Math.random() - 3) * cloudSpeed;
    cloud.position.y += 0;
    cloud.position.z += (Math.random() - 3) * cloudSpeed;

    // If the cloud moves out of bounds, reset its position
    if (cloud.position.x > resetThreshold || cloud.position.x < -resetThreshold ||
        cloud.position.y > resetThreshold || cloud.position.y < -resetThreshold ||
        cloud.position.z > resetThreshold || cloud.position.z < -resetThreshold) {
      
      const randomPosition = getRandomPositionAroundTarget(cloudsSpawnRadius, spawnClouds); // Generate new random position
      cloud.position.set(randomPosition.x, randomPosition.y, randomPosition.z); // Reset the cloud's position
    }
  });
}



function animate() {
  requestAnimationFrame(animate); 
  
  controls.update();
  animateParticles();
  animateClouds();  // Animate clouds
  render();
  renderer.render(scene, camera); 
}

function render() {

  const time = performance.now() * 0.001;

  water.material.uniforms[ 'time' ].value += 0.2 / 60.0;

}

animate();
