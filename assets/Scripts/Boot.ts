import { _decorator, AssetManager, assetManager, Component, instantiate, Node, Prefab, sp, SpriteFrame } from 'cc';
import { Stage } from './Stage';
import { Global } from './Global';
const { ccclass, property } = _decorator;



@ccclass('Boot')
export class Boot extends Component {
    private static _ins: Boot = null;

    @property(Prefab)
    startViewPre: Prefab = null;

    @property(Prefab)
    stageViewPrefab: Prefab = null;

    private _startView: Node = null;
    private _curStageSize: number = 0;

    private _artBundle:AssetManager.Bundle;
    private _resBundle: AssetManager.Bundle;
    private _stage: Node;

    static Inst() {
        return this._ins;
    }

    protected onLoad(): void {
        Boot._ins = this;

        console.info("Start Game");
        Global.init();

        assetManager.loadBundle('Art', (err, bundle) => {
            if (err) {
                return console.error(err);
            }
            console.log('load bundle successfully.');
            console.log("bundle:", bundle);
            this._artBundle = bundle;
        })

        assetManager.loadBundle('Res', (err, bundle) => {
            if (err) {
                return console.error("加载配置出错");
            }

            console.log("加载完配置");
        })


        this.node.getChildByName("Bg").active = false;
        this.openStartView();
    }

    openStartView() {
        if (this.startViewPre) {
            console.info("open start view");
            this._startView = instantiate(this.startViewPre);
            this.node.addChild(this._startView);
        } else {
            console.error("not found StartView");
        }
    }

    startStage(size: number) {
        this._curStageSize = size;
        this._startView.active = false;

        this._stage = instantiate(this.stageViewPrefab);
        const stageComp: Stage = this._stage.getComponent(Stage);
        stageComp.AreaSize = size;
        this.node.addChild(this._stage);
    }

    getSize() {
        return this._curStageSize;
    }

    loadSprite(name: string, handle: (SpriteFrame)=>void) {
        this._artBundle.load(name, SpriteFrame, (err, spriteFrame: SpriteFrame) => {
            if (err) {
                return console.error("加载图片[%s]错误%s", name, err);
            }

            handle(spriteFrame); 
        })
    }

    backHome() {
        this._stage.destroy();
        this._startView.active = true;
    }
}


