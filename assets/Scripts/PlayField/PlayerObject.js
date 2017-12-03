cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.hookInput();
        this.keyIsDown = false;
        this.keyDirection = 0;
        this.rigidBodyRef = this.getComponent(cc.RigidBody);
    },

    start () {
        this.rigidBodyRef.applyLinearImpulse(
            new cc.v2(1,1),
            this.rigidBodyRef.getWorldCenter());
        
    },

    update (dt) {
        if(this.keyIsDown) {
            this.setDirection(this.keyDirection);
        }
    },

    /* *************************************************** */
    
    hookInput() {
        const objReference = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,

            onKeyPressed(kcode, e) {
                switch(kcode) {
                    case cc.KEY.up:
                        objReference.keyIsDown = true;
                        objReference.keyDirection = 0;
                        break;
                    case cc.KEY.right:
                        objReference.keyIsDown = true;
                        objReference.keyDirection = 90;
                        break;
                    case cc.KEY.down:
                        objReference.keyIsDown = true;
                        objReference.keyDirection = 180;
                        break;
                    case cc.KEY.left: 
                        objReference.keyIsDown = true;
                        objReference.keyDirection = 270;
                        break;
                }                    
            },

            onKeyReleased(kcode, e) {
                switch(kcode) {
                    case cc.KEY.up:
                    case cc.KEY.right:
                    case cc.KEY.down:
                    case cc.KEY.left:
                        objReference.keyIsDown = false;
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
            } else if( (this.node.rotation > dir && dist < 179) || dist<-179) {
                this.node.rotation-=5;                
            } else {
                this.node.rotation+=5;
            }
            
            if(this.node.rotation >= 360) {
                this.node.rotation = this.node.rotation-360;
            } else if(this.node.rotation < 0) {
                this.node.rotation = this.node.rotation+360;                
            }
        }


        var xImpulse = 100*Math.sin(this.node.rotation * Math.PI/180.0);
        var yImpulse = 100*Math.cos(this.node.rotation * Math.PI/180.0);
        
        this.rigidBodyRef.applyForce(
            new cc.v2(xImpulse,yImpulse), 
            this.rigidBodyRef.getWorldCenter());

        if(!emitter.active) {
            emitter.resetSystem();            
        }
       
    },

    closeEmitter() {
        var emitter = this.node.getChildByName("particlesystem").getComponent(cc.ParticleSystem);
        emitter.stopSystem();
    }
});
