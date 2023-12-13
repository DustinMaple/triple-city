import { _decorator, Component, EventMouse, Input, instantiate, Node, NodeEventType, Prefab, UITransform, Vec2, Vec3 } from 'cc';
import { Boot } from './Boot';
import { Global } from './Global';
import { Box } from './Box';
const { ccclass, property } = _decorator;

const BORDER: number = 30;

@ccclass('Stage')
export class Stage extends Component {

    @property(Prefab)
    areaPrefab: Prefab;

    @property(Prefab)
    boxPrefab: Prefab;

    private _areaWidth: number;
    private _areaSize: number;
    private _boxWidth: number;

    /**
     * 随机出来的下一个元素
     */
    private _nextElement: number;

    set AreaSize(size: number) {
        this._areaSize = size;
    }

    start() {
        console.info("构建游戏场景，size=", this._areaSize);
        console.info("窗口宽:", Global.windowWidth());

        this.addArea();
        this.addBox();
        this.randomNext();
    }

    randomNext() {
        this._nextElement = Math.floor(Math.random() * 2);
        console.log("random:", this._nextElement);
    }


    addArea() {
        this._areaWidth = Global.windowWidth() - BORDER * 2;
        console.log("地块区域边长:%s", this._areaWidth);

        const area = instantiate(this.areaPrefab);
        const transform = area.getComponent(UITransform);
        transform.setContentSize(this._areaWidth, this._areaWidth);
        area.setPosition(Vec3.ZERO);
        this.node.addChild(area);
    }

    addBox() {
        
        this._boxWidth = Math.round(this._areaWidth / this._areaSize);
        const half = this._boxWidth / 2

        const origin:Vec3 = new Vec3(this.node.position.x - this._areaWidth / 2, this.node.position.y - this._areaWidth / 2);

        for (let i = 0; i < this._areaSize; ++i){
            for (let j = 0; j < this._areaSize; ++j){
                let boxPosition = new Vec3(origin.x + (j * this._boxWidth + half), origin.y + (i * this._boxWidth + half))
                this.createBox(boxPosition, i * this._areaSize + j);
            }
        }
    }

    createBox(boxPosition: Vec3, index: number) {
        let boxNode: Node = instantiate(this.boxPrefab);
        boxNode.setPosition(boxPosition);
        let boxComp: Box = boxNode.getComponent(Box);
        boxComp.index = index;
        const transform = boxNode.getComponent(UITransform);
        transform.setContentSize(this._boxWidth, this._boxWidth);

        boxNode.on(Input.EventType.MOUSE_UP, this.clickBox, this);

        this.node.addChild(boxNode);
    }

    update(deltaTime: number) {

    }

    clickBox(event: EventMouse) {
        const clickNode = event.target as Node;
        const boxComp:Box = clickNode.getComponent(Box);
        console.log("click:", boxComp.index);

        boxComp.setElement(this._nextElement);
        this.randomNext();
    }
}


