import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import { floor } from 'three/webgpu';

export function createBush(){
  const geometry = new THREE.SphereGeometry(.5, 8, 16,9,Math.PI * 2, 9, Math.PI*6);

  const color = [0x4C5332,0x535232,0x39412A];
  const randomColor = Math.floor(Math.random() * color.length);
  // Material and mesh
  const eggMaterial = new THREE.MeshToonMaterial({ color: color[randomColor] });

  const egg = new THREE.Mesh(geometry, eggMaterial);

  return egg;
}

export function createRock() {
  const room = new THREE.Group();

  // Load a GLTF model (palm tree) and add it to the room
  const gltfLoader = new GLTFLoader();
  gltfLoader.load(
    './models/rock.gltf', // Path to your GLTF model
    (gltf) => {
      // When the model is loaded, add it to the room
      const rockModel = gltf.scene;
      rockModel.scale.set(1, 1, 1); // Adjust scale if needed
      rockModel.position.set(0,0, 0); // Adjust position as needed

      room.add(rockModel);
    }
  );

  return room;
}

// try to custom make the tree using torus. or whatever the fuck you use for the tower roofin.

export function createTree() {
    const tree = new THREE.Group();
  
    // Load a GLTF model (palm tree) and add it to the room
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      './models/pine tree.gltf', // Path to your GLTF model
      (gltf) => {
        // When the model is loaded, add it to the room
        const treeModel = gltf.scene;
        treeModel.scale.set(1, 1, 1); // Adjust scale if needed
        treeModel.position.set(0,0, 0); // Adjust position as needed
  
        tree.add(treeModel);
      }
    );
  
    return tree;
  }
  

export function createWater(){
    const water = new THREE.Group();

    const waterMaterial = new THREE.MeshPhysicalMaterial();
    waterMaterial.color = new THREE.Color(0x5a90a8);
    waterMaterial.transmission = 0.9;
    waterMaterial.roughness = 0.0;
    waterMaterial.dispersion = 0.5;

    const waterGeometry = new THREE.CylinderGeometry( 100, 100, 2, 32 );

    const waterBox = new THREE.Mesh(waterGeometry, waterMaterial)
    waterBox.position.y = -1.5;

    water.add(waterBox);
    return water;

}

export function createWaterBottom(){
    const waterBottom = new THREE.Group();

    const waterBottomMaterial = new THREE.MeshToonMaterial({color: 0x405f71});

    const waterBottomGeometry = new THREE.CylinderGeometry( 100, 100, 1, 32 );

    const waterBottomBox = new THREE.Mesh(waterBottomGeometry, waterBottomMaterial)

    waterBottomBox.position.y = -3

    waterBottom.add(waterBottomBox);

    return waterBottom;

}

function createTriangle() {
    // Define the vertices of the triangle (flat plane in 2D)
    const triangleShape = new THREE.Shape();
    triangleShape.moveTo(0, .5);  // Starting point (x, y)
    triangleShape.lineTo(-1, -1);  // Second vertex (x, y)
    triangleShape.lineTo(1, -1);  // Third vertex (x, y)
    triangleShape.closePath();  // Close the path

    // Extrude the shape to give it thickness
    const extrudeSettings = {
        depth: 6,  // The depth of the extrusion (thickness)
        bevelEnabled: false  // Disable bevel to keep sharp edges
    };

    const extrudedGeometry = new THREE.ExtrudeGeometry(triangleShape, extrudeSettings);

    // Create a basic material (using a color, but you can use textures or other materials)
    const triangleMaterial = new THREE.MeshBasicMaterial({ color: 0x7F4B4C, side: THREE.DoubleSide });

    // Create the mesh using the extruded geometry and material
    const triangle = new THREE.Mesh(extrudedGeometry, triangleMaterial);

    triangle.rotation.y = Math.PI / 2;

    return triangle;
}

