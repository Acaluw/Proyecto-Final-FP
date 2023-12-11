import Constantes from "../constantes";
import MensajeInformacion from "../gameobjects/MensajeInformacion";
import CargaDatos from "./cargadatos";

export default class EventosTexto extends Phaser.Scene {
    music: any;

    contenedorTextoPrimario!: Phaser.GameObjects.Container;
    contenedorTextoSecundario!: Phaser.GameObjects.Container;
    contenedorTextoTerciario!: Phaser.GameObjects.Container;
    skipear: boolean = false;

    constructor() {
        super(Constantes.ESCENAS.EVENTOTEXTO);
    }

    preload(){}

    create() //Crea escena
    {
        const ancho = this.sys.canvas.width
        const alto = this.sys.canvas.height;

        var contenido = '';
        var posX = 0;
        var posY = 0;

        this.contenedorTextoPrimario = this.add.container();
        this.contenedorTextoSecundario = this.add.container();
        this.contenedorTextoTerciario = this.add.container();

        switch (CargaDatos.textoEventos){
            case '01':
                contenido = '¿Dónde estoy? ¿Qué es este sitio?';
                posX = ancho/2-170;
                posY = alto/2-25;
                var mensaje1 = this.contenedorTextoPrimario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                mensaje1.alpha = 0;

                this.tweens.add({
                    targets: mensaje1,
                    alpha: 1,
                    duration: 1000,
                    onComplete: () => {
                        this.time.addEvent({delay: 3000, callback: () => {
                            this.finalizarEvento(4000);
                        }, callbackScope: this});
                    }
                });
                break;
            case '02':
                contenido = 'Nunca había visto unos bichos como estos.';
                posX = ancho/2-210;
                posY = alto/2-50;
                var mensaje1 = this.contenedorTextoPrimario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                mensaje1.alpha = 0;

                this.tweens.add({
                    targets: mensaje1,
                    alpha: 1,
                    duration: 1000,
                    onComplete: () => {
                        this.time.addEvent({delay: 2000, callback: () => {
                            contenido = 'Y, por si fuera poco, son agresivos. Será mejor andarse con ojo.';
                            posX = ancho/2-310;
                            posY = alto/2;
                            var mensaje2 = this.contenedorTextoSecundario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                            mensaje2.alpha = 0;

                            this.tweens.add({
                                targets: mensaje2,
                                alpha: 1,
                                duration: 1000,
                                onComplete: () => {
                                    this.finalizarEvento(4000);
                                }
                            });
                        }, callbackScope: this});
                    }
                });
                break;
            case '03':
                contenido = 'Una voz resuena en tu cabeza:';
                posX = ancho/2-155;
                posY = 30;
                var mensaje1 = this.contenedorTextoPrimario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                mensaje1.alpha = 0;

                this.tweens.add({
                    targets: mensaje1,
                    alpha: 1,
                    duration: 1000,
                    onComplete: () => {
                        this.time.addEvent({delay: 2000, callback: () => {
                            contenido = 'Por fin has llegado. ¡Qué alegría!';
                            posX = ancho/2-175;
                            posY = alto/2-50;
                            var mensaje2 = this.contenedorTextoSecundario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                            mensaje2.alpha = 0;

                            this.tweens.add({
                                targets: mensaje2,
                                alpha: 1,
                                duration: 1000,
                                onComplete: () => {
                                    this.time.addEvent({delay: 2000, callback: () => {
                                        contenido = 'Debes reunirte con nosotros cuanto antes. Este sitio no es seguro.\nTen cuidado, ya te están buscando...';
                                        posX = ancho/2-325;
                                        posY = alto/2;
                                        var mensaje3 = this.contenedorTextoTerciario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                                        mensaje3.alpha = 0;

                                        this.tweens.add({
                                            targets: mensaje3,
                                            alpha: 1,
                                            duration: 1000,
                                            onComplete: () => {
                                                this.time.addEvent({delay: 6000, callback: () => {
                                                    this.cameras.main.fadeOut(1500, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progreso: number) => {
                                                        if (progreso == 1){
                                                            this.contenedorTextoPrimario.removeAll(true);
                                                            this.contenedorTextoSecundario.removeAll(true);
                                                            this.contenedorTextoTerciario.removeAll(true);
                                                            this.cameras.main.fadeIn(1500, 0, 0, 0);
                                                            contenido = '¿De quién era esa voz? ¿Quién me está buscando?\nSea quien sea, debo salir de aquí cuanto antes.';
                                                            posX = ancho/2-230;
                                                            posY = alto/2-25;
                                                            var mensaje1 = this.contenedorTextoPrimario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                                                            mensaje1.alpha = 0;

                                                            this.tweens.add({
                                                                targets: mensaje1,
                                                                alpha: 1,
                                                                duration: 1000,
                                                                onComplete: () => {
                                                                    this.time.addEvent({delay: 3000, callback: () => {
                                                                        this.finalizarEvento(4000);
                                                                    }, callbackScope: this});
                                                                }
                                                            });
                                                        }
                                                    })
                                                }});
                                            }
                                        });
                                    }});
                                }
                            });
                        }, callbackScope: this});
                    }
                });
                break;
            case '04':
                contenido = 'Parece que en esta zona se respira mejor, la salida\ndebe de estar cerca.';
                posX = ancho/2-245;
                posY = alto/2-25;
                var mensaje1 = this.contenedorTextoPrimario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                mensaje1.alpha = 0;

                this.tweens.add({
                    targets: mensaje1,
                    alpha: 1,
                    duration: 1000,
                    onComplete: () => {
                        this.finalizarEvento(4000);
                    }
                });
                break;
            case '05':
                contenido = 'Una voz resuena en tu cabeza:';
                posX = ancho/2-155;
                posY = 30;
                var mensaje1 = this.contenedorTextoPrimario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                mensaje1.alpha = 0;

                this.tweens.add({
                    targets: mensaje1,
                    alpha: 1,
                    duration: 1000,
                    onComplete: () => {
                        this.time.addEvent({delay: 2000, callback: () => {
                            contenido = '¡Ten cuidado!';
                            posX = ancho/2-90;
                            posY = alto/2-50;
                            var mensaje2 = this.contenedorTextoSecundario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                            mensaje2.alpha = 0;

                            this.tweens.add({
                                targets: mensaje2,
                                alpha: 1,
                                duration: 1000,
                                onComplete: () => {
                                    this.time.addEvent({delay: 2000, callback: () => {
                                        contenido = 'Los guardianes ya estan allí...';
                                        posX = ancho/2-160;
                                        posY = alto/2;
                                        var mensaje3 = this.contenedorTextoTerciario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                                        mensaje3.alpha = 0;

                                        this.tweens.add({
                                            targets: mensaje3,
                                            alpha: 1,
                                            duration: 1000,
                                            onComplete: () => {
                                                this.finalizarEvento(4000);
                                            }
                                        });
                                    }});
                                }
                            });
                        }, callbackScope: this});
                    }
                });
                break;
            case '06':
                contenido = 'El pasillo de aquella zona parecía no llevar a ningún lado.';
                posX = ancho/2-300;
                posY = alto/2-50;
                var mensaje1 = this.contenedorTextoPrimario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                mensaje1.alpha = 0;

                this.tweens.add({
                    targets: mensaje1,
                    alpha: 1,
                    duration: 1000,
                    onComplete: () => {
                        this.time.addEvent({delay: 2000, callback: () => {
                            contenido = 'Aún así, si quiero salir de aquí, debo de explorar hasta el último rincón.';
                            posX = ancho/2-360;
                            posY = alto/2;
                            var mensaje2 = this.contenedorTextoSecundario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                            mensaje2.alpha = 0;

                            this.tweens.add({
                                targets: mensaje2,
                                alpha: 1,
                                duration: 1000,
                                onComplete: () => {
                                    this.finalizarEvento(4000);
                                }
                            });
                        }});
                    }
                });
                break;
            case '07':
                contenido = 'El agua, hasta entonces calmada, comenzaba a estar agitada.';
                posX = ancho/2-290;
                posY = alto/2-50;
                var mensaje1 = this.contenedorTextoPrimario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                mensaje1.alpha = 0;

                this.tweens.add({
                    targets: mensaje1,
                    alpha: 1,
                    duration: 1000,
                    onComplete: () => {
                        this.time.addEvent({delay: 2000, callback: () => {
                            contenido = '¿Podría ser una señal de que la salida está cerca?';
                            posX = ancho/2-255;
                            posY = alto/2;
                            var mensaje2 = this.contenedorTextoSecundario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                            mensaje2.alpha = 0;

                            this.tweens.add({
                                targets: mensaje2,
                                alpha: 1,
                                duration: 1000,
                                onComplete: () => {
                                    this.finalizarEvento(4000);
                                }
                            });
                        }});
                    }
                });
                break;
            case 'evento_oculto':
                contenido = 'Por alguna razón, aquella zona se mantenía en silencio.';
                posX = ancho/2-275;
                posY = alto/2-50;
                var mensaje1 = this.contenedorTextoPrimario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                mensaje1.alpha = 0;

                this.tweens.add({
                    targets: mensaje1,
                    alpha: 1,
                    duration: 1000,
                    onComplete: () => {
                        this.time.addEvent({delay: 2000, callback: () => {
                            contenido = 'Sin embargo, sentía como si alguien o algo me observara...';
                            posX = ancho/2-290;
                            posY = alto/2;
                            var mensaje2 = this.contenedorTextoSecundario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                            mensaje2.alpha = 0;

                            this.tweens.add({
                                targets: mensaje2,
                                alpha: 1,
                                duration: 1000,
                                onComplete: () => {
                                    this.finalizarEvento(4000);
                                }
                            });
                        }, callbackScope: this});
                    }
                });
                break;
            case 'aviso1':
                contenido = 'Una voz resuena en tu cabeza:';
                posX = ancho/2-160;
                posY = 30;
                var mensaje1 = this.contenedorTextoPrimario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                mensaje1.alpha = 0;

                this.tweens.add({
                    targets: mensaje1,
                    alpha: 1,
                    duration: 1000,
                    onComplete: () => {
                        this.time.addEvent({delay: 2000, callback: () => {
                            contenido = '¡Estás entrando en una zona de no retorno!\nAsegúrate de tener todo lo necesario antes de continuar.';
                            posX = ancho/2-285;
                            posY = alto/2-25;
                            var mensaje2 = this.contenedorTextoSecundario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                            mensaje2.alpha = 0;

                            this.tweens.add({
                                targets: mensaje2,
                                alpha: 1,
                                duration: 1000,
                                onComplete: () => {
                                    this.finalizarEvento(4000);
                                }
                            });
                        }, callbackScope: this});
                    }
                });
                break;
            case 'aviso2':
                contenido = 'Una voz resuena en tu cabeza:';
                posX = ancho/2-160;
                posY = 30;
                var mensaje1 = this.contenedorTextoPrimario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                mensaje1.alpha = 0;
    
                this.tweens.add({
                    targets: mensaje1,
                    alpha: 1,
                    duration: 1000,
                    onComplete: () => {
                        this.time.addEvent({delay: 2000, callback: () => {
                            contenido = '¡Estás entrando en una zona de no retorno!\nAsegúrate de tener todo lo necesario antes de continuar.';
                            posX = ancho/2-285;
                            posY = alto/2-25;
                            var mensaje2 = this.contenedorTextoSecundario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                            mensaje2.alpha = 0;
    
                            this.tweens.add({
                                targets: mensaje2,
                                alpha: 1,
                                duration: 1000,
                                onComplete: () => {
                                    this.finalizarEvento(4000);
                                }
                            });
                        }, callbackScope: this});
                    }
                });
                break;
            case 'evento_hielo':
                contenido = 'Solo con ver aquella sala, un escalofrío recorrió mi cuerpo.';
                posX = ancho/2-300;
                posY = alto/2-50;
                var mensaje1 = this.contenedorTextoPrimario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                mensaje1.alpha = 0;

                this.tweens.add({
                    targets: mensaje1,
                    alpha: 1,
                    duration: 1000,
                    onComplete: () => {
                        this.time.addEvent({delay: 3000, callback: () => {
                            contenido = '¿Será este el camino?';
                            posX = ancho/2-125;
                            posY = alto/2;
                            var mensaje2 = this.contenedorTextoSecundario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                            mensaje2.alpha = 0;

                            this.tweens.add({
                                targets: mensaje2,
                                alpha: 1,
                                duration: 1000,
                                onComplete: () => {
                                    this.finalizarEvento(4000);
                                }
                            });
                        }, callbackScope: this});
                    }
                });
                break;
            case 'evento_fuego':
                contenido = 'Aquella sala recordaba al interior de un volcán.';
                posX = ancho/2-240;
                posY = alto/2-50;
                var mensaje1 = this.contenedorTextoPrimario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                mensaje1.alpha = 0;

                this.tweens.add({
                    targets: mensaje1,
                    alpha: 1,
                    duration: 1000,
                    onComplete: () => {
                        this.time.addEvent({delay: 2000, callback: () => {
                            contenido = 'Sin embargo, mi cuerpo no se resentía a pesar de las altas temperaturas.';
                            posX = ancho/2-350;
                            posY = alto/2;
                            var mensaje2 = this.contenedorTextoSecundario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                            mensaje2.alpha = 0;

                            this.tweens.add({
                                targets: mensaje2,
                                alpha: 1,
                                duration: 1000,
                                onComplete: () => {
                                    this.finalizarEvento(4000);
                                }
                            });
                        }, callbackScope: this});
                    }
                });
                break;
            case 'combate_fuego':
                contenido = 'Una voz resuena en tu cabeza:';
                posX = ancho/2-160;
                posY = 30;
                var mensaje1 = this.contenedorTextoPrimario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                mensaje1.alpha = 0;
    
                this.tweens.add({
                    targets: mensaje1,
                    alpha: 1,
                    duration: 1000,
                    onComplete: () => {
                        this.time.addEvent({delay: 2000, callback: () => {
                            contenido = 'Burnova, guardián del fuego...\nNo será un combate fácil, ¡prepárate!';
                            posX = ancho/2-200;
                            posY = alto/2-25;
                            var mensaje2 = this.contenedorTextoSecundario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                            mensaje2.alpha = 0;
    
                            this.tweens.add({
                                targets: mensaje2,
                                alpha: 1,
                                duration: 1000,
                                onComplete: () => {
                                    this.finalizarEvento(4000);
                                }
                            });
                        }, callbackScope: this});
                    }
                });
                break;
            case 'combate_hielo':
                contenido = 'Una voz resuena en tu cabeza:';
                posX = ancho/2-160;
                posY = 30;
                var mensaje1 = this.contenedorTextoPrimario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                mensaje1.alpha = 0;
    
                this.tweens.add({
                    targets: mensaje1,
                    alpha: 1,
                    duration: 1000,
                    onComplete: () => {
                        this.time.addEvent({delay: 2000, callback: () => {
                            contenido = 'Glacialis, guardián del hielo...\nNo será un combate fácil, ¡prepárate!';
                            posX = ancho/2-200;
                            posY = alto/2-25;
                            var mensaje2 = this.contenedorTextoSecundario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                            mensaje2.alpha = 0;
    
                            this.tweens.add({
                                targets: mensaje2,
                                alpha: 1,
                                duration: 1000,
                                onComplete: () => {
                                    this.finalizarEvento(4000);
                                }
                            });
                        }, callbackScope: this});
                    }
                });
                break;
            case 'posterior_hielo':
                contenido = '¿Qué era esa cosa?';
                posX = ancho/2-110;
                posY = alto/2-100;
                var mensaje1 = this.contenedorTextoPrimario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                mensaje1.alpha = 0;

                this.tweens.add({
                    targets: mensaje1,
                    alpha: 1,
                    duration: 1000,
                    onComplete: () => {
                        this.time.addEvent({delay: 2000, callback: () => {
                            contenido = '¿Acaso era real?';
                            posX = ancho/2-102;
                            posY = alto/2-50;
                            var mensaje2 = this.contenedorTextoSecundario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                            mensaje2.alpha = 0;

                            this.tweens.add({
                                targets: mensaje2,
                                alpha: 1,
                                duration: 1000,
                                onComplete: () => {
                                    this.time.addEvent({delay: 2000, callback: () => {
                                        contenido = 'Mientras aquellas preguntas rondaban mi cabeza, buscaba\nde forma desesperada la salida de aquel sitio...';
                                        posX = ancho/2-285;
                                        posY = alto/2;
                                        var mensaje3 = this.contenedorTextoTerciario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                                        mensaje3.alpha = 0;
            
                                        this.tweens.add({
                                            targets: mensaje3,
                                            alpha: 1,
                                            duration: 1000,
                                            onComplete: () => {
                                                this.finalizarEvento(4000);
                                            }
                                        });
                                    }, callbackScope: this});
                                }
                            });
                        }, callbackScope: this});
                    }
                });
                break;
            case 'posterior_fuego':
                contenido = '¿Qué era esa cosa?';
                posX = ancho/2-110;
                posY = alto/2-100;
                var mensaje1 = this.contenedorTextoPrimario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                mensaje1.alpha = 0;

                this.tweens.add({
                    targets: mensaje1,
                    alpha: 1,
                    duration: 1000,
                    onComplete: () => {
                        this.time.addEvent({delay: 2000, callback: () => {
                            contenido = '¿Acaso era real?';
                            posX = ancho/2-102;
                            posY = alto/2-50;
                            var mensaje2 = this.contenedorTextoSecundario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                            mensaje2.alpha = 0;

                            this.tweens.add({
                                targets: mensaje2,
                                alpha: 1,
                                duration: 1000,
                                onComplete: () => {
                                    this.time.addEvent({delay: 2000, callback: () => {
                                        contenido = 'Mientras aquellas preguntas rondaban mi cabeza, buscaba\nde forma desesperada la salida de aquel sitio...';
                                        posX = ancho/2-285;
                                        posY = alto/2;
                                        var mensaje3 = this.contenedorTextoTerciario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                                        mensaje3.alpha = 0;
            
                                        this.tweens.add({
                                            targets: mensaje3,
                                            alpha: 1,
                                            duration: 1000,
                                            onComplete: () => {
                                                this.finalizarEvento(4000);
                                            }
                                        });
                                    }, callbackScope: this});
                                }
                            });
                        }, callbackScope: this});
                    }
                });
                break;
            case 'exterior_izquierda':
                contenido = 'Una vez conseguí salir de aquella cueva,\nuna sensación de tranquilidad invadió mi cuerpo.';
                posX = ancho/2-235;
                posY = alto/2-50;
                var mensaje1 = this.contenedorTextoPrimario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                mensaje1.alpha = 0;

                this.tweens.add({
                    targets: mensaje1,
                    alpha: 1,
                    duration: 1000,
                    onComplete: () => {
                        this.time.addEvent({delay: 3000, callback: () => {
                            contenido = 'Miraba alrededor, impregnada por aquel paisaje primaveral y,\npor un breve momento, había olvidado lo ocurrido\nen el interior de esa cueva.';
                            posX = ancho/2-285;
                            posY = alto/2;
                            var mensaje2 = this.contenedorTextoSecundario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                            mensaje2.alpha = 0;

                            this.tweens.add({
                                targets: mensaje2,
                                alpha: 1,
                                duration: 1000,
                                onComplete: () => {
                                    this.finalizarEvento(4000);
                                }
                            });
                        }, callbackScope: this});
                    }
                });
                break;
            case 'exterior_derecha':
                contenido = 'Una vez conseguí salir de aquella cueva,\nuna sensación de tranquilidad invadió mi cuerpo.';
                posX = ancho/2-245;
                posY = alto/2-50;
                var mensaje1 = this.contenedorTextoPrimario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                mensaje1.alpha = 0;

                this.tweens.add({
                    targets: mensaje1,
                    alpha: 1,
                    duration: 1000,
                    onComplete: () => {
                        this.time.addEvent({delay: 3000, callback: () => {
                            contenido = 'Miraba alrededor, impregnada por aquel paisaje otoñal y,\npor un breve momento, había olvidado lo ocurrido\nen el interior de esa cueva.';
                            posX = ancho/2-285;
                            posY = alto/2;
                            var mensaje2 = this.contenedorTextoSecundario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                            mensaje2.alpha = 0;

                            this.tweens.add({
                                targets: mensaje2,
                                alpha: 1,
                                duration: 1000,
                                onComplete: () => {
                                    this.finalizarEvento(4000);
                                }
                            });
                        }, callbackScope: this});
                    }
                });
                break;
            case 'final':
                contenido = 'Finalmente, había conseguido salir. ¿Qué era esa cueva?\n¿Cómo había acabado allí? ¿De quién era aquella voz que me habló?';
                posX = ancho/2-320;
                posY = alto/2-50;
                var mensaje1 = this.contenedorTextoPrimario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                mensaje1.alpha = 0;

                this.tweens.add({
                    targets: mensaje1,
                    alpha: 1,
                    duration: 1000,
                    onComplete: () => {
                        this.time.addEvent({delay: 5000, callback: () => {
                            contenido = 'Pronto aquellas preguntas obtendrían sus respuestas...';
                            posX = ancho/2-275;
                            posY = alto/2+10;
                            var mensaje2 = this.contenedorTextoSecundario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                            mensaje2.alpha = 0;

                            this.tweens.add({
                                targets: mensaje2,
                                alpha: 1,
                                duration: 1000,
                                onComplete: () => {
                                    this.finalizarJuego();
                                }
                            });
                        }, callbackScope: this});
                    }
                });
                break;
            case 'guardar':
                contenido = 'Partida guardada\nVida recuperada';
                posX = ancho/2-90;
                posY = alto/2-25;
                var mensaje1 = this.contenedorTextoPrimario.add ( new MensajeInformacion(posX, posY, contenido, 16, 'monospace','center', this) );
                mensaje1.alpha = 0;

                this.tweens.add({
                    targets: mensaje1,
                    alpha: 1,
                    duration: 1000,
                    onComplete: () => {
                        this.time.addEvent({delay: 1000, callback: () => {
                            this.finalizarGuardado();
                        }, callbackScope: this});
                    }
                });
                break;
            default:
                break;
        }
        
