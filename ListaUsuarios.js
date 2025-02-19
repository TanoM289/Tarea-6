async function obtenerUsuarios() {
    try {
        const response = await fetch('https://randomuser.me/api/?results=10');
        const data = await response.json();
        const usuarios = data.results;

        const tabla = document.getElementById('tablaUsuarios');
        usuarios.forEach(usuario => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td><img src="${usuario.picture.thumbnail}" alt="Foto"></td>
                <td>${usuario.name.first} ${usuario.name.last}</td>
                <td>${usuario.email}</td>
            `;
            tabla.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
    }
}

function buscarUsuarios() {
    const filtro = document.getElementById('filtro').value.toLowerCase();
    const filas = document.querySelectorAll('#tablaUsuarios tr');
    filas.forEach(fila => {
        const nombre = fila.cells[1].innerText.toLowerCase();
        fila.style.display = nombre.includes(filtro) ? '' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', obtenerUsuarios);
