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

    onLoad () {
        this.touchActive = false;
        this.touchDir = 0;
        this.playerNode = cc.director.getScene().
            getChildByName("Player").
            getComponent("PlayerObject");
    },

    start () {
        var releaseEvent = this.touchReleaseEvent.bind(this);
        var touchEvent = this.touchBeginEvent.bind(this);

        this.node.on("touchend", releaseEvent);
        this.node.on("touchcancel", releaseEvent);
        this.node.on("touchstart", touchEvent);
    },

    update (dt) {
        if(this.touchActive) {
            if(this.playerNode!=null) {
                this.playerNode.setDirection(this.touchDir);
            }
        }
    },

    /* ************************************************************** */

    touchBeginEvent(touch) {
        var objRef = this;
        var xPos =  touch.getLocation().x - objRef.node.x;
        var yPos =  touch.getLocation().y - objRef.node.y;
        var sprite = objRef.node.getComponent(cc.Sprite);

        if(xPos >= 60 && xPos<=140) {
            if(yPos<=60) {
                sprite.spriteFrame = objRef.keyDown;
                objRef.touchActive = true;
                objRef.touchDir = 180;
            } else if(yPos >= 140) {
                sprite.spriteFrame = objRef.keyUp;
                objRef.touchActive = true;
                objRef.touchDir = 0;
            }
        }
        
        if(yPos >= 60 && yPos <= 140) {
            if(xPos<=60) {
                sprite.spriteFrame = objRef.keyLeft;
                objRef.touchActive = true;
                objRef.touchDir = 270;
            } else if(xPos >= 140) {
                sprite.spriteFrame = objRef.keyRight;
                objRef.touchActive = true;
                objRef.touchDir = 90;
            }
        } 
    },

    touchReleaseEvent () {
        this.node.getComponent(cc.Sprite).spriteFrame = this.keyOff;      
        this.touchActive = false;

        if(this.playerNode!=null) {
            this.playerNode.closeEmitter();
        }
},
});
