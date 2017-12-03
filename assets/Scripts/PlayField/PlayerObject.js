cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.hookInput();
    },

    start () {

    },

    update (dt) {

    },

    /* *************************************************** */
    
    hookInput() {
        const objReference = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,

            onKeyPressed(kcode, e) {
                switch(kcode) {
                    case cc.KEY.up:
                        objReference.setDirection(90);
                        break;
                    case cc.KEY.right:
                        objReference.setDirection(180);
                        break;
                    case cc.KEY.down:
                        objReference.setDirection(270);
                        break;
                    case cc.KEY.left: 
                        objReference.setDirection(0);
                        break;
                }                    
            },

            onKeyReleased(kcode, e) {
                switch(kcode) {
                    case cc.KEY.up:
                    case cc.KEY.right:
                    case cc.KEY.down:
                    case cc.KEY.left:
                        objReference.closeEmitter();
                        break;
                }
            }

        }, this.node);
    },

    setDirection(dir) {
        
        var emitter = this.node.getChildByName("particlesystem").getComponent(cc.ParticleSystem);

        if(this.node.rotation != dir) {
            let dist = this.node.rotation-dir;

            if( Math.abs(dist) < 5 ) {
                this.node.rotation=dir;
            } else if(this.node.rotation > dir) {
                this.node.rotation-=5;                
            } else {
                this.node.rotation+=5;
            }
            
        }

        if(!emitter.active) {
            emitter.resetSystem();            
        }
       
    },

    closeEmitter() {
        var emitter = this.node.getChildByName("particlesystem").getComponent(cc.ParticleSystem);
        emitter.stopSystem();

        console.log("Close emitter");
    }
});
