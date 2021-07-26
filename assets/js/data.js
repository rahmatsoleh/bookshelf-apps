const keyStorage = 'bookshelf_app';
let dataBuku = dataStorage(keyStorage);
let dataSearch = [];




tampilkanData(dataBuku, dataTable);


reading.addEventListener('click', function (shoot) {
    let aksi = shoot.target.getAttribute('class');

    action(aksi, shoot);
        
})


finish.addEventListener('click', function (shoot) {
    let aksi = shoot.target.getAttribute('class');

    action(aksi, shoot);
    
    
})


keywords.addEventListener('input', function () {
    dataSearch = [];
    let word = keywords.value.toLowerCase();
    
    for (let buku of dataBuku) {
        if (buku.title.toLowerCase().includes(word)) {
            dataSearch.push(buku);
        }
    }

    tampilkanData(dataSearch, dataTable);
})


formElement.addEventListener('submit', function () {
    event.preventDefault();
    let dataKoleksi = {
        id: idBuku.value,
        title: judulBuku.value,
        author: penulis.value,
        year: parseInt(tahun.value),
        isComplete: (status.value === 'true') ? true:false
    }

    let index = 0;
    for (let i = 0; i < dataBuku.length; i++){
        if (dataBuku[i].id == dataKoleksi.id) {
            index = i;
        }
    }

    if (dataBuku.length == 0) {
        dataBuku.push(dataKoleksi);
        alert('Data Berhasil di Tambahkan...');
    }
    else if (dataBuku[index].id == dataKoleksi.id) {
        alert(`Data ${dataBuku[index].title} Berhasil di Update...`);
        dataBuku.splice(index, 1, dataKoleksi);
        
    } else {
        alert(`Data ${dataKoleksi.title} Berhasil di Tambahkan...`);
        dataBuku.push(dataKoleksi);
    }
    
    createStorage(keyStorage, dataBuku);
    clearValue();
    tampilkanData(dataBuku, dataTable);
    modal.classList.add('d-none');
    
});


tbody.addEventListener('click', function (e) {
    let rows = e.target.parentNode.parentNode;
    let dataId = rows.querySelector('.id').innerText;
    let index = 0;

    for (let i = 0; i < dataBuku.length; i++){
        if (dataBuku[i].id == dataId) {
            index = i;
        }
    }
    
    if (e.target.getAttribute('data-aksi') == 'hapus') {
        let confirmasi = confirm(`Apakah anda yakin ingin menghapus buku ${dataBuku[index].title} ?`);

        if (confirmasi) {
            alert(`Data Buku ${dataBuku[index].title} telah di hapus`);
            dataBuku.splice(index, 1);
            createStorage(keyStorage, dataBuku);
            tampilkanData(dataBuku, dataTable);
            
        }
        
    }

    else if (e.target.getAttribute('data-aksi') == 'edit') {
        modal.classList.remove('d-none');
        modal.querySelector('h1').innerText = "Edit Data Buku";
        idBuku.value = dataBuku[index].id;
        judulBuku.value = dataBuku[index].title;
        penulis.value = dataBuku[index].author;
        tahun.value = dataBuku[index].year;
        status.value = dataBuku[index].isComplete;
    }

    keywords.value = '';
    keywords.focus();

})






function tampilkanData(data, tabel) {
    let list = '';

    if (data.length != 0) {
        for (let i = 0; i < data.length; i++) {
            list += `<tr>
                        <td>${i + 1}</td>
                        <td class='id'>${data[i].id}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].author}</td>
                        <td>${data[i].year}</td>
                        <td>${(data[i].isComplete) ? `Selesai di Baca` : `Belum Selesai di Baca`}</td>
                        <td>
                        <button class="edit fas fa-edit" data-aksi="edit"></button>
                        <button class="hapus fas fa-trash-alt" data-aksi="hapus"></button>
                        </td>
                    </tr>`;
        }

    } else {
        list += `<tr>
                    <td colspan = '7' style="text-align: center;"><h1 style="color: red;">Data Masih Kosong !</h1></td>
                </tr>`
    }



    tabel.innerHTML = list;
    rakBuku(data, rakBaca, rakSelesai);

    dataBuku = dataStorage(keyStorage);
}



