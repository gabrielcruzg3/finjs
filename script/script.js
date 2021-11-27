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
        id: Math.floor(Math.random() * 9999) + 1001,
        index: getDB().length + 1,
        titulo: document.getElementById('title').value,
        descricao: document.getElementById('description').value,
        imagem: document.getElementById('image').value,
        professor: document.getElementById('teacher').value,
        listaDeAulas: document.getElementById('linkList').value       
    }
}

const cursoUpdateForm = (curso) => {
    return {
        id: curso.id,
        index: curso.index,
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
}
const tableVisible = () =>  document.getElementById('tableCursos').style = "visibility: visible";

const fillFormEdit = (curso) => {
    document.getElementById('title').value = curso.titulo
    document.getElementById('description').value = curso.descricao
    document.getElementById('image').value = curso.imagem
    document.getElementById('teacher').value = curso.professor
    document.getElementById('linkList').value = curso.listaDeAulas
    const addCurso = document.getElementById('addCursoButton');
    addCurso.value = "Atualizar Curso"
    addCurso.onclick = "updateCurso()"
    addCurso.id = 'updateCursoButton'
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
        <td> <input type="button" name="editButton${curso.id}" id="${curso.id}" value="editar curso" onclick="atualizarCurso()"> </td>
        <td> <input type="button" name="deletetButton${curso.id}" id="${curso.id}" value="excluir curso" onclick="deletarCurso()"> </td>
    `;
    document.querySelector('#tableCursos>tbody').appendChild(trLista);
}

const updateCurso = (curso) => {

    if (formPreenchido() == false){
        alert("Por favor preencha os campos!")

    } 
    if (formPreenchido() == true) {
alert("upadte true")
        if(curso.index == cursoUpdateForm(curso.index)){
            console.log("inception")
            getDB()[curso.index]  = curso;
        getDB()[curso.index].push(cursoUpdateForm());
        setDB(getDB()[curso.index]);
        
        }
    }
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

// let edit = document.getElementsByName('editButton')
        const idSearch = event.target.id

    let index = 0;
    do{
        if(idSearch == getDB()[index].id){

            tableVisible();
            alert("attrcursos")

            const curso = getDB()[index]
            fillFormEdit(curso);
            updateCurso(curso);
            
            return true
        }
        // if (index == getDB().length - 1) { 

        //     alert('id not find in database')
        //     limpaTable();
        //     return false
        // }
       
         index++; 
    }while(index <= getDB().length)
    exibirCursos()
    
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
        atualizarCurso();
        deletarCurso()
    })

const updateButton = document.getElementById('updateCursoButton');
    updateButton.addEventListener('button', () => updateCurso())