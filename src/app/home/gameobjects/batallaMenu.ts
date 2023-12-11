import BatallaMenuItem from "./batallaMenuItem";

export default class BatallaMenu extends Phaser.GameObjects.Container {
    menuitems : BatallaMenuItem[];
    menuitem_index: number;
    override x: number;
    override y: number;

    public static opcionSeleccionada: string;

    constructor(x: number, y: number, scene: Phaser.Scene) {
        super(scene, x, y);
        this.menuitems = [];
        this.menuitem_index = 0;
        this.x = x;
        this.y = y;
    }

    añadirItem(item: any){
        const menuitem = new BatallaMenuItem(0, this.menuitems.length*20, item, this.scene);
        this.menuitems.push(menuitem);
        this.add(menuitem);
    }

    seleccionar(indice?: number){
        if (!indice){
            indice = 0;
        }
        this.menuitems[this.menuitem_index].deseleccionarOpcion();
        this.menuitem_index = indice;
        this.menuitems[this.menuitem_index].seleccionarOpcion();
        BatallaMenu.opcionSeleccionada = this.menuitems[this.menuitem_index].getText();
    }

    deseleccionar(){
        this.menuitems[this.menuitem_index].deseleccionarOpcion();
        this.menuitem_index = 0;
    }

    seleccionarArriba(){
        this.menuitems[this.menuitem_index].deseleccionarOpcion();
        this.menuitem_index--;
        //
        // Comprobamos si la siguiente opción es un espacio vacío.
        // En caso de serlo, pasamos al siguiente elemento
        //
        if (this.menuitem_index >= 0){
            if (this.menuitems[this.menuitem_index].getText() == ''){
                this.menuitems[this.menuitem_index].deseleccionarOpcion();
                this.menuitem_index--;
            }
        }
        //
        // En caso de que el índice esté por debajo de 0, pondremos el índice
        // en la última posición de la array
        //
        if (this.menuitem_index < 0){
            this.menuitem_index = this.menuitems.length - 1;
        }
        this.menuitems[this.menuitem_index].seleccionarOpcion();
        BatallaMenu.opcionSeleccionada = this.menuitems[this.menuitem_index].getText();
    }

    seleccionarAbajo(){
        this.menuitems[this.menuitem_index].deseleccionarOpcion();
        this.menuitem_index++;
        //
        // Comprobamos si la siguiente opción es un espacio vacío.
        // En caso de serlo, pasamos al siguiente elemento
        //
        if (this.menuitem_index < this.menuitems.length){
            if (this.menuitems[this.menuitem_index].getText() == ''){
                this.menuitems[this.menuitem_index].deseleccionarOpcion();
                this.menuitem_index++;
            }
        }
        //
        // En caso de que el índice esté por encima de la longitud de la array, 
        // pondremos el índice al comienzo de la array
        //
        if (this.menuitem_index >= this.menuitems.length){
            this.menuitem_index = 0;
        }
        this.menuitems[this.menuitem_index].seleccionarOpcion();
        BatallaMenu.opcionSeleccionada = this.menuitems[this.menuitem_index].getText();
    }

    confirmarSeleccion(){

    }
}