function createRoof1(){

    const roofing = new THREE.Group();

    const brickTexture = new THREE.TextureLoader().load('models/textures/brick texture.png'); 
    const brickMaterial = new THREE.MeshBasicMaterial( { map:brickTexture } );
    const woodMaterial = new THREE.MeshToonMaterial({color: 0x59483A});
    const roofGeometry = new THREE.BoxGeometry(6.5, .3, 2.5);
    const roofLiningGeometry = new THREE.BoxGeometry(6.7, .1, 2.7);

    const roof = new THREE.Mesh(roofGeometry, brickMaterial);
    const roofLining = new THREE.Mesh(roofLiningGeometry, woodMaterial);

    roofing.add (roof, roofLining)
    return roofing;

}

function createRoof2(){

    const roofing = new THREE.Group();

    const brickTexture = new THREE.TextureLoader().load('models/textures/brick texture.png'); 
    const brickMaterial = new THREE.MeshBasicMaterial( { map:brickTexture } );
    const woodMaterial = new THREE.MeshToonMaterial({color: 0x59483A});
    const roofGeometry = new THREE.BoxGeometry(2.5, .3, 4.4);
    const roofLiningGeometry = new THREE.BoxGeometry(2.7, .1, 4.6);

    const roof = new THREE.Mesh(roofGeometry, brickMaterial);
    const roofLining = new THREE.Mesh(roofLiningGeometry, woodMaterial);

    roofing.add (roof, roofLining)
    return roofing;

}

function createRoof3(){
    const roofing = new THREE.Group();

    const brickTexture = new THREE.TextureLoader().load('models/textures/brick texture.png'); 
    const brickMaterial = new THREE.MeshBasicMaterial( { map:brickTexture } );
    const woodMaterial = new THREE.MeshToonMaterial({color: 0x59483A});
    const roofGeometry = new THREE.BoxGeometry(1.5,.3,3);
    const roofLiningGeometry = new THREE.BoxGeometry(1.6,.1,3.1);

    const roof = new THREE.Mesh(roofGeometry, brickMaterial);
    const roofLining = new THREE.Mesh(roofLiningGeometry, woodMaterial);

    roofing.add (roof, roofLining)
    return roofing;
}

function createTowerRoof(){
    const roofing = new THREE.Group();

    const brickTexture = new THREE.TextureLoader().load('models/textures/brick texture.png'); 
    const brickMaterial = new THREE.MeshBasicMaterial( { map:brickTexture } );
    const woodMaterial = new THREE.MeshToonMaterial({color: 0x59483A});
    const woodDarkerMaterial = new THREE.MeshToonMaterial({color: 0x504235});

    const roofGeometry = new THREE.ConeGeometry(1.7, 3, 6);
    const roofLining1Geometry = new THREE.CylinderGeometry(1.7,1.7,.2,6);
    const roofLining2Geometry = new THREE.CylinderGeometry(1.6,1.6,.7,6);
    const roofLining3Geometry = new THREE.CylinderGeometry(1.7,1.7,.2,6);
    const roofTopperGeometry = new THREE.ConeGeometry(.35, .6, 6);

    const towerLining1Geometry = new THREE.CylinderGeometry(1.7,1.7,.4,6);
    const towerLining2Geometry = new THREE.CylinderGeometry(1.7,1.7,.4,6);


    const roof = new THREE.Mesh(roofGeometry, brickMaterial);
    const roofLining1 = new THREE.Mesh(roofLining1Geometry, woodMaterial);
    const roofLining2 = new THREE.Mesh(roofLining2Geometry, woodDarkerMaterial);
    const roofLining3 = new THREE.Mesh(roofLining3Geometry, woodMaterial);
    const roofTopper = new THREE.Mesh(roofTopperGeometry, woodMaterial);
    const bottom = new THREE.Mesh(roofLining2Geometry, woodMaterial);

    const towerLining1 = new THREE.Mesh(towerLining1Geometry, woodMaterial);
    const towerLining2 = new THREE.Mesh(towerLining2Geometry, woodMaterial);

    roofLining1.position.y = -1.2;
    roofLining2.position.y = -1.65;
    roofLining3.position.y = -1.7;
    roof.position.y = .4;
    roofTopper.position.y = 1.6;
    bottom.position.y = -8.3

    towerLining1.position.y = -3.5
    towerLining2.position.y = -6

    roofing.add (roof, roofLining1, roofLining2, roofLining3, roofTopper)
    roofing.add(towerLining1, towerLining2, bottom);
    return roofing;
}

