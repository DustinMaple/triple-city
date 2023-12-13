import { _decorator, Component, Node, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Global')
export class Global extends Component {
    private static _WINDOW_WIDTH: number;


    static init() {
        Global._WINDOW_WIDTH = Math.round(view.getVisibleSize().width);
    }

    static windowWidth() {
        return Global._WINDOW_WIDTH;
    }
}

