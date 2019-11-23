function generateTableHead(table) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    let key = ["Rekening Terkait","Jenis","Jumlah","Waktu Transaksi"];
    for (let i = 0;i<4;i++) {
        let th = document.createElement("th");
        let text = document.createTextNode(key[i]);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function createTable(table, cols) {
    for (let element of cols) {
        let row = table.insertRow();
        for (let key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

export function CreateTable(data){
    let table = document.querySelector("table");
    createTable(table, data); // generate the table first
    generateTableHead(table); // then the head
}