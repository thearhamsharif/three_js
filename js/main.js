var scene, camera, cube, renderer, floor, ambientLight, light;
var keyboard = {};
var player = { height: 1.8, speed: 0.2 };
var useWireframe = false;

const init = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);

  cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhongMaterial({ color: 0xFF0000, wireframe: useWireframe }));
  cube.receiveShadow = true;
  cube.castShadow = true;
  scene.add(cube);
  cube.position.y += 1;

  floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 10, 10), new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: useWireframe }));
  floor.rotation.x -= Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  light = new THREE.PointLight(0xffffff, 0.8, 18);
  light.position.set(-3, 6, -3);
  light.castShadow = true;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 25;
  scene.add(light);

  camera.position.set(0, player.height, -9);
  camera.lookAt(new THREE.Vector3(0, player.height, 0))

  renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  animate();
}


const animate = () => {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.02;

  if (keyboard[37]) { //Arrow Left
    camera.rotation.y += Math.PI * 0.01;
  }
  if (keyboard[39]) { //Arrow Right
    camera.rotation.y -= Math.PI * 0.01;
  }
  if (keyboard[38]) { //Arrow Up
    position_xz('up');
  }
  if (keyboard[40]) { //Arrow Down
    position_xz('down');
  }

  renderer.render(scene, camera);
}

const position_xz = (dir) => {
  if (dir == 'up') {
    camera.position.x += Math.sin(camera.rotation.y) * player.speed;
    camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
  }
  if (dir == 'down') {
    camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
    camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
  }
}

const keyDown = (event) => {
  keyboard[event.keyCode] = true;
}


const keyUp = (event) => {
  keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;