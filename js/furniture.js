// copied online to create a rounded box:
function createBoxWithRoundedEdges( width, height, depth, radius0, smoothness ) {
    let shape = new THREE.Shape();
    let eps = 0.00001;
    let radius = radius0 - eps;
    shape.absarc( eps, eps, eps, -Math.PI / 2, -Math.PI, true );
    shape.absarc( eps, height -  radius * 2, eps, Math.PI, Math.PI / 2, true );
    shape.absarc( width - radius * 2, height -  radius * 2, eps, Math.PI / 2, 0, true );
    shape.absarc( width - radius * 2, eps, eps, 0, -Math.PI / 2, true );
    let geometry = new THREE.ExtrudeBufferGeometry( shape, {
      amount: depth - radius0 * 2,
      bevelEnabled: true,
      bevelSegments: smoothness * 2,
      steps: 1,
      bevelSize: radius,
      bevelThickness: radius0,
      curveSegments: smoothness
    });
    
    geometry.center();
    
    return geometry;
}


// functiont to create room

function createRoom(){
    const room = new THREE.Group();

    // Materials
    const floorMaterial = new THREE.MeshToonMaterial({ color: 0x7c8a86 })
    const wallMaterial = new THREE.MeshToonMaterial({color:0x679189 })

    // Geometries
    const floorGeometry = new THREE.BoxGeometry(10,0.1,10);
    const leftWallGeometry = new THREE.BoxGeometry(0.1,5.5,10,1);
    const rightWallGeometry = new THREE.BoxGeometry(10,5.5,0.1,1);

    // Meshes
    const floor = new THREE.Mesh(floorGeometry,floorMaterial);
    const leftWall = new THREE.Mesh(leftWallGeometry,wallMaterial);
    const rightWall = new THREE.Mesh(rightWallGeometry,wallMaterial);

    // Positions
    floor.position.y = -1
    leftWall.position.set(-4.95,1.74,0);
    rightWall.position.set(0,1.74,-4.95);

    room.add(floor, leftWall, rightWall);

    return room;
}

// functiont to create Window

function createWindow(){
    const window = new THREE.Group();

    // Materials
    const windowFrameMaterial = new THREE.MeshToonMaterial({color:0xa9afb8})
    const windowGlassMaterial = new THREE.MeshToonMaterial({color: 0xabd1f5})

    // Geometries
    const windowSideGeometry = new THREE.BoxGeometry(0.1,3,0.1);
    const windowTopGeometry = new THREE.BoxGeometry(0.1,0.1,2);
    const windowGlassGeometry = new THREE.PlaneGeometry(2,3);

    // Meshes
    const windowLeftSide = new THREE.Mesh(windowSideGeometry, windowFrameMaterial);
    const windowRightSide = new THREE.Mesh(windowSideGeometry, windowFrameMaterial);
    const windowTopSide = new THREE.Mesh(windowTopGeometry,windowFrameMaterial);
    const windowBottomSide = new THREE.Mesh(windowTopGeometry,windowFrameMaterial);
    const windowInnerVertical = new THREE.Mesh(windowSideGeometry, windowFrameMaterial);
    const windowInnerHorizontal = new THREE.Mesh(windowTopGeometry,windowFrameMaterial);
    const windowGlass = new THREE.Mesh(windowGlassGeometry, windowGlassMaterial);

    // Positions
    windowInnerHorizontal.position.set(0,0,-0.5);
    windowInnerVertical.position.set(0,0,-0.5);
    windowRightSide.position.z = -1.5;
    windowLeftSide.position.z = .5;
    windowTopSide.position.set(0,1.45,-0.5);
    windowBottomSide.position.set(0,-1.45,-0.5);
    windowGlass.rotation.y = 1.6;
    windowGlass.position.z = -.5;

    window.add(windowGlass, windowLeftSide, windowRightSide, windowTopSide, windowBottomSide, windowInnerHorizontal, windowInnerVertical);

    // Curtains

    // Materials
    const windowRodMaterial = new THREE.MeshToonMaterial({color:0x524134})
    const windowCurtainMaterial = new THREE.MeshToonMaterial({color: 0xb36e2e})

    //Geometries
    const windowRodGeometry = new THREE.CylinderGeometry(0.075,0.075,3);
    const windowCurtainGeometry = new THREE.BoxGeometry(.05,4.2,1);

    //Meshes
    const windowRod = new THREE.Mesh(windowRodGeometry, windowRodMaterial);
    const windowCurtain1 = new THREE.Mesh(windowCurtainGeometry, windowCurtainMaterial);
    const windowCurtain2 = new THREE.Mesh(windowCurtainGeometry, windowCurtainMaterial);

    // Positions
    windowRod.position.set(0,1.75,-.5);
    windowRod.rotation.x = 1.57;

    windowCurtain1.position.set(.05,-.2,.5);
    windowCurtain2.position.set(.05,-.2,-1.5);

    window.add(windowRod, windowCurtain1, windowCurtain2);
    
    return window;
}

