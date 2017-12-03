
cc.Class({
    extends: cc.Component,

    properties: {
        playerNode: {
            default:null,
            type: cc.Node
        },

        tutorialNode: {
            default:null,
            type: cc.Node
        },

        virtualKeyNode: {
            default:null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var ls = cc.sys.localStorage;

        if( ls.getItem("firstTime") == null) {
            ls.setItem("firstTime", true);
            this.showTutorial();
        } else {
            this.hideTutorial();
        }        
    },

    start () {

    },

    // update (dt) {},

    /* *************************************************** */

    showTutorial() {
        this.virtualKeyNode.active = false;
        this.playerNode.active = false;
        this.tutorialNode.active = true;
        this.tutorialNode.x = 0;
        this.tutorialNode.y = 0;

        const objRef = this;
        var btn = this.tutorialNode.getChildByName("button").on("touchstart", function() {
            objRef.hideTutorial();
        });
    },

    hideTutorial() {
        this.tutorialNode.active = false;
        this.virtualKeyNode.active = true;
        this.playerNode.active = true;

        const virtKeyboard = this.virtualKeyNode.getComponent('VirtualKeyboard');

        var releaseEvent = virtKeyboard.touchReleaseEvent.bind(virtKeyboard);
        this.node.on("touchend", releaseEvent);
        this.node.on("touchcancel", releaseEvent);
    }

});
