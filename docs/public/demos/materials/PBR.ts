import { Camera3D, DirectLight, Engine3D, ForwardRenderJob, GUIHelp, HoverCameraController, MeshRenderer, Object3D, Scene3D, SphereGeometry, LitMaterial } from '@orillusion/core';

export class Sample_Materials {
    scene: Scene3D;
    lightObj: Object3D;

    constructor() {}

    async run() {
        await Engine3D.init();
        this.scene = new Scene3D();
        let cameraObj = new Object3D();
        let mainCamera = cameraObj.addComponent(Camera3D);
        this.scene.addChild(cameraObj);
        mainCamera.perspective(60, window.innerWidth / window.innerHeight, 1, 5000.0);
        mainCamera.object3D.addComponent(HoverCameraController);

        await this.initScene();
        
        let renderJob = new ForwardRenderJob(this.scene);
        Engine3D.startRender(renderJob);
    }

    async initScene() {
        {
            this.lightObj = new Object3D();
            this.lightObj.x = -20;
            this.lightObj.y = 20;
            this.lightObj.z = -20;
            this.lightObj.rotationX = 45;
            this.lightObj.rotationY = 45;
            this.lightObj.rotationZ = 0;
            let lc = this.lightObj.addComponent(DirectLight);
            lc.intensity = 0.2;
            this.scene.addChild(this.lightObj);
        }
        {
            // PRB
            let sphere = new Object3D();
            let mr = sphere.addComponent(MeshRenderer);
            mr.geometry = new SphereGeometry(2.5, 30, 30);
            let mat = new LitMaterial();
            mr.material = mat;
            this.scene.addChild(sphere);
            sphere.localPosition.set(0, 0, 0);
        }
    }
}

new Sample_Materials().run();