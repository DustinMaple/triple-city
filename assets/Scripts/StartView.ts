import { _decorator, Component, Node } from 'cc';
import { Boot } from './Boot';
const { ccclass, property } = _decorator;

@ccclass('StartView')
export class StartView extends Component {
    onNormalClick() {
        Boot.Inst().startStage(5);
    }
}


