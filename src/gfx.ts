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

export class GfxEngine{
    private canvas: HTMLCanvasElement;
    private scene!: Scene;
    private camera!: PerspectiveCamera;
    private renderer!: WebGLRenderer;

    constructor(canvas: HTMLCanvasElement) { this.canvas = canvas; }

    run()
    {
        this.scene = new Scene();
        this.scene.background = new Color('black');

        const aspect = this.canvas.clientWidth / this.canvas.clientHeight;
        this.camera = new PerspectiveCamera( 75, aspect, 0.1, 100 );
        this.camera.position.set(0, 0, 30);

        const texx = new TextureLoader().load('/tex_sample_artifact.png');
        const sphereGeo = new SphereGeometry( 15, 256, 256 );

        // use three 'onBeforeCompile' shader injection to modify the existing MeshStandardMaterial vertex shader
        const material = new MeshStandardMaterial( { color: 0xff0000 , metalness: 0.5, roughness: 0, map: texx} );
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
                float mul = sin( uTime * 2.0) * 3.0;
                transformed.y += sin(transformed.x * 2.0 + uTime) * mul;

                vec3 newNormal = normal;
                float dDisp_dx = cos(position.x + uTime) * 0.5;
                newNormal.x -= dDisp_dx;
                transformedNormal = normalize(newNormal);
                `
            );
            material.userData.shader = shader;
        }

        var sphere = new Mesh( sphereGeo, material );
        this.scene.add( sphere );

        const ambientLight = new AmbientLight( 0xcccccc, 0.3 );
        this.scene.add( ambientLight );
        const directionalLight = new DirectionalLight( 0xffffff, 1.5 );
        directionalLight.position.set(-30,30,30);

        this.scene.add( directionalLight );

        this.renderer = new WebGLRenderer({antialias:true, canvas: this.canvas, alpha: true});
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

        const render = () => {
            requestAnimationFrame( render );  
            if (material.userData.shader) {
                material.userData.shader.uniforms.uTime.value += 0.01;
            }

            sphere.rotation.y += 0.003;
            this.renderer.render(this.scene, this.camera);
        }

        render();
    }

    resize(){
        this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }
}