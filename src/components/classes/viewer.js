import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'

export default class Viewer {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.grid = new THREE.GridHelper(1000, 1000);
        this.stats = new Stats();

        this.renderer.setSize(this.width, this.height);
        
        this.cube1 = this.createCube();
        this.cube2 = this.createCubeMultiplesTextures();

        this.camera.position.set(1, 2, 3);
        this.camera.lookAt(0, 0, 0);
        
        this.scene.add(this.grid)
        this.scene.add(this.cube1);
        this.scene.add(this.cube2);

        document.body.appendChild(this.stats.dom);
        this.animate();

        window.addEventListener('resize', () => {
            this.onWindowResize();
        });
    }

    onWindowResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        const render = () => {
            requestAnimationFrame(render);
            
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
            this.stats.update();
        }
        render();
    }    

    createCube() {        
        const geometry = new THREE.BoxGeometry();
        const loader = new THREE.TextureLoader();

        const material = new THREE.MeshBasicMaterial({
            map: loader.load('resources/images/wood.jpg')
        });

        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(0, 0.5, 0);

        return cube;
    }

    createCubeMultiplesTextures() {
        const geometry = new THREE.BoxGeometry();

        const loader = new THREE.TextureLoader();
        const materials = [
            new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-1.jpg')}),
            new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-2.jpg')}),
            new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-3.jpg')}),
            new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-4.jpg')}),
            new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-5.jpg')}),
            new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-6.jpg')}),
        ];

        const cube = new THREE.Mesh(geometry, materials);
        cube.position.set(-2, 0.5, 0);

        return cube;
    }
}