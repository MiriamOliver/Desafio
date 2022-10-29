
export class Tarea{
    constructor (tarea, tag, image, checklist, colaborador){
        this.id = new Date().getTime();
        this.tarea = tarea;
        this.tag = tag;
        this.image = image;
        this.checklist = checklist;
        this.colaborador = colaborador;
    }
}