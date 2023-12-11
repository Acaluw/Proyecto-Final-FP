
export default class Objetos extends Phaser.Physics.Arcade.Group {
    private escena: Phaser.Scene;

    constructor(escena: any, nombreCapaObjeto: string, tipo: string) {
        super(escena.physics.world, escena);

        this.escena = escena;
        this.addMultiple(escena.mapaNivel.createFromObjects(nombreCapaObjeto));
        //añadimos física
        this.escena.physics.world.enable(this.children.entries);

        this.children.entries.map((objeto: any) =>{
            objeto.setTexture('hueco');
            objeto.scale = 1;
            
            if (tipo === 'horizontal') {
                objeto.body.setSize(10, 30);
                objeto.body.setOffset(0, 25);
            } else if (tipo === 'vertical') {
                objeto.body.setSize(30, 0);
                objeto.body.setOffset(-7.5, 16);
            } else if (tipo === 'escalera'){
                objeto.body.setSize(0, 0);
                objeto.body.setOffset(0, 16);
            } else if (tipo === 'cueva'){
                objeto.body.setSize(40, 10);
                objeto.body.setOffset(-12, 12.5);
            }
        });
    }

    public update(): void {}
}