function createBrickLining(){
  const brickLiningColumn = new THREE.Group()

  const woodMaterial = new THREE.MeshToonMaterial({color: 0x59483A});
  const lightWoodMaterial = new THREE.MeshToonMaterial({color: 0x605247});
  
  const brickLiningGeometry =  new THREE.BoxGeometry(.2,2,.2);
  const brickGeometry = new THREE.BoxGeometry(.3,.15,.15);
  const brick2Geometry = new THREE.BoxGeometry(.15,.15,.3);

  const brickLining = new THREE.Mesh(brickLiningGeometry ,lightWoodMaterial);

  const brick1 = new THREE.Mesh(brickGeometry, woodMaterial);
  const brick2 = new THREE.Mesh(brickGeometry, woodMaterial);
  const brick3 = new THREE.Mesh(brickGeometry, woodMaterial);
  const brick4 = new THREE.Mesh(brickGeometry, woodMaterial);
  const brick5 = new THREE.Mesh(brickGeometry, woodMaterial);

  const brick6 = new THREE.Mesh(brick2Geometry, woodMaterial);
  const brick7 = new THREE.Mesh(brick2Geometry, woodMaterial);
  const brick8 = new THREE.Mesh(brick2Geometry, woodMaterial);

  brick1.position.set(-0.09,.9,.09);
  brick2.position.set(-0.09,.6,.09);
  brick3.position.set(-0.09,-.2,.09);
  brick4.position.set(-0.09,-.8,.09);
  brick5.position.set(-0.09,-.5,.09);
  brick6.position.set(.09,.75,-.02);
  brick7.position.set(.09,-.35,-.02);
  brick8.position.set(.09,-.65,-.02);

  brickLiningColumn.add(brickLining, brick1, brick2, brick3, brick4, brick5, brick6, brick7, brick8);
  return brickLiningColumn;
}

export function createFoundation(){
  const foundation = new THREE.Group();

  const brickTexture = new THREE.TextureLoader().load('models/textures/brick texture.png'); 
  const brickMaterial = new THREE.MeshBasicMaterial( { map:brickTexture } );
  const woodMaterial = new THREE.MeshToonMaterial({color: 0x59483A});
  const grassMaterial = new THREE.MeshToonMaterial({color: 0x5D4228});

  const brickGeometry = new THREE.BoxGeometry(8,1.7,3);
  const liningGeometry = new THREE.BoxGeometry(8.1,.1,3.1);
  const grassGeometry = new THREE.BoxGeometry(7.9,.1,2.9);

  const brickFoundation = new THREE.Mesh(brickGeometry, brickMaterial);
  const lining = new THREE.Mesh(liningGeometry, woodMaterial);
  const grass = new THREE.Mesh(grassGeometry, grassMaterial);

  lining.position.y = .9
  grass.position.y =.95

  foundation.add(brickFoundation, lining, grass);
  return foundation;
}

