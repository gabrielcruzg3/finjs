function dbTesteBkp(){
    const cursosJsonDB = 
    [
        {
            id: '0',
            titulo: 'RUMO AO BILHÃO #8 | COMPREI BITCOIN! (BCFF12 e SMALL CAP também!)',
            descricao: 'ABRA SUA CONTA GRATUITAMENTE NA XDEX: http://bit.ly/2vYMOljOUÇA O PRIMOCAST: htstraseprim...',
            imagem: 'https://i.ytimg.com/vi/rHzzveyJTco/maxresdefault.jpg',
            professor: 'Thiago Nigro',
            listaDeAulas: 'https://www.youtube.com/watch?v=rHzzveyJTco'

        }, 
        {
            id: '1',
            titulo: 'RUMO AO BILHÃO #9',
            descricao: 'ABRA SUA CONTA Rico: https://bit.ly/cadastraseprim...',
            imagem: 'https://i.ytimg.com/vi/rHzzveyJTco/maxresdefault.jpg',
            professor: 'Thiago Nigro',
            listaDeAulas: 'https://www.youtube.com/watch?v=aA-BlLzPYi0'
        }
    ]

    localStorage.setItem('cursosDB', JSON.stringify(cursosJsonDB))
}


const getDB = () => JSON.parse(localStorage.getItem('cursosDB')) ?? [];
const setDB = (cursosJsonDB) => localStorage.setItem('cursosDB', JSON.stringify(cursosJsonDB));


function createCurso() {

    const cursos = {
        id: document.getElementById('id').value,
        titulo: document.getElementById('title').value,
        descricao: document.getElementById('description').value,
        imagem: document.getElementById('image').value,
        professor: document.getElementById('teacher').value,
        listaDeAulas: document.getElementById('linkList').value
    }

    const cursosJsonDB = getDB();
    cursosJsonDB.push(cursos);
    setDB(cursosJsonDB);

    readCursos();
}

function readCursos(){

    const cursos = getDB();

    const trLista = document.createElement('tr');

    cursos.forEach(curso => {
    

            trLista.innerHTML = `     
            <td style="visibility: hidden;"> ${curso.id}  </td>
            <td> ${curso.titulo} </td>
            <td> ${curso.descricao} </td>
            <td> <img width="160" height="80" src="${curso.imagem}"> </td>
            <td> ${curso.professor} </td>
            <td><a href="${curso.listaDeAulas}"> Link Video </a></td>
            <td> <input type="button" id="editButton${curso.id}" value="editar curso" onclick="updateCurso()"> </td>
            <td> <input type="button" id="deletetButton${curso.id}" value="excluir curso" onclick="deleteCurso()"> </td>
        `;
        )};

    document.querySelector('#tableCursos>tbody').appendChild(trLista);

    
    console.table(curso)

}

function updateCursos(){

}

function deleteCursos(){

}

readCursos()