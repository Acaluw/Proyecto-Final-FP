import JugadorCombatePrologo from "./jugadorCombatePrologo";

export default class EnemigosPrologo extends Phaser.GameObjects.Sprite {
    // Variables correspondientes a las propiedades del enemigo
    public static tipo: string;
    public static maxVida: number;
    public nombre: string = '';
    public experiencia: number = 0;
    vida: number = 0;
    ataque: number = 0;
    tieneVida: boolean = false;

    nSprites: number = 0;
    //
    // Constructor
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: number, tipo: string, vida: number, ataque: number) {
        super(scene, x, y, texture, frame);

        console.log('Tipo '+tipo);
        switch (tipo){
            case 'enemigo00':
                this.nSprites = 12;
                EnemigosPrologo.tipo = tipo;
                EnemigosPrologo.maxVida = this.vida = 10;
                this.ataque = 3;
                this.experiencia = 3;
                this.nombre = 'Lumisilk';
                this.tieneVida = true;
                break;
            case 'enemigo01':
                this.nSprites = 97;
                EnemigosPrologo.tipo = tipo;
                EnemigosPrologo.maxVida = this.vida = 13;
                this.ataque = 3;
                this.experiencia = 3;
                this.nombre = 'Trillium';
                this.tieneVida = true;
                break;
            case 'enemigo02':
                this.nSprites = 32;
                EnemigosPrologo.tipo = tipo;
                EnemigosPrologo.maxVida = this.vida = 8;
                this.ataque = 2;
                this.experiencia = 1;
                this.nombre = 'Slimooze';
                this.tieneVida = true;
                break;
            case 'enemigo03':
                this.nSprites = 10;
                EnemigosPrologo.tipo = tipo;
                EnemigosPrologo.maxVida = this.vida = 5;
                this.ataque = 5;
                this.experiencia = 1;
                this.nombre = 'Sarivon';
                this.tieneVida = true;
                break;
            case 'enemigo04':
                this.nSprites = 48;
                EnemigosPrologo.tipo = tipo;
                EnemigosPrologo.maxVida = this.vida = 15;
                this.ataque = 4;
                this.experiencia = 6;
                this.nombre = 'Hammerite';
                this.tieneVida = true;
                break;
            case 'enemigo05':
                this.nSprites = 20;
                EnemigosPrologo.tipo = tipo;
                EnemigosPrologo.maxVida = this.vida = 10;
                this.ataque = 3;
                this.experiencia = 2;
                this.nombre = 'Luminara';
                this.tieneVida = true;
                break;
            case 'enemigo06':
                this.nSprites = 130;
                EnemigosPrologo.tipo = tipo;
                EnemigosPrologo.maxVida = this.vida = 16;
                this.ataque = 4;
                this.experiencia = 4;
                this.nombre = 'Tenderfin';
                this.tieneVida = true;
                break;
            case 'enemigo07':
                this.nSprites = 12;
                EnemigosPrologo.tipo = tipo;
                EnemigosPrologo.maxVida = this.vida = 18;
                this.ataque = 5;
                this.experiencia = 6;
                this.nombre = 'Aramantis';
                this.tieneVida = true;
                break;
            case 'enemigo08':
                this.nSprites = 74;
                EnemigosPrologo.tipo = tipo;
                EnemigosPrologo.maxVida = this.vida = 16;
                this.ataque = 8;
                this.experiencia = 4;
                this.nombre = 'Fangor';
                this.tieneVida = true;
                break;
            case 'enemigo09':
                this.nSprites = 48;
                EnemigosPrologo.tipo = tipo;
                EnemigosPrologo.maxVida = this.vida = 25;
                this.ataque = 7;
                this.experiencia = 9;
                this.nombre = 'Craggy';
                this.tieneVida = true;
                break;
            case 'boss_hielo':
                this.nSprites = 16;
                EnemigosPrologo.tipo = tipo;
                EnemigosPrologo.maxVida = this.vida = 50;
                this.ataque = 11;
                this.experiencia = 100;
                this.nombre = 'Glacialis';
                this.tieneVida = true;
                break;
            case 'boss_fuego':
                this.nSprites = 92;
                EnemigosPrologo.tipo = tipo;
                EnemigosPrologo.maxVida = this.vida = 50;
                this.ataque = 11;
                this.experiencia = 100;
                this.nombre = 'Burnova';
                this.tieneVida = true;
                break;
            case 'boss_oculto':
                this.nSprites = 32;
                EnemigosPrologo.tipo = tipo;
                EnemigosPrologo.maxVida = this.vida = 40;
                this.ataque = 10;
                this.experiencia = 70;
                this.nombre = 'Kamaclash';
                this.tieneVida = true;
                break;
            default:
                break;
        }

        this.anims.create({
            key: 'movimiento',
            frames: this.anims.generateFrameNames(EnemigosPrologo.tipo, {
                start: 1,
                prefix: "sprite",
                end: this.nSprites
            }),
            frameRate: 5,
            repeat: 2
        });
    }

    override update(){
        this.anims.play('movimiento', true);
    }
    //
    // Método por el cuál atacamos al Jugador
    atacar(target: JugadorCombatePrologo): void {
        target.quitarVida(this.ataque);
    }
    atacarCargado(target: JugadorCombatePrologo): void {}
    //
    // Método de bajar la vida al enemigo
    quitarVida(ataque: number): void {
        // Vida visual del enemigo
        this.vida -= ataque;
        // Una vez el enemigo no tenga vida, modificamos las variables correspondientes
        if (this.vida <= 0){
            this.vida = 0;
            this.tieneVida = false;
            this.visible = false;
        }
    }
}