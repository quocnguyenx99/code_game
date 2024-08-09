import assets from "./assets.js";

class Rock extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);

    scene.physics.world.enable(this);
    this.rock = this.getRock();
    scene.add.existing(this);
    this.anims.play(this.rock);

    this.body.setVelocity(0, 0).setBounce(0, 0).setCollideWorldBounds(false);
    this.body.allowGravity = true;

    this.upwardsVelocity = 0;
    this.angle = 0;
  }
  getRock() {
    return Phaser.Math.RND.pick([assets.obstacle.rock]);
  }
}

export default Rock;
