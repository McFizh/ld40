cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {},

    start () {
    },

    update (dt) {},

    onBeginContact (contact, selfCollider, otherCollider) {
        console.log("Contact begin");
    }
});
