import { WebGPUDescriptorPool, BoxGeometry, CameraUtil, ComputeShader, Engine3D, ForwardRenderJob, GPUContext, GPUTextureFormat, GUIHelp, LitMaterial, HoverCameraController, MeshRenderer, Object3D, PostBase, RendererPassState, Scene3D, UniformGPUBuffer, Vector3, VirtualTexture, webGPUContext, RTFrame, RTDescript } from "@orillusion/core";

export class Demo_GaussianBlur {
    async run() {
        await Engine3D.init({});

        GUIHelp.init();

        let scene = new Scene3D();
        await this.initScene(scene);

        let mainCamera = CameraUtil.createCamera3DObject(scene);
        mainCamera.perspective(60, window.innerWidth / window.innerHeight, 0.01, 10000.0);

        let ctl = mainCamera.object3D.addComponent(HoverCameraController);
        ctl.setCamera(45, -30, 5)

        let renderJob = new ForwardRenderJob(scene);
        renderJob.addPost(new GaussianBlurPost());
        Engine3D.startRender(renderJob);
    }

    async initScene(scene: Scene3D) {
        var obj = new Object3D();
        let mr = obj.addComponent(MeshRenderer);
        mr.material = new LitMaterial();
        mr.geometry = new BoxGeometry();
        scene.addChild(obj);
    }
}

export class GaussianBlurPost extends PostBase {
    private mGaussianBlurShader: ComputeShader;
    private mGaussianBlurArgs: UniformGPUBuffer;
    private mRendererPassState: RendererPassState;
    private mBlurResultTexture: VirtualTexture;
    private mRTFrame: RTFrame;

    constructor() {
        super();
    }

    private createResource() {
        let presentationSize = webGPUContext.presentationSize;

        this.mBlurResultTexture = new VirtualTexture(presentationSize[0], presentationSize[1], GPUTextureFormat.rgba16float, false, GPUTextureUsage.STORAGE_BINDING | GPUTextureUsage.TEXTURE_BINDING);
        this.mBlurResultTexture.name = 'gaussianBlurResultTexture';

        let descript = new RTDescript();
        descript.clearValue = [0, 0, 0, 1];
        descript.loadOp = `clear`;
        this.mRTFrame = new RTFrame([
            this.mBlurResultTexture
        ],[
            descript
        ]);

        this.mRendererPassState = WebGPUDescriptorPool.createRendererPassState(this.mRTFrame);
        this.mRendererPassState.label = "GaussianBlur" ;
    }

    private createComputeShader() {
        this.mGaussianBlurArgs = new UniformGPUBuffer(28);
        this.mGaussianBlurArgs.setFloat('radius', 2);
        this.mGaussianBlurArgs.apply();

        this.mGaussianBlurShader = new ComputeShader(/* wgsl */`
            struct GaussianBlurArgs {
                radius: f32,
                retain: vec3<f32>,
            };

            @group(0) @binding(0) var<uniform> args: GaussianBlurArgs;
            @group(0) @binding(1) var colorMap: texture_2d<f32>;
            @group(0) @binding(2) var resultTex: texture_storage_2d<rgba16float, write>;

            @compute @workgroup_size(8, 8)
            fn CsMain( @builtin(global_invocation_id) globalInvocation_id: vec3<u32>) {
                var pixelCoord = vec2<i32>(globalInvocation_id.xy);

                var value = vec4<f32>(0.0);
                var count = 0.0;
                let radius = i32(args.radius);
                for (var i = -radius; i < radius; i += 1) {
                for (var j = -radius; j < radius; j += 1) {
                    var offset = vec2<i32>(i, j);
                    value += textureLoad(colorMap, pixelCoord + offset, 0);
                    count += 1.0;
                }
                }

                let result = value / count;
                textureStore(resultTex, pixelCoord, result);
            }
        `);
        this.mGaussianBlurShader.setUniformBuffer('args', this.mGaussianBlurArgs);
        this.autoSetColorTexture('colorMap', this.mGaussianBlurShader, false);
        this.mGaussianBlurShader.setStorageTexture(`resultTex`, this.mBlurResultTexture);

        this.mGaussianBlurShader.workerSizeX = Math.ceil(this.mBlurResultTexture.width / 8);
        this.mGaussianBlurShader.workerSizeY = Math.ceil(this.mBlurResultTexture.height / 8);
        this.mGaussianBlurShader.workerSizeZ = 1;

        this.debug();
    }

    public debug(){
        GUIHelp.addFolder('GaussianBlur');
        GUIHelp.add(this.mGaussianBlurArgs.memoryNodes.get(`radius`), `x`, 1, 10, 1).onChange(() => {
            this.mGaussianBlurArgs.apply();
        });
        GUIHelp.endFolder();
    }

    render(command: GPUCommandEncoder, scene: Scene3D) {
        if (!this.mGaussianBlurShader) {
            this.createResource();
            this.createComputeShader();
        }

        this.autoSetColorTexture('colorMap', this.mGaussianBlurShader, false);
        GPUContext.compute_command(command, [this.mGaussianBlurShader]);
        GPUContext.lastRenderPassState = this.mRendererPassState;
    }
}

new Demo_GaussianBlur().run();
