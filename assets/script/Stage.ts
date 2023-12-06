import { _decorator, Component, Node } from 'cc';
import { Boot } from './Boot';
const { ccclass, property } = _decorator;

@ccclass('Stage')
export class Stage extends Component {
    protected onLoad(): void {
        console.info("构建游戏场景，size=", Boot.Inst().getSize());
    }

    start() {

    }

    update(deltaTime: number) {

    }
}


