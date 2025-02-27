import {
  Camera3D,
  defaultTexture,
  DirectLight,
  Engine3D,
  ForwardRenderJob,
  GLTFParser,
  GUIHelp,
  LitMaterial,
  HoverCameraController,
  KelvinUtil,
  MeshRenderer,
  Object3D,
  PlaneGeometry,
  Scene3D,
  SphereGeometry,
  SSRPost,
  SSR_IS_Kernel,
  Time,
  CameraUtil,
  webGPUContext,
  GTAOPost,
  HDRBloomPost,
  TAAPost,
} from "@orillusion/core";

export class Sample_SSR {
  lightObj: Object3D;
  scene: Scene3D;
  mats: any[];

  constructor() {}

  async run() {
    Engine3D.setting.material.materialChannelDebug = false;
    Engine3D.setting.material.materialDebug = false;

    Engine3D.setting.shadow.shadowBound = 200;
    Engine3D.setting.shadow.shadowBias = 0.002;
    Engine3D.setting.shadow.debug = false;

    Engine3D.setting.shadow.autoUpdate = true;
    Engine3D.setting.shadow.updateFrameRate = 1;

    Engine3D.setting.render.postProcessing.taa.debug = false;
    Engine3D.setting.render.postProcessing.gtao.debug = false;
    Engine3D.setting.render.postProcessing.bloom.debug = false;
    await Engine3D.init({
      renderLoop: () => this.loop(),
    });

    GUIHelp.init();

    this.scene = new Scene3D();
    Camera3D.mainCamera = CameraUtil.createCamera3DObject(this.scene, "camera");
    Camera3D.mainCamera.perspective(60, webGPUContext.aspect, 1, 2000.0);
    let ctrl = Camera3D.mainCamera.object3D.addComponent(HoverCameraController);
    ctrl.setCamera(180, -5, 60);
    await this.initScene(this.scene);

    let renderJob = new ForwardRenderJob(this.scene);
    renderJob.addPost(new GTAOPost());
    renderJob.addPost(new SSRPost());
    renderJob.addPost(new TAAPost());
    renderJob.addPost(new HDRBloomPost());

    Engine3D.startRender(renderJob);
  }

  /**
   * @ch asdasda
   * @en asdasdas
   * @param scene
   * @returns
   */
  async initScene(scene: Scene3D) {
    /******** light *******/
    {
      this.lightObj = new Object3D();
      this.lightObj.rotationX = 15;
      this.lightObj.rotationY = 110;
      this.lightObj.rotationZ = 0;
      let lc = this.lightObj.addComponent(DirectLight);
      lc.lightColor = KelvinUtil.color_temperature_to_rgb(5355);
      lc.castShadow = true;
      lc.intensity = 27;
      lc.debug();
      scene.addChild(this.lightObj);
    }

    // 加载外部模型文件;
    let minimalObj = await Engine3D.res.loadGltf(
      "https://cdn.orillusion.com/PBR/ToyCar/ToyCar.gltf"
    );
    minimalObj.scaleX = minimalObj.scaleY = minimalObj.scaleZ = 1000;
    scene.addChild(minimalObj);

    await this.createPlane(scene);
    return true;
  }

  private sphere: Object3D;

  private async createPlane(scene: Scene3D) {
    let mat = new LitMaterial();
    mat.baseMap = defaultTexture.grayTexture;
    mat.normalMap = defaultTexture.normalTexture;
    mat.aoMap = defaultTexture.whiteTexture;
    mat.emissiveMap = defaultTexture.blackTexture;
    mat.roughness = 0.2;
    mat.roughness_max = 0.1;
    mat.metallic = 0.5;

    {
      let floorMaterial = new LitMaterial();
      floorMaterial.baseMap = defaultTexture.grayTexture;
      floorMaterial.normalMap = defaultTexture.normalTexture;
      floorMaterial.aoMap = defaultTexture.whiteTexture;
      floorMaterial.emissiveMap = defaultTexture.blackTexture;
      floorMaterial.roughness = 0.5;
      floorMaterial.roughness_max = 0.1;
      floorMaterial.metallic = 0.5;

      let planeGeometry = new PlaneGeometry(200, 200);
      let floor: Object3D = new Object3D();
      let mr = floor.addComponent(MeshRenderer);
      mr.material = floorMaterial;
      mr.geometry = planeGeometry;
      scene.addChild(floor);

      GUIHelp.add(floorMaterial, "roughness", 0, 1, 0.01);
      GUIHelp.add(floorMaterial, "metallic", 0, 1, 0.01);
    }

    {
      let sphereGeometry = new SphereGeometry(10, 50, 50);
      let obj: Object3D = new Object3D();
      let mr = obj.addComponent(MeshRenderer);
      mr.material = mat;
      mr.geometry = sphereGeometry;
      obj.x = 30;
      obj.y = 10;
      scene.addChild(obj);
      this.sphere = obj;
    }

    {
      let sphereGeometry = new SphereGeometry(2, 50, 50);
      for (let i = 0; i < 10; i += 2) {
        for (let j = 0; j < 10; j += 2) {
          let rmMaterial = new LitMaterial();
          rmMaterial.baseMap = defaultTexture.grayTexture;
          rmMaterial.normalMap = defaultTexture.normalTexture;
          rmMaterial.aoMap = defaultTexture.whiteTexture;
          rmMaterial.emissiveMap = defaultTexture.blackTexture;
          rmMaterial.roughness = j / 10;
          rmMaterial.roughness_max = 1;
          rmMaterial.metallic = i / 10;

          let obj: Object3D = new Object3D();
          let mr = obj.addComponent(MeshRenderer);
          mr.material = rmMaterial;
          mr.geometry = sphereGeometry;

          obj.y = j * 5 + 10;
          obj.x = 50;
          obj.z = i * 5 - 25;
          scene.addChild(obj);
        }
      }
    }
  }

  private loop(): void {
    if (this.sphere) {
      this.sphere.x = Math.sin(Time.time * 0.0001) * 30;
      this.sphere.z = Math.cos(Time.time * 0.0001) * 30;
    }
  }
}

new Sample_SSR().run();