        console.log(CargaDatos.textoEventos);

        this.input.keyboard.once('keydown-SPACE', () => {
            if (CargaDatos.textoEventos != 'guardar' && CargaDatos.textoEventos != 'final'){
                if (this.skipear == false){
                    this.skipear = true;
                    this.finalizarEvento(0);
                }
            }
        });
    }

    finalizarGuardado(){
        this.time.addEvent({delay: 1000, callback: () => {
            this.cameras.main.fadeOut(500, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progreso: number) => {
                if (progreso == 1){
                    this.contenedorTextoPrimario.removeAll(true);
                    this.contenedorTextoSecundario.removeAll(true);
                    this.contenedorTextoTerciario.removeAll(true);
                    CargaDatos.eventoFinalizado = true;
                    this.scene.resume(Constantes.ESCENAS.PROLOGO);
                    this.scene.stop();
                }
            });
        }, callbackScope: this});
    }

    finalizarEvento(delay: number){
        this.time.addEvent({delay: delay, callback: () => {
            this.cameras.main.fadeOut(2000, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progreso: number) => {
                if (progreso == 1){
                    this.skipear = false;
                    this.contenedorTextoPrimario.removeAll(true);
                    this.contenedorTextoSecundario.removeAll(true);
                    this.contenedorTextoTerciario.removeAll(true);
                    CargaDatos.eventoFinalizado = true;
                    this.scene.resume(Constantes.ESCENAS.PROLOGO);
                    this.scene.stop();
                }
            });
        }, callbackScope: this});
    }

    finalizarJuego(){
        this.time.addEvent({delay: 5000, callback: () => {
            this.cameras.main.fadeOut(4000, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progreso: number) => {
                if (progreso == 1){
                    CargaDatos.jugadorFinaliza = true;
                    this.scene.start(Constantes.ESCENAS.VICTORIA_DERROTA);
                    this.scene.stop(Constantes.ESCENAS.PROLOGO);
                    this.scene.stop();
                }
            })
        }});
    }
}