// function to create bed

function createBed(){
    const bed = new THREE.Group();

    // Materials
    const bedFrameMaterial = new THREE.MeshToonMaterial({color: 0x734f35})
    const bedStorageMaterial = new THREE.MeshToonMaterial({color: 0x6e452a})
    const bedKnobMaterial = new THREE.MeshToonMaterial({color: 0xa18458})
    const bedClothMaterial = new THREE.MeshToonMaterial({color: 0xa8a8a8});
    const bedBlanketMaterial = new THREE.MeshToonMaterial({color: 0xb36e2e});

    // Geometries
    const bedFrameGeometry = new THREE.BoxGeometry(2.5,.5,5);
    const bedBackrestGeometry = new THREE.BoxGeometry(2.5,2.5,.25);
    const bedFootrestGeometry = new THREE.BoxGeometry(2.5, 1, .25);
    const bedStorageGeometry = new THREE.BoxGeometry(2,.5,2.5);
    const bedKnobGeomtry = new THREE.SphereGeometry(.09,.09,.09);
    const bedMattressGeometry = createBoxWithRoundedEdges(2.5, .5, 5, .15, 3);
    bedMattressGeometry.computeVertexNormals();
    bedMattressGeometry.translate(0, .5, 0);
    const bedPillowGeometry = createBoxWithRoundedEdges(2,.5, 1, .25, 3);
    bedPillowGeometry.computeVertexNormals();
    bedPillowGeometry.translate(0, .5, 0);
    const bedBlanketGeometry = createBoxWithRoundedEdges(2.55, .5, 4, .15, 3);
    bedBlanketGeometry.computeVertexNormals();
    bedBlanketGeometry.translate(0, .5, 0);
    const bedBlanketHemGeometry = createBoxWithRoundedEdges(2.8, .5, .8, .15, 3);
    bedBlanketHemGeometry.computeVertexNormals();
    bedBlanketHemGeometry.translate(0, .5, 0);

    // Meshes
    const bedFrame = new THREE.Mesh(bedFrameGeometry, bedFrameMaterial);
    const bedBackrest = new THREE.Mesh(bedBackrestGeometry, bedFrameMaterial);
    const bedFootrest = new THREE.Mesh(bedFootrestGeometry, bedFrameMaterial);
    const bedStorage1 = new THREE.Mesh(bedStorageGeometry,bedStorageMaterial)
    const bedStorage2 = new THREE.Mesh(bedStorageGeometry,bedStorageMaterial)
    const bedKnob1 = new THREE.Mesh(bedKnobGeomtry,bedKnobMaterial);
    const bedKnob2 = new THREE.Mesh(bedKnobGeomtry,bedKnobMaterial);
    const bedMattress = new THREE.Mesh(bedMattressGeometry, bedClothMaterial)
    const bedPillow = new THREE.Mesh(bedPillowGeometry, bedClothMaterial);
    const bedBlanket = new THREE.Mesh(bedBlanketGeometry, bedBlanketMaterial);
    const bedBlanketHem = new THREE.Mesh(bedBlanketHemGeometry, bedClothMaterial);

    // Positions
    bedBackrest.position.set(0,.2,-2.5);
    bedFootrest.position.set(0,-.25,2.5);
    bedStorage1.position.set(.19,-.5,1.25);
    bedStorage2.position.set(.4,-.5,-1.25);
    bedKnob1.position.set(1.23,-.5,1.2);
    bedKnob2.position.set(1.43,-.5,-1.2);
    bedPillow.position.set(0,.3,-1.9);
    bedBlanket.position.set(0,.1,.55);
    bedBlanketHem.position.set(0,.2,-1);

    bed.add(bedFrame,bedBackrest, bedFootrest, bedStorage1, bedStorage2, bedKnob1, bedKnob2, bedMattress, bedPillow, bedBlanket, bedBlanketHem);

    return bed;

}

