import Prologo from "../escenas/Prologo";

export default class Npc extends Phaser.Physics.Arcade.Sprite {

    private escena: Prologo;
    public identi: string;
    private patron: string = '';
    public id: string = '';

    constructor(config: any, identificador: string) { //se le pasa escena para utilizar los objetos que contiene
        super(config.escena, config.x, config.y, config.texture);

        this.escena = config.escena;
        this.identi = identificador;

        this.escena.physics.world.enable(this);
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        this.escena.add.existing(this);

        switch (identificador){
            case 'overworld00':
                this.scale = 0.4;
                this.body.setSize(45, 50);
                this.body.setOffset(1 ,0);
                this.patron = 'Derecha/Izquierda';
                this.id = 'enemigo00';
                break;
            case 'overworld01':
                this.scale = 0.3;
                this.body.setSize(50, 51);
                this.body.setOffset(2, 1);
                this.patron = 'Reposo';
                this.id = 'enemigo01';
                break;
            case 'overworld02':
                this.scale = 0.3;
                this.patron = 'Arriba/Abajo';
                this.id = 'enemigo02';
                break;
            case 'overworld03':
                this.scale = 0.3;
                this.patron = 'Arriba/Abajo';
                this.id = 'enemigo03';
                break;
            case 'overworld04':
                this.scale = 0.5;
                this.body.setSize(37, 40);
                this.body.setOffset(0, 1);
                this.patron = 'Reposo';
                this.id = 'enemigo04';
                break;
            case 'overworld05':
                this.scale = 0.35;
                this.body.setSize(30, 40);
                this.body.setOffset(0, 1);
                this.patron = 'Arriba/Abajo';
                this.id = 'enemigo05';
                break;
            case 'overworld06':
                this.scale = 0.4;
                this.body.setSize(45, 35);
                this.body.setOffset(0, -2);
                this.patron = 'Reposo';
                this.id = 'enemigo06';
                break;
            case 'overworld07':
                this.scale = 0.45;
                this.body.setSize(30, 47);
                this.body.setOffset(1, 1);
                this.patron = 'Derecha/Izquierda';
                this.id = 'enemigo07';
                break;
            case 'overworld08':
                this.scale = 0.35;
                this.body.setSize(42, 62);
                this.body.setOffset(0, 0);
                this.patron = 'Arriba/Abajo';
                this.id = 'enemigo08';
                break;
            case 'overworld09':
                this.scale = 0.45;
                this.body.setSize(55, 41);
                this.body.setOffset(0, 0);
                this.patron = 'Derecha/Izquierda';
                this.id = 'enemigo09';
                break;
            case 'npc_oculto':
                this.scale = 0.5;
                this.body.setSize(63, 90);
                this.body.setOffset(0, 0);
                this.id = 'boss_oculto';
                break;
            case 'npc_fuego':
                this.scaleX = 1;
                this.scaleY = 1;
                this.body.setSize(80, 60);
                this.body.setOffset(-16, 0);
                this.id = 'boss_fuego';
                break;
            case 'npc_hielo':
                this.scaleX = 1;
                this.scaleY = 1;
                this.body.setSize(90, 70);
                this.body.setOffset(-5, 0);
                this.id = 'boss_hielo';
                break;
            default:
                this.scaleX = 1;
                this.scaleY = 1;
                break;
        }

        this.anims.create({
            key: 'npcAbajo'+identificador,
            frames: this.anims.generateFrameNames(identificador, {
                start: 1,
                prefix: "sprite",
                end: 4
            }),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'npcIzq'+identificador,
            frames: this.anims.generateFrameNames(identificador, {
                start: 5,
                prefix: "sprite",
                end: 8
            }),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'npcDer'+identificador,
            frames: this.anims.generateFrameNames(identificador, {
                start: 9,
                prefix: "sprite",
                end: 12
            }),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'npcArr'+identificador,
            frames: this.anims.generateFrameNames(identificador, {
                start: 13,
                prefix: "sprite",
                end: 16
            }),
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'npcRepo'+identificador,
            frames: this.anims.generateFrameNames(identificador, {
                start: 1,
                prefix: "sprite",
                end: 1
            }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'npcRepoIzq'+identificador,
            frames: this.anims.generateFrameNames(identificador, {
                start: 5,
                prefix: "sprite",
                end: 5
            }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'npcRepoDer'+identificador,
            frames: this.anims.generateFrameNames(identificador, {
                start: 9,
                prefix: "sprite",
                end: 9
            }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'npcRepoArr'+identificador,
            frames: this.anims.generateFrameNames(identificador, {
                start: 13,
                prefix: "sprite",
                end: 13
            }),
            frameRate: 1,
            repeat: -1
        });
    }

    override update(){
        switch (this.patron){
            case 'Derecha/Izquierda':
                if (this.body.velocity.x == 0){
                    this.movimientoEnemigo(Phaser.Math.Between(0, 1) ? 'Derecha' : 'Izquierda',this);
                }
                if (this.body.touching.right) {              
                    this.movimientoEnemigo('Izquierda', this);
                } else if (this.body.touching.left) {
                    this.movimientoEnemigo('Derecha', this);
                }
                break;
            case 'Arriba/Abajo':
                if (this.body.velocity.y == 0){
                    this.movimientoEnemigo(Phaser.Math.Between(0, 1) ? 'Arriba' : 'Abajo',this);
                }
                if (this.body.touching.up) {              
                    this.movimientoEnemigo('Abajo', this);
                } else if (this.body.touching.down) {
                    this.movimientoEnemigo('Arriba', this);
                }
                break;
            default:
                this.anims.play('npcAbajo'+this.identi, true);
                break;
        }
    }

    movimientoEnemigo(direccion: string, npc: any){
        switch (this.patron){
            case 'Derecha/Izquierda':
                if (direccion === 'Derecha'){
                    npc.body.setVelocityX(25);
                    if (this.identi === 'overworld09'){
                        npc.anims.play('npcAbajo'+this.identi, true);
                    } else {
                        this.anims.play('npcDer'+this.identi, true);
                    }
                } else if (direccion === 'Izquierda'){
                    npc.body.setVelocityX(25*(-1));
                    if (this.identi === 'overworld09'){
                        npc.anims.play('npcAbajo'+this.identi, true);
                    } else {
                        this.anims.play('npcIzq'+this.identi, true);
                    }
                }
                break;
            case 'Arriba/Abajo':
                if (direccion === 'Arriba'){
                    npc.body.setVelocityY(25*(-1));
                    npc.anims.play('npcArr'+this.identi, true);
                } else if (direccion === 'Abajo'){
                    npc.body.setVelocityY(25);
                    npc.anims.play('npcAbajo'+this.identi, true);
                }
                break;
        }
    }
}