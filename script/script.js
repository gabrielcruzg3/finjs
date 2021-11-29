const utcDate = () => {
    const dateUtc = Date.now();
 return dateUtc;
}

    
const convertUtcDateAdded = (getDateAdded) => {
    let dateAddedToConvert = new Date(getDateAdded)
    const date = dateAddedToConvert.getDate();
    const month = dateAddedToConvert.getMonth();
    const year = dateAddedToConvert.getFullYear();
    return `${date}/${month}/${year}`;
}
const convertUtcDateUpdated = (getDateUpdated) => {
    if (getDateUpdated == "") {
        return "";
    }else{
    let dateUpdatedToConvert = new Date(getDateUpdated)
    const date1 = dateUpdatedToConvert.getDate();
    const month1 = dateUpdatedToConvert.getMonth();
    const year1 = dateUpdatedToConvert.getFullYear();
    return `${date1}/${month1}/${year1}`;
    }
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

    const randomId = () => {return Math.random().toString(36).slice(-4)} 

const cursoAddForm = () => {
    return {
        id: randomId(),
        index: getDB().length + 1,
        titulo: document.getElementById('title').value,
        descricao: document.getElementById('description').value,
        imagem: document.getElementById('image').value,
        professor: document.getElementById('teacher').value,
        listaDeAulas: document.getElementById('linkList').value,
        dateAdded: utcDate(),
        dateUpdated: ""
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
        listaDeAulas: document.getElementById('linkList').value,
        dateAdded: document.getElementById('dateAdded').value,
        dateUpdated: utcDate()
    }
}

const limpaTable = () => {
    document.querySelectorAll('#tableCursos>tbody>tr').forEach(tr => tr.parentNode.removeChild(tr))
    document.getElementById('tableCursos').style = "visibility: hidden";
    
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
    document.getElementById('dateAdded').value = cursoForEdit.dateAdded
}

const emptyForm = () => {
    if ( (document.getElementById('addCursoButton').type) == 'hidden') {
        document.getElementById('addCursoButton').type = 'reset'
        document.getElementById('updateCursoButton').type = 'hidden'
        
    }
    const cleanForm = ""
    document.getElementById('id').value = cleanForm
    document.getElementById('index').value = cleanForm
    document.getElementById('title').value = cleanForm
    document.getElementById('description').value = cleanForm
    document.getElementById('image').value = cleanForm
    document.getElementById('teacher').value = cleanForm
    document.getElementById('linkList').value = cleanForm
    document.getElementById('dateAdded').value = cleanForm
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
        <td><a href="${curso.listaDeAulas}">Link da Aula</a></td>
        <td> ${convertUtcDateAdded(Number(curso.dateAdded))} </td>
        <td> ${convertUtcDateUpdated(curso.dateUpdated)} </td>
        <td> <input type="button" id="${curso.id}" name="editCursoButton" value="editar curso" onclick="editarCurso()"> </td>
        <td> <input type="button" id="${curso.id}" name="deleteCursoButton" value="excluir curso" onclick="deletarCurso()"> </td>
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
    
    document.getElementById('addCursoButton').type = 'hidden'
    document.getElementById('updateCursoButton').type = 'reset'
    listaCursos()
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

            alert('Não foi possivel encontrar o ID informado :(')
            limpaTable();
            listaCursos();
            return false
        }
       
         index++; 
    }while(index <= getDB().length)

}

function atualizarCurso(){
   

        const getIndex = document.getElementById('index').value;

        const cursoForUpdate = getDB();
        cursoForUpdate[getIndex] = cursoUpdateForm();
        setDB(cursoForUpdate);
    
        
    emptyForm()
    document.getElementById('updateCursoButton').type = 'hidden'
    document.getElementById('addCursoButton').type = 'reset'
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
        limpaTable()
        tableVisible()

        getDB().forEach(curso => {

            criaTr(curso);

        })  
    }
}

// document.getElementsByName('editCursoButton').addEventListener('button', () => editarCurso()) 

// document.getElementsByName('deleteCursoButton').addEventListener('button', () => deletarCurso())

// document.getElementById('updateCursoButton').addEventListener('button', () => atualizarCurso())

    listaCursos()