// function to create rug

function createRug(){

    // Material
    const rugMaterial = new THREE.MeshToonMaterial({color: 0xbd8c5e});
    
    // Geometry
    const rugGeometry = createBoxWithRoundedEdges(9, .09, 9, .02, 3);
    rugGeometry.computeVertexNormals();
    rugGeometry.translate(0, .5, 0);
    
    // Mesh
    const rug =  new THREE.Mesh(rugGeometry, rugMaterial);

    return rug;
}

// function to create door

function createDoor(){
    const door = new THREE.Group();

    // Materials
    const doorFrameMaterial = new THREE.MeshToonMaterial({color:0xa9afb8});
    const doorBodyMaterial = new THREE.MeshToonMaterial({color: 0xc2762f});
    const doorFillMaterial = new THREE.MeshToonMaterial({color: 0x2b2b2b});

    // Geometries
    const doorSidesGeometry = new THREE.BoxGeometry(.2,5.3,.15);
    const doorTopGeometry =  new THREE.BoxGeometry (2.45, .2, .15);
    const doorBodyGeometry = new THREE.BoxGeometry(1.9,5,.15);
    const doorKnobGeometry = new THREE.SphereGeometry(.125,.125,.125);
    const doorFillGeometry = new THREE.PlaneGeometry(2,5);

    // Meshes
    const doorSide1 = new THREE.Mesh(doorSidesGeometry, doorFrameMaterial);
    const doorSide2 = new THREE.Mesh(doorSidesGeometry, doorFrameMaterial);
    const doorBody = new THREE.Mesh(doorBodyGeometry, doorBodyMaterial);
    const doorTop = new THREE.Mesh(doorTopGeometry, doorFrameMaterial);
    const doorKnob = new THREE.Mesh(doorKnobGeometry, doorFrameMaterial); 
    const doorFill = new THREE.Mesh(doorFillGeometry, doorFillMaterial);
    
    // Positions
    doorSide2.position.x = 2.25;
    doorTop.position.set(1.12,2.6,0);
    doorBody.position.set(0.9,0,0.5);
    doorBody.rotation.y = 15
    doorKnob.position.set(1.25,0,1);
    doorFill.position.x = 1.25;

    door.add(doorSide1,doorSide2,doorTop,doorBody, doorKnob, doorFill);

    return door;
}

// function to create lamp

function createLamp(){
    const lamp = new THREE.Group();

    // Materials
    const lampShadeMaterial = new THREE.MeshToonMaterial({ color: 0xb36e2e, side: THREE.DoubleSide });
    const lampWoodMaterial = new THREE.MeshToonMaterial({color: 0x6e452a});

    // Lathe 2D Profile
    const shape = [];
    const height = 1.; // Height of the lampshade
    const radius = 0.55; // Base radius
    const topRadius = 0.35; // Top radius

    shape.push(new THREE.Vector2(0, height));
    shape.push(new THREE.Vector2(radius, height));
    shape.push(new THREE.Vector2(topRadius, 0));
    shape.push(new THREE.Vector2(0, 0));

    // Geometries
    const lampShadeGeometry = new THREE.LatheGeometry(shape, 20);
    const lampStandGeometry = new THREE.CylinderGeometry(.07,.07, 3.8);
    const lampBaseGeometry = new THREE.CylinderGeometry(.5,.5,0.1);

    // Meshes
    const lampShade = new THREE.Mesh(lampShadeGeometry, lampShadeMaterial);
    const lampStand = new THREE.Mesh(lampStandGeometry, lampWoodMaterial);
    const lampBase = new THREE.Mesh(lampBaseGeometry, lampWoodMaterial);

    // Positions
    lampShade.position.y = 2;
    lampShade.rotation.z = 3.1;
    lampBase.position.y = -2;
    lampStand.position.y = -0.1;


    lamp.add(lampShade, lampStand, lampBase);

    return lamp;
}

