cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.rigidBodyRef = this.getComponent(cc.RigidBody);
    },

    start () {
        this.direction = Math.round(Math.random()*360);
        var xImpulse = (Math.random()*20+10)*Math.sin(this.direction* Math.PI/180.0);
        var yImpulse = (Math.random()*20+10)*Math.cos(this.direction* Math.PI/180.0);

        this.rigidBodyRef.applyLinearImpulse( 
            new cc.v2(xImpulse, yImpulse), 
            this.rigidBodyRef.getWorldCenter () 
        );

    },

    update (dt) {},

    onBeginContact (contact, selfCollider, otherCollider) {
        this.setNewDirection();
    },

    setNewDirection() {

        this.direction+=Math.round( Math.random()*90 )+135;
        if(this.direction>360.0) {
            this.direction = this.direction-360.0;
        }

        var xImpulse = (Math.random()*20+10)*Math.sin(this.direction* Math.PI/180.0);
        var yImpulse = (Math.random()*20+10)*Math.cos(this.direction* Math.PI/180.0);

        this.rigidBodyRef.linearVelocity = new cc.v2(0,0);
        
        this.rigidBodyRef.applyLinearImpulse( 
            new cc.Vec2(xImpulse, yImpulse), 
            this.rigidBodyRef.getWorldCenter() 
        );
    }
});