function rakBuku(dataBuku, rakBaca, rakSelesai) {
    rakBaca.innerHTML = "";
    rakSelesai.innerHTML = "";

    let sumReading = 0;
    let sumFinish = 0;
    for (let buku of dataBuku) {
        (buku.isComplete) ? sumFinish++ : sumReading++;
    }

    if (sumReading == 0) {
        rakBaca.innerHTML = `<h1 style="text-align : center; color: red"><i>Rak Baca Masih Kosong !</i></h1>`;
    }

    if (sumFinish == 0) {
        rakSelesai.innerHTML = `<h1 style="text-align : center; color: red"><i>Belum Ada Buku Yang Sudah di Baca !</i></h1>`;
    }

    for (let buku of dataBuku) {
        let section = document.createElement('section');
        let data = document.createElement('div');
        let judulBuku = document.createElement('h2');
        let penulis = document.createElement('p');
        let tahun = document.createElement('p');
        let status = document.createElement('p');
        let action = document.createElement('div');
        let hapus = document.createElement('img');
        let clear = document.createElement('img');
        let id = document.createElement('p');

        judulBuku.setAttribute('class', 'judul');
        data.setAttribute('class', 'data');
        status.setAttribute('class', 'status');
    
        if (buku.isComplete) {

            judulBuku.innerText = buku.title;
            id.innerText = buku.id;
            id.classList.add('id-buku');
            id.classList.add('d-none');
            penulis.innerText = 'Penulis : ' + buku.author;
            tahun.innerText = 'Tahun : ' + buku.year;
            status.innerText = "Selesai di Baca";
            data.append(judulBuku, id, penulis, tahun, status);
    
            action.setAttribute('class', 'action');
            clear.setAttribute('src', 'assets/img/undo.svg');
            clear.setAttribute('class', 'move');
            hapus.setAttribute('src', 'assets/img/trash.svg');
            hapus.setAttribute('class', 'trash');
            action.append(clear, hapus);
            
            section.append(data,action);
            
            rakSelesai.append(section);
    
        } else {
            let section = document.createElement('section');
            let data = document.createElement('div');
            let judulBuku = document.createElement('h2');
            let penulis = document.createElement('p');
            let tahun = document.createElement('p');
            let status = document.createElement('p');
            let action = document.createElement('div');
            let hapus = document.createElement('img');
            let clear = document.createElement('img');

            judulBuku.setAttribute('class', 'judul');
            data.setAttribute('class', 'data');
            status.setAttribute('class', 'status');
            
            judulBuku.innerText = buku.title;
            id.innerText = buku.id;
            id.classList.add('id-buku');
            id.classList.add('d-none');
            penulis.innerText = 'Penulis : ' + buku.author;
            tahun.innerText = 'Tahun : ' + buku.year;
            status.innerText = "Belum selesai di Baca";
            data.append(judulBuku, id, penulis, tahun, status);
    
            action.setAttribute('class', 'action');
            clear.setAttribute('src', 'assets/img/check.svg');
            clear.setAttribute('class', 'move');
            hapus.setAttribute('src', 'assets/img/trash.svg');
            hapus.setAttribute('class', 'trash');
    
            action.append(clear, hapus);
            
            section.append(data,action);
            
            rakBaca.append(section);
        }
    }
}


function clearValue() {
    keywords.value = '';
    keywords.focus();
    judulBuku.value = '';
    penulis.value = '';
    tahun.value = null;
    status.value = true;
}


function action(aksi, evt) {
    let article = evt.target.parentNode.parentNode.parentNode.getAttribute('id');
    let ambilSection = evt.target.parentNode.parentNode;
    let getId = ambilSection.querySelector('.id-buku').innerText;
    let getJudul = ambilSection.querySelector('.judul').innerText;
    let index = 0;
    
    for (let i = 0; i < dataBuku.length; i++){
        if (dataBuku[i].id == getId) {
            index = i;
        }
    }


    if (aksi == 'move') {
        let selesaiBaca = `Apakah anda sudah selesai membaca buku ${getJudul} ?`;
        let kembaliBaca = `Apakah anda ingin membaca buku ${getJudul} kembali ?`;
        
        let konfirmasi;

        (article == 'reading') ? konfirmasi = confirm(selesaiBaca) : konfirmasi = confirm(kembaliBaca);

        if (konfirmasi) {
            
            if (dataBuku[index].isComplete) {
                dataBuku[index].isComplete = false;
                createStorage(keyStorage, dataBuku);
            } else {
                dataBuku[index].isComplete = true;
                createStorage(keyStorage, dataBuku);
            }
        }

    }

    if (aksi == 'trash') {
        let konfirmasi = confirm(`Apakah anda yakin ingin menghapus buku ${getJudul} ?`)
        
        if (konfirmasi) {
            dataBuku.splice(index, 1);
            createStorage(keyStorage, dataBuku);
        };

    }

    window.location.reload();
}


function dataStorage(key) {
    if (typeof (Storage) !== 'undefined') {
        if (localStorage.getItem(key) != null) {
            let dataString = localStorage.getItem(key);
            let dataHasil = JSON.parse(dataString);
            return dataHasil;
        } else {
            return [];
        }
    }
    else {
        alert('Mohon maaf, browser tidak mendukung \n Mohon untuk beralih ke browser lain');
    }
}


function createStorage(key, data) {
    let stringData = JSON.stringify(data);
    localStorage.setItem(key, stringData);
}