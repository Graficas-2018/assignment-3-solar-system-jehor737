//Jesús Horacio Rojas Cortés A01020026
/*
Resize canvas function from http://www.rioki.org/2015/04/19/threejs-resize-and-canvas.ht45
*/
var renderer = null,scene = null,camera = null,root = null,groupPlanets = null,
sphere = null,sphereTextured = null,asteroidUrl = "images/asteroidtexture.jpg",
earthUrl = "images/earthmap.jpg",jupiterUrl = "images/jupitermap.jpg",
mercuryUrl = "images/mercurymap.jpg",marsUrl = "images/marsmap.jpg",
moonUrl = "images/moonmap.jpg",neptuneUrl = "images/neptunemap.jpg",
plutoUrl = "images/plutomap.jpg",saturnUrl = "images/saturnmap.jpg",
sunUrl = "images/sunmap.jpg",uranusUrl = "images/uranusmap.jpg",
saturnringcolorUrl = "images/saturnringcolor.jpg",uranusringcolourUrl = "images/uranusringcolour.jpg",
venusUrl = "images/venusmap.jpg",venusbumpUrl = "images/venusbump.jpg",
earthbumpUrl = "images/earthbump.jpg",marsnormalUrl = "images/marsnormal.jpg",
mercurytextureMap,venustextureMap,
earthtextureMap,moontextureMap,marstextureMap,marsnormalMap,asteroidtextureMap,
jupitertextureMap,saturntextureMap,saturnRingsMap,uranustextureMap,uranusRingsMap,
neptunetextureMap,plutotextureMap,backgroundMesh,mercury = null,venus = null,earth = null,
mars = null,jupiter = null,saturn = null,uranus = null,neptune = null,pluto = null,
theSun=null,moonEarth = null, moonJupiter=null,moonMars1=null,moonMars2=null,asteroids,orbits,controls,rot;
var radiusSun=285,
segments = 64,
materialCircle,
geometryCircle;
var radiusMercury = 45,radiusVenus=45, radiusEarth=45, radiusMars=45,
radiusJupiter=45,radiusSaturn=45,radiusUranus=45, radiusNeptune=45, radiusPluto=45, radiusMoonEarth=15, radiusMoonJupiter=14, radiusMoon1Mars=14, radiusMoon2Mars=14;
var radiusPlanets= [radiusMercury,radiusVenus,radiusEarth,radiusMars,radiusJupiter,radiusSaturn,radiusUranus,radiusNeptune, radiusPluto];
var planets=[mercury,venus,earth,mars,jupiter,saturn,uranus,neptune, pluto];
var materials = {};
var distanceMercury = 400, distanceVenus= 550, distanceEarth=700, distanceMars = 850, distanceJupiter = 1350, distanceSaturn = 1600,
distanceUranus = 1850, distanceNeptune = 2050, distancePluto=2200,distanceMoonEarth=70, distanceMoonJupiter=70, distanceMoonMars=70;
var distancePlanets = [distanceMercury,distanceVenus,distanceEarth,distanceMars,distanceJupiter,distanceSaturn,distanceUranus,distanceNeptune, distancePluto];
var duration = 8000; // ms
var currentTime = Date.now();
var animado = true;

function onSpaceDown (event)
{
  switch ( event.keyCode ) {
    case 32:
      animado = !animado;
    break;
  }
}

function animate()
{
    rot=0.01;
    var count = 0;
    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;

    if (animado) {
      theSun.rotation.y+=angle/5;
      moonEarth.rotation.y+=angle;
      moonJupiter.rotation.y+=angle;
      moonMars1.rotation.y+=angle;
      moonMars2.rotation.y+=angle;
      pivotPoint10.rotation.y+=angle;
      pivotPoint11.rotation.y+=angle;
      pivotPoint12.rotation.y+=angle;
      pivotPoint13.rotation.y+=angle;
      for (var planet in planets) {
        planets[planet].rotation.y+=angle;
      }
      for (var orbit in orbits.children) {
        rot-=0.001;
        orbits.children[orbit].rotation.z-= rot;
      }
      asteroids.rotation.y+=angle/8;
    }
}

