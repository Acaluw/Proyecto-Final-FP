import { Keyboard } from "@capacitor/keyboard";
import Constantes from "../constantes";
import Jugador from '../gameobjects/jugador';
import Objetos from '../gameobjects/objetos';
import { provideRouter } from "@angular/router";
import CargaDatos from "./cargadatos";
import Npc from "../gameobjects/npc";
import MensajeInformacion from "../gameobjects/MensajeInformacion";
import ObjetosSuelo from "../gameobjects/objetosSuelo";
import Eventos from "../gameobjects/eventos";
import MenuOptions from "./MenuOptions";
import Guardar from "../gameobjects/guardar";
import GestorBD from "src/basedatos/gestorbd";

interface zonas {
    x: number | undefined,
    y: number | undefined,
    width: number | undefined,
    height: number | undefined
}

interface escalerasMano {
    x: number | undefined;
    y: number | undefined;
    salida: String;
    direccion: String;
}

interface cuevas{
    x: number | undefined;
    y: number | undefined;
    salida: String;
    direccion: String;
}

interface escalerasPie{
    x: number | undefined;
    y: number | undefined;
    orientation: String;
}

export default class Prologo extends Phaser.Scene {
    //
    // DECLARACION DE BASE DE DATOS
    //
    public bd!: GestorBD;
    //
    public static music: any = undefined;
    public static efectos: any;

    public jugador!: Jugador;
    public ancho!: integer;
    public alto!: integer;
    public activacionCombate: integer = 0;

    private encuentroCombate: boolean = false;

    private contadorNpc: number = 0;
    public conjuntoNPCs: Npc[] = [];

    ///////////////////////////////////////////
    // VARIABLES REFERENTES A LOS OBJETOS DEL MAPA
    public datosZonas: {[key: string]: zonas} = {};
    public datosEscalerasMano : {[key: string]: escalerasMano} = {};
    public datosCuevas : {[key: string]: cuevas} = {};
    public datosEscalerasPieVerti: {[key: string]: escalerasPie} = {};
    public datosEscalerasPieHori: {[key: string]: escalerasPie} = {};

    escalerasMano!: Objetos;
    cuevas!: Objetos;
    escalerasPieVerti!: any;
    escalerasPieHori!: any;

    resumirZona: boolean = false;

    public static contadorGuardados: number = 0;
    public static conjuntoGuardados: Guardar[] = [];

    contadorObjetos: number = 0;
    conjuntoObjetos: ObjetosSuelo[] = [];
    teclaPulsada: boolean = true;
    imagenAMostrar: any;
    ///////////////////////////////////////////

    ///////////////////////////////////////////
    // VARIABLES REFERENTES A EVENTOS DE HISTORIA
    conjuntoEventos: Eventos[] = [];
    contadorEventos: number = 0;
    ///////////////////////////////////////////

    public mapaNivel!: Phaser.Tilemaps.Tilemap;

    private mapaTileset!: Phaser.Tilemaps.Tileset;
    private capaMapaNivel!: Phaser.Tilemaps.TilemapLayer;
    private capasueloMapaNivel!: Phaser.Tilemaps.TilemapLayer;
    private capasuperiorMapaNivel!: Phaser.Tilemaps.TilemapLayer;
    private background!: Phaser.GameObjects.Sprite;
    
    contenedorTexto!: Phaser.GameObjects.Container;
    contenedorTextoSecundario!: Phaser.GameObjects.Container;

    public static mapaCreado: boolean = false;

    constructor() {
        super(Constantes.ESCENAS.PROLOGO);
    }

    preload(){}

