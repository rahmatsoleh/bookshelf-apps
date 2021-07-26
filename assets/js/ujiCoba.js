let dataMaster = [
    {
        id: 123456789,
        title: 'Web Programming',
        author: 'Dicoding',
        year: 2021,
        isComplete: true
    },
    {
        id: 3652145236,
        title: 'Front End Development',
        author: 'Rahmat Soleh, S.Kom',
        year: 2021,
        isComplete: false
    }
];

let stringData = JSON.stringify(dataMaster);
let dataJson = localStorage.getItem('master');
let dataHasil = JSON.parse(dataJson);