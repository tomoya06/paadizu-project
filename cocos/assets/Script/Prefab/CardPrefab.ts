// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

const LabelMap = {
    'A': '♦',
    'B': '♣',
    'C': '♥',
    'D': '♠',
}

@ccclass
export default class NewClass extends cc.Component {
    @property
    value: string = '1A';

    @property(cc.Label)
    label: cc.Label;

    @property(cc.Label)
    numLabel: cc.Label;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    init(val) {
        this.value = val;
        this.numLabel.string = val[0];
        this.label.string = LabelMap[val[1]];
    }
}
