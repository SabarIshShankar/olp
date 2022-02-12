import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Color,
  AmbientLight,
  PointLight,
  BoxBufferGeometry,
  CylinderBufferGeometry,
  MeshPhongMaterial,
  InstancedMesh,
  InstancedBufferAttribute,
  Object3D
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const { innerWidth, innerHeight } = window;

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

const camera = new PerspectiveCamera(70, innerWidth / innerHeight, 5, 20);
camera.position.z = 15;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const scene = new Scene();
scene.background = new Color(0xe4b7e5);

const ambientLight = new AmbientLight();
scene.add(ambientLight);

const light = new PointLight(0xffffff, 0.55);
light.position.set(150, 150, 150);
scene.add(light);

const count = 5000;
renderer.render(scene, camera);
var imgData = renderer.domElement.toDataURL();
var img = new Image();
img.src = imgData;

const geometry = new CylinderBufferGeometry(1, 1, 0.1, 30);
const material = new MeshPhongMaterial({ vertexColors: true });
const mesh = new InstancedMesh(geometry, material, count);
scene.add(mesh);

const _color = new Color();
const color = new Float32Array(count * 3);
const colors = [0x1f306e, 0x553772, 0x1f306e, 0xc7417b, 0xf5487f];

for (let i = 0; i < count; i++) {
  _color.setHex(colors[Math.floor(Math.random() * colors.length)]);
  _color.toArray(color, i * 3);
}

geometry.setAttribute("color", new InstancedBufferAttribute(color, 3));
mesh.instanceMatrix.needsUpdate = true;

window.addEventListener("resize", () => {
  const { innerWidth, innerHeight } = window;

  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
});

const tempObject = new Object3D();

renderer.setAnimationLoop((t) => {
  controls.update();

  const time = t / 1000;

  mesh.rotation.x = Math.sin(time / 4);
  mesh.rotation.y = Math.sin(time / 4);

  let i = 0;
  for (let x = 0; x < 10; x++)
    for (let y = 0; y < 10; y++)
      for (let z = 0; z < 10; z++) {
        const id = i++;
        tempObject.position.set(5 - x, 5 - y, 5 - z);
        tempObject.rotation.y =
          Math.sin(x / 2 + time) +
          Math.sin(y / 4 + time) +
          Math.sin(z / 4 + time);
        tempObject.rotation.z = tempObject.rotation.y * 2;

        tempObject.updateMatrix();
        mesh.setMatrixAt(id, tempObject.matrix);
      }
  mesh.instanceMatrix.needsUpdate = true;

  renderer.render(scene, camera);
});
