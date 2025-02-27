import {
    Camera3D,
    Engine3D,
    DirectLight,
    ForwardRenderJob,
    GUIHelp,
    HoverCameraController,
    MeshRenderer,
    Object3D,
    RendererMask,
    Scene3D,
    webGPUContext,
    Color
} from '@orillusion/core';

class Sample_morph {
    scene: Scene3D;
    hoverCameraController: HoverCameraController;

    async run() {
        await Engine3D.init();
        GUIHelp.init();

        this.scene = new Scene3D();
        let cameraObj = new Object3D();
        cameraObj.name = `cameraObj`;
        let mainCamera = cameraObj.addComponent(Camera3D);
        this.scene.addChild(cameraObj);

        mainCamera.perspective(60, webGPUContext.aspect, 1, 5000.0);
        this.hoverCameraController = mainCamera.object3D.addComponent(HoverCameraController);
        this.hoverCameraController.setCamera(0, 0, 110);

        await this.initScene(this.scene);

        let renderJob = new ForwardRenderJob(this.scene);

        renderJob.debug();
        Engine3D.startRender(renderJob);
    }

    private influenceData: { [key: string]: number } = {};
    private targetRenderers: { [key: string]: MeshRenderer } = {};

    async initScene(scene: Scene3D) {
        {
            let data = await Engine3D.res.loadGltf('https://cdn.orillusion.com/gltfs/glb/lion.glb');
            data.y = -80.0;
            data.x = -30.0
            scene.addChild(data);
            GUIHelp.addFolder('morph controller');

            let meshRenders: MeshRenderer[] = this.fetchMorphRenderers(data);
            for (const renderer of meshRenders) {
                renderer.setMorphInfluenceIndex(0, 0);
                for (const key in renderer.geometry.morphTargetDictionary) {
                    this.influenceData[key] = 0;
                    this.targetRenderers[key] = renderer;
                    GUIHelp.add(this.influenceData, key, 0, 1, 0.01).onChange((v) => {
                        this.influenceData[key] = v;
                        this.track(this.influenceData, this.targetRenderers);
                    });
                }
            }
            GUIHelp.open();
            GUIHelp.endFolder();
        }
        {
            let ligthObj = new Object3D();
            ligthObj.rotationY = 135
            ligthObj.rotationX = 45
            let dl = ligthObj.addComponent(DirectLight);
            dl.lightColor = new Color(1.0, 0.95, 0.84, 1.0);
            scene.addChild(ligthObj);
            dl.intensity = 15;
        }
        return true;
    }

    /**
     * 将morph的数据绑定到3D显示对象
     * @param data 格式{leftEye:0, rightEye:0.5, mouth:0.3}
     * @param targets 每个morph对象的MeshRender引用
     * @returns
     */
    private track(data: { [key: string]: number }, targets: { [key: string]: MeshRenderer }): void {
        for (let key in targets) {
            let renderer = targets[key];
            let value = data[key];
            renderer.setMorphInfluence(key, value);
        }
    }

    private fetchMorphRenderers(obj: Object3D): MeshRenderer[] {
        let rendererList: MeshRenderer[] = [];
        obj.forChild((child)=>{
            let mr = child.getComponent(MeshRenderer)
            if(mr && mr.hasMask(RendererMask.MorphTarget))
                rendererList.push(mr)   
        })
        return rendererList;
    }
}
new Sample_morph().run();