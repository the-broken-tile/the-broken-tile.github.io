


// renderer
const renderer = new THREE.WebGLRenderer();
const twoDRenderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// scene
const scene = new THREE.Scene();
const twoDScene = new THREE.Scene();
// camera
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(20, 20, 20);

const twoDCamera = new THREE.OrthographicCamera(0, window.innerWidth / window.innerHeight, 1, 10000);
// controls
const controls = new OrbitControls(camera, renderer.domElement);

// ambient
scene.add(new THREE.AmbientLight(0x222222));

// light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(20, 20, 0);
scene.add(light);

// axes
scene.add(new THREE.AxesHelper(20));

// mesh
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(5, 12, 8),
    new THREE.MeshPhongMaterial({
        color: 0x00ffff,
        flatShading: true,
        transparent: true,
        opacity: 0.7,
    })
);
scene.add(mesh);

function animate() {
    requestAnimationFrame(animate);
    //controls.update();
    renderer.render(scene, camera);
    // twoDRenderer.render(twoDScene, twoDCamera);
}

animate();