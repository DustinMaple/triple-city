import { _decorator, Component, Label, Node, resources, Sprite, SpriteFrame } from 'cc';
import { Boot } from './Boot';
const { ccclass, property } = _decorator;

@ccclass('Box')
export class Box extends Component {
    @property(Label)
    nameLabel: Label = null;

    @property(Sprite)
    ground: Sprite = null;

    private _index: number;

    set index(value: number) {
        this._index = value;
    }

    get index() {
        return this._index;
    }

    start() {
        console.log('创建Box：%s, position: %s', this._index, this.node.position);
        // this.nameLabel.string = this._index.toString();
        this.ground.spriteFrame = null;
    }

    setElement(elementId: number) {
        this.nameLabel.string = elementId.toString();
        Boot.Inst().loadSprite('test_ground/spriteFrame', (spriteFrame: SpriteFrame) => {
            this.ground.spriteFrame = spriteFrame;
        })
    }


}


