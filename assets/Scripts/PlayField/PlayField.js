
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
        var btn = this.tutorialNode.getChildByName("button").on("mousedown", function() {
            objRef.hideTutorial();
        });
    },

    hideTutorial() {
        this.tutorialNode.active = false;
        this.virtualKeyNode.active = true;
        this.playerNode.active = true;

        const objRef = this;
        this.node.on("mouseup", function () {
            objRef.virtualKeyNode.getComponent('VirtualKeyboard').keyReleaseEvent();
        });
    }

});
