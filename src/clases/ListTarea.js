export class ListTarea{
    constructor() {
        this.tarea = [];
    }

    nuevaTarea(tarea) {
        this.tarea.push(tarea);
    }

    eliminarTarea(id) {
        this.tarea = this.tarea.filter(tarea => tarea.id != id);       
    }

    marcarCompletado(id) {
        for( const todo of this.todo ){
            console.log(todo.id, id);
            if (todo.id == id) { //en mi array lo tengo como numérico y al tomarlo del HTML es string, por eso dos iguales
                todo.completado = !todo.completado;
            }
        }
    }

    eliminarCompletados() {
        this.todo = this.todo.filter(todo => todo == !completado);
    }
}