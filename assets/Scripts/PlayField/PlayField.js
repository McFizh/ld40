
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
        },

        foodPreFab: cc.Prefab,
        enemyPreFab: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;

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
        const virtKeyboard = this.virtualKeyNode.getComponent('VirtualKeyboard');

        this.tutorialNode.active = false;
        this.virtualKeyNode.active = true;
        this.playerNode.active = true;

        var releaseEvent = virtKeyboard.touchReleaseEvent.bind(virtKeyboard);

        this.node.on("touchend", releaseEvent);
        this.node.on("touchcancel", releaseEvent);

        for(var l=0; l<20; l++) {
            var xPos = Math.round(Math.random()*1600) - 800;
            var yPos = Math.round(Math.random()*1600) - 800;
            var size = Math.round(Math.random()*5+5)/10;

            const node = cc.instantiate(this.foodPreFab);
            node.setPosition(xPos, yPos);
            node.setScale(size, size);
            cc.director.getScene().getChildByName("FoodNodes").addChild(node);
        }
    }

});
