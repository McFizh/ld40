
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

        homeButtonNode: cc.Node,

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
        this.homeButtonNode.active = false;
        this.tutorialNode.x = 0;
        this.tutorialNode.y = 0;

        const objRef = this;

        this.tutorialNode.getChildByName("button").on("touchstart", function() {
            objRef.hideTutorial();
        });

    },

    hideTutorial() {
        const virtKeyboard = this.virtualKeyNode.getComponent('VirtualKeyboard');

        this.tutorialNode.active = false;
        this.virtualKeyNode.active = true;
        this.playerNode.active = true;
        this.homeButtonNode.active = true;
        
        var releaseEvent = virtKeyboard.touchReleaseEvent.bind(virtKeyboard);

        this.node.on("touchend", releaseEvent);
        this.node.on("touchcancel", releaseEvent);

        this.homeButtonNode.on("touchstart", function() {
            cc.director.loadScene("MainMenu");
        });

        this.populateGame();
    },

    populateGame() {
        this.targetNodes = [];

        // Create food nodes
        for(var l=0; l<20; l++) {
            const node = cc.instantiate(this.foodPreFab);

            var safety=5, xPos=-1, yPos=-1;

            // Try to make sure that nodes aren't too close to each others
            while(safety>0) {
                xPos = Math.round(Math.random()*1600) - 800;
                yPos = Math.round(Math.random()*1600) - 800;
                if(this.validateDistance(xPos, yPos)) {
                    break;
                }
                safety--;
            }
        
            // Create food node
            var size = Math.round(Math.random()*5+5)/10;
            node.setPosition(xPos, yPos);
            node.setScale(size, size);
            cc.director.getScene().getChildByName("FoodNodes").addChild(node);
            this.targetNodes.push(node);
        }

        // Create enemy nodes
        for(var l=0; l<6; l++) {
            const node = cc.instantiate(this.enemyPreFab);

            var safety=5, xPos=-1, yPos=-1;

            // Try to make sure that nodes aren't too close to each others
            while(safety>0) {
                xPos = Math.round(Math.random()*1600) - 800;
                yPos = Math.round(Math.random()*1600) - 800;
                if(this.validateDistance(xPos, yPos)) {
                    break;
                }
                safety--;
            }
        
            // Create food node
            var size = Math.round(Math.random()*4+3)/10;
            node.setPosition(xPos, yPos);
            node.setScale(size, size);
            cc.director.getScene().getChildByName("EnemyNodes").addChild(node);
            this.targetNodes.push(node);
        }

    },

    validateDistance(xPos, yPos) {
        for(let itm of this.targetNodes) {
            let distX = itm.x - xPos;
            let distY = itm.y - yPos;
            let dist = Math.sqrt(distX*distX+distY*distY);

            if(dist < 200) {
                return false;
            }

        }
        return true;
    }

});
