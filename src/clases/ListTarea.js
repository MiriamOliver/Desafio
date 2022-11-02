export class ListTarea{
    constructor() {
        this.tarea = [];
    }

    getListaTarea(){
        return this.tarea;
    }

    nuevaTarea(tarea) {
        this.tarea.push(tarea);
    }

    eliminarTarea(id) {
        this.tarea = this.tarea.filter(tarea => tarea.id != id);       
    }

    getTarea(id){
        let task = [];
        for( const tarea of this.tarea ){
            if (tarea.id == id) {
                task = tarea;
            }
        }
        return task;
    }

    modificarTarea(id, task){
        for( const tarea of this.tarea ){
            if (tarea.id == id) { 
                tarea.tarea = task.tarea;
                tarea.tag = task.tag;
                tarea.image = task.image;
                tarea.checklist = task.checklist;
            }
        }
    }
    

  /*   marcarCompletado(id) {
        for( const todo of this.todo ){
            if (todo.id == id) { 
                todo.completado = !todo.completado;
            }
        }
    } */
}