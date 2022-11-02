import {Tarea} from '../clases';
import {listTarea} from '../index';
import {drag} from './dragDrop';

const modal = document.querySelector('.modaltask'),
      btnAbrir = document.querySelectorAll('.btnmodal'),
      btnCerrar = document.querySelectorAll('.close'),
      btnAceptar = document.querySelectorAll('.btnadd'),
      btnAddCheck = document.querySelector('.btncheck'),
      divTareaList = document.querySelectorAll('.grupotarjeta'),
      inputTarea = document.querySelector('.name-tarea'),
      divCheckList = document.querySelector('.list-check'),
      eliminar = document.querySelector('.delete'),
      modificarmodal = document.querySelector('.modificartask'),
      modificar = document.querySelector('.btnmodificar'),
      cerrarmodificar = modificarmodal.querySelector('.close-modificar'),
      editar = modificarmodal.querySelector('.edit'),
      btnModCheck = modificarmodal.querySelector('.btncheck'),
      divModCheck = modificarmodal.querySelector('.list-check'),
      tema = document.getElementById('tema');

      let collaborator = [];
      let checklist = [];
      let panel;


export const temasTablero = () => {
    tema.addEventListener('click', () =>{
        let fondo = document.querySelector('.temacolor');
        fondo.classList.toggle('claro');
        fondo.classList.toggle('oscuro');
    });
}

export const abrirModal = () => {
    btnAbrir.forEach(boton => {
        boton.addEventListener('click', () => {
            modal.style.display = "block";
            let tablero = boton.closest('.panel');
            panel = tablero.children[1];
        });
    });
    
}
export const cerrarModal = () =>{
    btnCerrar.forEach(boton => {
        boton.addEventListener('click', () => {
            modal.style.display = "none";
        });
    });
    
}


document.querySelectorAll('.btn-list').forEach(elemento => {
    elemento.addEventListener('click', function(){
        if( elemento.nextElementSibling.style.display == "block"){
            elemento.nextElementSibling.style.display = "none";
        }else{
            elemento.nextElementSibling.style.display = "block";
        }
    });
});

const crearTag = () => {
    let inputColor = document.querySelector('.tagcolor').value;
    let selectPrioridad = document.querySelector('.prioridad').value;
    let tarea = [inputColor, selectPrioridad];
    return tarea;
}

const crearLista = (check) => {
    const htmlLista = `
        <label><input class="" type="checkbox">
        ${check}</label>
    `;
    const subtarea = document.createElement('label');
        subtarea.innerHTML = htmlLista;
        return subtarea;
}

    btnAddCheck.addEventListener('click',() => {
        let check = document.querySelector('.check').value;
        if(check.length > 0){
            let subtarea = crearLista(check);
            checklist.push(check);
            divCheckList.append(subtarea.lastElementChild);
        }
    });

export const crearTarjeta = () =>{
    btnAceptar.forEach(boton => {
        boton.addEventListener('click', () => {
            let id = new Date().getTime();
            let tag = crearTag();
            let img = document.querySelector('.image').value;
            if(inputTarea.value.length > 0) { 
                const tarea = new Tarea(id, inputTarea.value, tag, img, checklist, collaborator);
                checklist = [];
                listTarea.nuevaTarea(tarea);
                crearListaTarea(tarea);
                modal.style.display = "none";
                limpiarModal();
            }
        
        });
    });
}

    const limpiarModal = () => {
        inputTarea.value = '';
        document.querySelector('.image').value = '';
        divCheckList.innerHTML = '';
        document.querySelector('.check').value = '';
        document.querySelector('.tagcolor').value = "#000000";
        document.querySelector('.prioridad').value = "High";
    }

    const crearTarea = (nuevaTarea) => {
        const htmlTarea = `
        <div class="twelve columns tarjetas" id="${nuevaTarea.id}">
            <img src="${ nuevaTarea.image }" class="img-tarea">
            <div class="info">
                <div>
                    <div class="tag" style="background-color:${ nuevaTarea.tag[0] };">${ nuevaTarea.tag[1] }</div>
                    <div class="borrar-modificar">
                        <img src="../assets/img/edit.svg" class="btnmodal">
                        <img src="../assets/img/delete.svg" class="delete">
                    </div>
                </div>
                <label class="name-tarea">${ nuevaTarea.tarea }</label>
                <div class="num-check">
                    <button>${ nuevaTarea.checklist.length }</button>
                </div>
            </div>
        </div>
        `;

        const div = document.createElement('div'); 
        div.innerHTML = htmlTarea;
        div.firstElementChild.setAttribute('draggable', true);
        drag(div.firstElementChild);
        return div;
    }

    export const crearListaTarea = (nuevaTarea) => {
        const div = crearTarea(nuevaTarea);
        panel.append(div);
        return div;
    }

