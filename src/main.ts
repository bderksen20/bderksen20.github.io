import './styles/style.css';
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  TextureLoader,
  SphereGeometry,
  MeshStandardMaterial,
  Mesh,
  AmbientLight,
  DirectionalLight,
  Color,
} from 'three';

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <!-- <div>
//     <p class="appcontent">
//       Under construction
//     </p>
//   </div> -->
// `

// == general =====================================================================
document.fonts.ready.then(() => {
  document.querySelector('nav a')?.classList.add('ready');  // fade in nav items
});


// == three stuff =================================================================
const canvas = document.getElementById('three-canvas') as HTMLCanvasElement;
if( !canvas )
  throw new Error('Could not find canvas for three.js rendering...');

// scene + camera setup
const scene = new Scene()
scene.background = new Color('black');

const aspect = canvas.clientWidth / canvas.clientHeight;
var camera = new PerspectiveCamera( 75, aspect, 0.1, 100 );
camera.position.set(0, 0, 30);

// add drawables
const texx = new TextureLoader().load('{{.Host}}/static/img/tex_sample_artifact.png');
const geometry = new SphereGeometry( 15, 128, 64 );
const material = new MeshStandardMaterial( { color: 0xff0000 , metalness: 0.5, roughness: 0, map: texx} );
var sphere = new Mesh( geometry, material );
scene.add( sphere );

// lighting
const ambientLight = new AmbientLight( 0xcccccc, 0.4 );
scene.add( ambientLight );
const directionalLight = new DirectionalLight( 0xffffff, 1 );
directionalLight.position.set(-30,30,30);
scene.add( directionalLight );

// renderer
var renderer = new WebGLRenderer({antialias:true, canvas: canvas, alpha: true});
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.shadowMapEnabled = true;

var time = 0;
window.addEventListener( 'resize', onWindowResize, false );
render();

function render(){
  time += 1 / 2*Math.PI / 100;
  requestAnimationFrame( render );  

  blobify();
  sphere.rotation.y += 0.02;
  //sphere.position.x = Math.cos(time) * 20;

  renderer.render(scene, camera);
};

function blobify(/*time*/){
  var position = sphere.geometry.attributes.position.array;
  for(let v = 0; v < position.length; v++){
    position[v] += (Math.random() - 0.5) * 0.05;
  }

  sphere.geometry.attributes.position.needsUpdate = true;
  sphere.geometry.computeVertexNormals();
  sphere.geometry.computeBoundingBox();
  sphere.geometry.computeBoundingSphere();
};

function onWindowResize(){
  camera.aspect = canvas.clientWidth / canvas.clientHeight
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
};
