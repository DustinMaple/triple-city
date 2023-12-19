import { _decorator, Component, Label, Node, resources, Sprite, SpriteFrame, Vec2, Vec3 } from 'cc';
import { Boot } from './Boot';
import { ElementRes } from './Res/ElementRes';
const { ccclass, property } = _decorator;

const FLY_TIME = 0.2;

@ccclass('Box')
export class Box extends Component {

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

        if(this._target){
            this.reset();
        }

        Boot.Inst().loadSprite('test_ground/spriteFrame', (spriteFrame: SpriteFrame) => {
            this.ground.spriteFrame = spriteFrame;
        })

        const res: ElementRes = ElementRes.getRes(value);
        Boot.Inst().loadSprite(res.pic + '/spriteFrame', (spriteFrame: SpriteFrame) => {
            this.elementSprite.spriteFrame = spriteFrame;
        })

        console.log(`box node:%s, sprite node:%s`, this.node.position, this.elementSprite.node.position)
    }

    get element() {
        return this._element;
    }

    merge(target: Vec3) {
        this.ground.spriteFrame = null;
        // this.elementSprite.spriteFrame = null;
        this._element = 0;

        this.moveTo(target);
    }

    moveTo(target: Vec3) {
        console.log("move to", target)
        this._target = new Vec3(target.x - this.node.position.x, target.y - this.node.position.y);
        let dis = this._target.length();
        this._speed = dis / FLY_TIME;
        this._moveTime = 0;
        this.elementSprite.node.setScale(new Vec3(0.8, 0.8));
    }



    protected update(dt: number): void {
        if (!this._target) {
            return;
        }

        this._moveTime += dt;
        if (this._moveTime >= FLY_TIME) {
            this.reset();
            console.log("fly finish")
            return;
        }

        let curPos:Vec3 = this.elementSprite.node.position;
        let dir: Vec2 = new Vec2(this._target.x - curPos.x, this._target.y - curPos.y);
        let length = dir.length();
        let dirX = dir.x / length;
        let dirY = dir.y / length;
        let x = curPos.x + this._speed * dt * dirX;
        let y = curPos.y + this._speed * dt * dirY;
        this.elementSprite.node.setPosition(new Vec3(x, y));
        console.log(`设置：(%s, %s)---(%s, %s)， target:%s, %s`, this._x, this._y, x, y, this._target.x, this._target.y);
    }

    reset(){
        this.elementSprite.spriteFrame = null;
        this.elementSprite.node.setPosition(Vec3.ZERO);
        this.elementSprite.node.setScale(Vec3.ONE);
        this._moveTime = 0;
        this._target = null;
    }
}


