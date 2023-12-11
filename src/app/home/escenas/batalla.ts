import Constantes from "../constantes";
import Mensaje from "../gameobjects/Mensaje";
import MensajeInformacion from "../gameobjects/MensajeInformacion";
import EnemigosPrologo from "../gameobjects/enemigosPrologo";
import JugadorCombatePrologo from "../gameobjects/jugadorCombatePrologo";
import MenuOptions from "./MenuOptions";
import CargaDatos from "./cargadatos";

export default class Batalla extends Phaser.Scene {
    public static music: any;
    public static efectos: any;

    ancho: number = 0;
    alto: number = 0;

    public indice: number = -1;
    public static tipo: string;
    private teclaEspacio!: Phaser.Input.Keyboard.Key;
    jugador!: JugadorCombatePrologo;
    //
    // Las siguientes variables booleanas han sido declaradas para controlar la ejecución de código, de modo que se evita una
    // llamada múltiple del mismo código.
    //
    jugadorAtacar: boolean = true;
    jugadorCooldown: boolean = false;
    jugadorCurar: boolean = true;

    condicionHuir: boolean = true;

    enemigoAtacar: boolean = false;

    infoAbierta: boolean = false;
    //
    enemigo!: EnemigosPrologo;
    enemigoExiste!: boolean;

    jugadorArray: JugadorCombatePrologo[] = [];
    enemigoArray: EnemigosPrologo[] = [];
    unidades: JugadorCombatePrologo[] = [];
    
    contenedorInformacion: Phaser.GameObjects.Container | undefined;
    contenedorBaseVida: Phaser.GameObjects.Graphics | undefined;
    
    contenedorVidaJugador: Phaser.GameObjects.Graphics | undefined;
    contenedorVidaEnemigo: Phaser.GameObjects.Graphics | undefined;
    fondoCuadros: Phaser.GameObjects.Graphics | undefined;

    cuadroInformacion: Phaser.GameObjects.Graphics | undefined;
    contenedorCuadroInformacion: Phaser.GameObjects.Container | undefined;

    informacionJugador!: Mensaje;
    informacionEnemigo!: Mensaje;

    informacionCombate!: Mensaje;
    infoCombateMensaje_1: string = '';
    infoCombateMensaje_2: string = '';
    infoCombateMensaje_3: string = '';
    infoCombateMensaje_4: string = '';

    nombreJugador: string | undefined;
    
    public static vidaMaxEnemigo: number;
    public static vidaMaxJugador: number;
    noHuida: boolean = true;

    constructor() {
        super(Constantes.ESCENAS.BATALLA);
    }

