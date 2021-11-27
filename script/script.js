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

const cursoForm = () => {
    return {
        id: Math.floor(Math.random() * 9999) + 1001,
        index: getDB().length + 1,
        titulo: document.getElementById('title').value,
        descricao: document.getElementById('description').value,
        imagem: document.getElementById('image').value,
        professor: document.getElementById('teacher').value,
        listaDeAulas: document.getElementById('linkList').value
    };
}


const limpaTable = () => document.querySelectorAll('#tableCursos>tbody>tr').forEach(tr => tr.parentNode.removeChild(tr));

function criarCurso(){

    if (formPreenchido() == false){
        alert("Por favor preencha os campos!")

    } 
    if (formPreenchido() == true) {

        const cursosJsonDB = getDB();
        cursosJsonDB.push(cursoForm());
        setDB(cursosJsonDB);
    }

    s();
}

function exibirCursos(){

    limpaTable()

    const idSearch = document.getElementById('cursoSearch').value;
let index = 0;
    do{
        if(idSearch == getDB()[index].id){

            const curso = getDB()[index]
            criaTr(curso);     
            break
        }
        if (index == getDB().length - 1) {

            alert('id not find in database')
            break 
        }
       
         index++; 
    }while(index <= getDB().length)

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
            <td><iframe width="480" height="270" src="${curso.listaDeAulas.replace("watch?v=", "embed/")}" title="YouTube video player" frameborder="0" allowfullscreen></iframe></td>
            <td> <input type="button" id="editButton${curso.id}" value="editar curso" onclick="atualizarCurso()"> </td>
            <td> <input type="button" id="deletetButton${curso.id}" value="excluir curso" onclick="deletarCurso()"> </td>
        `;
        document.querySelector('#tableCursos>tbody').appendChild(trLista);
    }

function atualizarCurso(){

}


function deletarCurso(){

}

function listaCursos(){ 

    if (getDB() == []) {
       limpaTable();        
    }
    else
    {
        limpaTable();

        

        getDB().forEach(curso => {

            criaTr(curso);

        })  
    }
}