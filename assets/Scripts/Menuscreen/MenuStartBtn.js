cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var componentRef = this;
        this.node.on("mousedown",function() {
            cc.director.loadScene("PlayField");
        });
    },

    // update (dt) {},
});
