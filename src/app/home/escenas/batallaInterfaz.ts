import Constantes from "../constantes";
import BatallaMenu from "../gameobjects/batallaMenu";
import BatallaMenuJugador from "../gameobjects/batallaMenuJugador";
import Batalla from "./batalla";

export default class BatallaInterfaz extends Phaser.Scene {
    ///////////////////////////////////////////
    // Variables predefinidas
    elementosInterfaz: Phaser.GameObjects.Graphics | undefined;
    contenedorElementos: Phaser.GameObjects.Container | undefined;
    //
    menuJugador: BatallaMenuJugador | undefined;
    menuActual: any;
    //
    batalla: any;
    ///////////////////////////////////////////
    constructor() {
        super(Constantes.ESCENAS.BATALLAINTERFAZ);
    }

    create() //Crea escena
    {
        const ancho = this.sys.canvas.width;
        const alto = this.sys.canvas.height;

        this.batalla = this.scene.get(Constantes.ESCENAS.BATALLA);

        this.input.keyboard.on('keydown', this.teclaPulsada, this);

        this.contenedorElementos = this.add.container();

        this.elementosInterfaz = this.add.graphics();
        this.elementosInterfaz.lineStyle(1, 0xffffff);
        this.elementosInterfaz.fillStyle(0x2C3333, 1);     
        
        ///////////////////////////////////////////
        //APARTADO OPCIONES DE COMBATE
        //
        // Se añaden las opciones de combate disponibles para el jugador
        //
        this.menuJugador = new BatallaMenuJugador (20, 100, this);
        this.menuJugador.scale = 1;
        ///////////////////////////////////////////
        //
        // Activar el menú por defecto
        //
        this.menuActual = this.menuJugador;
        //
        // Añadir elemento 'menuJugador' al contenedor
        //
        this.contenedorElementos.add(this.menuJugador);
        //
        this.batalla.events.on('JugadorSeleccionado', this.jugSeleccionado, this);
        this.events.on('Accion', this.realizarAccion, this);
        this.batalla.siguienteTurno();
    }

    override update() {//Se ejecuta cada x milisegundos
    }

    jugSeleccionado(){
        this.menuJugador?.seleccionar(0);
        this.menuActual = this.menuJugador;
    }

    realizarAccion(){
        this.menuJugador?.deseleccionar();
        this.menuActual = null;
        this.batalla.recibirSeleccion(BatallaMenu.opcionSeleccionada);
    }

    teclaPulsada(tecla: any){
        if (this.menuActual){
            if (tecla.code === "ArrowUp") {
                this.menuActual.seleccionarArriba();
                Batalla.efectos = this.sound.add('seleccion',{volume: 0.5});
                Batalla.efectos.play({
                    loop: false
                });
            } else if (tecla.code === "ArrowDown") {
                this.menuActual.seleccionarAbajo();
                Batalla.efectos = this.sound.add('seleccion',{volume: 0.5});
                Batalla.efectos.play({
                    loop: false
                });
            } else if (tecla.code === "Space"){
                this.menuActual.confirmarSeleccion();
            }
        }
    }
}