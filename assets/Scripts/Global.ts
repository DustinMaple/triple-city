import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Global')
export class Global extends Component {
    static init() {
        throw new Error('Method not implemented.');
    }
    static WORLD = "world";
    hello = "hello";



    start() {

    }

    update(deltaTime: number) {
        
    }
}

