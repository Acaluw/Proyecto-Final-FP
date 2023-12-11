import CargaDatos from "../escenas/cargadatos";
import EnemigosPrologo from "./enemigosPrologo";

export default class JugadorCombatePrologo extends Phaser.GameObjects.Sprite {
    // Variables correspondientes a las propiedades del jugador
    public static tipo: string;
    public static maxVida: number;
    public nombre: string = 'Goldie';
    public experiencia: number = 0;
    vida: number;
    ataque: number;
    tieneVida: boolean;

    nSprites: number = 0;
    //
    // Constructor
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: number, tipo: string, vida: number, ataque: number) {
        super(scene, x, y, texture, frame);
        JugadorCombatePrologo.tipo = tipo;
        JugadorCombatePrologo.maxVida = CargaDatos.jugadorMaxVida;
        this.vida = vida;
        this.ataque = ataque;
        this.tieneVida = true;
    }
    //
    // Método por el cuál atacamos al enemigo
    atacar(target: EnemigosPrologo): void {
        target.quitarVida(CargaDatos.jugadorAtaque);
    }
    atacarCargado(target: EnemigosPrologo): void {
        target.quitarVida(CargaDatos.jugadorAtaque+3);
    }
    //
    // Método para bajar la vida al jugador
    quitarVida(ataque: number): void {
        // Esta vida es la visual
        this.vida -= ataque;
        // En el momento que el jugador se quede sin vida, se modifican las variables correspondientes
        if (this.vida <= 0){
            this.vida = 0;
            CargaDatos.jugadorVida = 0;
            this.tieneVida = false;
            this.visible = false;
        }
    }
}