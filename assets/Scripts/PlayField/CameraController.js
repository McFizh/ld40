cc.Class({
    extends: cc.Component,

    properties: {
        target: cc.Node,
        camera: {
            default: null,
            type: cc.Camera
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.position = this.target.convertToWorldSpaceAR(cc.Vec2.ZERO);
    },

    start () {

    },

    update (dt) {
        let targetPos = this.target.parent.convertToWorldSpaceAR(this.target.position);
        this.node.position = this.node.parent.convertToNodeSpaceAR(targetPos);
    },
});
