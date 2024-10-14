// obtener clientes
function fetchClients() {
    fetch('http://localhost:8080/client')
        .then(response => response.json())
        .then(data => renderClients(data))
        .catch(error => console.error('Error al obtener los clientes:', error));
}

// agregar clientes en la tabla
function renderClients(clients) {
    const tableBody = document.querySelector('#clientTable tbody');
    tableBody.innerHTML = '';

    clients.forEach(client => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${client.name}</td>
            <td>${client.cuit}</td>
            <td>${client.address}</td>
            <td>
                <button type="button" class="btn btn-danger" onclick="confirmDelete(${client.id})">Eliminar</button>
                <button type="button" class="btn btn-primary" onclick="editClient(${client.id})">Editar</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// confirmar y eliminar un cliente
function confirmDelete(clientId) {

    Swal.fire({

        title: "¿Está seguro que desea eliminar este cliente?",
        text: "Los remitos a cargo de este cliente seguirán estando disponibles. NO podrá crear un cliente nuevo con este cuit. Los clientes pueden restaurarse desde la papelera",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: 'No, cancelar'
    }).then((result) => {

        if (result.isConfirmed) {

            deleteClient(clientId);
        }
    });
}

// eliminación
function deleteClient(clientId) {
    fetch(`http://localhost:8080/client/delete/${clientId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar el cliente');
        }
        Swal.fire({
            title: "Eliminación",
            text: "Cliente eliminado con éxito",
            icon: "success"
        });
        fetchClients();
    })
    .catch(error => {
        Swal.fire({
            icon: "error",
            title: "Hubo un error al eliminar el cliente",
            text: "Algo salió mal y no pudo realizarse la acción. Por favor reintente o pruebe con cerrar y volver a " +
                "abrir el programa. Si este error persiste comuníquese con soporte para recibir " +
                "ayuda avanzada. (Información del Error: " + error.message + ")",
            footer: '<a href="mailto:cristianbazan.cr@gmail.com">Contactar con Soporte</a>'
        });
    });
}

function editClient(clientId) {

    window.location.href = `../../../src/Clientes/EditarClientes/EditarClientes.html?clientId=${clientId}`
}

document.addEventListener('DOMContentLoaded', function () {

    addNavBar();
    fetchClients();
});
