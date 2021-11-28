const dbTesteBkp = () => {
    delDB();
    const cursosJsonDB = 
    [
        {
            id: '0',
            titulo: 'RUMO AO BILHÃO #8 | COMPREI BITCOIN! (BCFF12 e SMALL CAP também!)',
            descricao: 'ABRA SUA CONTA GRATUITAMENTE NA XDEX: http://bit.ly/2vYMOljOUÇA O PRIMOCAST: htstraseprim...',
            imagem: 'https://i.ytimg.com/vi/rHzzveyJTco/maxresdefault.jpg',
            professor: 'Thiago Nigro',
            listaDeAulas: 'https://www.youtube.com/embed/rHzzveyJTco',
            index: '0'

        }, 
        {
            id: '2',
            titulo: 'RUMO AO BILHÃO #9',
            descricao: 'ABRA SUA CONTA Rico: https://bit.ly/cadastraseprim...',
            imagem: 'https://i.ytimg.com/vi/rHzzveyJTco/maxresdefault.jpg',
            professor: 'Thiago Nigro',
            listaDeAulas: 'https://www.youtube.com/embed/aA-BlLzPYi0',
            index: '1'
        }, 
        {
            id: '3',
            titulo: 'RUMO AO BILHÃO #9',
            descricao: 'ABRA SUA CONTA Rico: https://bit.ly/cadastraseprim...',
            imagem: 'https://i.ytimg.com/vi/rHzzveyJTco/maxresdefault.jpg',
            professor: 'Thiago Nigro',
            listaDeAulas: 'https://www.youtube.com/embed/aA-BlLzPYi0',
            index: '2'
        }, 
        {
            id: '4',
            titulo: 'RUMO AO BILHÃO #9',
            descricao: 'ABRA SUA CONTA Rico: https://bit.ly/cadastraseprim...',
            imagem: 'https://i.ytimg.com/vi/rHzzveyJTco/maxresdefault.jpg',
            professor: 'Thiago Nigro',
            listaDeAulas: 'https://www.youtube.com/embed/aA-BlLzPYi0',
            index: '3'
        }
    ]

    localStorage.setItem('cursosDB', JSON.stringify(cursosJsonDB))
    listaCursos()

}
///////////////////////////////////////////////////


const getDB = () => JSON.parse(localStorage.getItem('cursosDB')) ?? [];
const setDB = (cursosJsonDB) => localStorage.setItem('cursosDB', JSON.stringify(cursosJsonDB));
const delDB = () => {
    localStorage.removeItem('cursosDB'); 
    limpaTable();
}

const formPreenchido = () => {
        return document.getElementById('form').reportValidity();
    }

const cursoAddForm = () => {
    return {
        id: Math.random().toString(36).slice(-8),
        index: getDB().length ?? getDB().length + 1,
        titulo: document.getElementById('title').value,
        descricao: document.getElementById('description').value,
        imagem: document.getElementById('image').value,
        professor: document.getElementById('teacher').value,
        listaDeAulas: document.getElementById('linkList').value       
    }
}

const cursoUpdateForm = () => {
    return {
        id: document.getElementById('id').value,
        index: document.getElementById('index').value,
        titulo: document.getElementById('title').value,
        descricao: document.getElementById('description').value,
        imagem: document.getElementById('image').value,
        professor: document.getElementById('teacher').value,
        listaDeAulas: document.getElementById('linkList').value
    }
}

const limpaTable = () => {
    document.querySelectorAll('#tableCursos>tbody>tr').forEach(tr => tr.parentNode.removeChild(tr))
    document.getElementById('tableCursos').style = "visibility: hidden";
    // if((document.getElementById('addCursoButton').type = 'reset') == true){
    //     document.getElementById('updateCursoButton').type = 'hidden'
    // }else{
    //     document.getElementById('addCursoButton').type = 'hidden'
    //     document.getElementById('updateCursoButton').type = 'reset'
    // }
    
}
const tableVisible = () =>  document.getElementById('tableCursos').style = "visibility: visible";

