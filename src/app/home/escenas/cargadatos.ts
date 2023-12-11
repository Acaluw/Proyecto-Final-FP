import Constantes from "../constantes";
import Phaser from "phaser";

export default class CargaDatos extends Phaser.Scene {

    private barraC!: Phaser.GameObjects.Graphics; //barra de carga
    //Las ! en las variables indican que ese valor no puede ser ni null ni undefined, siempre ha de tener un valor

    //
    // VARIABLE USADA PARA REPRODUCIR LA MÚSICA UNA VEZ FINALIZADO EL COMBATE
    //
    public static musicaDespuesCombate: boolean = false;
    //
    // DATOS REFERENTES AL JUGADOR
    //
    public static jugadorVida: number = 0;
    public static jugadorMaxVida: number = 0;
    public static jugadorAtaque: number = 0;
    public static jugadorExperiencia: number = 0;
    public static jugadorExperienciaMax: number = 0;
    public static jugadorNivel: number = 0;
    public static jugadorCuracion: number = 0;
    public static ultimaPosJugador: string = '';
    public static jugadorEnEvento: boolean = true;
    //
    // DATOS PARA CALCULAR LOS ENEMIGOS QUE EL JUGADOR ENCUENTRA
    //
    public static jugadorZona: string = '';

    public static jefeZonaIzq: boolean = false;
    public static jefeZonaDer: boolean = false;
    public static jefeOculto: boolean = false;
    //
    // DATOS REFERENTES A LOS COMBATES CONTRA NPCS
    //
    public static peleaNpc: string = 'nada';
    public static npcCombate: boolean = false;
    public static borrarNpc: boolean = false;
    public static npcDerrotados: Array<string> = [];
    public static jugadorPeleaNpc: boolean = false;
    public static combateInicial: boolean = true;
    //
    // DATOS REFERENTES A LA REALIZACIÓN DE EVENTOS
    //
    public static eventoActivo: boolean = false;
    public static eventoFinalizado: boolean = false;
    public static textoEventos: string = '';
    public static eventosRealizados: Array<string> = [];
    public static jugadorFinaliza: boolean = false;
    //
    // DATOS REFERENTES A LA RECOGIDA DE OBJETOS
    //
    public static objetosRecogidos: Array<string> = [];

    constructor() {
        super('CargaDatos');
    }

