import Constantes from '../constantes';
import prologo from '../escenas/Prologo';


export default class Jugador extends Phaser.Physics.Arcade.Sprite {
    //Control de entrada
    public cursores: Phaser.Types.Input.Keyboard.CursorKeys;
    public teclaCorrer: Phaser.Input.Keyboard.Key;

    private escena: prologo;
    private velocidad: number;
    private direccionEsperar: number;

    ///////////////////////////////////////////
    //VARIABLES CONTROL DE ZONAS & CAMARAS
    zona_Actual: any;
    zona_Anterior: any;
    cambiaZona: boolean;
    jugador_mueve: boolean;
    jugador_escaleras: boolean;
    ///////////////////////////////////////////

    ///////////////////////////////////////////
    //VARIABLES DE CONTROL DE COMBATE
    movimiento: boolean;
    ///////////////////////////////////////////

    constructor(config: any) { //se le pasa escena para utilizar los objetos que contiene
        super(config.escena, config.x, config.y, config.texture);

        this.escena = config.escena;//Importante: Necesito acceder a los objetos de la escena
        this.escena.physics.world.enable(this);//Activo físicas para este objeto
        this.setCollideWorldBounds(true);//Para que no se salga del mapa
        this.escena.add.existing(this);//Añade objeto a escena
        this.velocidad = 70;//pixels por segundo (aprox)

        ///////////////////////////////////////////
        //VARIABLES CONTROL DE ZONAS & CAMARAS
        this.zona_Actual = 1;
        this.zona_Anterior = null;
        this.cambiaZona = false;
        this.jugador_mueve = true;
        ///////////////////////////////////////////

        ///////////////////////////////////////////
        //VARIABLE DE CONTROL DE COMBATE
        this.movimiento = false;
        ///////////////////////////////////////////

        ///////////////////////////////////////////
        //VARIABLE DE CONTROL DE JUGADOR EN ESCALERAS DE PIE
        this.jugador_escaleras = false;
        ///////////////////////////////////////////

        //Correcciones de "sprite", offset y tamaño general
        this.body.setSize(20, 20);
        this.body.setOffset(-1, 5);
        this.scaleX = 0.70;
        this.scaleY = 0.70;

        //Control entrada
        this.cursores = this.escena.input.keyboard.createCursorKeys();
        this.teclaCorrer = this.escena.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.direccionEsperar = 3;

        ////////////////////////////////////////////////////////////////////////////////////////
        //ANIMACIONES DE ESPERA

        //Animacion esperar mirando hacia arriba
        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ESPERARA,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                start: 1,
                prefix: "sprite",
                end: 1
            }),
            frameRate: 1,
            repeat: 2
        });

        //Animacion esperar mirando hacia derecha
        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ESPERARD,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                start: 10,
                prefix: "sprite",
                end: 10
            }),
            frameRate: 1, 
            repeat: 2
        });

        //Animacion esperar mirando hacia abajo
        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ESPERAR,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                start: 4,
                prefix: "sprite",
                end: 4
            }),
            frameRate: 1, 
            repeat: 2
        });

        //Animacion esperar mirando hacia izquierda
        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ESPERARI,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                start: 7,
                prefix: "sprite",
                end: 7
            }),
            frameRate: 1, 
            repeat: 2
        });
        ////////////////////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////////////////////
        //ANIMACIONES DE MOVIMIENTO
        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ANDAR_IZQUIERDA,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                start: 7,
                prefix: "sprite", //Prefijo de los sprites
                end: 9
            }),
            frameRate: 5, //frames por segundo
            repeat: 2 //Num repeticiones. -1: Repite siempre.
        });

        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ANDAR_DERECHA,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                start: 10,
                prefix: "sprite", 
                end: 12
            }),
            frameRate: 5, 
            repeat: 2 
        });

        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ANDAR_ARRIBA,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                start: 1,
                prefix: "sprite", 
                end: 3
            }),
            frameRate: 5, 
            repeat: 2 
        });

        this.anims.create({
            key: Constantes.JUGADOR.ANIMACION.ANDAR_ABAJO,
            frames: this.anims.generateFrameNames(Constantes.JUGADOR.ID, {
                start: 4,
                prefix: "sprite", 
                end: 6
            }),
            frameRate: 5, 
            repeat: 2 
        });
        ////////////////////////////////////////////////////////////////////////////////////////
    }

    override update() {
        //Control de Movimiento. Teclas excluyentes. 
        if (this.cursores.left.isDown && this.jugador_mueve) {
            //console.log("Izquierda...");
            if (this.teclaCorrer.isDown){
                this.setVelocityX(100 * -1);
            } else {
                this.setVelocityX(this.velocidad * -1);
            }
            this.movimiento = true;
            this.setVelocityY(0);
            this.direccionEsperar = 4;
            this.anims.play(Constantes.JUGADOR.ANIMACION.ANDAR_IZQUIERDA, true);
        } else if (this.cursores.right.isDown && this.jugador_mueve) {
            //console.log("Derecha...");
            if (this.teclaCorrer.isDown){
                this.setVelocityX(100);
            } else {
                this.setVelocityX(this.velocidad);
            }
            this.movimiento = true;
            this.setVelocityY(0);
            this.flipX = false;
            this.direccionEsperar = 2;
            this.anims.play(Constantes.JUGADOR.ANIMACION.ANDAR_DERECHA, true);
        } else if (this.cursores.down.isDown && this.jugador_mueve) {
            //console.log("Abajo...");
            if (this.teclaCorrer.isDown){
                this.setVelocityY(100);
            } else {
                this.setVelocityY(this.velocidad);
            }
            this.movimiento = true;
            this.setVelocityX(0);
            this.direccionEsperar = 3;
            this.anims.play(Constantes.JUGADOR.ANIMACION.ANDAR_ABAJO, true);
        } else if (this.cursores.up.isDown && this.jugador_mueve) {
            //console.log("Arriba...");
            if (this.teclaCorrer.isDown){
                this.setVelocityY(100 * -1);
            } else {
                this.setVelocityY(this.velocidad * -1);
            }
            this.movimiento = true;
            this.setVelocityX(0);
            this.direccionEsperar = 1;
            this.anims.play(Constantes.JUGADOR.ANIMACION.ANDAR_ARRIBA, true);
        } else {
            //console.log("Esperando...");
            this.movimiento = false;
            this.setVelocityX(0);
            this.setVelocityY(0);
            switch (this.direccionEsperar) {
                case 1:
                    this.anims.play(Constantes.JUGADOR.ANIMACION.ESPERARA, true);
                    break;
                case 2:
                    this.anims.play(Constantes.JUGADOR.ANIMACION.ESPERARD, true);
                    break;
                case 3:
                    this.anims.play(Constantes.JUGADOR.ANIMACION.ESPERAR, true);
                    break;
                case 4:
                    this.anims.play(Constantes.JUGADOR.ANIMACION.ESPERARI, true);
                    break;
                default:
                    break;
            }
        }

        //SI EL JUGADOR SE ENCUENTRA BAJANDO/SUBIENDO ESCALERAS, SU VELOCIDAD SE VERÁ REDUCIDA
        if (this.jugador_escaleras) {
            this.velocidad = 35;
            this.jugador_escaleras = false;
        } else {
            this.velocidad = 70;
        }

        //ANALIZAMOS LA HABITACIÓN EN LA QUE SE ENCUENTRA EL JUGADOR
        this.getRoom();
    }

    ///////////////////////////////////////////
    //CONTROL ESCALERAS DE MANO
    public subeEscalera(jugador: Jugador, objeto: Phaser.Physics.Arcade.Sprite): void{
        const siguienteZona = jugador.escena.datosEscalerasMano[objeto.name].salida;

        if (siguienteZona != '---'){
            const direccionSalida = jugador.escena.datosEscalerasMano[objeto.name].direccion;

            const posX = jugador.escena.datosEscalerasMano[''+siguienteZona].x!;
            const posY = jugador.escena.datosEscalerasMano[''+siguienteZona].y!;

            if (direccionSalida == 'up') {
                jugador.escena.jugador.x = posX+7;
                jugador.escena.jugador.y = posY-20;
            } else if (direccionSalida == 'down') {
                jugador.escena.jugador.x = posX+10;
                jugador.escena.jugador.y = posY+30;
            }
        }
    }
    ///////////////////////////////////////////

    ///////////////////////////////////////////
    //CONTROL CUEVAS
    public cuevas(jugador: Jugador, objeto: Phaser.Physics.Arcade.Sprite): void{
        const siguienteZona = jugador.escena.datosCuevas[objeto.name].salida;
        const direccionSalida = jugador.escena.datosCuevas[objeto.name].direccion;

        const posX = jugador.escena.datosCuevas[''+siguienteZona].x!;
        const posY = jugador.escena.datosCuevas[''+siguienteZona].y!;

        if (direccionSalida == 'up') {
            jugador.escena.jugador.x = posX+7;
            jugador.escena.jugador.y = posY-20;
        } else if (direccionSalida == 'down') {
            jugador.escena.jugador.x = posX+10;
            jugador.escena.jugador.y = posY+30;
        }
    }
    ///////////////////////////////////////////

    ///////////////////////////////////////////
    //CONTROL DE ZONAS & CÁMARA
    getRoom() {
        let num_zona;

        for(let zona in this.escena.datosZonas){
            let izquierda = this.escena.datosZonas[zona].x!;
            let derecha = this.escena.datosZonas[zona].x! + this.escena.datosZonas[zona].width!;
            let top = this.escena.datosZonas[zona].y!;
            let bottom = this.escena.datosZonas[zona].y! + this.escena.datosZonas[zona].height!;

            //Se comprueba si el jugador se encuentra en los límites de la zona
            if (this.x > izquierda && this.x < derecha && this.y > top && this.y < bottom){
                num_zona = zona;
            }
        }

        //Se actualiza las variables de zona
        if (num_zona != this.zona_Actual){
            this.zona_Anterior = this.zona_Actual;
            this.zona_Actual = num_zona;
            this.cambiaZona = true;
        } else{
            this.cambiaZona = false;
        }
    }
    ///////////////////////////////////////////

    arreglarTeclas(){
        this.cursores.left.reset();
        this.cursores.right.reset();
        this.cursores.up.reset();
        this.cursores.down.reset();
    }
}