// Function to create the bean seat
function createEasel(){
    const easel = new THREE.Group();

    // Materials
        const easelTripodMaterial = new THREE.MeshToonMaterial({color: 0x524134 }); 
        const easelCanvasMaterial = new THREE.MeshToonMaterial({color: 0xa8a8a8});


    // Geometries
        const easelTripodBaseGeometry = new THREE.BoxGeometry(0.2,4.5,0.08);
        const easelTripodArmGeometry = new THREE.BoxGeometry(0.2,5,0.08);
        const easelTripodUpperGeometry = new THREE.BoxGeometry(1.5,0.2,0.08);
        const easelTripodUnderGeometry = new THREE.BoxGeometry(2.5,0.2,0.15);
        const easelTripodBackingGeometry = new THREE.BoxGeometry(0.2,3.5,0.08);
        const easelCanvasGeometry = new THREE.BoxGeometry(2,3,.2);

    // Meshes
        const easelTripodBase = new THREE.Mesh(easelTripodBaseGeometry, easelTripodMaterial);
        const easelTripodArm1 = new THREE.Mesh(easelTripodArmGeometry, easelTripodMaterial);
        const easelTripodArm2 = new THREE.Mesh(easelTripodArmGeometry, easelTripodMaterial);
        const easelTripodUpper = new THREE.Mesh(easelTripodUpperGeometry, easelTripodMaterial);
        const easelTripodUnder = new THREE.Mesh(easelTripodUnderGeometry, easelTripodMaterial);
        const easelTripodBacking = new THREE.Mesh(easelTripodBackingGeometry, easelTripodMaterial);
        const easelCanvas = new THREE.Mesh(easelCanvasGeometry,easelCanvasMaterial);

    // Positions
        easelTripodBase.rotation.x = -0.3
        easelTripodBacking.rotation.x = 0.1
        easelCanvas.rotation.x = 0.1

        easelTripodArm1.rotation.z = 0.2
        easelTripodArm1.rotation.x = 0.1

        easelTripodArm2.rotation.z = -0.2
        easelTripodArm2.rotation.x = 0.1

        easelTripodUpper.x = -0.3
        easelTripodUnder.x = -0.4

        easelTripodArm1.position.x = 1.75
        easelTripodBase.position.set(.9,-0.5,0.8);
        easelTripodBacking.position.set(.9,1,0.1);
        easelTripodUpper.position.set(0.9,1.5,0.15);
        easelTripodUnder.position.set(0.85,-0.8,-0.2);
        easelCanvas.position.set(.9,0.925,-0.1);

    easel.add(easelTripodBase, easelTripodArm1, easelTripodArm2, easelTripodUpper, easelTripodUnder, easelTripodBacking, easelCanvas);

    return easel;
}

function createStool(){
    const stool = new THREE.Group();
    
    // Materials
    const stoolWoodMaterial = new THREE.MeshToonMaterial({color:0x524134});

    // Geometries
    const stoolSeatGeometry = new THREE.CylinderGeometry(.7,.7,0.2);
    const stoolLegGeometry = new THREE.CylinderGeometry (0.1, 0.1, 1.5);

    // Meshes
    const stoolSeat = new THREE.Mesh(stoolSeatGeometry, stoolWoodMaterial);
    const stoolLeg1 = new THREE.Mesh(stoolLegGeometry, stoolWoodMaterial);
    const stoolLeg2 = new THREE.Mesh(stoolLegGeometry, stoolWoodMaterial);
    const stoolLeg3 = new THREE.Mesh(stoolLegGeometry, stoolWoodMaterial);


    // Positions
    stoolLeg1.position.set(-.5,-1,0);
    stoolLeg2.position.set(0.05,-1,-0.4);
    stoolLeg3.position.set(-0.1,-1,.35);


    stool.add(stoolSeat, stoolLeg1, stoolLeg2, stoolLeg3);

    return stool;
}

