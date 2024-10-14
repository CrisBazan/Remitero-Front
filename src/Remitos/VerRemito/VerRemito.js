let client = {name:null, date:null};

document.addEventListener('DOMContentLoaded', function (){

    const remito = getQueryParams();
    fetchRemito(remito.nRemito).then(fetchOwner);
});

async function fetchRemito(remitoId) {

    await fetch(`http://localhost:8080/remito/${remitoId}`)
        .then(response => response.json())
        .then(remito => {
            completeAll(remito)
        })
        .catch(error => console.error('Error al obtener los detalles del remito:', error));
}

function completeAll(remito) {

    client.name = remito.client.name;
    client.date = remito.date;

    addDetails(remito.detail);
    addClient(remito.client);
    addDateAndObservation(remito.date, remito.id, remito.observations);
    addTotal(remito.total);
}

function addDetails(detail) {

    const details = detail || [];

    for (let i = 0; i < details.length; i++) {

        let detail = details[i];

        let newRow = document.createElement('tr');

        let tdDate = document.createElement('td');
        tdDate.textContent = valorOEspacio(detail.date);
        newRow.appendChild(tdDate);

        let tdDesc = document.createElement('td');
        tdDesc.textContent = valorOEspacio(detail.description);
        newRow.appendChild(tdDesc);

        let tdCant = document.createElement('td');
        tdCant.textContent = valorOCero(detail.quantity);
        newRow.appendChild(tdCant);

        let tdPTot = document.createElement('td');
        tdPTot.textContent = '$' + valorOCero(detail.ptotal);
        newRow.appendChild(tdPTot);

        document.getElementById("details-table").appendChild(newRow);
    }
}

function valorOEspacio(valor) {

    if (valor == null){

        return ' ';
    }else {

        return valor;
    }
}

function valorOCero(valor) {

    if (valor == null){

        return '0';
    }else {

        return valor;
    }
}

function addClient(client) {

    document.getElementById('clientName').innerHTML = client.name;
    document.getElementById('clientCuit').innerHTML = client.cuit;
    document.getElementById('clientAddress').innerHTML = client.address;
}

function getQueryParams() {

    const urlValues = window.location.search;
    const params = new URLSearchParams(urlValues);
    return {
        nRemito: params.get('nRemito')
    };
}

function addDateAndObservation(date, nRemito, observations) {

    document.getElementById('date').innerHTML = date.toString();
    document.getElementById('clientNRemito').innerHTML = nRemito.toString();
    if (observations == null){

        document.getElementById('observations').innerHTML = '<b>Observaciones: </b>';
    } else {

        document.getElementById('observations').innerHTML = '<b>Observaciones: </b>' + observations;
    }
}

function addTotal(total) {

    total = valorOCero(total);

    let newRow = document.createElement('tr');

    let tdTotal = document.createElement('td');
    tdTotal.innerHTML = "<strong>Total:</strong>";
    tdTotal.colSpan = 3;
    tdTotal.style.textAlign = 'right';
    newRow.appendChild(tdTotal);

    let tdValor = document.createElement('td');
    tdValor.textContent = '$' + total.toString();
    newRow.appendChild(tdValor);

    document.getElementById("details-table").appendChild(newRow);
}

function fetchOwner() {
    fetch('http://localhost:8080/owner')
        .then(response => response.json())
        .then(owner => {
            if (owner.name !== null){

                document.getElementById('Pname').textContent = owner.name;
                document.getElementById('PcuitDireccion').textContent = "CUIT: " + owner.cuit + " | Dirección: " + owner.address;
                document.getElementById('PtelEmail').textContent = "Tel: " + owner.telephone + " | Email: " + owner.email;
            }else {

                isNewOwner = true;
            }
        })
        .catch(error => Swal.fire({
            icon: "error",
            title: "Error al obtener los datos personales",
            text: "Algo salió mal y no pudo realizarse la acción. Por favor reintente o pruebe con cerrar y volver a " +
                "abrir el programa. Si este error persiste comuníquese con soporte para recibir " +
                "ayuda avanzada. (Información del Error: " + error.message + ")",
            footer: '<a href="mailto:cristianbazan.cr@gmail.com">Contactar con Soporte</a>'
        }));
}

function generarPDF() {
    const {jsPDF} = window.jspdf;

    const content = document.getElementById('content');

    html2canvas(content, {scale: 3}).then(canvas => {

        const contentWidth = canvas.width;
        const contentHeight = canvas.height;

        const orientation = contentWidth > contentHeight ? 'landscape' : 'portrait';

        const doc = new jsPDF({
            orientation: orientation,
            unit: 'mm',
            format: 'a4'
        });

        const imgData = canvas.toDataURL('image/png');

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 10;

        const xOffset = (doc.internal.pageSize.getWidth() - imgWidth) / 2;

        doc.addImage(imgData, 'PNG', xOffset, position, imgWidth, imgHeight);

        heightLeft -= pageHeight;

        // Si la imagen es más alta que la primera página, agregar nuevas páginas
        while (heightLeft > 0) {
            position = heightLeft - imgHeight; // Nueva posición de la imagen
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        doc.save(client.name + client.date + '.pdf');//TODO: revisar name!

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Se ha comenzado la descarga del remito: ${client.name}${client.date}.pdf\nRevise su carpeta de descargas`,
            showConfirmButton: true,
            timer: 15000
        });
    });
}