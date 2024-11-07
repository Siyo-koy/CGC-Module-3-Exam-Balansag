// Alysza Mae T. Balansag
// I only learned this today man I am going to die.
// "Everything is just like Ren'py GUI if you're crazy enough" - My mantra

const scene = new THREE.Scene();
const aspect = window.innerWidth/window.innerHeight;
const camera = new THREE.OrthographicCamera(-7 * aspect, 7 * aspect, 7, -7, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

scene.background = new THREE.Color ( 0xffffff );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

/// insert code here

// Lighting
const light = new THREE.HemisphereLight( 0xe3c8a3 , 0x365f75, 1);
light.position.set(0.5,1.5,0);
const ambientLight = new THREE.AmbientLight( 0x909040 );

// Items
const room = createRoom();
const leftWindow1 = createWindow();
const leftWindow2 = createWindow();
const bed = createBed();
const rug = createRug();
const door = createDoor();
const lamp = createLamp();
const easel = createEasel();
const stool = createStool();
const dresser = createDresser();   
const book = createBook(); 
const mug = createMug();
const Poster = createPoster();
const laptop = createLaptop();
const cardboard = createCardboard();

// Positions
room.position.set(1.5,0,1.5);
leftWindow1.position.set(-3.2,2,0.25);
leftWindow2.position.set(-3.2,2,4.25);
bed.position.set(-.3,0,-0.6);
rug.position.set(1.5,-1.4,1.5);
door.position.set(2,1.4,-3.3);
lamp.position.set(-2.5, 1.2, -2.5);
easel.position.set(4,1.4,5);
stool.position.set(4.5,1,2.5);
dresser.position.set(-0.1,0.25,5.5);
book.position.set(-3.5,-2,-2);
mug.position.set(0.7,1.5,5);
Poster.position.set(-0.1,3.225,-3);
laptop.position.set(-0.5,1.8,5.8);
cardboard.position.set(5.6,0,);

easel.rotation.y = 0.5;
stool.rotation.y = -0.5
cardboard.rotation.y = 0.4;

/// Scene declerations
scene.add(room);
scene.add(ambientLight);
scene.add(light);
scene.add(leftWindow1);
scene.add(leftWindow2);
scene.add(bed);
scene.add(rug);
scene.add(door);
scene.add(lamp);
scene.add(easel);
scene.add(stool);
scene.add(dresser);
scene.add(book);
scene.add(mug);
scene.add(Poster);
scene.add(laptop);
scene.add(cardboard);

// Camera positioning
camera.position.set(7,7,7);
camera.lookAt(0,0,0);

// runs 60fps or 30fps
function animate(){
    requestAnimationFrame(animate);

    if ( scene ) {
        scene.rotation.y = Math.sin(Date.now() * 0.0002) * Math.PI * 0.1;
    }

    // End
    renderer.render( scene, camera);
}

animate();
