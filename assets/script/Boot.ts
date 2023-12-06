import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
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

    static Inst() {
        return this._ins;
    }

    protected onLoad(): void {
        Boot._ins = this;

        console.info("Start Game");
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
        this.node.addChild(stage);
    }

    getSize() {
        return this._curStageSize;
    }
}