divTareaList.forEach(divTarea => {
    divTarea.addEventListener('click', (event) => {
        const nombreElemento = event.target.className; 
        const tareaElemento = event.target.parentElement.parentElement.parentElement.parentElement; 
        const tareaId = tareaElemento.id;
        if ( nombreElemento == 'btnmodal') {
            let tarea = listTarea.getTarea(tareaId);
            abrirModificarModal(tarea, tareaElemento);
        } else if (nombreElemento == 'delete'){
            listTarea.eliminarTarea( tareaId );
            tareaElemento.parentElement.removeChild( tareaElemento );
        }
    });
});

    const abrirModificarModal = (tarea, tareaElemento) => {
        modificarmodal.style.display = "block";
        let tablero = tareaElemento.closest('.panel');
        panel = tablero.children[1];
        const infotarea = document.querySelector('.modificartask');
        infotarea.querySelector('.name-tarea').value = tarea.tarea;
        infotarea.querySelector('.tagcolor').value = tarea.tag[0];
        infotarea.querySelector('.prioridad').value = tarea.tag[1];
        infotarea.querySelector('.image').value = tarea.image;
        for(let i = 0; i<tarea.checklist.length; i++){
            crearListaModificada(tarea.checklist[i]);
        }
        modificarTarjeta(tarea.id, tarea.checklist, tareaElemento, infotarea);
        limpiarModal();
    }


    const crearListaModificada = (check) => {
        const htmlLista = `
            <label><input class="" type="checkbox">
            ${check}</label>
        `;
        const subtarea = document.createElement('label');
            subtarea.innerHTML = htmlLista;
            modificarmodal.querySelector('.list-check').append(subtarea.lastElementChild);
    }

    export const modificarTarjeta = (id, check, tareaElemento, infotarea) =>{
        modificar.addEventListener('click', () => {
            let txt = infotarea.querySelector('.name-tarea').value;
            let inputColor = infotarea.querySelector('.tagcolor').value;
            let selectPrioridad = infotarea.querySelector('.prioridad').value;
            let tag = [inputColor, selectPrioridad];
            let img = infotarea.querySelector('.image').value;
            for(let i = 0; i<checklist.length; i++){
                check.push(checklist[i]);
            }
            checklist = [];
        if(txt.length > 0) { 
            const tarea = new Tarea(id, txt, tag, img, check, collaborator);
            listTarea.modificarTarea(id, tarea);
            let tareas = listTarea.getListaTarea();
            console.log(tareas);
            tareaElemento.parentElement.parentElement.innerHTML = '';
            for ( let i = 0; i < tareas.length; i++) {
                crearListaTarea(tareas[i]);
            }
            modificarmodal.style.display = "none";
            limpiarModalMod();
        }    
        }); 
    }

    const limpiarModalMod = () =>{
        const infotarea = document.querySelector('.modificartask');
        infotarea.querySelector('.name-tarea').value = '';
        infotarea.querySelector('.tagcolor').value = '000000';
        infotarea.querySelector('.prioridad').value = 'High';
        infotarea.querySelector('.image').value = '';
        divModCheck.innerHTML = '';
        infotarea.querySelector('.check').value = '';
    }

    export const cerrarModificarModal = () => {
        cerrarmodificar.addEventListener('click', () => {
            modificarmodal.style.display = "none";
        });
    }

    btnModCheck.addEventListener('click',() => {
        let check = modificarmodal.querySelector('.check').value;
        if(check.length > 0){
            let subtarea = crearLista(check);
            checklist.push(check);
            divModCheck.append(subtarea.lastElementChild);
        }
    });

    



