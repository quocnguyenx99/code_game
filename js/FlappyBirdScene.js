import assets from "./assets.js";
import FlappyBird from "./FlappyBird.js";
import Rock from "./Rock.js";

class FlappyBirdScene extends Phaser.Scene {
  preload() {
    let game = this;

    // scene assets
    this.load.image(assets.scene.background.day, "assets/background-day.png");

    this.load.spritesheet(assets.scene.ground, "assets/ground-sprite.png", {
      frameWidth: 336,
      frameHeight: 112,
    });

    this.load.spritesheet(assets.obstacle.rock, "assets/rock.png", {
      frameWidth: 100,
      frameHeight: 100,
    });

    // mở rộng cho skin dùng []
    this.load.spritesheet(
      assets.bird.default.name,
      "assets/bird-blue-sprite.png",
      {
        frameWidth: 34,
        frameHeight: 24,
      }
    );
  }

  create() {
    // Enable physics debugging
    this.physics.world.createDebugGraphic();
    let game = this;

    // background
    this.backgroundDay = this.add.image(
      assets.scene.width,
      256,
      assets.scene.background.day
    );

    // bird
    game.anims.create({
      key: assets.bird.default.clapWings,
      frames: game.anims.generateFrameNumbers(assets.bird.default.name, {
        start: 0,
        end: 2,
      }), // là số frame để tạo animation tương ứng với hình về hành động vd: 3 hình thì 0 -> 2. Nếu đặt 0 -> 4 mà chỉ có 3 hình thì 0->1->2->0->1
      frameRate: 10, // có nghĩa là 10 lần lặp lại / 1s của 1 frame
      repeat: -1, // lặp lại vô hạn
      delay: 1000,
    });

    game.anims.create({
      key: assets.bird.default.stop,
      frames: [
        {
          key: assets.bird.default.name,
          frame: 1,
        },
      ],
      frameRate: 20,
    });

    //rock

    game.anims.create({
      key: assets.obstacle.rock,
      frames: [
        {
          key: assets.obstacle.rock,
          frame: 0,
        },
      ],
      frameRate: 20,
    });

    // ground
    this.ground = this.physics.add.sprite(
      assets.scene.width,
      468,
      assets.scene.ground
    );

    this.ground.setCollideWorldBounds(true);
    this.ground.setDepth(20);
    this.ground.setSize(0, 100, false).setOffset(0, 10);

    this.anims.create({
      key: assets.animation.ground.moving,
      frames: this.anims.generateFrameNumbers(assets.scene.ground, {
        start: 0,
        end: 2,
      }),
      frameRate: 15,
      repeat: -1,
    });

    this.rocks = this.physics.add.group(); // gaps between pipes

    // make grid template
    this.drawGrid(24);

    this.initGame();
  }

  // Hàm vẽ lưới với số đánh dấu
  drawGrid(size) {
    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0xddd, 0.5); // Màu sắc và độ dày của đường kẻ

    graphics.setDepth(24);
    // Vẽ các đường dọc và đánh số
    for (let x = 0; x < this.game.config.width; x += size) {
      graphics.lineBetween(x, 0, x, this.game.config.height);
      this.add.text(x + 5, 5, x.toString(), {
        fontFamily: "Arial",
        fontSize: "12px",
        fill: "#000",
      });
    }

    // Vẽ các đường ngang và đánh số
    for (let y = 0; y < this.game.config.height; y += size) {
      graphics.lineBetween(0, y, this.game.config.width, y);
      this.add.text(5, y + 5, y.toString(), {
        fontFamily: "Arial",
        fontSize: "12px",
        fill: "#000",
      });
    }
  }

  update(time, delta) {
    this.elapsedTime += delta; // Accumulate the time since the last update

    if (this.elapsedTime >= 2000) {
      // Check if 5 seconds (5000 ms) have passed
      this.makeObstacle(); // Call the function
      this.elapsedTime = 0; // Reset the timer
    }
  }

  initGame() {
    this.elapsedTime = 0;

    this.rockObstacle = assets.obstacle.rock;

    this.flappyBird = new FlappyBird(this, 60, 265);
    this.rock = new Rock(this, 50, 200);

    this.ground.anims.play(assets.animation.ground.moving, true);

    this.physics.add.collider(
      this.flappyBird,
      this.ground,
      // this.hitBird,
      null,
      null,
      this
    );

    this.physics.add.collider(
      this.rock,
      this.ground,
      // this.hitBird,
      null,
      null,
      this
    );
  }

  makeObstacle() {
    const gapX = Phaser.Math.Between(120, 240);
    // const rock = this.rocks
    //   .create(gapX, -50, this.rockObstacle)
    //   .setImmovable(true);
    // rock.body.setBounce(0, 0).setCollideWorldBounds(true);
    // rock.body.allowGravity = true;
    // rock.body.setVelocityX(100 - gapX);
  }
}

export default FlappyBirdScene;