function run()
{
    requestAnimationFrame(function() { run(); });
    // Render the scene
    renderer.render(scene, camera);
    controls.update();
    // Animation
    animate();
}

function createMaterials()
{
    // Create a textre phong material for the cube
    // First, create the texture map
    var textureLoader = new THREE.TextureLoader();
    mercurytextureMap = textureLoader.load(mercuryUrl);
    venustextureMap = textureLoader.load(venusUrl);
    venusbumpMap = textureLoader.load(venusbumpUrl)
    earthtextureMap = textureLoader.load(earthUrl);
    earthbumpMap = textureLoader.load(earthbumpUrl)
    moontextureMap = textureLoader.load(moonUrl);
    marstextureMap = textureLoader.load(marsUrl);
    marsnormalMap = textureLoader.load(marsnormalUrl);
    asteroidtextureMap = textureLoader.load(asteroidUrl);
    jupitertextureMap = textureLoader.load(jupiterUrl);
    saturntextureMap = textureLoader.load(saturnUrl);
    saturnRingsMap = textureLoader.load(saturnringcolorUrl);
    uranustextureMap = textureLoader.load(uranusUrl);
    uranusRingsMap = textureLoader.load(uranusringcolourUrl);
    neptunetextureMap = textureLoader.load(neptuneUrl);
    plutotextureMap = textureLoader.load(plutoUrl);
    sunmap = textureLoader.load(sunUrl);
    backgroundMesh = textureLoader.load( 'images/stars.jpg');
    moonJtextureMap = textureLoader.load('images/europamoon.jpg');
    moonM1textureMap = textureLoader.load('images/deimosmap.jpg');
    moonM2textureMap = textureLoader.load('images/phobosmap.jpg');
    materials["mercury"] = new THREE.MeshPhongMaterial({map: mercurytextureMap});
    materials["venus"] = new THREE.MeshPhongMaterial({ map: venustextureMap, bumpMap: venusbumpMap, bumpScale: 0.06 });
    materials["earth"] = new THREE.MeshPhongMaterial({ map: earthtextureMap, bumpMap: earthbumpMap, bumpScale: 0.06 });
    materials["mars"] = new THREE.MeshPhongMaterial({ map: marstextureMap, normalMap: marsnormalMap});
    materials["jupiter"] = new THREE.MeshPhongMaterial({ map: jupitertextureMap});
    materials["saturn"] = new THREE.MeshPhongMaterial({ map: saturntextureMap});
    materials["saturn-rings"] = new THREE.MeshPhongMaterial({ map: saturnRingsMap,side: THREE.DoubleSide, transparent: true, opacity: 0.6});
    materials["uranus"] = new THREE.MeshPhongMaterial({ map: uranustextureMap});
    materials["uranus-rings"] = new THREE.MeshPhongMaterial({ map: uranusRingsMap,side: THREE.DoubleSide, transparent: true, opacity: 0.6});
    materials["neptune"] = new THREE.MeshPhongMaterial({ map: neptunetextureMap});
    materials["pluto"] = new THREE.MeshPhongMaterial({ map: plutotextureMap});
    materials["asteroids"] = new THREE.MeshBasicMaterial({ map: asteroidtextureMap, side: THREE.DoubleSide, transparent: true, opacity: 0.5});
    materials["sun"] = new THREE.MeshBasicMaterial({map: sunmap});
    materials["moonEarth"] = new THREE.MeshPhongMaterial({map: moontextureMap});
    materials["moonJupiter"] = new THREE.MeshPhongMaterial({map: moonJtextureMap});
    materials["moonMars1"] = new THREE.MeshPhongMaterial({map: moonM1textureMap});
    materials["moonMars2"] = new THREE.MeshPhongMaterial({map: moonM2textureMap});
}