    create() //Crea la escena de batalla
    {
        this.ancho = this.sys.canvas.width
        this.alto = this.sys.canvas.height;
        this.teclaEspacio = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //
        // Declaramos el fondo del escenario.
        //
        const fondo = this.add.image(this.ancho/2, this.alto/2 , 'batallaEscenario');
        fondo.setTint(0x2e3264)
        fondo.scale = 2;
        //
        // Obtenemos cuál será el Enemigo a combatir.
        //
        this.enemigoExiste = true;
        var nombreSprite = '';

        if (CargaDatos.jefeZonaIzq == true){
            nombreSprite = 'boss_hielo';
            Batalla.music = this.sound.add('boss_theme',{volume: MenuOptions.ambientSound/100+0.5});
        } else if (CargaDatos.jefeZonaDer == true){
            nombreSprite = 'boss_fuego';
            Batalla.music = this.sound.add('boss_theme',{volume: MenuOptions.ambientSound/100+0.5});
        } else if (CargaDatos.jefeOculto == true){
            nombreSprite = 'boss_oculto';
            Batalla.music = this.sound.add('boss_oculto_theme',{volume: MenuOptions.ambientSound/100});
        } else {
            if (CargaDatos.peleaNpc != 'nada'){
                if (CargaDatos.peleaNpc == 'inicio'){
                    nombreSprite = 'enemigo00';
                    Batalla.music = this.sound.add('enemy_theme',{volume: 0.15});
                    CargaDatos.peleaNpc = 'nada';
                    CargaDatos.combateInicial = true;
                    CargaDatos.eventoFinalizado = true;
                    CargaDatos.textoEventos = 'combate';
                }else {
                    nombreSprite = CargaDatos.peleaNpc;
                    if (CargaDatos.jugadorZona == 'Cueva Subterránea P-2'){
                        Batalla.music = this.sound.add('enemy_theme',{volume: 0.15});
                    } else if (CargaDatos.jugadorZona == 'Cueva Subterránea P-1'){
                        Batalla.music = this.sound.add('enemy2_theme',{volume: 0.25});
                    }
                }
            }else {
                if (CargaDatos.jugadorZona == 'Cueva Subterránea P-2'){
                    var aparicionEnemigo = Math.round(Math.random()* 4);
                    nombreSprite = 'enemigo0'+aparicionEnemigo;
                    Batalla.music = this.sound.add('enemy_theme',{volume: 0.15});
                } else if (CargaDatos.jugadorZona == 'Cueva Subterránea P-1'){
                    var aparicionEnemigo = Math.floor(Math.random() * 5) + 5;
                    nombreSprite = 'enemigo0'+aparicionEnemigo;
                    Batalla.music = this.sound.add('enemy2_theme',{volume: 0.25});
                }
            }
        }
        //
        // Declaramos la entidad del Jugador
        //
        this.jugador = new JugadorCombatePrologo(this, 100, this.alto-50, Constantes.JUGADOR.ID, 1, 'Goldie', CargaDatos.jugadorVida, CargaDatos.jugadorAtaque);
        this.jugador.scale = 0.5;
        this.add.existing(this.jugador);
        //
        // Declaramos la entidad del Enemigo
        //
        this.enemigo = new EnemigosPrologo(this, this.ancho/2+150, this.alto/3, nombreSprite, 1, nombreSprite, 0, 0);
        this.enemigo.scale= 2;
        this.add.existing(this.enemigo);
        //
        this.jugadorArray = [this.jugador];
        this.enemigoArray = [this.enemigo];
        //
        // Agrupamos las entidades en una sola array, con la que se operará más adelante.
        //
        this.unidades = this.jugadorArray.concat(this.enemigoArray);
        //
        // Variables correspondientes a la vida total de jugador y enemigo, usadas como informacion
        // y para calculos de actualizacion de informacion
        //
        Batalla.vidaMaxEnemigo = EnemigosPrologo.maxVida;
        this.nombreJugador = JugadorCombatePrologo.tipo.toString();
        Batalla.vidaMaxJugador = JugadorCombatePrologo.maxVida;
        //
        // Contenedor Base Vida -> Fondo de barra de vida de Jugador y Enemigo
        //
        this.contenedorBaseVida = this.add.graphics();
        this.contenedorBaseVida.lineStyle(1, 0x222222, 0.8);
        this.contenedorBaseVida.fillStyle(0xffffff, 1);
        //
        // Fondo de los diversos apartados
        //
        this.fondoCuadros = this.add.graphics();
        this.fondoCuadros.lineStyle(1, 0xffffff);
        this.fondoCuadros.fillStyle(0x181919, 0.7);
        //
        // Cuadro de opciones de combate de jugador
        //
        this.fondoCuadros.strokeRect(85, 70, 105, 1);
        this.fondoCuadros.strokeRect(8, 10, (this.ancho/2)-133, 385);
        this.fondoCuadros.fillRect(8, 11, (this.ancho/2)-135, 384);
        //
        // Cuadro información Jugador
        //
        this.fondoCuadros.strokeRect(8,this.alto-200, (this.ancho/2)-133, this.alto/4+40);
        this.fondoCuadros.fillRect(8, this.alto-199, (this.ancho/2)-135, this.alto/4+39);
        //
        // Cuadro de mensajes de batalla
        //
        this.fondoCuadros.strokeRect((this.ancho/2)-120, this.alto-200, (this.ancho/2)+112, this.alto/4+40);
        this.fondoCuadros.fillRect((this.ancho/2)-120, this.alto-199, (this.ancho/2)+110, this.alto/4+39);
        //
        // Apartado información Enemigo
        //
        this.fondoCuadros.strokeRect((this.ancho/2)-120, 10, (this.ancho/2)+112, 60);
        this.fondoCuadros.fillRect((this.ancho/2)-119, 11, (this.ancho/2)+110, 59);
        //
        // Contenedor Base Vida de Enemigo
        //
        this.contenedorBaseVida.strokeRect((this.ancho/2)+170, 30, 175, 25);
        this.contenedorBaseVida.fillRect((this.ancho/2)+171, 31, 173, 24);
        //
        // Contenedor Base Vida de Jugador
        //
        this.contenedorBaseVida.strokeRect(83, this.alto-56, 175, 25);
        this.contenedorBaseVida.fillRect(84, this.alto-55, 173, 24);
        //
        // Contenedor Vida Jugador (Inicio de combate)
        //
        this.contenedorVidaJugador = this.add.graphics();
        //
        // Contenedor Vida Enemigo (Inicio de combate)
        //
        this.contenedorVidaEnemigo = this.add.graphics();
        //
        // Contenedor Informacion -> Muestra nombre y cantidad de vida de Jugador y Enemigo en formato texto
        //
        this.contenedorInformacion = this.add.container();
        //
        // Llamámos al método para insertar toda la información referente al Jugador y Enemigo
        //
        this.actualizarInformacion();
        //
        // Lanzamos en conjunto a esta escena, la escena interfaz, donde se encuentra el menú de ataque
        // y otros elementos gráficos
        //
        this.cameras.main.fadeIn(700, 0, 0, 0, (camera: Phaser.Cameras.Scene2D.Camera, progreso: number) => {
            if (progreso == 1){
                Batalla.music.play({
                    loop: true
                });
            }
        });
        this.scene.run(Constantes.ESCENAS.BATALLAINTERFAZ);
    }

