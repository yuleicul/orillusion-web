import {
    Camera3D,
    DirectLight,
    Engine3D,
    ForwardRenderJob,
    GUIHelp,
    LitMaterial,
    HoverCameraController,
    KelvinUtil,
    MeshRenderer,
    Object3D,
    PlaneGeometry,
    Scene3D,
    CameraUtil,
    webGPUContext,
    PropertyAnimation,
    PropertyAnimClip,
    WrapMode,
} from '@orillusion/core';

export class Sample_PropertyAnim {
    lightObj: Object3D;
    scene: Scene3D;
    private animation: PropertyAnimation;

    constructor() { }

    async run() {
        await Engine3D.init();
        GUIHelp.init()

        this.scene = new Scene3D();
        Camera3D.mainCamera = CameraUtil.createCamera3DObject(this.scene, 'camera');
        Camera3D.mainCamera.perspective(60, webGPUContext.aspect, 1, 2000.0);
        let ctrl = Camera3D.mainCamera.object3D.addComponent(HoverCameraController);
        ctrl.setCamera(180, -20, 15);

        await this.initScene(this.scene);

        let renderJob = new ForwardRenderJob(this.scene);
        Engine3D.startRender(renderJob);

        GUIHelp.addButton('Restart', () => {
            this.animation.play('anim_0', true);
        });
        let guiData = {} as any;
        guiData.Seek = 0;
        guiData.Speed = 1;
        GUIHelp.add(guiData, 'Seek', 0, 1, 0.01).onChange((v) => {
            this.animation.stop();
            this.animation.seek(v);
        });
        GUIHelp.add(guiData, 'Speed', 0, 1, 0.01).onChange((v) => {
            this.animation.speed = v;
        });
    }

    private async makePropertyAnim(node: Object3D) {
        // 添加组件
        let animation = node.addComponent(PropertyAnimation);
        // 加载clip素材
        let res = await fetch('https://cdn.orillusion.com/json/anim_0.json');
        let json = await res.json();
        // 初始化clip
        let animClip = new PropertyAnimClip();
        // 解析clip
        animClip.parser(json);
        animClip.wrapMode = WrapMode.Loop;
        animation.defaultClip = animClip.name;
        animation.autoPlay = true;
        // 将clip追加至组件
        animation.appendClip(animClip);
        return animation;
    }

    async initScene(scene: Scene3D) {
        /******** light *******/
        {
            this.lightObj = new Object3D();
            this.lightObj.x = 0;
            this.lightObj.y = 30;
            this.lightObj.z = -40;
            this.lightObj.rotationX = 45;
            this.lightObj.rotationY = 0;
            this.lightObj.rotationZ = 45;
            let lc = this.lightObj.addComponent(DirectLight);
            lc.lightColor = KelvinUtil.color_temperature_to_rgb(5355);
            lc.intensity = 20;
            scene.addChild(this.lightObj);
        }

        let duck = await Engine3D.res.loadGltf('https://cdn.orillusion.com/PBR/Duck/Duck.gltf');
        this.scene.addChild(duck);
        duck.scaleX = duck.scaleY = duck.scaleZ = 0.02;

        this.animation = await this.makePropertyAnim(duck);
        this.animation.play(this.animation.defaultClip);

        return true;
    }
}

new Sample_PropertyAnim().run();