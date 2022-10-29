import {Tarea} from '../clases';
import {listTarea} from '../index';

const modal = document.querySelector('.modaltask'),
      btnAbrir = document.querySelector('.btnmodal'),
      btnCerrar = document.querySelector('.close'),
      btnAceptar = document.querySelector('.btnadd'),
      btnAddCheck = document.querySelector('.btncheck'),
      btnAddCollaborator = document.querySelector('.btncollaborator'),
      inputTarea = document.querySelector('.name-tarea'),
      divCheckList = document.querySelector('.list-check'),
      divListColab = document.querySelector('.list-colab'),
      divTareaList = document.querySelector('.grupotarjeta');

      let collaborator = [];
      let checklist = [];

export const abrirModal = () => {
    btnAbrir.addEventListener('click', () => {
        modal.style.display = "block";
    });
}

export const cerrarModal = () => {
    btnCerrar.addEventListener('click', () => {
        modal.style.display = "none";
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
        divCheckList.append(subtarea.lastElementChild);
}

const crearListaColaboradores = (colab) => {
    const htmlListaCol = `
    <label><img src="../assets/img/profile.svg">
        ${colab}</label>
    `;
    console.log(htmlListaCol);
    const nuevocolab = document.createElement('label');
        nuevocolab.innerHTML = htmlListaCol;
        divListColab.append(nuevocolab.lastElementChild);
}

    btnAddCheck.addEventListener('click',() => {
        let check = document.querySelector('.check').value;
        if(check.length > 0){
            crearLista(check);
            checklist.push(check);
        }
    });

    btnAddCollaborator.addEventListener('click',() => {
        let colab = document.querySelector('.colab').value;
        if(colab.length > 0){
            crearListaColaboradores(colab);
            collaborator.push(colab);
        };
    });

export const crearTarjeta = () =>{
    btnAceptar.addEventListener('click', () => {
            let tag = crearTag();
            let img = document.querySelector('.image').value;
        if(inputTarea.value.length > 0) { 
            const tarea = new Tarea(inputTarea.value, tag, img, checklist, collaborator);
            listTarea.nuevaTarea(tarea);
            crearListaTarea(tarea);
        }
    }); 
}

    export const crearListaTarea = (nuevaTarea) => {
        console.log('hola');
        const htmlTarea = `
        <div class="twelve columns tarjetas">
            <img src="${ nuevaTarea.image }" class="img-tarea">
            <div class="info">
                <div>
                    <div class="tag" style="background-color:${ nuevaTarea.tag[0] };">${ nuevaTarea.tag[1] }</div>
                    <div class="borrar-modificar">
                        <button class="edit"><img src="../assets/img/edit.svg"></button>
                        <button class="delete"><img src="../assets/img/delete.svg"></button>
                    </div>
                </div>
                <label>${ nuevaTarea.tarea }</label>
                <div class="num-check">
                    <button>${ nuevaTarea.checklist.length }</button>
                </div>
                <div class="num-colab">
                    <label>${ nuevaTarea.colaborador.length }<img src="../assets/img/profile.svg"></label>
                </div>
            </div>
        </div>
        `;
    
        //Creo el elemento html
        const div = document.createElement('div'); //Quiero crear el elemento con todos los nodos pero luego añado sólo el hijo
        div.innerHTML = htmlTarea;
    
        divTareaList.append(div);
    
        return div;
    }



