cc.Class({
    extends: cc.Component,

    properties: {

        audioOnBtnOn: {
            default: null,
            type: cc.SpriteFrame
        },

        audioOnBtnOff: {
            default: null,
            type: cc.SpriteFrame
        },

        audioOffBtnOn: {
            default: null,
            type: cc.SpriteFrame
        },

        audioOffBtnOff: {
            default: null,
            type: cc.SpriteFrame
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.audioOn = true;
    },

    start () {
        var componentRef = this;

        this.node.on("touchstart", function() {
            var btn = this.getComponent(cc.Button);

            if(componentRef.audioOn) {
                componentRef.audioOn = false;
                btn.normalSprite = componentRef.audioOffBtnOff;
                btn.hoverSprite = componentRef.audioOffBtnOn;
                btn.pressedSprite = componentRef.audioOffBtnOn;
            } else {
                componentRef.audioOn = true;                
                btn.normalSprite = componentRef.audioOnBtnOff;
                btn.hoverSprite = componentRef.audioOnBtnOn;
                btn.pressedSprite = componentRef.audioOnBtnOn;
            }
        });
    },

    // update (dt) {},
});
