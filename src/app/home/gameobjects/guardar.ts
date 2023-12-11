import Prologo from "../escenas/Prologo";

export default class Guardar extends Phaser.Physics.Arcade.Sprite {
    private escena: Prologo;

    constructor(config: any){
        super(config.escena, config.x, config.y, config.texture);

        this.escena = config.escena;

        this.escena.physics.world.enable(this);//Activo físicas para este objeto
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        this.escena.add.existing(this);//Añade objeto a escena

        this.scaleX = 0.4;
        this.scaleY = 0.4;
        this.body.setSize(23, 20);
        this.body.setOffset(0, 0);

        this.anims.create({
            key: 'animacion',
            frames: this.anims.generateFrameNames('guardar', {
                start: 1,
                prefix: "sprite",
                end: 1
            }),
            frameRate: 5,
            repeat: -1
        });
    }

    override update(){
        this.anims.play('animacion', true);
    }
}