import { Engine3D, Scene3D, Object3D, Camera3D, ForwardRenderJob, LitMaterial, SkyBoxGeometry, MeshRenderer, DirectLight, HoverCameraController, Color, Vector3 } from "@orillusion/core";
async function demo() {
	// 初始化引擎
	await Engine3D.init({});
	// 新建场景根节点
	let scene3D:Scene3D = new Scene3D();
	// 新建摄像机实例
	let cameraObj:Object3D = new Object3D();
	let camera = cameraObj.addComponent(Camera3D);
	// 调整摄像机视角
	camera.perspective(60, window.innerWidth / window.innerHeight, 1, 5000.0);
	// 设置相机控制器
	let controller = camera.object3D.addComponent(HoverCameraController);
  	controller.setCamera(0, 0, 15);
	// 添加相机节点
	scene3D.addChild(cameraObj);
	// 新建光照
	let light:Object3D = new Object3D();
	// 添加直接光组件
	let component:DirectLight = light.addComponent(DirectLight);
	// 调整光照参数
	light.rotationX = 45;
	light.rotationY = 30;
	component.lightColor = new Color(1.0, 1.0, 1.0, 1.0);
	component.intensity = 1;
	// 添加光照对象
	scene3D.addChild(light);
	// 新建对象
	const obj:Object3D = new Object3D();
	// 为对象添 MeshRenderer
	let mr:MeshRenderer = obj.addComponent(MeshRenderer);
	// 设置几何体
	mr.geometry = new SkyBoxGeometry(100, 100, 100);
	// 设置材质
	mr.material = new LitMaterial();
	// 设置位置和旋转
	obj.localPosition = new Vector3(0, 0, 0);
	// 添加对象
	scene3D.addChild(obj);
	// 新建前向渲染业务
	let renderJob:ForwardRenderJob = new ForwardRenderJob(scene3D);
	// 开始渲染
	Engine3D.startRender(renderJob);
}
demo();