function createDresser(){
    const dresser = new THREE.Group();
    
    // Materials
    const dresserBodyMaterial = new THREE.MeshToonMaterial({color: 0x694127});
    const dresserLegMaterial = new THREE.MeshToonMaterial({color: 0x6e452a});

    // Geometries
    const dresserBodyGeometry = new THREE.BoxGeometry(3.5,2,1.5);
    const dresserLegGeometry = new THREE.BoxGeometry(.25,2.2,.25);
    const dresserTopGeometry = new THREE.BoxGeometry(4,.25,2);

    // Meshes
    const dresserBody = new THREE.Mesh(dresserBodyGeometry,dresserBodyMaterial);
    const dresserLeg1 = new THREE.Mesh(dresserLegGeometry, dresserLegMaterial);
    const dresserLeg2 = new THREE.Mesh(dresserLegGeometry, dresserLegMaterial);
    const dresserLeg3 = new THREE.Mesh(dresserLegGeometry, dresserLegMaterial);
    const dresserLeg4 = new THREE.Mesh(dresserLegGeometry, dresserLegMaterial);
    const dresserTop = new THREE.Mesh(dresserTopGeometry, dresserLegMaterial);

    // Positions
    dresserLeg1.position.set(1.75,-.125,.75);
    dresserLeg2.position.set(1.75,-.125,-.75);
    dresserLeg3.position.set(-1.75,-.125,.75);
    dresserLeg4.position.set(-1.75,-.125,-.75);
    dresserTop.position.y = .85


    dresser.add(dresserBody,dresserLeg1,dresserLeg2,dresserLeg3,dresserLeg4, dresserTop);

    return dresser;
}

function createBook(){
    const book = new THREE.Group();

    // Materials
    const bookRedMaterial = new THREE. MeshToonMaterial({color: 0x994136});
    const bookPageMaterial = new THREE.MeshToonMaterial({color: 0xa8a8a8});

    // Geometries
    const bookGeometry = new THREE.BoxGeometry(1,.25,.75);
    const pageGeometry = new THREE.BoxGeometry(1.01,.19,.74);
    
    // Meshes
    const book1Outer = new THREE.Mesh(bookGeometry,bookRedMaterial);
    const book1Inner = new THREE.Mesh(pageGeometry, bookPageMaterial);

    // Positions
    book1Outer.position.set(3,3,3);
    book1Inner.position.set(3,3,3.01);

    book.add(book1Outer, book1Inner);
    
    return book;
}

function createMug() {
    const mug = new THREE.Group();

    // Materials
    const mugMaterial = new THREE.MeshStandardMaterial({ color: 0xa8a8a8 });
    const mugJuiceMaterial = new THREE.MeshStandardMaterial({ color: 0x663526 });

    // Geometries
    const mugGeometry = new THREE.CylinderGeometry(.25, .25, .5, 12);
    const mugHandleGeometry = new THREE.TorusGeometry(0.125, 0.07, 16, 30);
    const mugJuiceGeometry = new THREE.CylinderGeometry(.19, .19, .5, 12);

    // Meshes
    const mugBody = new THREE.Mesh(mugGeometry, mugMaterial);
    const mugHandle = new THREE.Mesh(mugHandleGeometry, mugMaterial);
    const mugJuice = new THREE.Mesh(mugJuiceGeometry, mugJuiceMaterial);

    // Position the handle
    mugHandle.position.set(0.2, 0, 0);
    mugJuice.position.y = 0.01
    
    mug.add(mugBody, mugHandle, mugJuice);

    return mug;
}

