document.addEventListener('DOMContentLoaded', function () {

    addNavBar();
    fetchRemitos();
});

// obtener los remitos
function fetchRemitos() {
    fetch('http://localhost:8080/remito')
        .then(response => response.json())
        .then(data => renderRemitos(data))
        .catch(error => console.error('Error al obtener los remitos:', error));
}

// agregar remitos a la tabla
function renderRemitos(remitos) {
    const tableBody = document.querySelector('#remitosTable tbody');
    tableBody.innerHTML = '';

    remitos.forEach(remito => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${remito.date}</td>
            <td>${remito.id}</td>
            <td>${remito.client.name}</td>
            <td>$ ${remito.total}</td>
            <td>
                <button type="button" class="btn btn-primary" onclick="openRemito(${remito.id})">Ver</button>
                <button type="button" class="btn btn-danger" onclick="eliminarRemito(${remito.id})">Eliminar</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// confirmar y eliminar un cliente
async function openRemito2(remitoId) {

    const validate = await validarOwner();

    if (validate){

        window.location.href = `../VerRemito/VerRemito.html?nRemito=${remitoId}`
    }else {

        Swal.fire({
            icon: "error",
            title: "Datos personales vacíos",
            text: "Por favor diríjase a 'Menu -> Configuraciones -> Mis Datos' y complete sus datos"
        })
    }

}

function openRemito(remitoId) {

    fetch('http://localhost:8080/owner')
        .then(response => response.json())
        .then(owner => {
            console.log(owner)
            if (owner.name == ""){

                Swal.fire({
                    icon: "error",
                    title: "Datos personales vacíos",
                    text: "Por favor diríjase a 'Menu -> Configuraciones -> Mis Datos' y complete sus datos"
                })
            }else {

                window.location.href = `../VerRemito/VerRemito.html?nRemito=${remitoId}`
            }
        })
        .catch(error => Swal.fire({
            icon: "error",
            title: "Error al revisar los datos personales",
            text: "Algo salió mal y no pudo realizarse la acción. Por favor reintente o pruebe con cerrar y volver a " +
                "abrir el programa. Si este error persiste comuníquese con soporte para recibir " +
                "ayuda avanzada. (Información del Error: " + error.message + ")",
            footer: '<a href="mailto:cristianbazan.cr@gmail.com">Contactar con Soporte</a>'
        }));
}

function eliminarRemito(remitoId) {

    Swal.fire({

        title: "¿Esta seguro que desea eliminar este remito?",
        text: "Esta acción no se puede deshacer!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: 'No, cancelar'
    }).then((result) => {

        if (result.isConfirmed) {

            deleteRemito(remitoId);
        }
    });
}

function deleteRemito(remitoId) {
    fetch(`http://localhost:8080/remito/delete/${remitoId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar el remito');
            }
            Swal.fire({
                title: "Eliminación",
                text: "Remito eliminado con éxito",
                icon: "success"
            });
            fetchRemitos();
        })
        .catch(error => {
            Swal.fire({
                icon: "error",
                title: "Hubo un error al eliminar el Remito",
                text: "Algo salió mal y no pudo realizarse la acción. Por favor reintente o pruebe con cerrar y volver a " +
                    "abrir el programa. Si este error persiste comuníquese con soporte para recibir " +
                    "ayuda avanzada. (Información del Error: " + error.message + ")",
                footer: '<a href="mailto:cristianbazan.cr@gmail.com">Contactar con Soporte</a>'
            });
        });
}