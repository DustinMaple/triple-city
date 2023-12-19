import { _decorator, Component, Label, Node, resources, Sprite, SpriteFrame, Vec2, Vec3 } from 'cc';
import { Boot } from './Boot';
import { ElementRes } from './Res/ElementRes';
const { ccclass, property } = _decorator;

const FLY_TIME = 1;

@ccclass('Box')
export class Box extends Component {
    

    @property(Label)
    nameLabel: Label = null;

    @property(Sprite)
    ground: Sprite = null;

    @property(Sprite)
    elementSprite: Sprite = null;

    private _x: number;
    private _y: number;
    private _element: number = 0;
    private _speed: number;
    private _target: Vec3;
    private _moveTime: number = 0;

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
        console.log('创建Box：%s,%s, position: %s', this._x, this._y, this.node.position);
        // this.nameLabel.string = this._index.toString();
        this.ground.spriteFrame = null;
        this.elementSprite.spriteFrame = null;
    }

    set element(value: number) {
        this._element = value;

        this.nameLabel.string = value.toString();
        Boot.Inst().loadSprite('test_ground/spriteFrame', (spriteFrame: SpriteFrame) => {
            this.ground.spriteFrame = spriteFrame;
        })

        const res: ElementRes = ElementRes.getRes(value);
        Boot.Inst().loadSprite(res.pic + '/spriteFrame', (spriteFrame: SpriteFrame) => {
            this.elementSprite.spriteFrame = spriteFrame;
        })
    }

    get element() {
        return this._element;
    }

    merge(target: Vec3) {
        this.ground.spriteFrame = null;
        // this.elementSprite.spriteFrame = null;
        this._element = 0;
        this.nameLabel.string = '';

        this.moveTo(target);
    }

    moveTo(target: Vec3) {
        this._target = target;
        let dis = this._target.subtract(this.node.position).length();
        this._speed = dis / FLY_TIME;
        this._moveTime = 0;
    }



    protected update(dt: number): void {
        if (!this._target) {
            return;
        }

        this._moveTime += dt;
        if (this._moveTime >= FLY_TIME) {
            this.elementSprite.spriteFrame = null;
            this.elementSprite.node.setPosition(this.node.position);
            this._moveTime = 0;
            this._target = null;
            console.log("fly finish")
            return;
        }

        let curPos:Vec3 = this.elementSprite.node.position;
        let dir: Vec3 = this._target.subtract(curPos);
        let moveDis = this._speed * dt;
        let rate = moveDis / dir.length();
        let x = curPos.x + dir.x * rate;
        let y = curPos.y + dir.y * rate;
        this.elementSprite.node.setPosition(new Vec3(x, y));
        console.log(`设置：(%s, %s)---(%s, %s)， target:%s, %s`, this._x, this._y, x, y, this._target.x, this._target.y);
    }
}


