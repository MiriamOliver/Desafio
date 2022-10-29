import '../src/css/mia.css'
import { Tarea, ListTarea } from './clases';
//import { crearTodoHtml } from './js/componentes';
import {cerrarModal} from '../src/js/modal';
import {abrirModal} from '../src/js/modal';
import {crearTarjeta} from '../src/js/modal';

export const listTarea = new ListTarea();

cerrarModal();
abrirModal();
crearTarjeta();


//crearTareaHtml(tarea);