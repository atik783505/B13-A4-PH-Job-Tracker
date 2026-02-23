let interveiwList = [];
let rejectedList = [];

const total = document.getElementById('total-count');
const interveiw = document.getElementById('interview-count');
const rejected = document.getElementById('rejected-count');

const allcard = document.getElementById('allcards');
const maincontainer = document.querySelector('main');
const filteredSection = document.getElementById('filtered-section');


function calculateCount() {
    total.innerText = allcard.children.length;
    interveiw.innerText = interveiwList.length;
    rejected.innerText = rejectedList.length;

}
calculateCount()


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

maincontainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-interview')) {
        const parentNode = event.target.parentNode.parentNode;
        const companies = parentNode.querySelector('.companies').innerText;
        const jobType = parentNode.querySelector('.job-type').innerText;
        const jobInfo = parentNode.querySelector('.job-info').innerText;
        const jobStatus = parentNode.querySelector('.job-status').innerText;

        const cardInfo = {
            companies,
            jobType,
            jobInfo,
            jobStatus
        }

        const companiesExist = interveiwList.find(item => item.companies == cardInfo.companies);
        parentNode.querySelector('.job-status').innerText = 'INTERVIEWED'
        if (!companiesExist) {
            interveiwList.push(cardInfo);
        }
        renderInterveiw()
    }

})

function renderInterveiw() {
    filteredSection.innerHTML = '';

    for (let interveiws of interveiwList) {
        console.log(interveiws)
        let div = document.createElement('div');
        div.className = "cards  bg-white rounded-lg p-6 flex justify-between border border-gray-300 border-l-8"
        div.innerHTML = `
               <div class="space-y-6">
                    <div>
                        <p class="companies text-[18px] font-semibold text-[#002C5C] leading-[26px]">Mobile First Corp</p>
                        <p class="job-type text-[#64748B] leading-[22px]">React Native Developer</p>
                    </div>
                    <p class="job-info text-[#64748B] text-[14px] leading-5">Remote
                        •
                        Full-time
                        •
                        $130,000 - $175,000</p>
                    <p class="job-status btn text-[#002C5C] font-medium leading-5 bg-[#EEF4FF]">Not Applied</p>
                    <p>Build cross-platform mobile applications using React Native. Work on products used by millions of
                        users worldwide.</p>
                    <div class="flex gap-2">
                        <button class="btn btn-interview border-green-500 text-green-500">INTERVIEW</button>
                        <button class="btn btn-rejected border-red-600 text-red-600">REJECTED</button>
                    </div>
                </div>
                <div>
                    <button class="btn delete-btn rounded-full"><i class="fa-regular fa-trash-can"></i></button>
                </div>
        `
        filteredSection.appendChild(div);
    }
}
