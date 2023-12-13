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

        const stage: Node = instantiate(this.stageViewPrefab);
        const stageComp: Stage = stage.getComponent(Stage);
        stageComp.AreaSize = size;
        this.node.addChild(stage);
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
}


