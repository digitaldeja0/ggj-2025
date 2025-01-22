import { Scene } from "phaser";

export class Game extends Scene {
    constructor() {
        super("Game");
    }

    create() {
        this.physics.world.setBoundsCollision();
        console.log(this.physics)
        const curBubbles = []
        const normalizedX = 50; // 50% of the width
        const normalizedY = 10; // 75% of the height

        // Convert normalized coordinates to pixel values
        const pixelX = (normalizedX / 100) * this.scale.width;
        const pixelY = (normalizedY / 100) * this.scale.height;
        // this.bubblesImage = this.add.sprite(100, 200, "bubbles", 3);
        this.input.on("pointerdown", (pointer) => {
            this.newBubble = this.physics.add.sprite(pointer.downX, pointer.downY, "bubbles", Phaser.Math.Between(0, 17)).setScale(Phaser.Math.FloatBetween(0.05, 0.25))

            this.newBubble.setCollideWorldBounds(true);
            this.newBubble.body.onWorldBounds = true;

            this.physics.world.on('worldbounds', (body) => {
               console.log( )
               body.gameObject.destroy(true)
            });

            curBubbles.push(this.newBubble)
            const floatTween = this.tweens.add({
                targets: this.newBubble,
                props: {
                    // y:{ value: Phaser.Math.Between(-800, 800)},
                    x: { value: Phaser.Math.Between(-100, 800), yoyo: true }
                },
                duration: 5000
            })
        })



        // this.cameras.main.setBackgroundColor(0x00ff00);

        // this.add.image(512, 384, 'background').setAlpha(0.5);

        this.add
            .text(
                pixelX,
                pixelY,
                "Press any key or button to add bubbles!",
                {
                    fontFamily: "Arial Black",
                    fontSize: 18,
                    color: "#ffffff",
                    stroke: "#000000",
                    strokeThickness: 1,
                    align: "center",
                }
            )
            .setOrigin(0.5);

        // this.input.once('pointerdown', () => {

        //     this.scene.start('GameOver');

        // });
    }

}
