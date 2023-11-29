import { _decorator, Component, Node } from 'cc';
import { Global } from './Global';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    private global = Global;

    start() {
        console.log(this.global.WORLD, Global.WORLD);
        this.global.init();
    }

    update(deltaTime: number) {
        
    }
}

