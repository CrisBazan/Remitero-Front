// obtener clientes
function fetchClients() {
    fetch('http://localhost:8080/client/deleted')
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
                <button type="button" class="btn btn-success" onclick="confirmRestore(${client.id})">Restaurar</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// confirmar y eliminar un cliente
function confirmRestore(clientId) {

    Swal.fire({

        title: "¿Está seguro que desea restaurar este cliente?",
        text: "El cliente volverá a estar disponible para crear nuevos remitos o para ser editado",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, restaurar!",
        cancelButtonText: 'No, cancelar'
    }).then((result) => {

        if (result.isConfirmed) {

            restoreClient(clientId);
        }
    });
}

// eliminación
function restoreClient(clientId) {
    fetch(`http://localhost:8080/client/restore/${clientId}`, {
        method: 'PUT'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al restaurar el cliente');
            }
            Swal.fire({
                title: "Restauración",
                text: "Cliente restaurado con éxito",
                icon: "success"
            });
            fetchClients();
        })
        .catch(error => {
            Swal.fire({
                icon: "error",
                title: "Hubo un error al restaurar el cliente",
                text: "Algo salió mal y no pudo realizarse la acción. Por favor reintente o pruebe con cerrar y volver a " +
                    "abrir el programa. Si este error persiste comuníquese con soporte para recibir " +
                    "ayuda avanzada. (Información del Error: " + error.message + ")",
                footer: '<a href="mailto:cristianbazan.cr@gmail.com">Contactar con Soporte</a>'
            });
        });
}

document.addEventListener('DOMContentLoaded', function () {

    addNavBar();
    fetchClients();
});