import {
	Camera3D, defaultTexture, DirectLight, Engine3D,
	ForwardRenderJob, GUIHelp, LitMaterial, HoverCameraController,
	KelvinUtil, MeshRenderer, Object3D, PlaneGeometry, Scene3D, SphereGeometry,
	 CameraUtil, webGPUContext, BoxGeometry, TAAPost
} from '@orillusion/core';

export class Sample_TAA {
	lightObj: Object3D;
	scene: Scene3D;
	constructor() { }

	async run() {
		Engine3D.setting.gi.enable = false;
		Engine3D.setting.shadow.enable = false;
		Engine3D.setting.shadow.debug = true;

		Engine3D.setting.shadow.shadowBound = 100;
		Engine3D.setting.shadow.shadowBias = 0.0002;
		await Engine3D.init({
			renderLoop: () => this.loop(),
		});

		GUIHelp.init();

		this.scene = new Scene3D();
		Camera3D.mainCamera = CameraUtil.createCamera3DObject(this.scene, 'camera');
		Camera3D.mainCamera.perspective(60, webGPUContext.aspect, 1, 5000.0);
		let ctrl = Camera3D.mainCamera.object3D.addComponent(HoverCameraController);
		ctrl.setCamera(0, -15, 20);
		await this.initScene();

		let renderJob = new ForwardRenderJob(this.scene);
		renderJob.addPost(new TAAPost());
		renderJob.debug();
		Engine3D.startRender(renderJob);
	}


	async initScene() {
		{
			this.lightObj = new Object3D();
			this.lightObj.rotationX = 15;
			this.lightObj.rotationY = 110;
			this.lightObj.rotationZ = 0;
			let lc = this.lightObj.addComponent(DirectLight);
			lc.lightColor = KelvinUtil.color_temperature_to_rgb(5355);
			lc.castShadow = true;
			lc.intensity = 10;
			this.scene.addChild(this.lightObj);
		}

		{
			let mat = new LitMaterial();
			mat.baseMap = defaultTexture.grayTexture;
			mat.normalMap = defaultTexture.normalTexture;
			mat.aoMap = defaultTexture.whiteTexture;
			mat.maskMap = defaultTexture.createTexture(32, 32, 255.0, 255.0, 0.0, 1);
			mat.emissiveMap = defaultTexture.blackTexture;
			mat.roughness = 1.0;
			mat.metallic = 0.0;

			let floor = new Object3D();
			let mr = floor.addComponent(MeshRenderer);
			mr.geometry = new PlaneGeometry(2000, 2000);
			mr.material = mat;
			this.scene.addChild(floor);
		}

		this.createPlane(this.scene);

	}

	private createPlane(scene: Scene3D) {
		let mat = new LitMaterial();
		mat.baseMap = defaultTexture.whiteTexture;
		mat.normalMap = defaultTexture.normalTexture;
		mat.aoMap = defaultTexture.whiteTexture;
		mat.maskMap = defaultTexture.createTexture(32, 32, 255.0, 10.0, 0.0, 1);
		mat.emissiveMap = defaultTexture.blackTexture;
		mat.roughness = 0.5;
		mat.roughness_max = 0.1;
		mat.metallic = 0.2;
		{
			let sphereGeometry = new SphereGeometry(1, 50, 50);
			let obj: Object3D = new Object3D();
			let mr = obj.addComponent(MeshRenderer);
			mr.material = mat;
			mr.geometry = sphereGeometry;
			obj.x = 10;
			obj.y = 2;
			scene.addChild(obj);
		}

		const length = 5;
		for (let i = 0; i < length; i++) {
			let cubeGeometry = new BoxGeometry(1, 10, 1);
			for (let j = 0; j < length; j++) {
				let obj: Object3D = new Object3D();
				let mr = obj.addComponent(MeshRenderer);
				mr.material = mat;
				mr.geometry = cubeGeometry;
				obj.localScale = obj.localScale;
				obj.x = (i - 2.5) * 4;
				obj.z = (j - 2.5) * 4;
				obj.y = 5;
				obj.rotationX = (Math.random() - 0.5) * 90;
				obj.rotationY = (Math.random() - 0.5) * 90;
				obj.rotationZ = (Math.random() - 0.5) * 90;
				scene.addChild(obj);
			}
		}
	}

	private loop(): void {
	}
}

new Sample_TAA().run();