    override update() {//Se ejecuta cada x milisegundos
        if (this.enemigoExiste){
            this.enemigo.update();
        }
    }
    //
    // Método que es llamado después de una acción realizada, ya sea por el Jugador o por el Enemigo.
    //
    public siguienteTurno(){
        //
        // Primero comprobamos el estado de Jugador y Enemigo (Comprobamos la cantidad de vida de cada uno).
        //
        if (this.comprobarFinalBatalla()){
            // En caso de que uno de ellos sea derrotado, se llamará al método finalizarBatalla.
            this.time.addEvent({delay: 1500, callback: this.finalizarBatalla, callbackScope: this});
            return;
        }
        // Aumentaremos el índice, el cuál permite saber a quien corresponderá el turno (0=Jugador, 1=Enemigo).
        this.indice++;
        // En el caso en que el Enemigo haya sido el último en atacar, reestablecemos el índice a 0.
        if (this.indice >= this.unidades.length){
            this.indice = 0;
        }
        // A continuación, comprobamos a quién corresponde la posición indicada por el índice.
        if (this.unidades[this.indice]){
            //Si es el turno de Jugador
            if (this.unidades[this.indice] instanceof JugadorCombatePrologo){
                //
                // Comprobamos si el jugador está en estado de descanso (Ha realizado un ataque cargado).
                //
                if (this.jugadorCooldown){
                    // En caso de estar en descanso, notificaremos a través del cuadro de mensajes de lo que está sucediendo.
                    this.actualizarMensajesSistema('Goldie necesita descansar 1 turno.');
                    // Además, desactivamos el estado de descanso para que el Jugador, después de recibir otro ataque,
                    // pueda volver a atacar (Patrón = AtaqueCargado - AtaqueEnemigo - Descanso - AtaqueEnemigo - AtaqueJugador)
                    this.jugadorCooldown = false;
                    this.enemigoAtacar = true;
                    this.actualizarInformacion();
                    //Añadimos un evento de tiempo para el siguiente turno
                    this.time.addEvent({delay: 1500, callback: this.siguienteTurno, callbackScope: this});
                } else {
                    // Por el contrario, si el jugador no está en estado de descanso, activamos las variables
                    // correspondientes a sus acciones y lo activaremos como unidad activa*.
                    // 
                    // Unidad activa: Referido a la entidad de Jugador o Enemigo.
                    this.jugadorAtacar = true;
                    this.jugadorCurar = true;
                    if (this.infoCombateMensaje_1 != 'Turno de Goldie.'){
                        this.actualizarMensajesSistema('Turno de Goldie.');
                        this.actualizarInformacion();
                    }
                    this.noHuida = true;
                    
                    this.events.emit('JugadorSeleccionado', this.indice);
                }
            } else{
                //Si es el turno de Enemigo, haremos que este ataque.
                if (this.enemigoAtacar){
                    this.unidades[this.indice].atacar(this.unidades[0]);
                    // Notificaremos a través del cuadro de mensajes de lo que está sucediendo.
                    this.actualizarMensajesSistema(this.enemigo.nombre+' ataca a Goldie (-'+this.enemigo.ataque+' PS)');
                    this.enemigoAtacar = false;
                    this.actualizarInformacion();
                    // Haremos que, cuando se llame al siguienteTurno, el turno corresponda al Jugador
                    this.indice = 2;
                }
                //Añadimos un evento de tiempo para el siguiente turno
                this.time.addEvent({delay: 1500, callback: this.siguienteTurno, callbackScope: this});
            }
        }
    }
    //
    // Método que es llamado una vez seleccionamos una de las opciones del menú de ataque del Jugador.
    //
    recibirSeleccion(accion: any){
        //
        // Acción ATAQUE BÁSICO: Permite al Jugador atacar al Enemigo.
        //
        if (accion == 'Ataque básico' && this.jugadorAtacar){
            Batalla.efectos = this.sound.add('damage_effect',{volume: 1});
                Batalla.efectos.play({
                    loop: false
            });
            // LLamaremos al método de atacar, indicando la entidad a atacar.
            this.unidades[this.indice].atacar(this.unidades[1]);
            this.jugadorAtacar = false;
            // Notificaremos a través del cuadro de mensajes de lo que está sucediendo.
            this.actualizarMensajesSistema('Goldie ataca a '+this.enemigo.nombre+' (-'+CargaDatos.jugadorAtaque+' PS)');
            this.enemigoAtacar = true;
            this.actualizarInformacion();
            //Añadimos un evento de tiempo para el siguiente turno
            this.time.addEvent({delay: 1500, callback: this.siguienteTurno, callbackScope: this});
        //
        // Acción ATAQUE CARGADO: Permite al Jugador hacer más daño, pero deberá descansar un turno.
        //
        } else if(accion == 'Ataque cargado' && this.jugadorAtacar){
            Batalla.efectos = this.sound.add('damage_effect',{volume: 1});
                Batalla.efectos.play({
                    loop: false
            });
            // LLamaremos al método de atacar, indicando la entidad a atacar.
            this.unidades[this.indice].atacarCargado(this.unidades[1]);
            this.jugadorAtacar = false;
            // Notificaremos a través del cuadro de mensajes de lo que está sucediendo.
            this.actualizarMensajesSistema('Goldie ataca a '+this.enemigo.nombre+' (-'+(CargaDatos.jugadorAtaque+3)+' PS)');
            this.enemigoAtacar = true;
            this.actualizarInformacion();
            // Debido a que el Jugador deberá descansar del ataque cargado, activaremos la variable responsable de esta condición.
            this.jugadorCooldown = true;
            //Añadimos un evento de tiempo para el siguiente turno
            this.time.addEvent({delay: 1500, callback: this.siguienteTurno, callbackScope: this});
        //
        // Acción CURACIÓN: Permite al Jugador regenerar vida
        //
        } else if (accion == 'Curación'){
            //
            // Comprobamos si el jugador tiene objetos curativos
            //
            if (CargaDatos.jugadorCuracion > 0){
                //
                // Comprobamos si el jugador tiene la vida al máximo
                //
                if (this.jugador.vida == CargaDatos.jugadorMaxVida && this.jugadorCurar){
                    //
                    // En caso de estar al máximo, lo notificamos por el cuadro de mensajes y le devolvemos el turno
                    //
                    this.actualizarMensajesSistema('Vida máxima alcanzada.');
                    this.actualizarInformacion();
                    this.indice = 2;
                    //Añadimos un evento de tiempo para el siguiente turno
                    this.time.addEvent({delay: 500, callback: this.siguienteTurno, callbackScope: this});
                //
                // En caso de no tener la vida al máximo, procedemos a curar al Jugador
                //
                }else if(this.jugador.vida < CargaDatos.jugadorMaxVida && this.jugadorCurar){
                    //
                    // Primero comprobamos si la cantidad a recuperar + la vida del Jugador supera el máximo de vida.
                    // De ser así, regeneraremos hasta el máximo.
                    //
                    var curacion = 0;
                    if (CargaDatos.jugadorNivel == 1){
                        curacion = 5;
                    } else {
                        curacion = (CargaDatos.jugadorNivel*5)-3;
                    }
                    if ((this.jugador.vida+curacion) >= CargaDatos.jugadorMaxVida && this.jugadorCurar){
                        this.jugadorCurar = false;
                        this.jugador.vida = CargaDatos.jugadorMaxVida;
                    //
                    // En el caso de que al regenerar vida no supere el máximo de esta, recuperará la cantidad asignada (5).
                    //
                    } else {
                        if (this.jugadorCurar){
                            this.jugadorCurar = false;
                            this.jugador.vida += curacion;
                        }
                    }
                    //
                    // Restaremos el objeto usado y actualizaremos el cuadro de mensajes con la información.
                    // Además, pasaremos el turno al enemigo.
                    //
                    CargaDatos.jugadorCuracion-=1;
                    this.enemigoAtacar = true;
                    this.actualizarMensajesSistema('Goldie recupera vida.');
                    this.actualizarInformacion();
                    Batalla.efectos = this.sound.add('curar',{volume: MenuOptions.effectsSound/100});
                    Batalla.efectos.play({
                        loop: false
                    });
                    //Añadimos un evento de tiempo para el siguiente turno
                    this.time.addEvent({delay: 1500, callback: this.siguienteTurno, callbackScope: this});
                }
            //
            // En caso de no tener objetos curativos, le informamos al Jugador de ello y le devolvemos el turno.
            //
            } else {
                this.actualizarMensajesSistema('No quedan objetos curativos.');
                this.actualizarInformacion();
                this.indice = 2;
                //Añadimos un evento de tiempo para el siguiente turno
                this.time.addEvent({delay: 500, callback: this.siguienteTurno, callbackScope: this});
            }
        //
        // Acción INFORMACIÓN: Nos dará detalles del resto de acciones, así como de los controles.
        //
        } else if(accion == 'Información' && !this.infoAbierta){
            //
            // Creamos el cuadro donde aparecerá la información
            //
            this.cuadroInformacion = this.add.graphics();
            this.cuadroInformacion.lineStyle(5, 0xffffff, 1);
            this.cuadroInformacion.fillStyle(0x545454, 1);
            this.cuadroInformacion.strokeRect((this.ancho/2)-120, 12, (this.ancho/2)+115, this.alto-24);
            this.cuadroInformacion.fillRect((this.ancho/2)-120, 13, (this.ancho/2)+114, this.alto-25);
            //
            // Añadimos los elementos necesarios al cuadro
            //
            const flechas = this.add.image((this.ancho/2)-50, 60, 'flechasAyuda');
            flechas.scale = 0.4;
            const barraEspacio = this.add.image((this.ancho/2)-22, 173, 'barraEspacio');
            barraEspacio.scale = 0.05;
            //
            // Creamos el contenedor que almacenará toda información escrita.
            //
            this.contenedorCuadroInformacion = this.add.container();
            // Añadimos toda la información necesaria.
            this.contenedorCuadroInformacion.add( 
                new MensajeInformacion(
                    this.ancho/2+10,
                    25,
                    'Utiliza las flechas direccionales para\ndesplazarte por el entorno.',
                    16,
                    'monospace',
                    'left',
                    this)
            );
            this.contenedorCuadroInformacion.add(
                new MensajeInformacion(
                    this.ancho/2+10,
                    80,
                    'Utiliza las flechas \'Arriba\' o \'Abajo\'',
                    16,
                    'monospace',
                    'left',
                    this
                )
            );
            this.contenedorCuadroInformacion.add(
                new MensajeInformacion(
                    this.ancho/2-115,
                    100,
                    'dentro de combate para seleccionar las diversas\nopciones de combate.',
                    16,
                    'monospace',
                    'left',
                    this
                )
            );
            this.contenedorCuadroInformacion.add(
                new MensajeInformacion(
                    this.ancho/2+65,
                    175,
                    'Utiliza la barra espaciadora',
                    16,
                    'monospace',
                    'left',
                    this
                )
            );
            this.contenedorCuadroInformacion.add(
                new MensajeInformacion(
                    this.ancho/2-115,
                    190,
                    'para interactuar con el entorno. Dentro de combate,\nutiliza la barra espaciadora para confirmar la\nopción seleccionada en el menú de acciones.',
                    16,
                    'monospace',
                    'left',
                    this
                )
            );
            this.contenedorCuadroInformacion.add(
                new MensajeInformacion(
                    this.ancho/2-115,
                    this.alto/2,
                    'Opciones de combate:\n\n'+
                    '- Ataque básico: Inflige un leve daño al enemigo.\n\n'+
                    '- Ataque cargado: Inflige mayor daño al enemigo.\nGoldie deberá descansar un turno tras este ataque.\n\n'+
                    '- Curación: Permite a Goldie recuperar vida siempre\ny cuando posea objetos curativos en el inventario.\n\n'+
                    '- Huir: Permite a Goldie escapar del combate.',
                    16,
                    'monospace',
                    'left',
                    this
                )
            );
            this.contenedorCuadroInformacion.add(
                new MensajeInformacion(
                    this.ancho/2-70,
                    this.alto-40,
                    'Pulsa (Barra Espaciadora) para cerrar la información.',
                    12,
                    'monospace',
                    'left',
                    this
                )
            );
            // Indicamos que el cuadro de información está activo.
            this.infoAbierta = true;
            // Controlamos si el usuario quiere cerrar el cuadro de información.
            this.input.keyboard.once('keydown-SPACE', () => {
                if (this.infoAbierta){
                    // Si se quiere cerrar el cuadro de información, eliminamos todos los elementos
                    // correspondientes a dicho cuadro.
                    this.cuadroInformacion?.destroy();
                    this.contenedorCuadroInformacion?.removeAll(true);
                    this.contenedorCuadroInformacion?.destroy();
                    flechas.destroy();
                    barraEspacio.destroy();
                    this.infoAbierta = false;
                    this.indice = 2;
                    //Añadimos un evento de tiempo para el siguiente turno
                    this.time.addEvent({delay: 100, callback: this.siguienteTurno, callbackScope: this});
                }
            });
        //
        // Acción HUIR: Nos permite huir del combate, siempre y cuando las probabilidades lo permitan.
        //
        } else if (accion == 'Huir'){
            // Poner condición porcentual que permita o no huir de combate
            if (CargaDatos.jefeOculto == true || CargaDatos.jefeZonaDer == true || CargaDatos.jefeZonaIzq == true){
                if (this.noHuida == true){
                    this.noHuida = false;
                    this.actualizarMensajesSistema('¡No puedes huir del combate!');
                    this.actualizarInformacion();
                    this.indice = 2;
                    //Añadimos un evento de tiempo para el siguiente turno
                    this.time.addEvent({delay: 500, callback: this.siguienteTurno, callbackScope: this});
                }
            }else {
                if (this.condicionHuir){
                    //
                    // En caso de poder Huir, notificamos al Jugador por el cuadro de mensajes.
                    //
                    this.actualizarMensajesSistema('Has huido del combate.');
                    this.actualizarInformacion();
                    this.condicionHuir = false;
                    Batalla.efectos = this.sound.add('huida',{volume: MenuOptions.effectsSound/100});
                    Batalla.efectos.play({
                        loop: false
                    });
                }
                //Añadimos un evento de tiempo para el siguiente turno
                this.time.addEvent({delay: 1000, callback: this.huirBatalla, callbackScope: this});
            }
        }
    }
    //
    // Método que nos permite añadir la respectiva información al cuadro de mensajes
    //
    actualizarMensajesSistema(mensaje: string){
        this.infoCombateMensaje_4 = this.infoCombateMensaje_3;
        this.infoCombateMensaje_3 = this.infoCombateMensaje_2;
        this.infoCombateMensaje_2 = this.infoCombateMensaje_1;
        this.infoCombateMensaje_1 = mensaje;
    }
    //
    // Método utilizado para limpiar el cuadro de mensajes una vez finalizado el combate
    // (Utilizado en el método finalizarBatalla)
    //
    limpiarMensajes(){
        this.infoCombateMensaje_1 = '';
        this.infoCombateMensaje_2 = '';
        this.infoCombateMensaje_3 = '';
        this.infoCombateMensaje_4 = '';
        this.actualizarInformacion();
    }
    //
    // Método utilizado a modo de update manual (No se actualiza de forma infinita, si no cada vez que se llama)
    // Se utiliza para actualizar los mensajes de batalla y las vidas del Jugador y Enemigo
    //
    actualizarInformacion(){
        //
        // Actualizo contenedor de vida de Jugador
        //
        this.contenedorVidaJugador?.destroy();

        var jugadorVidaPorcentaje = (this.jugador.vida*100)/CargaDatos.jugadorMaxVida;
        var ajusteVidaJugador = (jugadorVidaPorcentaje*169)/100;

        this.contenedorVidaJugador = this.add.graphics();
        //
        // Rellenaremos el contenedor de un color u otro dependiendo del porcentaje de vida de Jugador
        //
        if (this.jugador.vida <= Math.round(CargaDatos.jugadorMaxVida/3)){
            // Poca vida => Rojo
            this.contenedorVidaJugador.fillStyle(0xC84646, 1); 
        } else if (this.jugador.vida <= Math.round(CargaDatos.jugadorMaxVida/2)){
            // Media vida => Amarillo
            this.contenedorVidaJugador.fillStyle(0xC8C846, 1);  
        } else {
            // Resto de casos => Verde
            this.contenedorVidaJugador.fillStyle(0x42855B, 1);
        }
        this.contenedorVidaJugador.fillRect(86, this.alto-53, ajusteVidaJugador, 20);
        //
        // Actualizo contenedor de vida de Enemigo
        //
        this.contenedorVidaEnemigo?.destroy();
        
        var enemigoVidaPorcentaje = (this.enemigo.vida*100)/Batalla.vidaMaxEnemigo;
        var ajusteVidaEnemigo = (enemigoVidaPorcentaje*169)/100; 
        
        this.contenedorVidaEnemigo = this.add.graphics();
        //
        // Rellenaremos el contenedor de un color u otro dependiendo del porcentaje de vida de Enemigo
        //
        if (this.enemigo.vida <= Math.round(Batalla.vidaMaxEnemigo/3)){
            // Poca vida => Rojo
            this.contenedorVidaEnemigo.fillStyle(0xC84646, 1);
        } else if (this.enemigo.vida <= Math.round(Batalla.vidaMaxEnemigo/2)){
            // Media vida => Amarillo
            this.contenedorVidaEnemigo.fillStyle(0xC8C846, 1);
        } else {
            //Resto de casos => Verde
            this.contenedorVidaEnemigo.fillStyle(0x42855B, 1);
        }
        this.contenedorVidaEnemigo.fillRect((this.ancho/2)+173, 33, ajusteVidaEnemigo, 20);
        //
        // Elimino de pantalla toda informacion referente a Jugador y Enemigo
        //
        this.contenedorInformacion?.removeAll(true);
        this.contenedorInformacion?.destroy();
        this.contenedorInformacion = this.add.container();
        this.contenedorInformacion.add( new Mensaje(80, 50, 'ACCIONES', this) );
        //
        // Actualizo información de Jugador
        //
        this.informacionJugador = new Mensaje (10, this.alto-190, 'Goldie', this);
        this.contenedorInformacion.add(this.informacionJugador);
        this.informacionJugador = new Mensaje (10, this.alto-155, 'Nivel: '+CargaDatos.jugadorNivel+'\nExperiencia: '+CargaDatos.jugadorExperiencia+'/'+CargaDatos.jugadorExperienciaMax, this);
        this.contenedorInformacion.add(this.informacionJugador);
        this.informacionJugador = new Mensaje (10, this.alto-95, 'Objetos curativos\tx'+CargaDatos.jugadorCuracion, this);
        this.contenedorInformacion.add(this.informacionJugador);
        this.informacionJugador = new Mensaje (10, this.alto-51, 'PS\t\t\t\t\t\t\t\t'+this.jugador.vida+'/'+Batalla.vidaMaxJugador, this);
        this.contenedorInformacion.add(this.informacionJugador);
        //
        // Actualizo información de Enemigo
        //
        this.informacionEnemigo = new Mensaje ((this.ancho/2)-80, 35, this.enemigo.nombre, this);
        this.contenedorInformacion?.add(this.informacionEnemigo);
        this.informacionEnemigo = new Mensaje((this.ancho/2)+110, 35, 'PS\t\t\t\t\t\t\t'+this.enemigo.vida+'/'+Batalla.vidaMaxEnemigo, this);
        this.contenedorInformacion?.add(this.informacionEnemigo);
        //
        // Mensajes del sistema/combate (4 mensajes mostrados en pantalla, ha modo de recopilación de movimientos)
        //
        // Mensaje inferior
        this.informacionCombate = new Mensaje ((this.ancho/2)-110, this.alto-50, this.infoCombateMensaje_1, this);
        this.contenedorInformacion?.add(this.informacionCombate);
        // Mensaje intermedio inferior
        this.informacionCombate = new Mensaje ((this.ancho/2)-110, this.alto-90, this.infoCombateMensaje_2, this);
        this.contenedorInformacion?.add(this.informacionCombate);
        // Mensaje intermedio superior
        this.informacionCombate = new Mensaje ((this.ancho/2)-110, this.alto-130, this.infoCombateMensaje_3, this);
        this.contenedorInformacion?.add(this.informacionCombate);
        // Mensaje superior
        this.informacionCombate = new Mensaje ((this.ancho/2)-110, this.alto-170, this.infoCombateMensaje_4, this);
        this.contenedorInformacion?.add(this.informacionCombate);
    }
    //
    // Método utilizado al principio del método siguienteTurno. Comprueba si las vida de Jugador y/o Enemigo llegan a 0.
    // De este modo, determinamos si hay una victoria o una derrota.
    //
    comprobarFinalBatalla(){
        var victoria = true;
        var derrota = true;
        //
        // Primero analizamos si el Enemigo sigue con vida.
        //
        for (var i = 0; i < this.enemigoArray.length; i++){
            if(this.enemigoArray[0].tieneVida){
                victoria = false;
            } else {
                this.actualizarMensajesSistema('Enemigo derrotado. Ganas EXP');
                CargaDatos.jugadorExperiencia += this.enemigoArray[0].experiencia;
                CargaDatos.borrarNpc = true;
                this.actualizarInformacion();

                if (CargaDatos.jefeOculto == true){
                    CargaDatos.jefeOculto = false;
                    this.actualizarMensajesSistema('¡Has obtenido x10 curas!');
                    CargaDatos.jugadorCuracion += 10;
                    this.actualizarInformacion();
                }

                while (CargaDatos.jugadorExperiencia >= CargaDatos.jugadorExperienciaMax){
                    var restante = CargaDatos.jugadorExperiencia-CargaDatos.jugadorExperienciaMax;
                    CargaDatos.jugadorNivel++;
                    CargaDatos.jugadorExperiencia = restante;
                    CargaDatos.jugadorMaxVida+=3;
                    CargaDatos.jugadorExperienciaMax+=5;
                    Batalla.vidaMaxJugador = CargaDatos.jugadorMaxVida;
                    this.actualizarMensajesSistema('¡Has subido de nivel!');
                    this.actualizarInformacion();
                    Batalla.efectos = this.sound.add('subirnivel',{volume: MenuOptions.effectsSound/100});
                    this.time.addEvent({delay: 1000, callback: () => {
                        Batalla.efectos.play({
                            loop: false
                        });
                    }})
                }
                this.actualizarInformacion();
            }
        }
        //
        // Después analizamos si el Jugador sigue con vida.
        //
        for (var i = 0; i < this.jugadorArray.length; i++){
            if(this.jugadorArray[0].tieneVida){
                derrota = false;
            }
        }

        return victoria || derrota;
    }
    //
    // En caso de que el método comprobarFinalBatalla devuelva True, se utilizará
    // este método para finalizar la batalla.
    //
    finalizarBatalla(){
        //
        // Bajamos nivel de música
        //
        this.tweens.add({
            targets: Batalla.music,
            volume: 0,
            duration: 1000,
            onComplete: () => {
                //
                // Eliminamos las entidades, tanto de Jugador como de Enemigo
                //
                this.enemigoExiste = false;

                this.jugadorArray.length = 0;
                this.enemigoArray.length = 0;

                for (var i = 0; i < this.unidades.length; i++){
                    this.unidades[i].destroy();
                }
                this.unidades.length = 0;

                if (CargaDatos.npcCombate == true){
                    CargaDatos.jugadorPeleaNpc = true;
                }
                
                CargaDatos.jefeZonaDer = false;
                CargaDatos.jefeOculto = false;
                CargaDatos.jefeZonaIzq = false;
                //
                // Por último, hacemos el cambio de escena de la batalla al escenario principal
                //
                this.cameras.main.fadeOut(250, 0, 0, 0, (camera: any, progreso: number) => {
                    if (progreso == 1){
                        // Asignamos la vida del Jugador en la batalla a la variable global de
                        // la vida del jugador
                        CargaDatos.jugadorVida = this.jugador.vida;
                        CargaDatos.musicaDespuesCombate = true;
                        // Indicamos que, cuando se vuelva a entrar en batalla, el turno será para el Jugador
                        this.indice = 2;
                        // Como se ha terminado la batalla, si el jugador ha terminado con un ataque cargado,
                        // no tendrá cooldown al entrar de nuevo en batalla
                        this.jugadorCooldown = false;
                        // Limpiamos el cuadro de mensajes
                        this.limpiarMensajes();

                        if (CargaDatos.jugadorVida == 0){
                            // Mandamos al jugador a la pantalla de derrota
                            this.scene.start(Constantes.ESCENAS.VICTORIA_DERROTA);
                            this.scene.stop(Constantes.ESCENAS.BATALLAINTERFAZ);
                            this.scene.stop(Constantes.ESCENAS.PROLOGO);
                            this.scene.stop();
                        } else {
                            // Volvemos a la escena principal, cerrando aquellas correspondientes a la batalla
                            this.scene.resume(Constantes.ESCENAS.PROLOGO);
                            this.scene.stop(Constantes.ESCENAS.BATALLAINTERFAZ);
                            this.scene.stop();
                        }
                    }
                }, this);
            }
        });
    }
    //
    // Método llamado desde la acción HUIR.
    //
    huirBatalla(){
        CargaDatos.npcCombate = false;
        this.condicionHuir = true;
        this.finalizarBatalla();
    }
}