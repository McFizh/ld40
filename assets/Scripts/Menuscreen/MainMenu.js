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

        song1: {
            default: null,
            url: cc.AudioClip
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () { 
        cc.director.getPhysicsManager().enabled = true;

        if(typeof window.audioPlayer == "undefined" || window.audioPlayer == null) {
            var node = new cc.Node();
            node.name = "AudioPlayer";
            node.addComponent(cc.AudioSource);
            var ac = node.getComponent(cc.AudioSource);
            ac.clip = this.song1;
            ac.loop = true;
            ac.play();

            window.audioPlayer = node;
        }
    },

    start () {
        var anim = this.getComponent(cc.Animation);
        anim.play();
    },

    update (dt) {

    },
});
