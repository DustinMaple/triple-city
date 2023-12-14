import { _decorator, Component, Label, Node, resources, Sprite, SpriteFrame } from 'cc';
import { Boot } from './Boot';
const { ccclass, property } = _decorator;

@ccclass('Box')
export class Box extends Component {
    
    @property(Label)
    nameLabel: Label = null;

    @property(Sprite)
    ground: Sprite = null;

    private _x: number;
    private _y: number;
    private _element: number = 0;

    set x(value: number) {
        this._x = value;
    }

    get x() {
        return this._x;
    }

    set y(value: number) {
        this._y = value;
    }

    get y() {
        return this._y;
    }

    start() {
        console.log('创建Box：%s, position: %s', this._index, this.node.position);
        // this.nameLabel.string = this._index.toString();
        this.ground.spriteFrame = null;
    }

    set element(value: number) {
        this._element = value;

        this.nameLabel.string = value.toString();
        Boot.Inst().loadSprite('test_ground/spriteFrame', (spriteFrame: SpriteFrame) => {
            this.ground.spriteFrame = spriteFrame;
        })
    }

    get element() {
        return this._element;
    }

    clear() {
        this.ground.spriteFrame = null;
        this._element = 0;
        this.nameLabel.string = '';
    }
}


