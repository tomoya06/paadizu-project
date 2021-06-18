// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property([String])
    cards: string[] = [];

    @property(cc.Prefab)
    cardPrefab: cc.Prefab;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        for (var i = 0; i < this.cards.length; ++i) {
            var item = cc.instantiate(this.cardPrefab);
            var data = this.cards[i];
            this.node.addChild(item);
            item.getComponent('CardPrefab').init(data);
        }
    }

    start () {
    }

    // update (dt) {}
}
