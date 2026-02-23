const total = document.getElementById('total-count');
const interveiw = document.getElementById('interview-count');
const rejected = document.getElementById('rejected-count');

const allcard = document.getElementById('allcards');
const maincontainer = document.querySelector('main')



total.innerText = allcard.children.length;


function toggle(id) {
    const allBtn = document.getElementById('all-btn');
    const interveiwBtn = document.getElementById('interview-btn');
    const rejectedBtn = document.getElementById('rejected-btn')

    allBtn.classList.remove("btn-primary");
    interveiwBtn.classList.remove("btn-primary");
    rejectedBtn.classList.remove("btn-primary");


    const selected = document.getElementById(id);

    selected.classList.add('btn-primary');

}