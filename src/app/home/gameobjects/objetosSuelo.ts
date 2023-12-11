import Constantes from "../constantes";
import Prologo from "../escenas/Prologo";
import CargaDatos from "../escenas/cargadatos";

export default class ObjetosSuelo extends Phaser.Physics.Arcade.Sprite {
    private escena: Prologo;
    public identi: string;
    public tipo: string = '';
    public numero: string = '';

    public nCuras: number = 0;
    public nAtaque: number = 0;

    constructor(config: any, identificador: string){
        super(config.escena, config.x, config.y, config.texture);

        this.escena = config.escena;

        var partes = identificador.split('_');
        var nombreObjeto = partes[0];
        this.numero = partes[1];

        switch (nombreObjeto) {
            case 'cura':
                this.identi = Constantes.MISCELANEOS.OBJETO_TIPO1;
                this.nCuras = 2;
                this.tipo = 'cura';
                break;
            case 'ambosx2':
                this.identi = Constantes.MISCELANEOS.OBJETO_TIPO1;
                this.nCuras = 7;
                this.nAtaque = 3;
                this.tipo = 'ambosx2';
                break;
            case 'ataque':
                this.identi = Constantes.MISCELANEOS.OBJETO_TIPO2;
                this.nAtaque = 1;
                this.tipo = 'ataque';
                break;
            case 'ambos':
                this.identi = Constantes.MISCELANEOS.OBJETO_TIPO2;
                this.nCuras = 5;
                this.nAtaque = 1;
                this.tipo = 'ambos';
                break;
            default:
                this.identi = Constantes.MISCELANEOS.OBJETO_TIPO2;
                break;
        }

        this.escena.physics.world.enable(this);//Activo físicas para este objeto
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        this.escena.add.existing(this);//Añade objeto a escena

        this.scaleX = 0.5;
        this.scaleY = 0.5;
        this.body.setSize(18, 26);
        this.body.setOffset(0, 0);

        this.anims.create({
            key: 'animacion',
            frames: this.anims.generateFrameNames(this.identi, {
                start: 1,
                prefix: "sprite",
                end: 18
            }),
            frameRate: 5,
            repeat: -1
        });
    }

    override update(){
        this.anims.play('animacion', true);
    }

    recogerObjeto(){
        CargaDatos.jugadorAtaque += this.nAtaque;
        CargaDatos.jugadorCuracion += this.nCuras;
    }
}