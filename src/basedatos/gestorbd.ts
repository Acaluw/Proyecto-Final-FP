import Constantes from "src/app/home/constantes";

export default class GestorBD {
    public datos: any;

    constructor(){
        const datosGuardados = localStorage.getItem(Constantes.BASEDATOS.NOMBRE);

        if (datosGuardados != null){
            this.datos = JSON.parse(datosGuardados);
        } else {
            this.crearBD();
        }
    }
    crearBD() {
        let bdinicial = {
            datosGuardados: false,
            musica: {
                volumenAmbiente: 0,
                volumenEfectos: 0,
                musicaFondo: false
            },
            jugador: {
                vida: 0,
                vidaMax: 0,
                ataque: 0,
                curacion: 0,
                nivel: 0,
                experiencia: 0,
                experienciaMax: 0
            },
            zonaMapa: '',
            objetosRecogidos: [] as string[],
            npcDerrotados: [] as string[],
            eventosRealizados: [] as string[],
            posXJugador: 0,
            posYJugador: 0
        }
        
        this.datos = bdinicial;
        localStorage.setItem(Constantes.BASEDATOS.NOMBRE, JSON.stringify(this.datos));
    }

    actualizarBD(){
        localStorage.setItem(Constantes.BASEDATOS.NOMBRE, JSON.stringify(this.datos));
    }
}