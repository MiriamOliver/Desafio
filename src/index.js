import '../src/css/mia.css'
import {ListTarea } from './clases';

import { addEventosDrop } from '../src/js/dragDrop';
import {cerrarModal} from '../src/js/modal';
import {cerrarModificarModal} from '../src/js/modal';
import {abrirModal} from '../src/js/modal';
import {crearTarjeta} from '../src/js/modal';
import {temasTablero} from '../src/js/modal';

export const listTarea = new ListTarea();


temasTablero();
cerrarModal();
abrirModal();
crearTarjeta();
cerrarModificarModal();
addEventosDrop();