export function createHouse(){
    const house = new THREE.Group();
    const wallTexture = new THREE.TextureLoader().load('models/textures/wall texture.png'); 
    const brickTexture = new THREE.TextureLoader().load('models/textures/brick texture.png'); 
    const triangle1 = createTriangle();

    //const wallMaterial = new THREE.MeshToonMaterial({color: 0x8C8372});
    const wallMaterial = new THREE.MeshBasicMaterial( { map:wallTexture } );
    const brickMaterial = new THREE.MeshBasicMaterial( { map:brickTexture } );
    const woodMaterial = new THREE.MeshToonMaterial({color: 0x59483A});
    const blackMaterial = new THREE.MeshToonMaterial({color: 0x222222});
    
    const topWallLongGeometry = new THREE.BoxGeometry(6,2,2);
    const topWallShortGeometry = new THREE.BoxGeometry(2,2,3);
    const bottomWallShortGeometry = new THREE.BoxGeometry(2,2,3);
    const bottomWallLongGeometry = new THREE.BoxGeometry(6,2,2);
    const towerGeometry = new THREE.CylinderGeometry(1.5,1.5,7,6);
    const longLiningGeometry = new THREE.BoxGeometry(6.1,.3,2.1);
    const shortLiningGeometry = new THREE.BoxGeometry(2.1,.3,3.1);
    const roofBorderGeometry = new THREE.BoxGeometry(6.1,.1,2.1);
    const houseLiningGeometry =  new THREE.BoxGeometry(.1,1.8,.1);
    const towerLiningGeometry = new THREE.BoxGeometry(.1,7,.1);
    const floorGeometry = new THREE.BoxGeometry(1.5,.3,3);
    const window1Geometry = new THREE.BoxGeometry(.2,.4,.04);
    const window2Geometry = new THREE.BoxGeometry(.04,.4,.2);
    
    const topWallLong = new THREE.Mesh(topWallLongGeometry, wallMaterial);
    const topWallShort = new THREE.Mesh(topWallShortGeometry,wallMaterial);
    const bottomWallLong = new THREE.Mesh(bottomWallLongGeometry, brickMaterial);
    const bottomWallShort = new THREE.Mesh(bottomWallShortGeometry, brickMaterial);
    const tower = new THREE.Mesh(towerGeometry, wallMaterial);
    const roof1 = createRoof1();
    const roof2 = createRoof1();
    const roof3 = createRoof2();
    const roof4 = createRoof2();
    const towerRoof = createTowerRoof();
    const lowerRoof = createRoof3();
    const longLining = new THREE.Mesh(longLiningGeometry,woodMaterial);
    const shortLining = new THREE.Mesh(shortLiningGeometry,woodMaterial);
    const roofBorder = new THREE.Mesh(roofBorderGeometry, woodMaterial);
    const houseLining1 = new THREE.Mesh(houseLiningGeometry, woodMaterial);
    const houseLining2 = new THREE.Mesh(houseLiningGeometry, woodMaterial);
    const houseLining3 = new THREE.Mesh(houseLiningGeometry, woodMaterial);
    const houseLining4 = new THREE.Mesh(houseLiningGeometry, woodMaterial);
    const houseLining5 = new THREE.Mesh(houseLiningGeometry, woodMaterial);
    const houseLining6 = new THREE.Mesh(houseLiningGeometry, woodMaterial);
    const towerLining1 = new THREE.Mesh(towerLiningGeometry, woodMaterial);
    const towerLining2 = new THREE.Mesh(towerLiningGeometry, woodMaterial);
    const towerLining3 = new THREE.Mesh(towerLiningGeometry, woodMaterial);
    const towerLining4 = new THREE.Mesh(towerLiningGeometry, woodMaterial);
    const towerLining5 = new THREE.Mesh(towerLiningGeometry, woodMaterial);
    const towerLining6 = new THREE.Mesh(towerLiningGeometry, woodMaterial);
    const column = new THREE.Mesh(houseLiningGeometry, woodMaterial);
    const floor = new THREE.Mesh(floorGeometry,brickMaterial);
    
    const window1 = new THREE.Mesh(window1Geometry,blackMaterial);
    const window2 = new THREE.Mesh(window1Geometry,blackMaterial);
    const window4 = new THREE.Mesh(window1Geometry,blackMaterial);
    const window5 = new THREE.Mesh(window1Geometry,blackMaterial);
    const window6 = new THREE.Mesh(window1Geometry,blackMaterial);
    const window7 = new THREE.Mesh(window1Geometry,blackMaterial);
    const window8 = new THREE.Mesh(window1Geometry,blackMaterial);
    const window9 = new THREE.Mesh(window1Geometry,blackMaterial);

    const window3 = new THREE.Mesh(window2Geometry, blackMaterial);
    const window10 = new THREE.Mesh(window2Geometry, blackMaterial);
    const window11 = new THREE.Mesh(window2Geometry, blackMaterial);
    const window12 = new THREE.Mesh(window2Geometry, blackMaterial);

    window1.position.set(2,2,1);    
    window2.position.set(1.2,2,1);    
    window4.position.set(2,0,1);    
    window5.position.set(1.2,0,1);    
    window6.position.set(2,0,-1);    
    window7.position.set(1.2,0,-1);    
    window8.position.set(2,2,-1);    
    window9.position.set(1.2,2,-1);  
    
    window3.position.set(0.5,2,2);
    window10.position.set(3,2,0.15);
    window11.position.set(3,2,-0.15);
    window12.position.set(3,0,0);

    const brickLining1 = createBrickLining();
    const brickLining2 = createBrickLining();
    const brickLining3 = createBrickLining();
    const brickLining4 = createBrickLining();

    topWallLong.position.y = 2;
    topWallShort.position.set(-.5,2,1.5);
    bottomWallShort.position.set(-.5,0,1.5);
    tower.position.set(-.6,2.5, 4.25)
    roof1.position.set(0,3.7,.6);
    roof2.position.set(0,3.7,-.6);    
    roof3.position.set(-1.2,3.7,2.25);    
    roof4.position.set(0,3.7,2.25);    
    towerRoof.position.set(-.6,7,4.25);
    lowerRoof.position.set(1.15,0.8,1.4);
    triangle1.position.set(-3,4,0);
    longLining.position.y = 1.15;
    shortLining.position.set(-.5,1.15,1.5);
    roofBorder.position.y = 3
    houseLining1.position.set(.5,1.9,3);
    houseLining2.position.set(-1.55,1.9,3);
    houseLining3.position.set(3,1.9,1);
    houseLining4.position.set(3,1.9,-1);
    houseLining5.position.set(-3,1.9,-1);
    houseLining6.position.set(-3,1.9,1);
    towerLining1.position.set(.22,2.4,5.5);
    towerLining2.position.set(-1.25,2.4,5.6);
    towerLining3.position.set(0.11,2.4,2.9);
    towerLining4.position.set(-1.4,2.4,3);
    towerLining5.position.set(.9,2.4,4.2);
    towerLining6.position.set(-2.1,2.4,4.3);
    brickLining1.position.set(2.95,0,.95);
    brickLining2.position.set(2.95,0,-.95);
    brickLining3.position.set(-2.95,0,-.95);
    brickLining4.position.set(0.45,0,2.95);
    column.position.set(1.85,-.25,2.91);
    floor.position.set(1.15,-1,1.4);

    tower.rotation.y = 77;
    towerRoof.rotation.y = 77;
    roof1.rotation.x = Math.PI / 3;
    roof2.rotation.x = Math.PI / -3;
    roof3.rotation.z = Math.PI / 3;
    roof4.rotation.z = Math.PI / -3;
    lowerRoof.rotation.z = -0.3;
    brickLining2.rotation.y = Math.PI / 2;
    brickLining3.rotation.y = Math.PI / 2;

    house.add(topWallLong, topWallShort, bottomWallLong, bottomWallShort,tower, roof1, roof2, roof3, roof4, towerRoof, lowerRoof);
    house.add(longLining, shortLining, triangle1, roofBorder, houseLining1, houseLining2, houseLining3, houseLining4, houseLining5, houseLining6);
    house.add(towerLining1, towerLining2, towerLining3, towerLining4, towerLining5, towerLining6, brickLining1, brickLining2, brickLining3, brickLining4);
    house.add(column, floor, window1, window2, window3, window4, window5, window6, window7, window8, window9, window10, window11, window12);
    return house;
}