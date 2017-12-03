cc.Class({
    extends: cc.Component,

    properties: {
        keyOff: { default: null, type: cc.SpriteFrame },
        keyUp: { default: null, type: cc.SpriteFrame },
        keyDown: { default: null, type: cc.SpriteFrame },
        keyLeft: { default: null, type: cc.SpriteFrame },
        keyRight: { default: null, type: cc.SpriteFrame }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        const objRef = this;

        this.node.on("mousedown", function () {
            objRef.node.getComponent(cc.Sprite).spriteFrame = objRef.keyUp;
        });

    },

    // update (dt) {},

    keyReleaseEvent () {
        this.node.getComponent(cc.Sprite).spriteFrame = this.keyOff;        
    },
});
