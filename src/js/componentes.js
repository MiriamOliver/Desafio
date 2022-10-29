import {Tarea} from '../clases';
import {listTarea} from '../index';

const divTareaList = document.querySelector('.grupotarjeta')
eliminar = document.querySelector('.delete'),
editar = document.querySelector('edit');

divTareaList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName; 
    console.log(nombreElemento);

    const tareaElemento = event.target.parentElement.parentElement; //Obtengo el li con el id del elemento
    const tareaId = tareaElemento.getAttribute('data-id');
    
    if ( nombreElemento.includes('input') ) {//click en el check
        todoList.marcarCompletado(tareaId);
        todoElemento.classList.toggle('completed');
    } else if (nombreElemento.includes('button')){
        //Hay que borrar el todo
        todoList.eliminarTodo( todoId );
        //La referencia html también hay que borrarla
        divTodoList.removeChild( todoElemento );
    }
});