function createPoster(){
    const posterImage = new THREE.Group();

    // Materials
    const posterBackgroundMaterial = new THREE.MeshToonMaterial({color: 0xd98c4e});
    const posterMidgroundMaterial = new THREE.MeshToonMaterial({color: 0xffffa8});
    const posterForegroundMaterial = new THREE.MeshToonMaterial({color: 0x70aeff});
    const posterFrameMaterial = new THREE.MeshToonMaterial({color: 0x524134 });

    //Geometries
    const posterBackgroundGeometry = new THREE.BoxGeometry(2,2.5,0.05);
    const posterMidgroundGeometry = new THREE.CircleGeometry(0.35, 20);
    const posterForegroundGeometry = new THREE.PlaneGeometry(2,1);
    const posterFrameGeometry = new THREE.BoxGeometry(2.15,2.7,0.05);

    // Meshes
    const posterBackground = new THREE.Mesh(posterBackgroundGeometry, posterBackgroundMaterial);
    const posterMidground = new THREE.Mesh(posterMidgroundGeometry,posterMidgroundMaterial);
    const posterForeground = new THREE.Mesh(posterForegroundGeometry,posterForegroundMaterial);
    const posterFrame = new THREE.Mesh(posterFrameGeometry, posterFrameMaterial);

    // Position
    posterMidground.position.z = 0.03;
    posterForeground.position.set(0.02, -0.7, 0.035);
    posterFrame.position.z = -0.01;

    posterImage.add(posterBackground,posterMidground, posterForeground, posterFrame);

    return posterImage;
}

function createLaptop(){
    const laptop = new THREE.Group();

    // Materials
    const laptopMaterial = new THREE.MeshToonMaterial({color: 0x646262});
    const keyboardMaterial = new THREE.MeshToonMaterial({color: 0x545454});

    // Geometries
    const laptopMonitorGeometry = new THREE.BoxGeometry(1.5,1,0.1);
    const laptopGeometry = new THREE.BoxGeometry(1.5,0.1,1);
    const keyboardGeometry =  new THREE.BoxGeometry(1.25,0.1,0.5);

    // Meshes
    const laptopBody = new THREE.Mesh(laptopGeometry, laptopMaterial);
    const laptopMonitor = new THREE.Mesh(laptopMonitorGeometry, laptopMaterial);
    const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);

    // Position
    laptopMonitor.rotation.x = -0.4;
    laptopBody.position.set(0,-0.5,-0.3);
    keyboard.position.set(0,-0.45,-0.25);

    laptop.add(laptopBody,laptopMonitor,keyboard);
    return laptop;

}

function createCardboard(){
    const cardboardBox = new THREE.Group();

    // Materials
    const cardboardMaterial = new THREE.MeshToonMaterial({color: 0x816f52});
    const cardboardFillMaterial = new THREE.MeshToonMaterial({color: 0x2b2b2b});
    const cardboardMarkMaterial = new THREE.MeshToonMaterial({color: 0x9b8561});

    // Geometries
    const cardboardGeometry = new THREE.BoxGeometry(1.5,1,1.5);
    const cardboardFillGeometry = new THREE.BoxGeometry(1.25,0.9,1.25);
    const cardboardFlapGeometry = new THREE.BoxGeometry(.75, 0.05, 1.5);
    const carboardMarkGeometry = new THREE.BoxGeometry(0.8,0.5,0.045);

    // Meshes
    const cardboardBody = new THREE.Mesh(cardboardGeometry,cardboardMaterial);
    const cardboardFill = new THREE.Mesh(cardboardFillGeometry, cardboardFillMaterial);
    const cardboardFlap1 = new THREE.Mesh(cardboardFlapGeometry, cardboardMaterial);
    const cardboardFlap2 = new THREE.Mesh(cardboardFlapGeometry, cardboardMaterial);
    const cardboardMark = new THREE.Mesh(carboardMarkGeometry, cardboardMarkMaterial);

    // Position
    cardboardFill.position.y = 0.06;
    cardboardFlap1.position.set(-0.435, 0.6,0);
    cardboardFlap2.position.set(0.42, 0.6,0.0);
    cardboardMark.position.set(0.25,-0.15,0.75);

    cardboardFlap1.rotation.z = 0.5;
    cardboardFlap2.rotation.z = -0.3;

    cardboardBox.add(cardboardBody,cardboardFill,cardboardFlap1,cardboardFlap2,cardboardMark);

    return cardboardBox;
}