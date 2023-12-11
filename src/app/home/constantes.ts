//Se recomienda crear constantes para evitar problemas con los identificadores
//Muy importante: NO REPETIR NINGÚN literal
const Constantes = {
    TITULO:{
        TITLE: 'TITLE',
        BOTTOM: 'BOTTOM'
    },    
    ESCENAS:{
        CARGA: 'Carga',
        MENU: 'Menu',
        MENUOPTIONS: 'MenuOptions',
        PANTALLACARGA: 'PantallaCarga',
        PROLOGO: 'prologo',
        BATALLA: 'batalla',
        BATALLAINTERFAZ: 'batallaInterfaz',
        EVENTOTEXTO: 'eventosTexto',
        VICTORIA_DERROTA: 'victoria_derrota'
    },
    ELEMENTOS_MENU:{
        FONDO_MENU: 'menufondo',
        ANIMACION_1: 'menu_front_mountains',
        ANIMACION_2: 'menu_back_mountains',
        AUTOR: 'menu_bottom',
        TITULO_1: 'menu_title1',
        TITULO_2: 'menu_title2',
        BOTON_JUGAR: 'menu_play',
        BOTON_OPCIONES: 'menu_options',
        OPCIONES_TITULO: 'menu_options_title',
        OPCIONES_CUADRO: 'menu_options_border',
        OPCIONES_FONDO: 'menu_options_background',
        OPCIONES_VOLVER: 'menu_options_back',
        OPCIONES_VOL_EFECTOS: 'menu_effects_vol',
        OPCIONES_VOL_AMBIENTE: 'menu_ambient_vol',
        OPCIONES_ATLAS_BOTONES: 'menu_options_button'
    }, 
    MAPAS: {
        PROLOGO:{
            TILEMAPJSON: 'mitilemapjson',
            CAPAMAPEADO: 'capamapeado', //Nombre de capa en JSON
            CAPACOLISIONES: 'capacolisiones',
            CAPASUPERIOR: 'capasuperior'
        },
        TILESET:'prologo' //Nombre del tileset en JSON
    },
    MISCELANEOS:{
        HUECO: 'hueco',
        BATALLA_ESCENARIO: 'batallaEscenario',
        FLECHAS_AYUDA: 'flechasAyuda',
        BARRA_ESPACIO: 'barraEspacio',
        CORRER: 'correr',
        OBJETO_TIPO1: 'objeto1',
        OBJETO_TIPO2: 'objeto2',
        SUBIRATAQUE: 'subir_ataque',
        SUBIRCURAS: 'subir_cura'
    },
    JUGADOR:{
        ID: 'jugador',//Nombre de objeto en el tileset
        ANIMACION:{
            ESPERAR: 'esperar',
            ESPERARD: 'esperar_derecha',
            ESPERARI: 'esperar_izquierda',
            ESPERARA: 'esperar_arriba', 
            ANDAR_DERECHA: 'andar_right',
            ANDAR_IZQUIERDA: 'andar_left',
            ANDAR_ARRIBA: 'andar_up',
            ANDAR_ABAJO: 'andar_down'
        }
    },  
    SONIDOS:{
        MENU: 'menu_theme'
    },
    CONTROLES:{
        ID: 'ControlGamepad',
        IMAGEN: 'ControlIMG'
    },
    VERSION:{
        V: 'Beta 1.1'
    },
    BASEDATOS:{
        NOMBRE: 'basedatos'
    }
};
export default Constantes;