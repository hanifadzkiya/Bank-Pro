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

function createTable(table, data) {
    let nice = {
        "nama" : "Nama",
        "namaBank" : "Nama Bank",
        "noRekening" : "Nomor Rekening",
        "saldo" : "Saldo"
    }
    for (let content in data) {
        if(content != "id"){
            let row = table.insertRow();
            let keyCell = row.insertCell();
            let key = document.createTextNode(nice[content]);
            keyCell.appendChild(key);
            let valueCell = row.insertCell();
            let value = document.createTextNode(data[content]);
            valueCell.appendChild(value);
        }
    }
    
}

export function ShowDetailRekening(data){
    let table = document.querySelector("table");
    createTable(table, data); // generate the table first
}