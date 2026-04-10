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
  MeshPhysicalMaterial,
  PlaneGeometry,
  MeshBasicMaterial,
  ACESFilmicToneMapping,
  SRGBColorSpace,
  Clock,
  InterpolateSmooth,
} from 'three';
import { lerp } from 'three/src/math/MathUtils.js';

const USE_MESH_DEFORM_SHADER: boolean = true;
const ANIM_DT_RCP = 1 / 2; // s

export class GfxEngine{
    private canvas: HTMLCanvasElement;
    private scene!: Scene;
    private camera!: PerspectiveCamera;
    private renderer!: WebGLRenderer;
    private clock!: Clock;

    private state = 0;
    private animStartTime = 0;

    constructor(canvas: HTMLCanvasElement) { this.canvas = canvas; }

    run()
    {
        this.clock = new Clock();
        this.scene = new Scene();
        this.scene.background = new Color('black');

        const aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera = new PerspectiveCamera( 75, aspect, 0.1, 100 );
        this.camera.position.set(0, 0, 30);

        const texx = new TextureLoader().load('/tex_sample_artifact.png');
        texx.colorSpace = SRGBColorSpace;
        //const contentTex = new TextureLoader().load('/images/mw3-disciple.webp');

        //const contentQuadGeo = new PlaneGeometry(10,5);
        const sphereGeo = new SphereGeometry( 10, 256, 256 );
        const orbGeo = new SphereGeometry( 15, 256, 256 );

        // use three 'onBeforeCompile' shader injection to modify the existing MeshStandardMaterial vertex shader
        const material = new MeshStandardMaterial( 
        { /*color: 0xff0000 ,*/ 
            metalness: 0.5, 
            roughness: 0.4, 
            //emissiveMap: texx,
            //emissive: 0xFFFFFF,
            //emissiveIntensity: 1,
            map: texx,
        } );
        const glassMat = new MeshPhysicalMaterial( 
            {
                //  color: 0xFFFFFFF,
                roughness: 0,
                transmission: 1,
                thickness: 9,
                ior: 1.5,
                //clearcoat: 1,
                //clearcoatRoughness: 0.05,
                //reflectivity: 1,
                side: 2
            } 
        );
        //const contentMat = new MeshBasicMaterial({map: contentTex})

        if( USE_MESH_DEFORM_SHADER )
        {
            material.onBeforeCompile = (shader) => {
                shader.uniforms.uTime = { value: 0.0 };
                shader.vertexShader = `uniform float uTime;\n` + shader.vertexShader;
                shader.vertexShader = shader.vertexShader.replace(
                    `#include <begin_vertex>`,
                    `#include <begin_vertex>

                    //vec3 n = normal;
                    //float mul = sin( uTime * 2.0) * 3.0;
                    //transformed += n * fract(sin(transformed.x) * 43758.5453123) * mul;

                    // "transformed" is Three's internal vec3 for the vertex position
                    float mul = sin( uTime * 0.5) * 3.0;
                    transformed.y += sin(transformed.x * 2.0 + uTime) * mul;

                    vec3 newNormal = normal;
                    float dDisp_dx = cos(position.x + uTime) * 0.5;
                    newNormal.x -= dDisp_dx;
                    transformedNormal = normalize(newNormal);
                    `
                );
                material.userData.shader = shader;
            }
        }

        var sphere = new Mesh( sphereGeo, material );
        var orb = new Mesh( orbGeo, glassMat );
        //var plane = new Mesh(contentQuadGeo, contentMat )

        this.scene.add( sphere );
        this.scene.add( orb );
        //this.scene.add( plane );

        const ambientLight = new AmbientLight( 0xcccccc, 0.3 );
        this.scene.add( ambientLight );
        const directionalLight = new DirectionalLight( 0xffffff, 1.5 );
        directionalLight.position.set(-30,30,30);

        this.scene.add( directionalLight );

        this.renderer = new WebGLRenderer({antialias:true, canvas: this.canvas, alpha: true});
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.outputColorSpace = SRGBColorSpace;
        //this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.toneMapping = ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 3.0;

        const render = () => {
            requestAnimationFrame( render );  

            const time = this.clock.getElapsedTime();
            const dt = this.clock.getDelta();

            if (material.userData.shader) {
                material.userData.shader.uniforms.uTime.value += 0.01;
            }

            if(this.state == 1)
            {
                const t = (time - this.animStartTime) * ANIM_DT_RCP
                if( t > 1) { 
                    this.state = 0;
                    this.animStartTime = 0;
                } else {
                    
                    ambientLight.intensity *= 1 - lerp(0, 1, t);
                    directionalLight.intensity *= 1 - lerp(0, 1, t);
                }
            }
            else if(this.state == 2)
            {
                //sphere.position.x = 0;
            }

            sphere.rotation.y += 0.003;
            this.renderer.render(this.scene, this.camera);
        }

        render();
    }

    animReset(){
        this.state = 0;
    }

    animTrigger(){
        this.animStartTime = this.clock.getElapsedTime();
        this.state = 1;
    }

    resize(){
        this.camera.aspect = this.canvas.parentElement.clientWidth / this.canvas.parentElement.clientHeight
        this.camera.updateProjectionMatrix();

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        const rect = this.canvas.parentElement.getBoundingClientRect();
        const width = rect.width - scrollbarWidth;
        const height = rect.height;

        this.renderer.setSize( width, height );
    }
}