function createAsteroid(parent) {
  var asteroid = new THREE.Mesh(asteroidGeometry, materials["asteroids"]);
  parent.add(asteroid);
  var r = distanceMars+240;
  var t = 2*Math.random() * Math.PI * 2;
  var p = 0;
  var x = r * Math.cos(t) * Math.cos(p);
  var y = r * Math.sin(p);
  var z = r * Math.sin(t) * Math.cos(p);
  asteroid.position.set(x, y, z);
}

function createScene(canvas) {
    window.addEventListener('resize', function () {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });
    document.addEventListener('keydown', onSpaceDown, false);
    groupPlanets = new THREE.Object3D;
    fieldOfView = Math.atan(canvas.height/canvas.width) * (360/Math.PI);
    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );
    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);
    // Create a new Three.js scene
    scene = new THREE.Scene();
    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera(fieldOfView, canvas.width / canvas.height, 0.1, 10000);
    camera.position.z = 2500;
    camera.position.y=1500;
    controls = new THREE.OrbitControls( camera );
    scene.add(camera);
    controls.update();
    // Create a group to hold all the objects
    root = new THREE.Object3D;
    root.add(groupPlanets);
    var sunLight = new THREE.PointLight(0xffffff, 4, 2000,2);
    sunLight.position.set(0,0,0);
    light = new THREE.AmbientLight ( 0x111111); // 0x222222 );
    root.add(light);
    // Create all the materials
    createMaterials();
    //Set background
    scene.background = backgroundMesh;
    //Pivot points for rotations
    pivotPoint10 = new THREE.Object3D;
    pivotPoint11 = new THREE.Object3D;
    pivotPoint12 = new THREE.Object3D;
    pivotPoint13 = new THREE.Object3D;
    //Create Sun
    geometry = new THREE.SphereGeometry(radiusSun, 40, 40);
    // Create a group to hold the spheres
    theSun = new THREE.Object3D;
    //theSun.add(light);
    theSun.add(sunLight);
    root.add(theSun);
    // And put the geometry and material together into a mesh
    sphere = new THREE.Mesh(geometry, materials["sun"]);
    sphere.visible = true;
    theSun.add(sphere);
    theSun.position.set(0,0,0);
    // Material line
    materialCircle = new THREE.LineBasicMaterial( { color: 0xffffff } );
    orbits = new THREE.Object3D;
    for (var i = 0; i < radiusPlanets.length; i++) {
      planets[i] = new THREE.Object3D;
      // Create Planet
      geometry = new THREE.SphereGeometry(radiusPlanets[i], 20, 20);
      // Create a group to hold the spheres
      groupPlanets.add(planets[i]);
      // And put the geometry and material together into a mesh
      switch (i) {
        case 0:
        sphere = new THREE.Mesh(geometry, materials["mercury"]);
          break;
        case 1:
        sphere = new THREE.Mesh(geometry, materials["venus"]);
          break;
        case 2:
        sphere = new THREE.Mesh(geometry, materials["earth"]);
          break;
        case 3:
        sphere = new THREE.Mesh(geometry, materials["mars"]);
          break;
        case 4:
        sphere = new THREE.Mesh(geometry, materials["jupiter"]);
          break;
        case 5:
        sphere = new THREE.Mesh(geometry, materials["saturn"]);
        geometryRings = new THREE.RingGeometry(radiusPlanets[i]*1.2,radiusPlanets[i]*2,40, 5, Math.PI/2, Math.PI*2);
        rings = new THREE.Mesh(geometryRings, materials["saturn-rings"]);
        rings.visible=true;
        rings.rotation.x=Math.PI/4;
        planets[i].add(rings);
          break;
        case 6:
        sphere = new THREE.Mesh(geometry, materials["uranus"]);
        geometryRings = new THREE.RingGeometry(radiusPlanets[i]*1.2,radiusPlanets[i]*1.1,40, 5, Math.PI/2, Math.PI*2);
        rings = new THREE.Mesh(geometryRings, materials["uranus-rings"]);
        rings.visible=true;
        rings.rotation.x=Math.PI/4;
        planets[i].add(rings);
          break;
        case 7:
        sphere = new THREE.Mesh(geometry, materials["neptune"]);
          break;
        case 8:
        sphere = new THREE.Mesh(geometry, materials["pluto"]);
          break;
      }
      sphere.visible = true;
      // Add the sphere mesh to our group
      planets[i].add(sphere);
      planets[i].position.set(-distancePlanets[i],0,0);

      geometryCircle = new THREE.CircleGeometry(distancePlanets[i], segments);
      geometryCircle.vertices.shift();
      orbit = new THREE.LineLoop(geometryCircle,materialCircle);
      planets[i].rotation.x=-Math.PI/2;
      orbit.rotation.x = Math.PI/2;
      orbit.add(planets[i]);
      orbits.add(orbit);
    }
    //groupPlanets.add(orbits);
    //update planets
    mercury = planets[0];
    venus = planets[1];
    earth = planets[2];
    mars=planets[3];
    jupiter = planets[4];
    saturn = planets[5];
    uranus= planets[6];
    neptune = planets[7];
    pluto = planets[8];
    //Create Moon Earth
    moonEarth= new THREE.Object3D;
    geometry = new THREE.SphereGeometry(radiusMoonEarth, 20, 20);
    // And put the geometry and material together into a mesh
    sphere = new THREE.Mesh(geometry, materials["moonEarth"]);
    sphere.visible = true;
    // Add the sphere mesh to our group
    moonEarth.add(sphere);
    moonEarth.position.set(distanceMoonEarth,0,0);
    earth.add(moonEarth);
    //pivotPoint10.add(moonEarth);

    //Create Moon Jupiter
    moonJupiter= new THREE.Object3D;
    geometry = new THREE.SphereGeometry(radiusMoonJupiter, 20, 20);
    // And put the geometry and material together into a mesh
    sphere = new THREE.Mesh(geometry, materials["moonJupiter"]);
    sphere.visible = true;
    // Add the sphere mesh to our group
    moonJupiter.add(sphere);
    moonJupiter.position.set(distanceMoonJupiter,0,0);
    jupiter.add(moonJupiter);
    //pivotPoint11.add(moonJupiter);

    //Create Moon Mars
    moonMars1= new THREE.Object3D;
    geometry = new THREE.SphereGeometry(radiusMoon1Mars, 20, 20);
    // And put the geometry and material together into a mesh
    sphere = new THREE.Mesh(geometry, materials["moonMars1"]);
    sphere.visible = true;
    // Add the sphere mesh to our group
    moonMars1.add(sphere);
    moonMars1.position.set(distanceMoonMars,0,0);
    mars.add(moonMars1);
    //pivotPoint12.add(moonMars1);
    //Create Moon Mars
    moonMars2= new THREE.Object3D;
    geometry = new THREE.SphereGeometry(radiusMoon2Mars, 20, 20);
    // And put the geometry and material together into a mesh
    sphere = new THREE.Mesh(geometry, materials["moonMars2"]);
    sphere.visible = true;
    // Add the sphere mesh to our group
    moonMars2.add(sphere);
    moonMars2.position.set(-distanceMoonMars,0,0);
    mars.add(moonMars2);
    //pivotPoint13.add(moonMars2);
    //ASteroid belt
    asteroids = new THREE.Object3D;
    asteroidGeometry = new THREE.IcosahedronGeometry(10,0);
    for (var i = 0; i <500; i++) {
      createAsteroid(asteroids);
    }
    root.add(asteroids);
    root.add(groupPlanets);
    root.add(orbits);
    scene.add(root);
}
