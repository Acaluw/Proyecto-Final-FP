import BatallaMenu from "./batallaMenu";

export default class BatallaMenuJugador extends BatallaMenu {
    constructor(x: number, y: number, scene: Phaser.Scene){
        super(x, y, scene);
        this.añadirItem('Ataque básico');
        this.añadirItem('');
        this.añadirItem('Ataque cargado');
        this.añadirItem('');
        this.añadirItem('Curación');
        this.añadirItem('');
        this.añadirItem('Información');
        this.añadirItem('');
        this.añadirItem('Huir');
    }

    override confirmarSeleccion(){
        this.scene.events.emit('Accion');
    }
}