const fillFormForEdit = (cursoForEdit) => {
    document.getElementById('id').value = cursoForEdit.id,
    document.getElementById('index').value = cursoForEdit.index,
    document.getElementById('title').value = cursoForEdit.titulo
    document.getElementById('description').value = cursoForEdit.descricao
    document.getElementById('image').value = cursoForEdit.imagem
    document.getElementById('teacher').value = cursoForEdit.professor
    document.getElementById('linkList').value = cursoForEdit.listaDeAulas
    // const addCurso = document.getElementById('addCursoButton');
    // addCurso.value = "Atualizar Curso"
    // addCurso.onclick = "updateCurso()"
    // addCurso.id = 'updateCursoButton'
}

const criaTr = (curso) => {
    const trLista = document.createElement('tr');
    trLista.innerHTML = `     
        <td> ${curso.id}  </td>
        <td> ${curso.index} </td>
        <td> ${curso.titulo} </td>
        <td> ${curso.descricao} </td>
        <td> <img width="160" height="80" src="${curso.imagem}"> </td>
        <td> ${curso.professor} </td>
        <td><iframe width="240" height="135" src="${curso.listaDeAulas.replace("watch?v=", "embed/")}" title="YouTube video player" frameborder="0" allowfullscreen></iframe></td>
        <td> <input type="button" name="editButton${curso.id}" id="${curso.id}" value="editar curso" onclick="editarCurso()"> </td>
        <td> <input type="button" name="deletetButton${curso.id}" id="${curso.id}" value="excluir curso" onclick="deletarCurso()"> </td>
    `;
    document.querySelector('#tableCursos>tbody').appendChild(trLista);
}

const editarCurso = () => {
    

    const idSearchForEdit = event.target.id

    let index = 0;
    do{
        if(idSearchForEdit == getDB()[index].id){

                tableVisible();

                const cursoForEdit = getDB()[index]
                fillFormForEdit(cursoForEdit);

                break
            }
        
       
         index++; 
    }while(index <= getDB().length)
    
    listaCursos()
    document.getElementById('addCursoButton').type = 'hidden'
    document.getElementById('updateCursoButton').type = 'reset'
}

function criarCurso(){

    if (formPreenchido() == false){
        alert("Por favor preencha os campos!")

    } 
    if (formPreenchido() == true) {
       
        const cursosJsonDB = getDB();
        cursosJsonDB.push(cursoAddForm());
        setDB(cursosJsonDB);
        listaCursos();
    }

    
}

function exibirCursos(){

    limpaTable()

    const idSearch = document.getElementById('cursoSearch').value;

    let index = 0;
    do{
        if (index < getDB().length) {
            
            if(idSearch == getDB()[index].id){

                tableVisible();

                const curso = getDB()[index]
                criaTr(curso);

                return true
            }
        }  
        else{

            alert('id not find in database')
            limpaTable();
            listaCursos();
            return false
        }
       
         index++; 
    }while(index <= getDB().length)

}

function atualizarCurso(){
    document.getElementById('updateCursoButton').type = 'hidden'
    document.getElementById('addCursoButton').type = 'reset'

        const getIndex = document.getElementById('index').value;

        const cursoForUpdate = getDB();
        cursoForUpdate[getIndex] = cursoUpdateForm();
        setDB(cursoForUpdate);
    

 
    listaCursos();
}


function deletarCurso(){
    const idSearch = event.target.id

    let index = 0;
    do{
        if (index < getDB().length) {          
        
            if(idSearch == getDB()[index].id){

                tableVisible();
                
                const curso = getDB()
                curso.splice(index, 1)           
                setDB(curso)

                // listaCursos()

            }
        }
         index++; 
    }while(index <= getDB().length)

    listaCursos()
    document.getElementById('addCursoButton').type = 'reset';
document.getElementById('updateCursoButton').type = 'hidden';

}

function listaCursos(){ 

    if (getDB() == "") {
       limpaTable();     
        
    }
    else
    {
        limpaTable();
        tableVisible()
        

        getDB().forEach(curso => {

            criaTr(curso);

        })  
    }
}

window.addEventListener('button', function () {
        editarCurso();
        deletarCurso()
    })

const updateButton = document.getElementById('updateCursoButton');
    updateButton.addEventListener('button', () => updateCurso())

    listaCursos()