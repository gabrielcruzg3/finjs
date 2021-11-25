
const cursosJsonDB = 
[
    {
        id: '1',
        titulo: 'RUMO AO BILHÃO #8 | COMPREI BITCOIN! (BCFF12 e SMALL CAP também!)',
        descricao: 'ABRA SUA CONTA GRATUITAMENTE NA XDEX: http://bit.ly/2vYMOljOUÇA O PRIMOCAST: htstraseprim...',
        imagem: 'https://i.ytimg.com/vi/rHzzveyJTco/maxresdefault.jpg',
        professor: 'Thiago Nigro',
        listaDeAulas: 'https://www.youtube.com/watch?v=rHzzveyJTco'

    }, 
    {
        id: '2',
        titulo: 'RUMO AO BILHÃO #9',
        descricao: 'ABRA SUA CONTA Rico: https://bit.ly/cadastraseprim...',
        imagem: 'https://i.ytimg.com/vi/rHzzveyJTco/maxresdefault.jpg',
        professor: 'Thiago Nigro',
        listaDeAulas: 'https://www.youtube.com/watch?v=aA-BlLzPYi0'
    }
]


function criarCurso() {

    const cursos = {
        id: document.getElementById('id').value,
        titulo: document.getElementById('title').value,
        descricao: document.getElementById('description').value,
        imagem: document.getElementById('image').value,
        professor: document.getElementById('teacher').value,
        listaDeAulas: document.getElementById('linkList').value
    }

    cursosJsonDB.push(cursos);
    console.table(cursosJsonDB)

    listarCursos();
}

function listarCursos(){

    const trLista = document.createElement('tr');
    trLista.innerHTML =     `     
        <td style="visibility: hidden;"> ${cursosJsonDB.id}  </td>
        <td> ${cursosJsonDB.titulo} video"> </td>
        <td> ${cursosJsonDB.descricao} video"> </td>
        <td> ${cursosJsonDB.imagem} imagem"> </td>
        <td> ${cursosJsonDB.professor} professor"> </td>
        <td><a href="${cursosJsonDB.listaDeAulas}"></a> aulas"> </td>
        <td> <input type="button" value="editar curso" onclick="editarCurso()"> </td>
        <td> <input type="button" value="excluir curso" onclick="excluirCurso()"> </td>
    `

    document.querySelector('#tableCursos>tbody').appendChild(trLista);
    
}