cc.Class({
    extends: cc.Component,

    properties: {

        startMenuItem: {
            default: null,
            type: cc.Node
        },

        audioMenuItem: {
            default: null,
            type: cc.Node
        },

        playerObj: {
            default: null,
            type: cc.Node
        },

        foodObj: {
            default: null,
            type: cc.Node
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;

        this.playerRigidbody = this.playerObj.getComponent(cc.RigidBody);
        this.foodRigidbody = this.foodObj.getComponent(cc.RigidBody);
    },

    start () {
        var anim = this.getComponent(cc.Animation);
        anim.play();

        this.foodRigidbody.applyLinearImpulse( new cc.Vec2(15, 0), this.foodRigidbody.getWorldCenter () );

        this.playerRigidbody.applyLinearImpulse( new cc.Vec2(12.0,0), this.foodRigidbody.getWorldCenter () );
    },

    update (dt) {

    },
});
