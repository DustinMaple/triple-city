import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export class ElementRes {
    private _id: number;
    private _name: string;
    private _pic: string;
    private _next: number;

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }
    
    get pic() {
        return this._pic;
    }
    
    get next() {
        return this._next;
    }

    constructor(_id,
        _name,
        _pic,
        _next) {
        this._id = _id;
        this._name = _name;
        this._pic = _pic;
        this._next = _next;
    }

    static data: Map<number, ElementRes> = new Map();

    public static getRes(id: number): ElementRes {
        return ElementRes.data.get(id);
    }
}

ElementRes.data.set(1, new ElementRes(1, "树", "Tree", 2));
ElementRes.data.set(2, new ElementRes(2, "木材", "Wood", 3));
ElementRes.data.set(3, new ElementRes(3, "木屋", "WoodHouse", 4));
ElementRes.data.set(4, new ElementRes(4, "石屋", "StoneHouse", 5));
ElementRes.data.set(5, new ElementRes(5, "民宅", "House", 6));
ElementRes.data.set(6, new ElementRes(6, "豪宅", "GoodHouse", 7));
ElementRes.data.set(7, new ElementRes(7, "阁楼", "Loft", 8));
ElementRes.data.set(8, new ElementRes(8, "大院", "Yard", 9));
ElementRes.data.set(9, new ElementRes(9, "城主府", "Castellan", 10));
ElementRes.data.set(10, new ElementRes(10, "皇宫", "Emperor", -1));

console.log("加载元素表，元素数量：", ElementRes.data.size);