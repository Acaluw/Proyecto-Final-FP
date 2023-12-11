import Prologo from "../escenas/Prologo";

export default class Eventos extends Phaser.Physics.Arcade.Sprite {
    private escena: Prologo;
    public identi: string;

    constructor(config: any, identificador: string){
        super(config.escena, config.x, config.y, config.texture);

        this.escena = config.escena;
        this.identi = identificador;

        this.escena.physics.world.enable(this);//Activo físicas para este objeto
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        this.escena.add.existing(this);//Añade objeto a escena

        switch (identificador) {
            case 'combate':
                this.body.setSize(40, 15);
                this.body.setOffset(20, 15);
                break;
            case '01':
                this.body.setSize(15, 50);
                this.body.setOffset(15, 10);
                break;
            case '02':
                this.body.setSize(50, 15);
                this.body.setOffset(10, 15);
                break;
            case '03':
                this.body.setSize(50, 15);
                this.body.setOffset(15, 20);
                break;
            case '04':
                this.body.setSize(15, 50);
                this.body.setOffset(15, 20);
                break;
            case '05':
                this.body.setSize(15, 40);
                this.body.setOffset(20, 15);
                break;
            case '06':
                this.body.setSize(50, 15);
                this.body.setOffset(15, 20);
                break;
            case '07':
                this.body.setSize(15, 50);
                this.body.setOffset(15, 20);
                break;
            case 'evento_oculto':
                this.body.setSize(15, 50);
                this.body.setOffset(15, 20);
                break;
            case 'aviso1':
                this.body.setSize(60, 15);
                this.body.setOffset(15, 10);
                break;
            case 'aviso2':
                this.body.setSize(60, 15);
                this.body.setOffset(15, 10);
                break;
            case 'evento_fuego':
                this.body.setSize(15, 50);
                this.body.setOffset(15, 10);
                break;
            case 'evento_hielo':
                this.body.setSize(15, 60);
                this.body.setOffset(30, 10);
                break;
            case 'combate_fuego':
                this.body.setSize(15, 50);
                this.body.setOffset(15, 10);
                break;
            case 'combate_hielo':
                this.body.setSize(15, 50);
                this.body.setOffset(15, 10);
                break;
            case 'posterior_fuego':
                this.body.setSize(80, 15);
                this.body.setOffset(15, 10);
                break;
            case 'posterior_hielo':
                this.body.setSize(80, 15);
                this.body.setOffset(15, 10);
                break;
            case 'exterior_izquierda':
                this.body.setSize(15, 65);
                this.body.setOffset(15, 15);
                break;
            case 'exterior_derecha':
                this.body.setSize(15, 65);
                this.body.setOffset(15, 15);
                break;
            case 'final':
                this.body.setSize(65, 15);
                this.body.setOffset(15, 10);
                break;
        };
    }
}