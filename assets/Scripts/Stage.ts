import { _decorator, Component, EventMouse, Input, instantiate, Label, Node, NodeEventType, Prefab, UITransform, Vec2, Vec3 } from 'cc';
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

    @property(Label)
    nextLabel: Label;

    private _areaWidth: number;
    private _areaSize: number;
    private _boxWidth: number;

    /**
     * 随机出来的下一个元素
     */
    private _nextElement: number;
    private _boxes: Box[][];
    private _same: number[] = [];
    private _sameCount: number = 0;

    set AreaSize(size: number) {
        this._areaSize = size;
    }

    start() {
        console.info("构建游戏场景，size=", this._areaSize);
        console.info("窗口宽:", Global.windowWidth());
        this._boxes = new Array(this._areaSize);
        for (let i = 0; i < this._areaSize;++i){
            this._boxes[i] = new Array(this._areaSize);
        }
        this.addArea();
        this.addBox();
        this.randomNext();
    }

    randomNext() {
        let next: number = Math.floor(Math.random() * 10)
        
        if (next < 3) {
            this._nextElement = 2;
        } else {
            this._nextElement = 1;
        }
        this.nextLabel.string = this._nextElement.toString();
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
                this.createBox(boxPosition, i, j);
            }
        }
    }

    createBox(boxPosition: Vec3, x: number, y: number) {
        let boxNode: Node = instantiate(this.boxPrefab);
        boxNode.setPosition(boxPosition);
        let boxComp: Box = boxNode.getComponent(Box);
        this._boxes[x][y] = boxComp;

        boxComp.x = x;
        boxComp.y = y;
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
        console.log("click:[%s, %s], 准备设置元素:%s", boxComp.x, boxComp.y, this._nextElement);

        let elementId:number = this.checkUp(boxComp.x, boxComp.y, this._nextElement);

        this.handleSame();
        boxComp.element = elementId;
        this.randomNext();
    }

    checkUp(x: number, y: number, elementId: number): number {
        this._sameCount = 0;
        this.findSame(x, y, elementId);

        if (this._sameCount == 1) {
            this._same.pop();
        }else if (this._sameCount >= 2) {
            elementId = elementId + 1;
            console.log("升级:", elementId)
            return this.checkUp(x, y, elementId);
        }

        return elementId;
    }

    findSame(x: number, y: number, elementId: number) {
        this.checkSame(x + 1, y, elementId);
        this.checkSame(x, y + 1, elementId);
        this.checkSame(x - 1, y, elementId);
        this.checkSame(x, y - 1, elementId);
    }

    checkSame(x: number, y: number, elementId: number) {
        if (this.invalid(x, y)) {
            return;
        }

        const index = x * this._areaSize + y;
        if (this._same.indexOf(index) != -1) {
            return;
        }

        if (this._boxes[x][y].element == elementId) {
            this._same.push(index);
            this._sameCount++;
            this.findSame(x, y, elementId);
        }
    }

    handleSame() {
        if (!this._same) {
            return;
        }
        console.log("相同：", this._same);

        if (this._same.length <= 1) {
            this._same = [];
            return;
        }

        for (var value of this._same) {
            let x = Math.floor(value / this._areaSize);
            let y = value % this._areaSize;

            this._boxes[x][y].clear();
        }
        this._same = [];
    }

    invalid(x : number, y: number): boolean {
        return x < 0 || x >= this._areaSize || y < 0 || y >= this._areaSize;
    }
}


