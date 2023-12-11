import Constantes from "../constantes";
import MensajeInformacion from "../gameobjects/MensajeInformacion";
import Prologo from "./Prologo";
import CargaDatos from "./cargadatos";

export default class EventosTexto extends Phaser.Scene {

    contenedorTextoPrimario!: Phaser.GameObjects.Container;
    contenedorTextoSecundario!: Phaser.GameObjects.Container;
    contenedorTextoTerciario!: Phaser.GameObjects.Container;

    constructor() {
        super(Constantes.ESCENAS.VICTORIA_DERROTA);
    }

    preload(){}

    create(){
        const ancho = this.sys.canvas.width
        const alto = this.sys.canvas.height;

        this.contenedorTextoPrimario = this.add.container();
        this.contenedorTextoSecundario = this.add.container();
        this.contenedorTextoTerciario = this.add.container();
        //
        // EVALUAMOS SI EL JUGADOR HA TERMINADO EL JUEGO O SI EL JUGADOR HA PERDIDO SU VIDA
        //
        if (CargaDatos.jugadorFinaliza == true){
            this.cameras.main.fadeIn(3000, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progreso: number) => {
                if (progreso == 1){
                    var mensaje1 = this.contenedorTextoPrimario.add(new MensajeInformacion(ancho/2-100, alto/2-25, 'Dream Journey: Prólogo', 16, 'cursive', 'center', this));
                    mensaje1.setAlpha(0);
                    this.tweens.add({
                        targets: mensaje1,
                        alpha: 1,
                        duration: 1500,
                        onComplete: () => {
                            this.time.addEvent({delay: 5000, callback: () => {
                                this.cameras.main.fadeOut(5000, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progreso: number) => {
                                    if (progreso == 1){
                                        this.cameras.main.fadeIn(2000,0,0,0);
                                        this.contenedorTextoPrimario.removeAll(true);
                                        this.contenedorTextoPrimario.add(new MensajeInformacion(ancho/2-25, alto/2-25, 'Fin.', 16, 'cursive', 'center', this));
                                        this.time.addEvent({delay: 5000, callback: () => {
                                            this.cameras.main.fadeOut(2000, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progreso: number) => {
                                                if (progreso == 1){
                                                    this.time.addEvent({delay: 2000, callback: () => {
                                                        this.contenedorTextoPrimario.removeAll(true);
                                                        this.cameras.main.fadeIn(2000, 0, 0, 0);
                                                        var creditos = this.contenedorTextoSecundario.add(new MensajeInformacion(ancho/2-165, alto/2-25, 'Juego realizado por: Juan Barrera Cuesta.', 16, 'cursive', 'center', this));
                                                        creditos.setAlpha(0);
                                                        this.tweens.add({
                                                            targets: creditos,
                                                            alpha: 1,
                                                            duration: 1500,
                                                            onComplete: () => {
                                                                this.time.addEvent({delay: 5000, callback: () => {
                                                                    this.cameras.main.fadeOut(3000, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progreso: number) => {
                                                                        if (progreso == 1){
                                                                            this.sound.stopAll();
                                                                            Prologo.mapaCreado = false;
                                                                            Prologo.conjuntoGuardados = [];
                                                                            Prologo.contadorGuardados = 0;
                                                                            CargaDatos.peleaNpc = 'nada';
                                                                            this.scene.start(Constantes.ESCENAS.MENU);
                                                                            this.scene.stop();
                                                                        }
                                                                    });
                                                                }});
                                                            }
                                                        });
                                                    }});
                                                }
                                            });
                                        }});
                                    }
                                })
                            }});
                        }
                    });
                }
            });
        } else if (CargaDatos.jugadorVida == 0){
            this.cameras.main.fadeIn(2000, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progreso: number) => {
                if (progreso == 1){
                    var mensaje1 = this.contenedorTextoPrimario.add(new MensajeInformacion(ancho/2-100, alto/2-25, 'Goldie ha sido derrotada.', 16, 'cursive', 'center', this));
                    mensaje1.setAlpha(0);

                    this.tweens.add({
                        targets: mensaje1,
                        alpha: 1,
                        duration: 1500,
                        onComplete: () => {
                            this.time.addEvent({delay: 3000, callback: () => {
                                var mensaje2 = this.contenedorTextoSecundario.add(new MensajeInformacion(ancho/2-175, alto/2, 'No te rindas, aún queda mucho por descubrir.', 16, 'cursive', 'center', this));
                                mensaje2.setAlpha(0);
                                
                                this.tweens.add({
                                    targets: mensaje2,
                                    alpha: 1,
                                    duration: 1500,
                                    onComplete: () => {
                                        this.time.addEvent({delay: 5000, callback: () => {
                                            this.cameras.main.fadeOut(2000, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progreso: number) => {
                                                if (progreso == 1){
                                                    Prologo.mapaCreado = false;
                                                    Prologo.conjuntoGuardados = [];
                                                    Prologo.contadorGuardados = 0;
                                                    CargaDatos.peleaNpc = 'nada';
                                                    this.scene.stop(Constantes.ESCENAS.PROLOGO);
                                                    this.scene.start(Constantes.ESCENAS.MENU);
                                                    this.scene.stop();
                                                }
                                            })
                                        }})
                                    }
                                });
                            }});
                        }
                    });
                }
            });
        }
    }

    override update(){
    }
}