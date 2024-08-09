import assets from "./assets.js";

class FlappyBird extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);

    scene.physics.world.enable(this);
    this.bird = this.getBird();
    scene.add.existing(this);
    this.anims.play(this.bird.clapWings);

    this.body.setVelocity(0, 0).setBounce(0, 0).setCollideWorldBounds(false);
    this.body.allowGravity = true;

    this.upwardsVelocity = 0;
    this.angle = 0;
  }
  getBird() {
    return Phaser.Math.RND.pick([assets.bird.default]);
  }
}

export default FlappyBird;