    create()
    {
        console.log("ESCENA PROLOGO");
        this.ancho = this.sys.game.canvas.width;
        this.alto = this.sys.game.canvas.height;
        //
        // Inicializamos la base de datos
        //
        this.bd = new GestorBD();
        //
        // SI TIENE PARTIDA GUARDADA SE PILLAN DATOS
        //
        if (this.bd.datos.datosGuardados == true){
            CargaDatos.jugadorVida = this.bd.datos.jugador.vida;
            CargaDatos.jugadorMaxVida = this.bd.datos.jugador.vidaMax;
            CargaDatos.jugadorAtaque = this.bd.datos.jugador.ataque;
            CargaDatos.jugadorExperiencia = this.bd.datos.jugador.experiencia;
            CargaDatos.jugadorExperienciaMax = this.bd.datos.jugador.experienciaMax;
            CargaDatos.jugadorNivel = this.bd.datos.jugador.nivel;
            CargaDatos.jugadorCuracion = this.bd.datos.jugador.curacion;

            CargaDatos.jugadorZona = this.bd.datos.zonaMapa;
            CargaDatos.npcDerrotados = this.bd.datos.npcDerrotados;
            CargaDatos.eventosRealizados = this.bd.datos.eventosRealizados;
            CargaDatos.objetosRecogidos = this.bd.datos.objetosRecogidos;

            this.time.addEvent({delay: 3000, callback: () => {
                this.cameras.main.fadeIn(1000, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progreso: number) => {
                    if (progreso == 1){
                        this.contenedorTexto = this.add.container();
                        this.contenedorTexto.removeAll(true);
                        //
                        const guardar = this.add.image(this.ancho/2+217,90, 'guardar');
                        const objeto1 = this.add.image(this.ancho/2-250,90, Constantes.MISCELANEOS.OBJETO_TIPO1);
                        const objeto2 = this.add.image(this.ancho/2-210,90, Constantes.MISCELANEOS.OBJETO_TIPO2);
                        const flechas = this.add.image(this.ancho/2-150, this.alto-100, 'flechasAyuda');
                        flechas.scale = 0.4;
                        const barraEspacio = this.add.image(this.ancho/2+150, this.alto-100, 'barraEspacio');
                        barraEspacio.scale = 0.05;
                        const teclaX = this.add.image(this.ancho/2-5, 95, Constantes.MISCELANEOS.CORRER);
                        teclaX.scale = 0.04;
                        //
                        this.contenedorTexto.add(new MensajeInformacion(this.ancho/2-50, this.alto/2-25, 'Cargando...', 16, 'cursive', 'center', this));
                        this.contenedorTexto.add(new MensajeInformacion(this.ancho/2-200, this.alto-50, 'Movimiento', 16, 'cursive', 'center', this));
                        this.contenedorTexto.add(new MensajeInformacion(this.ancho/2+100, this.alto-50, 'Interactuar', 16, 'cursive', 'center', this));
                        this.contenedorTexto.add(new MensajeInformacion(this.ancho/2-270, 50, 'Objetos', 16, 'cursive', 'center', this));
                        this.contenedorTexto.add(new MensajeInformacion(this.ancho/2+180, 50, 'Guardar', 16, 'cursive', 'center', this));
                        this.contenedorTexto.add(new MensajeInformacion(this.ancho/2-38, 50, 'Sprint', 16, 'cursive', 'center', this));
                    }
                });
            }, callbackScope: this});
    
            this.time.addEvent({delay: 7000, callback: this.crearnivel, callbackScope: this});
        }else {
            //
            // SI NO TIENE PARTIDA GUARDADA SE PONEN DATOS INICIALES
            //
            CargaDatos.jugadorVida = 20;
            CargaDatos.jugadorMaxVida = 20;
            CargaDatos.jugadorAtaque = 1;
            CargaDatos.jugadorExperiencia = 0;
            CargaDatos.jugadorExperienciaMax = 25;
            CargaDatos.jugadorNivel = 1;
            CargaDatos.jugadorCuracion = 0;

            CargaDatos.jugadorZona = '';
            CargaDatos.npcDerrotados = [];
            CargaDatos.eventosRealizados = [];
            CargaDatos.objetosRecogidos = [];

            this.introduccion();
        }
    }

    override update() {
        if (Prologo.mapaCreado && this.jugador != undefined){
            this.jugador.update();

            if (CargaDatos.musicaDespuesCombate == true && Prologo.music != undefined){
                this.sound.resumeAll();
            }

            if (CargaDatos.borrarNpc == true){
                CargaDatos.borrarNpc = false;
                for (let i = 0; i < this.conjuntoNPCs.length; i++) {
                    if (this.conjuntoNPCs[i].id == CargaDatos.peleaNpc){
                        CargaDatos.npcDerrotados.push(this.conjuntoNPCs[i].identi);
                        this.conjuntoNPCs[i].destroy();
                    }
                }
                CargaDatos.peleaNpc = 'nada';
            }

            if (CargaDatos.jugadorPeleaNpc == true){
                this.time.addEvent({delay: 5000, callback: () => {
                    CargaDatos.jugadorPeleaNpc = false;
                    CargaDatos.npcCombate = false;
                }});
            }

            if (CargaDatos.eventoFinalizado == true){
                CargaDatos.eventoFinalizado = false;
                if (CargaDatos.textoEventos != 'guardar'){
                    CargaDatos.eventosRealizados.push(CargaDatos.textoEventos);
                    for (let i = 0; i < this.conjuntoEventos.length; i++) {
                        if (CargaDatos.textoEventos == this.conjuntoEventos[i].identi){
                            this.conjuntoEventos[i].destroy();
                            CargaDatos.textoEventos = '';
                            CargaDatos.eventoActivo = false;
                            this.time.addEvent({delay: 2000, callback: () => {
                                CargaDatos.jugadorEnEvento = true;
                            }});
                        }
                    }
                }else {
                    CargaDatos.textoEventos = '';
                    CargaDatos.eventoActivo = false;
                }
                this.cameras.main.fadeIn(2000, 0, 0, 0);
            }

            for (let i = 0; i < this.conjuntoNPCs.length; i++) {
                if (this.conjuntoNPCs[i].body != undefined && this.conjuntoNPCs[i].visible == true){
                    this.conjuntoNPCs[i].update();
                }
            }

            for (let i = 0; i < this.conjuntoObjetos.length; i++) {
                if (this.conjuntoObjetos[i].body != undefined && this.conjuntoObjetos[i].visible == true){
                    this.conjuntoObjetos[i].update();
                }
            }

            for (let i = 0; i < Prologo.conjuntoGuardados.length; i++) {
                Prologo.conjuntoGuardados[i].update();
            }

            this.input.keyboard.on('keydown-SPACE', () => {
                if (this.teclaPulsada == true){
                    this.teclaPulsada = false;
                    this.time.addEvent({delay: 500, callback: this.comprobarProximidadObjetos, callbackScope: this});
                }
            });
            ///////////////////////////////////////////
            //CONTROL DE ZONAS & CÁMARA
            if (this.jugador.cambiaZona) {
                this.cameras.main.fadeOut(250, 0, 0, 0, (camera: any, progreso: number) => {
                    this.jugador.jugador_mueve = false;
                    if (progreso === 1) {
                        //Una vez se completa el fadeOut, se cambia las dimensiones de la cámara
                        //con respecto a las dimensiones de la nueva zona
                        let cam_x = this.datosZonas[this.jugador.zona_Actual.toString()].x!;
                        let cam_y = this.datosZonas[this.jugador.zona_Actual.toString()].y!;
                        let cam_width = this.datosZonas[this.jugador.zona_Actual.toString()].width!;
                        let cam_height = this.datosZonas[this.jugador.zona_Actual.toString()].height!;

                        this.cameras.main.setBounds(cam_x, cam_y, cam_width, cam_height, true);

                        if (this.jugador.zona_Actual == 1){
                            this.cameras.main.zoom = 5;
                        } else{
                            this.cameras.main.zoom = 3.5;
                        }

                        //Se realiza un fadeIn con la cámara posicionada en la nueva zona
                        this.cameras.main.fadeIn(500, 0, 0, 0, (camera: any, progress: number) => {
                            if (progress === 1) {
                                this.jugador.jugador_mueve = true;
                                this.nuevaHabitacion(this.jugador.zona_Actual);
                            }
                        }, this);
                    }
                }, this);
            }
            ///////////////////////////////////////////

            ///////////////////////////////////////////
            //CONTROL ACTIVACION DE COMBATE
                if (this.jugador.movimiento == true && this.encuentroCombate == true){
                    this.encuentroCombate = false;
                    this.time.addEvent({delay: 2000, callback: this.comprobacioncombate, callbackScope: this});
                }
            ///////////////////////////////////////////
        }
    }

    ///////////////////////////////////////////
    introduccion(){

        this.cameras.main.fadeIn(3000, 0, 0, 0);
        Prologo.music = this.sound.add('cinemathic_theme',{volume: 0.10});
        Prologo.music.play({
            loop: true
        });
        this.contenedorTexto = this.add.container();
        this.contenedorTextoSecundario = this.add.container();
        this.contenedorTexto.add(new MensajeInformacion(this.ancho/2-100, this.alto/2-25, 'Dream Journey: Prólogo', 16, 'cursive', 'center', this));

        this.time.addEvent({delay: 6000, callback: () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progreso: number) => {
                if (progreso == 1){
                    this.pasarTextoIntroduccion('¿?: Parece que tenemos visita...', '¿?: ¿Crees que puede pertenecer a \'ese\' grupo?', this.ancho/2-135,this.alto/2-50,this.ancho/2-240,this.alto/2);
                }
            });
        }, callbackScope: this});

        this.time.addEvent({delay: 21000, callback: () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progreso: number) => {
                if (progreso == 1){
                    this.pasarTextoIntroduccion('¿?: No estoy seguro, pero debemos andarnos con ojo.', '¿?: ¿Avisamos a su majestad?', this.ancho/2-200,this.alto/2-50,this.ancho/2-145,this.alto/2);
                }
            });
        }, callbackScope: this});

        this.time.addEvent({delay: 36000, callback: () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progreso: number) => {
                if (progreso == 1){
                    this.pasarTextoIntroduccion('¿?: No será necesario. En caso de suponer una amenaza,\nseremos nosotros quien la detengamos.\n\nNo veo el momento para conocerla...', '', this.ancho/2-220,this.alto/2-60,0,0);
                }
            });
        }, callbackScope: this});

        this.time.addEvent({delay: 51000, callback: () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progreso: number) => {
                if (progreso == 1){
                    this.contenedorTexto.removeAll(true);
                    this.contenedorTextoSecundario.removeAll(true);
                    this.cameras.main.fadeIn(2000, 0, 0, 0);
                    //
                    this.tweens.add({
                        targets: Prologo.music,
                        volume: 0,
                        duration: 1000
                    });
                    //
                    const guardar = this.add.image(this.ancho/2+217,90, 'guardar');
                    const objeto1 = this.add.image(this.ancho/2-250,90, Constantes.MISCELANEOS.OBJETO_TIPO1);
                    const objeto2 = this.add.image(this.ancho/2-210,90, Constantes.MISCELANEOS.OBJETO_TIPO2);
                    const flechas = this.add.image(this.ancho/2-150, this.alto-100, 'flechasAyuda');
                    flechas.scale = 0.4;
                    const barraEspacio = this.add.image(this.ancho/2+150, this.alto-100, 'barraEspacio');
                    barraEspacio.scale = 0.05;
                    const teclaX = this.add.image(this.ancho/2-5, 95, Constantes.MISCELANEOS.CORRER);
                    teclaX.scale = 0.04;
                    //
                    this.contenedorTexto.add(new MensajeInformacion(this.ancho/2-50, this.alto/2-25, 'Cargando...', 16, 'cursive', 'center', this));
                    this.contenedorTexto.add(new MensajeInformacion(this.ancho/2-200, this.alto-50, 'Movimiento', 16, 'cursive', 'center', this));
                    this.contenedorTexto.add(new MensajeInformacion(this.ancho/2+100, this.alto-50, 'Interactuar', 16, 'cursive', 'center', this));
                    this.contenedorTexto.add(new MensajeInformacion(this.ancho/2-270, 50, 'Objetos', 16, 'cursive', 'center', this));
                    this.contenedorTexto.add(new MensajeInformacion(this.ancho/2+180, 50, 'Guardar', 16, 'cursive', 'center', this));
                    this.contenedorTexto.add(new MensajeInformacion(this.ancho/2-38, 50, 'Sprint', 16, 'cursive', 'center', this));
                }
            });
        }, callbackScope: this});

        this.time.addEvent({delay: 57000, callback: this.crearnivel, callbackScope: this});
    }

    pasarTextoIntroduccion(mensaje: string, mensaje2: string, posX1: number, posY1: number, posX2: number, posY2: number){
        this.cameras.main.fadeOut(2000, 0, 0, 0);
        this.contenedorTexto.removeAll(true);
        this.contenedorTextoSecundario.removeAll(true);
        this.cameras.main.fadeIn(3000, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progreso: number) => {
            if (progreso == 1){
                var contenido1 = this.contenedorTexto.add(new MensajeInformacion(posX1, posY1, mensaje, 16, 'cursive', 'center', this));
                contenido1.setAlpha(0);
                this.tweens.add({
                    targets: contenido1,
                    alpha: 1,
                    duration: 1000,
                    onComplete: () => {
                        if (mensaje2 != ''){
                            this.time.addEvent({delay: 5000, callback: () => {
                                var contenido2 = this.contenedorTextoSecundario.add ( new MensajeInformacion(posX2, posY2, mensaje2, 16, 'monospace','center', this) );
                                contenido2.alpha = 0;
                                this.tweens.add({
                                    targets: contenido2,
                                    alpha: 1,
                                    duration: 1000,
                                    onComplete: () => {}
                                });
                            }, callbackScope: this});
                        }
                    }
                });
            }
        });
    }
    ///////////////////////////////////////////

    ///////////////////////////////////////////
    crearnivel(){
        //Cargar Tilemap
        this.mapaNivel = this.make.tilemap({ key: Constantes.MAPAS.PROLOGO.TILEMAPJSON, tileWidth: 8, tileHeight: 8 });
        this.physics.world.bounds.setTo(0, 0, this.mapaNivel.widthInPixels, this.mapaNivel.heightInPixels);//Límites del mundo
        //Se añade el Tileset (conjunto de patrones  base del mapa) para poder añadir sus capas
        this.mapaTileset = this.mapaNivel.addTilesetImage(Constantes.MAPAS.TILESET);

        this.cameras.main.fadeIn(1000, 0, 0, 0);

        //PROBLEMA DE CARGA DE LINEA 88 A LINEA 95 (CARGA LENTA). BUSCAR SOLUCION
        //Se añade mapa y las capas
        this.capasueloMapaNivel = this.mapaNivel.createLayer(Constantes.MAPAS.PROLOGO.CAPACOLISIONES, this.mapaTileset); 
        this.capaMapaNivel = this.mapaNivel.createLayer(Constantes.MAPAS.PROLOGO.CAPAMAPEADO, this.mapaTileset);
        this.capasuperiorMapaNivel = this.mapaNivel.createLayer(Constantes.MAPAS.PROLOGO.CAPASUPERIOR, this.mapaTileset);
            
        this.capasuperiorMapaNivel.setDepth(9); // Posicionamos la capa superior en la máxima altura
        this.capasueloMapaNivel.setCollisionByExclusion([-1]);//Hacemos la capa colisionable

        console.log('Mapa creado');
        ///////////////////////////////////////////
        //CONTROL DE ZONAS & CÁMARA
        var capaObjetos = this.mapaNivel.getObjectLayer('zona');
        capaObjetos.objects.forEach( (objeto) => {
            this.datosZonas[objeto.name] = {
                x: objeto.x,
                y: objeto.y,
                width: objeto.width,
                height: objeto.height
            };
        });
        ///////////////////////////////////////////

        ///////////////////////////////////////////
        //SE AÑADE AL JUGADOR
        if (this.bd.datos.datosGuardados == true){
            this.jugador = new Jugador({
                escena: this,
                x: this.bd.datos.posXJugador,
                y: this.bd.datos.posYJugador,
                textura: Constantes.JUGADOR.ID
            })
        }else {
            this.mapaNivel.findObject(Constantes.JUGADOR.ID, (d: any) => {
                this.jugador = new Jugador({
                    escena: this,
                    x: d.x,
                    y: d.y,
                    textura: Constantes.JUGADOR.ID
                });
            });
        }
        ///////////////////////////////////////////

        ///////////////////////////////////////////
        // SE AÑADEN LOS NPCS
        capaObjetos = this.mapaNivel.getObjectLayer('npcs');
        capaObjetos.objects.forEach( (objeto) => {
            this.conjuntoNPCs[this.contadorNpc] = new Npc({
                escena: this,
                x: objeto.x,
                y: objeto.y,
                textura: objeto.name
            }, 
            objeto.name);
            this.contadorNpc++;
        });
        
        if (this.bd.datos.datosGuardados == true){
            if (CargaDatos.npcDerrotados.length != 0){
                for (let i = 0; i < this.conjuntoNPCs.length; i++) {
                    for (let j = 0; j < CargaDatos.npcDerrotados.length; j++) {
                        if (CargaDatos.npcDerrotados[j] == this.conjuntoNPCs[i].identi){
                            this.conjuntoNPCs[i].destroy();
                        }
                    }
                }
            }
        }
        ///////////////////////////////////////////

        ///////////////////////////////////////////
        // SE AÑADEN LOS OBJETOS
        capaObjetos = this.mapaNivel.getObjectLayer('objetos');
        capaObjetos.objects.forEach( (objeto) => {
            this.conjuntoObjetos[this.contadorObjetos] = new ObjetosSuelo({
                escena: this,
                x: objeto.x,
                y: objeto.y,
                textura: objeto.name
            },
            objeto.name);
            this.contadorObjetos++;
        });

        if (this.bd.datos.datosGuardados == true){
            if (CargaDatos.objetosRecogidos.length != 0){
                for (let i = 0; i < this.conjuntoObjetos.length; i++) {
                    for (let j = 0; j < CargaDatos.objetosRecogidos.length; j++) {
                        if (CargaDatos.objetosRecogidos[j] == this.conjuntoObjetos[i].numero){
                            this.conjuntoObjetos[i].visible = false;
                            this.conjuntoObjetos[i].destroy();
                        }
                    }
                }
            }
        }
        ///////////////////////////////////////////

        ///////////////////////////////////////////
        // SE AÑADEN LOS EVENTOS
        capaObjetos = this.mapaNivel.getObjectLayer('eventos');
        capaObjetos.objects.forEach( (objeto) => {
            this.conjuntoEventos[this.contadorEventos] = new Eventos({
                escena: this,
                x: objeto.x,
                y: objeto.y,
                textura: objeto.name
            },
            objeto.name);
            this.contadorEventos++;
        });
        
        if (this.bd.datos.datosGuardados == true){
            if (CargaDatos.eventosRealizados.length != 0){
                for (let i = 0; i < this.conjuntoEventos.length; i++) {
                    for (let j = 0; j < CargaDatos.eventosRealizados.length; j++) {
                        if (CargaDatos.eventosRealizados[j] == this.conjuntoEventos[i].identi){
                            this.conjuntoEventos[i].destroy();
                        }
                    }
                }
            }
        }
        ///////////////////////////////////////////

        ///////////////////////////////////////////
        // SE AÑADEN LOS PUNTOS DE GUARDADO
        capaObjetos = this.mapaNivel.getObjectLayer('guardado');
        capaObjetos.objects.forEach( (objeto) => {
            Prologo.conjuntoGuardados[Prologo.contadorGuardados] = new Guardar({
                escena: this,
                x: objeto.x,
                y: objeto.y,
                textura: objeto.name
            });
            Prologo.contadorGuardados++;
        });
        ///////////////////////////////////////////

        ///////////////////////////////////////////
        // CONTROL ESCALERAS DE MANO
        capaObjetos = this.mapaNivel.getObjectLayer('escaleras_mano');
        capaObjetos.objects.forEach( (objeto) => {
            this.datosEscalerasMano[objeto.name] = {
                x: objeto.x,
                y: objeto.y,
                salida: '---',
                direccion: '-'
            };
        });

        this.datosEscalerasMano['s00'].salida = 's01';
        this.datosEscalerasMano['s00'].direccion = 'up';

        this.datosEscalerasMano['s01'].salida = 's00';
        this.datosEscalerasMano['s01'].direccion = 'down';

        this.datosEscalerasMano['s02'].salida = 's03';
        this.datosEscalerasMano['s02'].direccion = 'up';

        this.datosEscalerasMano['s03'].salida = 's02';
        this.datosEscalerasMano['s03'].direccion = 'down';

        this.datosEscalerasMano['s04'].salida = 's05';
        this.datosEscalerasMano['s04'].direccion = 'up';

        this.datosEscalerasMano['s05'].salida = 's04';
        this.datosEscalerasMano['s05'].direccion = 'down';

        this.datosEscalerasMano['e_hielo'].salida = 's_hielo';
        this.datosEscalerasMano['e_hielo'].direccion = 'up';

        this.datosEscalerasMano['e_fuego'].salida = 's_fuego';
        this.datosEscalerasMano['e_fuego'].direccion = 'up';

        this.escalerasMano = new Objetos(this, 'escaleras_mano', 'escalera');
        this.physics.add.overlap(this.jugador, this.escalerasMano, this.jugador.subeEscalera as ArcadePhysicsCallback, undefined, this);
        ///////////////////////////////////////////

        ///////////////////////////////////////////
        //CONTROL ESCALERAS DE PIE
        capaObjetos = this.mapaNivel.getObjectLayer('escaleras_verti');

        capaObjetos.objects.forEach( (objeto) => {
            this.datosEscalerasPieVerti[objeto.name] = {
                x: objeto.x,
                y: objeto.y,
                orientation: 'vertical',
            }
        });
        this.escalerasPieVerti = new Objetos(this, 'escaleras_verti', 'vertical');

        this.physics.add.overlap(this.jugador, this.escalerasPieVerti, () =>{
            this.jugador.jugador_escaleras = true;
        }, undefined, this);

        capaObjetos = this.mapaNivel.getObjectLayer('escaleras_hori');

        capaObjetos.objects.forEach( (objeto) => {
            this.datosEscalerasPieHori[objeto.name] = {
                x: objeto.x,
                y: objeto.y,
                orientation: 'horizontal',
            }
        });
        this.escalerasPieHori = new Objetos(this, 'escaleras_hori', 'horizontal');

        this.physics.add.overlap(this.jugador, this.escalerasPieHori, () =>{
            this.jugador.jugador_escaleras = true;
        }, undefined, this);
        ///////////////////////////////////////////

        ///////////////////////////////////////////
        //CONTROL CUEVAS
        capaObjetos = this.mapaNivel.getObjectLayer('cuevas');
        capaObjetos.objects.forEach( (objeto) => {
            this.datosCuevas[objeto.name] = {
                x: objeto.x,
                y: objeto.y,
                salida: '---',
                direccion: '-'
            };
        });

        this.datosCuevas['c00'].salida = 'c01';
        this.datosCuevas['c00'].direccion = 'down';

        this.datosCuevas['c01'].salida = 'c00';
        this.datosCuevas['c01'].direccion = 'up';

        this.datosCuevas['c02'].salida = 'c03';
        this.datosCuevas['c02'].direccion = 'down';

        this.datosCuevas['c03'].salida = 'c02';
        this.datosCuevas['c03'].direccion = 'up';

        this.cuevas = new Objetos(this, 'cuevas', 'cueva');
        this.physics.add.overlap(this.jugador, this.cuevas, this.jugador.cuevas as ArcadePhysicsCallback, undefined, this);
        ///////////////////////////////////////////

        ///////////////////////////////////////////
        // COLISIONES NPCS
        for (let i = 0; i < this.conjuntoNPCs.length; i++) {
            this.physics.add.collider(this.conjuntoNPCs[i], this.capasueloMapaNivel);
            this.physics.add.overlap(this.jugador, this.conjuntoNPCs[i], () => {
                if (CargaDatos.npcCombate == false && CargaDatos.jugadorPeleaNpc == false){
                    CargaDatos.npcCombate = true;
                    CargaDatos.peleaNpc = this.conjuntoNPCs[i].id;
                    if (this.conjuntoNPCs[i].id == 'boss_fuego'){
                        CargaDatos.jefeZonaDer = true;
                    }
                    if (this.conjuntoNPCs[i].id == 'boss_hielo'){
                        CargaDatos.jefeZonaIzq = true;
                    }
                    if (this.conjuntoNPCs[i].id == 'boss_oculto'){
                        CargaDatos.jefeOculto = true;
                    }
                    this.time.addEvent({delay: 1000, callback: this.combateNPC, callbackScope: this});
                }
            });
        }
        ///////////////////////////////////////////

        ///////////////////////////////////////////
        // COLISIONES OBJETOS
        for (let i = 0; i < this.conjuntoObjetos.length; i++) {
            this.physics.add.collider(this.jugador, this.conjuntoObjetos[i]);
        }
        ///////////////////////////////////////////

        ///////////////////////////////////////////
        // COLISIONES GUARDAR
        for (let i = 0; i < Prologo.conjuntoGuardados.length; i++) {
            this.physics.add.collider(this.jugador, Prologo.conjuntoGuardados[i]);
        }
        ///////////////////////////////////////////

        ///////////////////////////////////////////
        // COLISIONES EVENTOS TEXTO
        for (let i = 0; i < this.conjuntoEventos.length; i++) {
            this.physics.add.overlap(this.jugador, this.conjuntoEventos[i], () => {
                if (CargaDatos.eventoActivo == false){
                    if (CargaDatos.jugadorEnEvento == true){
                        if (this.conjuntoEventos[i].identi == 'combate'){
                            if (CargaDatos.combateInicial == true){
                                CargaDatos.combateInicial = false;
                                CargaDatos.peleaNpc = 'inicio';
                                CargaDatos.eventoActivo = true;
                                this.activacombate();
                            }
                        }else {
                            CargaDatos.eventoActivo = true;
                            this.activarEvento(this.conjuntoEventos[i], 2000);
                        }
                    }
                }
            });
        }
        ///////////////////////////////////////////

        ///////////////////////////////////////////
        //CONTROL DE ZONAS & CÁMARA
        let cam_x = this.datosZonas[this.jugador.zona_Actual.toString()].x!;
        let cam_y = this.datosZonas[this.jugador.zona_Actual.toString()].y!;
        let cam_width = this.datosZonas[this.jugador.zona_Actual.toString()].width!;
        let cam_height = this.datosZonas[this.jugador.zona_Actual.toString()].height!;

        this.cameras.main.setBounds(cam_x, cam_y, cam_width, cam_height);
        ///////////////////////////////////////////

        this.cameras.main.zoom=5;
        //Se configura la camara. Hacemos que siga al jugador
        this.cameras.main.startFollow(this.jugador);


        //FÍSICAS OBJETOS
        //Se añade la física del jugador con el nivel
        this.physics.add.collider(this.jugador, this.capasueloMapaNivel);

        Prologo.mapaCreado = true;
        Prologo.music = this.sound.add('cave_theme',{volume: MenuOptions.ambientSound/100+0.5});
        Prologo.music.play({
            loop: true
        });
    }
    ///////////////////////////////////////////

    ///////////////////////////////////////////
    //CONTROL DE ZONAS & CÁMARA
    nuevaHabitacion(zona: any)
    {
        if (zona >= 1 && zona <= 7){
            CargaDatos.jugadorZona = 'Cueva Subterránea P-2';
            if (zona == 1){
                this.sound.stopAll();
                this.encuentroCombate = false;
                if (this.bd.datos.musica.musicaFondo == true){
                    this.resumirZona = true;
                }
            } else if (zona ==2){
                if (this.resumirZona == true){
                    this.resumirZona = false;
                    this.sound.resumeAll();
                }
                this.encuentroCombate = false;
            } 
            else {
                this.encuentroCombate = true;
            }
        }

        if (zona >= 8 && zona <= 13){
            CargaDatos.jugadorZona = 'Cueva Subterránea P-1';
            if (zona == 8){
                this.encuentroCombate = false;
            }else {
                this.encuentroCombate = true;
            }
        }

        if (zona >= 17 && zona <= 18){
            CargaDatos.jugadorZona = 'Cueva Subterránea P-1';
            this.encuentroCombate = true;
        }

        if (zona >= 14 && zona <= 16){
            if (zona == 16){
                this.sound.stopAll();
            } else {
                this.sound.stopAll();
                Prologo.music = this.sound.add('cinemathic_theme',{volume: 0.05});
                Prologo.music.play({
                    loop: true
                });
            }
            CargaDatos.jugadorZona = 'Sala volcánica';
            this.encuentroCombate = false;
        }

        if (zona == 19){
            this.sound.stopAll();
            Prologo.music = this.sound.add('cinemathic_theme',{volume: 0.05});
            Prologo.music.play({
                loop: true
            });
            CargaDatos.jugadorZona = 'Sala helada';
            this.encuentroCombate = false;
        }

        if (zona == 20){
            this.sound.stopAll();
            CargaDatos.jugadorZona = 'Sala helada';
            this.encuentroCombate = false;
        }

        if (zona == 21 || zona == 23){
            if (zona == 21){
                this.sound.stopAll();
            }else if (zona == 23){
                Prologo.music = this.sound.add('outside_theme',{volume: MenuOptions.ambientSound/100+0.5});
                Prologo.music.play({
                    loop: true
                });
            }
            CargaDatos.jugadorZona = 'Gran montaña (zona izquierda)';
            this.encuentroCombate = false;
        }

        if (zona == 22 || zona == 24){
            if (zona == 22){
                this.sound.stopAll();
            } else if (zona == 24){
                Prologo.music = this.sound.add('outside_theme',{volume: MenuOptions.ambientSound/100+0.5});
                Prologo.music.play({
                    loop: true
                });
            }
            CargaDatos.jugadorZona = 'Gran montaña (zona derecha)';
            this.encuentroCombate = false;
        }
    }
    ///////////////////////////////////////////
    
    ///////////////////////////////////////////
    //COMPROBACIÓN DE ACTIVACIÓN DE COMBATE
    comprobacioncombate()
    {
        if (CargaDatos.jugadorZona != 'Sala volcánica' && CargaDatos.jugadorZona != 'Sala helada'){
            if (this.jugador.zona_Actual != 1 && this.jugador.zona_Actual != 2 && this.jugador.zona_Actual != 8){
                if (this.jugador.movimiento){
                    var n = Math.round(Math.random()*5);
                    console.log('Número: '+n);
                    if (n === 4){
                        this.activacombate();
                    } else {
                        this.encuentroCombate = true;
                    }
                } else {
                    this.encuentroCombate = true;
                }
            }
        } else {
            this.encuentroCombate = false;
        }
        
    }
    ///////////////////////////////////////////

    ///////////////////////////////////////////
    //CONTROL DE ACTIVACIÓN DE COMBATE
    activacombate()
    {
        CargaDatos.musicaDespuesCombate = false;
        Prologo.music.pause();
        Prologo.efectos = this.sound.add('encounter_effect',{volume: MenuOptions.effectsSound/100});
        Prologo.efectos.play({
            loop: false
        });
        this.jugador.jugador_mueve = false;
        this.encuentroCombate = true;
        const color = 0xd3d3d3; // Color grisáceo claro en formato hexadecimal
        const duracion = 250; // Duración del destello en ms
        this.cameras.main.flash(duracion, (color >> 16) & 0xff, (color >> 8) & 0xff, color & 0xff, false, (camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
            if (progress === 1) {
                this.activacionCombate+=1;
                if (this.activacionCombate <2){
                    const retraso = 200; // Retraso entre destellos en ms
                    this.time.delayedCall(retraso, this.activacombate, [], this);
                } else {
                        this.scene.pause();
                        this.scene.run(Constantes.ESCENAS.BATALLA);
                        this.activacionCombate = 0;
                        this.jugador.jugador_mueve = true;
                }
            }
        });
    }
    ///////////////////////////////////////////

    ///////////////////////////////////////////
    comprobarProximidadObjetos(){
        for (let i = 0; i < this.conjuntoObjetos.length; i++) {
            if (this.conjuntoObjetos[i].body != undefined){
                if ((Math.abs(this.jugador.body.x - this.conjuntoObjetos[i].body.x)) <= 20  && (Math.abs(this.jugador.body.y - this.conjuntoObjetos[i].body.y)) <= 20) {
                    Prologo.efectos = this.sound.add('save_effect',{volume: MenuOptions.effectsSound/100});
                    Prologo.efectos.play({
                        loop: false
                    });
                    this.jugador.jugador_mueve = false;
                    this.conjuntoObjetos[i].recogerObjeto();
                    CargaDatos.objetosRecogidos.push(this.conjuntoObjetos[i].numero);
                    this.conjuntoObjetos[i].visible = false;
                    this.conjuntoObjetos[i].destroy();

                    var eleccion = '';
                    var doble_eleccion = false;

                    if (this.conjuntoObjetos[i].tipo == 'ataque'){
                        eleccion = Constantes.MISCELANEOS.SUBIRATAQUE;
                    }

                    if (this.conjuntoObjetos[i].tipo == 'cura'){
                        eleccion = Constantes.MISCELANEOS.SUBIRCURAS;
                    }

                    if (this.conjuntoObjetos[i].tipo == 'ambos' || this.conjuntoObjetos[i].tipo == 'ambosx2'){
                        eleccion = Constantes.MISCELANEOS.SUBIRCURAS;
                        doble_eleccion = true;
                    }

                    this.imagenAMostrar = this.add.image(this.jugador.x, this.jugador.y-15, eleccion);
                    this.imagenAMostrar.setDepth(10);
                    this.imagenAMostrar.alpha = 0;
                    this.imagenAMostrar.scale = 0.5;
                    this.time.addEvent({delay: 100, callback: () => {
                        this.tweens.add({
                            targets: this.imagenAMostrar,
                            alpha: 1,
                            duration: 300,
                            onComplete: () => {
                                this.time.addEvent({delay: 500, callback: () => {
                                    this.tweens.add({
                                        targets: this.imagenAMostrar,
                                        alpha: 0,
                                        duration: 300,
                                        onComplete: () => {
                                            if (doble_eleccion){
                                                this.imagenAMostrar = this.add.image(this.jugador.x, this.jugador.y-15, Constantes.MISCELANEOS.SUBIRATAQUE);
                                                this.imagenAMostrar.setDepth(10);
                                                this.imagenAMostrar.alpha = 0;
                                                this.imagenAMostrar.scale = 0.5;
                                                this.tweens.add({
                                                    targets: this.imagenAMostrar,
                                                    alpha: 1,
                                                    duration: 300,
                                                    onComplete: () => {
                                                        this.time.addEvent({delay: 500, callback: () => {
                                                            this.tweens.add({
                                                                targets: this.imagenAMostrar,
                                                                alpha: 0,
                                                                duration: 300,
                                                                onComplete: () => {
                                                                    this.jugador.jugador_mueve = true;
                                                                }
                                                            });
                                                        }, callbackScope: this});
                                                    }
                                                });
                                            } else {
                                                this.jugador.jugador_mueve = true;
                                            }
                                        }
                                    });
                                }, callbackScope: this});
                            }
                        });
                    }, callbackScope: this});
                }
            }
        }

        for (let i = 0; i < Prologo.conjuntoGuardados.length; i++) {
            if ((Math.abs(this.jugador.body.x - Prologo.conjuntoGuardados[i].body.x)) <= 20  && (Math.abs(this.jugador.body.y - Prologo.conjuntoGuardados[i].body.y)) <= 20) {
                Prologo.efectos = this.sound.add('save_effect',{volume: MenuOptions.effectsSound/100});
                Prologo.efectos.play({
                    loop: false
                });
                CargaDatos.jugadorVida = CargaDatos.jugadorMaxVida;

                this.bd.datos.datosGuardados = true;
                this.bd.datos.musicaFondo = true;
                this.bd.datos.jugador.vida = CargaDatos.jugadorVida;
                this.bd.datos.jugador.vidaMax = CargaDatos.jugadorMaxVida;
                this.bd.datos.jugador.ataque = CargaDatos.jugadorAtaque;
                this.bd.datos.jugador.curacion = CargaDatos.jugadorCuracion;
                this.bd.datos.jugador.nivel = CargaDatos.jugadorNivel;
                this.bd.datos.jugador.experiencia = CargaDatos.jugadorExperiencia;
                this.bd.datos.jugador.experienciaMax = CargaDatos.jugadorExperienciaMax;
                this.bd.datos.zonaMapa = CargaDatos.jugadorZona;
                this.bd.datos.npcDerrotados = CargaDatos.npcDerrotados;
                this.bd.datos.eventosRealizados = CargaDatos.eventosRealizados;
                this.bd.datos.objetosRecogidos = CargaDatos.objetosRecogidos;
                this.bd.datos.posXJugador = this.jugador.x;
                this.bd.datos.posYJugador = this.jugador.y;

                this.bd.actualizarBD();
                var guardado = new Eventos({
                    escena: this,
                    x: 0,
                    y: 0,
                    textura: ''
                }, 'guardar');
                this.activarEvento(guardado, 500);
            }
        }
        this.teclaPulsada = true;
    }
    ///////////////////////////////////////////

    ///////////////////////////////////////////
    // COMBATE COLISION NPC
    combateNPC(){
        this.activacombate();
    }
    ///////////////////////////////////////////
    
    ///////////////////////////////////////////
    // CONTROL EVENTOS TEXTO
    activarEvento(evento: Eventos, tiempo: number){
        CargaDatos.jugadorEnEvento == false;
        this.jugador.jugador_mueve = false;
        CargaDatos.textoEventos = evento.identi;
        this.cameras.main.fadeOut(tiempo, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progreso: number) => {
            if (progreso == 1){
                this.jugador.jugador_mueve = true;
                this.scene.pause();
                this.scene.run(Constantes.ESCENAS.EVENTOTEXTO);
            }
        });
    }
    ///////////////////////////////////////////
}