    preload() {
        this.cameras.main.setBackgroundColor(0x000000); //se configura la cámara
        this.creaBarras();
        console.log("Enviando mensaje al LOG del navegador");

        //Declaramos variables utilizadas en el evento load
        var barraP!: Phaser.GameObjects.Graphics; //barra de progreso
        var anchoCameras = this.cameras.main.width;
        var altoCameras = this.cameras.main.height;
        barraP = this.add.graphics();

        var textoCarga = this.make.text({
            x: anchoCameras / 2,
            y: altoCameras / 2 - 50,
            text: 'Cargando ...',
            style: {
                font: '20px monospace'
            }
        });
        textoCarga.setOrigin (0.5, 0.5);

        var porcentaje = this.make.text({
            x: anchoCameras / 2-30,
            y: altoCameras / 2,
            text: '0 %',
            style: {
                font: '20px monospace',
                fontStyle: ''
            }
        });

        //Listener mientras (PROGRESS) se cargan los assets. No usa función lambda
        this.load.on(
            'progress',
            function (value: number) {
                var p = (Math.round(value*100)).toString();
                porcentaje.setText(p + '%');
                barraP.clear();
                barraP.fillStyle(0xffffff, 0.4);
                barraP.fillRect(
                    anchoCameras / 4,
                    altoCameras / 2 - 16,
                    (anchoCameras / 2) * value, 
                    46);
            },
            this
        );
        

        //Listener cuando se hayan cargado (COMPLETE) todos los Assets. Usa función lambda
        this.load.on(
            'complete', () => {
                this.scene.start(Constantes.ESCENAS.MENU); 
            },

        );

        ///////////////////////////////////////////
        //CARGA DE ASSETS
        ///////////////////////////////////////////
        //
        // MAPEADO
        //
        this.load.tilemapTiledJSON(Constantes.MAPAS.PROLOGO.TILEMAPJSON, 'assets/mapas/Prologo/prologo.json');
        this.load.image(Constantes.MAPAS.TILESET, 'assets/mapas/Prologo/prologo.png');
        //
        // ELEMENTOS MENU
        //
        this.load.image(Constantes.ELEMENTOS_MENU.FONDO_MENU, 'assets/imagenes/menu/menu_back_bottom.png');
        this.load.image(Constantes.ELEMENTOS_MENU.ANIMACION_1, 'assets/imagenes/menu/menu_front_mountains.png');
        this.load.image(Constantes.ELEMENTOS_MENU.ANIMACION_2, 'assets/imagenes/menu/menu_back_mountains.png');
        this.load.image(Constantes.ELEMENTOS_MENU.AUTOR, 'assets/imagenes/menu/menu_bottom.png');
        this.load.image(Constantes.ELEMENTOS_MENU.TITULO_1, 'assets/imagenes/menu/menu_title1.png');
        this.load.image(Constantes.ELEMENTOS_MENU.TITULO_2, 'assets/imagenes/menu/menu_title2.png');
        this.load.image(Constantes.ELEMENTOS_MENU.BOTON_JUGAR, 'assets/imagenes/menu/menu_play.png');
        this.load.image(Constantes.ELEMENTOS_MENU.BOTON_OPCIONES, 'assets/imagenes/menu/menu_options.png');
        this.load.image(Constantes.ELEMENTOS_MENU.OPCIONES_TITULO, 'assets/imagenes/menu/menu_options_title.png');
        this.load.image(Constantes.ELEMENTOS_MENU.OPCIONES_CUADRO, 'assets/imagenes/menu/options_border.png');
        this.load.image(Constantes.ELEMENTOS_MENU.OPCIONES_FONDO, 'assets/imagenes/menu/options_background.png');
        this.load.image(Constantes.ELEMENTOS_MENU.OPCIONES_VOLVER, 'assets/imagenes/menu/menu_back.png');
        this.load.image(Constantes.ELEMENTOS_MENU.OPCIONES_VOL_AMBIENTE, 'assets/imagenes/menu/menu_ambientVol.png');
        this.load.image(Constantes.ELEMENTOS_MENU.OPCIONES_VOL_EFECTOS, 'assets/imagenes/menu/menu_effectsVol.png');
        this.load.atlas(Constantes.ELEMENTOS_MENU.OPCIONES_ATLAS_BOTONES, 'assets/imagenes/menu/spritesheetBtn.png', 'assets/imagenes/menu/spritesheetBtn.json');
        //
        //MISCELANEOS
        //
        this.load.image(Constantes.MISCELANEOS.HUECO, 'assets/imagenes/hueco.png');
        this.load.image(Constantes.MISCELANEOS.BATALLA_ESCENARIO, 'assets/imagenes/miscelaneo/batallaFondo.png');
        this.load.image(Constantes.MISCELANEOS.FLECHAS_AYUDA, 'assets/imagenes/miscelaneo/flechasAyuda.png');
        this.load.image(Constantes.MISCELANEOS.BARRA_ESPACIO, 'assets/imagenes/miscelaneo/barraEspacio.png');
        this.load.image(Constantes.MISCELANEOS.CORRER, 'assets/imagenes/miscelaneo/teclaX.png');
        this.load.atlas(Constantes.MISCELANEOS.OBJETO_TIPO1, 'assets/imagenes/miscelaneo/obj_variado1.png', 'assets/imagenes/miscelaneo/obj_variado1.json');
        this.load.atlas(Constantes.MISCELANEOS.OBJETO_TIPO2, 'assets/imagenes/miscelaneo/obj_variado2.png', 'assets/imagenes/miscelaneo/obj_variado2.json');
        this.load.image(Constantes.MISCELANEOS.SUBIRATAQUE, 'assets/imagenes/miscelaneo/ataque.png');
        this.load.image(Constantes.MISCELANEOS.SUBIRCURAS, 'assets/imagenes/miscelaneo/vida.png');
        this.load.atlas('guardar', 'assets/imagenes/miscelaneo/guardar.png', 'assets/imagenes/miscelaneo/guardar.json');
        //
        // AUDIOS
        //
        this.load.audio(Constantes.SONIDOS.MENU, 'assets/audio/menu_theme.mp3');
        this.load.audio('boss_theme', 'assets/audio/boss_theme.mp3');
        this.load.audio('boss_oculto_theme', 'assets/audio/boss_oculto_theme.mp3');
        this.load.audio('cave_theme', 'assets/audio/cave_theme.mp3');
        this.load.audio('cinemathic_theme', 'assets/audio/cinemathic_theme.mp3');
        this.load.audio('encounter_effect', 'assets/audio/encounter_effect.mp3');
        this.load.audio('enemy_theme', 'assets/audio/enemy_theme.mp3');
        this.load.audio('enemy2_theme', 'assets/audio/enemy2_theme.mp3');
        this.load.audio('outside_theme', 'assets/audio/outside_theme.mp3');
        this.load.audio('damage_effect', 'assets/audio/damage_effect.mp3');
        this.load.audio('save_effect', 'assets/audio/save_effect.wav');
        this.load.audio('subirnivel', 'assets/audio/subidanivel.mp3');
        this.load.audio('seleccion', 'assets/audio/seleccion.mp3');
        this.load.audio('curar', 'assets/audio/curar.mp3');
        this.load.audio('huida', 'assets/audio/huida.mp3');
        //
        // ATLAS JUGADOR
        //
        this.load.atlas(Constantes.JUGADOR.ID, 'assets/imagenes/jugador/spritesheet.png', 'assets/imagenes/jugador/spritesheet.json');
        //
        // NPCS ZONA 1
        //
        this.load.atlas('overworld00', 'assets/imagenes/enemigos/npcMundo/ZONA_1/overworld00.png', 'assets/imagenes/enemigos/npcMundo/ZONA_1/overworld00.json');
        this.load.atlas('overworld01', 'assets/imagenes/enemigos/npcMundo/ZONA_1/overworld01.png', 'assets/imagenes/enemigos/npcMundo/ZONA_1/overworld01.json');
        this.load.atlas('overworld02', 'assets/imagenes/enemigos/npcMundo/ZONA_1/overworld02.png', 'assets/imagenes/enemigos/npcMundo/ZONA_1/overworld02.json');
        this.load.atlas('overworld03', 'assets/imagenes/enemigos/npcMundo/ZONA_1/overworld03.png', 'assets/imagenes/enemigos/npcMundo/ZONA_1/overworld03.json');
        this.load.atlas('overworld04', 'assets/imagenes/enemigos/npcMundo/ZONA_1/overworld04.png', 'assets/imagenes/enemigos/npcMundo/ZONA_1/overworld04.json');
        //
        // NPCS ZONA 2
        //
        this.load.atlas('overworld05', 'assets/imagenes/enemigos/npcMundo/ZONA_2/overworld05.png', 'assets/imagenes/enemigos/npcMundo/ZONA_2/overworld05.json');
        this.load.atlas('overworld06', 'assets/imagenes/enemigos/npcMundo/ZONA_2/overworld06.png', 'assets/imagenes/enemigos/npcMundo/ZONA_2/overworld06.json');
        this.load.atlas('overworld07', 'assets/imagenes/enemigos/npcMundo/ZONA_2/overworld07.png', 'assets/imagenes/enemigos/npcMundo/ZONA_2/overworld07.json');
        this.load.atlas('overworld08', 'assets/imagenes/enemigos/npcMundo/ZONA_2/overworld08.png', 'assets/imagenes/enemigos/npcMundo/ZONA_2/overworld08.json');
        this.load.atlas('overworld09', 'assets/imagenes/enemigos/npcMundo/ZONA_2/overworld09.png', 'assets/imagenes/enemigos/npcMundo/ZONA_2/overworld09.json');
        //
        // NPCS BOSSES
        //
        this.load.atlas('npc_hielo', 'assets/imagenes/enemigos/npcMundo/BOSSES/boss_hielo.png', 'assets/imagenes/enemigos/npcMundo/BOSSES/boss_hielo.json');
        this.load.atlas('npc_fuego', 'assets/imagenes/enemigos/npcMundo/BOSSES/boss_fuego.png', 'assets/imagenes/enemigos/npcMundo/BOSSES/boss_fuego.json');
        this.load.atlas('npc_oculto', 'assets/imagenes/enemigos/npcMundo/BOSSES/boss_oculto.png', 'assets/imagenes/enemigos/npcMundo/BOSSES/boss_oculto.json');
        //
        // ENEMIGOS BATALLA ZONA 1
        //
        this.load.atlas('enemigo00', 'assets/imagenes/enemigos/enemigosZona/ZONA_1/enemigo00.png', 'assets/imagenes/enemigos/enemigosZona/ZONA_1/enemigo00.json');
        this.load.atlas('enemigo01', 'assets/imagenes/enemigos/enemigosZona/ZONA_1/enemigo01.png', 'assets/imagenes/enemigos/enemigosZona/ZONA_1/enemigo01.json');
        this.load.atlas('enemigo02', 'assets/imagenes/enemigos/enemigosZona/ZONA_1/enemigo02.png', 'assets/imagenes/enemigos/enemigosZona/ZONA_1/enemigo02.json');
        this.load.atlas('enemigo03', 'assets/imagenes/enemigos/enemigosZona/ZONA_1/enemigo03.png', 'assets/imagenes/enemigos/enemigosZona/ZONA_1/enemigo03.json');
        this.load.atlas('enemigo04', 'assets/imagenes/enemigos/enemigosZona/ZONA_1/enemigo04.png', 'assets/imagenes/enemigos/enemigosZona/ZONA_1/enemigo04.json');
        //
        // ENEMIGOS BATALLA ZONA 2
        //
        this.load.atlas('enemigo05', 'assets/imagenes/enemigos/enemigosZona/ZONA_2/enemigo05.png', 'assets/imagenes/enemigos/enemigosZona/ZONA_2/enemigo05.json');
        this.load.atlas('enemigo06', 'assets/imagenes/enemigos/enemigosZona/ZONA_2/enemigo06.png', 'assets/imagenes/enemigos/enemigosZona/ZONA_2/enemigo06.json');
        this.load.atlas('enemigo07', 'assets/imagenes/enemigos/enemigosZona/ZONA_2/enemigo07.png', 'assets/imagenes/enemigos/enemigosZona/ZONA_2/enemigo07.json');
        this.load.atlas('enemigo08', 'assets/imagenes/enemigos/enemigosZona/ZONA_2/enemigo08.png', 'assets/imagenes/enemigos/enemigosZona/ZONA_2/enemigo08.json');
        this.load.atlas('enemigo09', 'assets/imagenes/enemigos/enemigosZona/ZONA_2/enemigo09.png', 'assets/imagenes/enemigos/enemigosZona/ZONA_2/enemigo09.json');
        //
        // ENEMIGOS BOSSES
        //
        this.load.atlas('boss_hielo', 'assets/imagenes/enemigos/enemigosZona/BOSSES/enemigo_hielo.png', 'assets/imagenes/enemigos/enemigosZona/BOSSES/enemigo_hielo.json');
        this.load.atlas('boss_fuego', 'assets/imagenes/enemigos/enemigosZona/BOSSES/enemigo_fuego.png', 'assets/imagenes/enemigos/enemigosZona/BOSSES/enemigo_fuego.json');
        this.load.atlas('boss_oculto', 'assets/imagenes/enemigos/enemigosZona/BOSSES/enemigo_oculto.png', 'assets/imagenes/enemigos/enemigosZona/BOSSES/enemigo_oculto.json');
    }

    private creaBarras(): void {
        this.barraC = this.add.graphics();
        this.barraC.fillStyle(0x222222, 0.8);

        this.barraC.fillRect(
            this.cameras.main.width / 4 - 2, //x de rectángulo
            this.cameras.main.height / 2 - 18,//y de rectángulo
            this.cameras.main.width / 2 + 4, //ancho
            50 //alto
        );
    }

}