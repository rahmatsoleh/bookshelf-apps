const tambahBuku = document.querySelector('.tambah-data');

const keywords = document.getElementById('keyword');

const modal = document.getElementById('modal');
const formElement = document.querySelector('.modal form');
const idBuku = document.getElementById('id');
const judulBuku = document.getElementById('judul');
const penulis = document.getElementById('penulis');
const tahun = document.getElementById('tahun');
const status = document.getElementById('status');
const simpan = document.getElementById('submit');
const cancelModal = document.getElementById('cancel');

const menu = document.querySelector('aside ul');
const listItem = document.querySelectorAll('.menu');
const articles = document.getElementsByTagName('article');
const dataTable = document.querySelector('#home table tbody');
const rakBaca = document.getElementById('reading');
const rakSelesai = document.getElementById('finish');

const tbody = document.querySelector('tbody');

const reading = document.getElementById('reading');
const finish = document.getElementById('finish');



tambahBuku.addEventListener('click', function () {
    modal.classList.remove('d-none');
    idBuku.value = +new Date();
    modal.querySelector('h1').innerText = "Menambahkan Data Buku";
    judulBuku.value = '';
    penulis.value = '';
    tahun.value = null;
    status.value = false;
});

cancelModal.addEventListener('click', function () {
    modal.classList.add('d-none');
    modal.querySelector('h1').innerText = "Menambahkan Data Buku";
    judulBuku.value = '';
    penulis.value = '';
    tahun.value = null;
    status.value = false;
});

menu.addEventListener('click', function (e) {
    let item = e.target;
    let view = item.getAttribute('data-menu');

    for (let i of listItem) {
        
        if (item.getAttribute('class') == 'menu') {

            i.classList.remove('active');
            
            for (let article of articles) {
                if (article.getAttribute('id') == view) {
                    article.classList.remove('d-none');
                } else {
                    article.setAttribute('class', 'd-none');
                }
            }
        }

    }

    if (item.getAttribute('class') != null) {
        item.classList.toggle('active');
    }

    
});





