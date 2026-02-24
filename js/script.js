let interveiwList = [];
let rejectedList = [];
let currentStatus = 'all'

const total = document.getElementById('total-count');
const interveiw = document.getElementById('interview-count');
const rejected = document.getElementById('rejected-count');


const totalJobs = document.querySelectorAll('.total-job-count');
const totalInterviewCount = document.getElementById('total-interview-count')
const totalRejectCount = document.getElementById('total-reject-count')


const totalJob = document.getElementById('total-job')
const totalInterviewCountList = document.getElementById('total-interview-count-list')
const totalRecjectCountList = document.getElementById('total-reject-count-list')


const allcard = document.getElementById('allcards');
const maincontainer = document.querySelector('main');
const filteredSection = document.getElementById('filtered-section');
const emptyJobs = document.getElementById('empty-jobs')


function calculateCount() {
    total.innerText = allcard.children.length;
    interveiw.innerText = interveiwList.length;
    rejected.innerText = rejectedList.length;
    for (let totalJob of totalJobs) {
        totalJob.innerText = allcard.children.length
    }

    totalInterviewCount.innerText = interveiwList.length
    totalRejectCount.innerText = rejectedList.length


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
    currentStatus = id

    selected.classList.add('btn-primary');

    if (id == 'interview-btn') {
        allcard.classList.add('hidden');
        filteredSection.classList.remove('hidden');

        totalInterviewCountList.classList.remove('hidden')
        totalRecjectCountList.classList.add('hidden')
        totalJob.classList.add('hidden')

        renderInterveiw()

    } else if (id == 'all-btn') {
        allcard.classList.remove('hidden');
        filteredSection.classList.add('hidden');
        if(allcard.children.length == 0){
            emptyJobs.classList.remove('hidden')
        }

        totalJob.classList.remove('hidden');
        totalInterviewCountList.classList.add('hidden')
        totalRecjectCountList.classList.add('hidden')
    } else if (id == 'rejected-btn') {
        allcard.classList.add('hidden');
        filteredSection.classList.remove('hidden');

        totalRecjectCountList.classList.remove('hidden');
        totalJob.classList.add('hidden');
        totalInterviewCountList.classList.add('hidden')

        renderReject()
    }

}

function updateMainCardUI(companyName, status) {
    const mainCards = allcard.querySelectorAll('.cards');
    mainCards.forEach(card => {
        if (card.querySelector('.companies').innerText === companyName) {
            const statusBtn = card.querySelector('.job-status');
            statusBtn.innerText = status;

            // ডিজাইন আপডেট
            if (status === 'INTERVIEWED') {
                card.className = "cards bg-white rounded-lg p-6 flex justify-between border border-green-400 border-l-8";
                statusBtn.className = "job-status btn text-green-500 font-medium leading-5 bg-green-200 border-green-500";
            } else if (status === 'REJECTED') {
                card.className = "cards bg-white rounded-lg p-6 flex justify-between border border-red-400 border-l-8";
                statusBtn.className = "job-status btn text-red-600 font-medium leading-5 bg-red-200 border-red-600";
            }
        }
    });
}

maincontainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-interview')) {
        const parentNode = event.target.parentNode.parentNode.parentNode;
        parentNode.classList.remove('border-gray-300')
        parentNode.classList.remove('border-red-400')
        parentNode.classList.add('border-green-400')
        const companies = parentNode.querySelector('.companies').innerText;
        const jobType = parentNode.querySelector('.job-type').innerText;
        const jobInfo = parentNode.querySelector('.job-info').innerText;
        const jobExperience = parentNode.querySelector('.job-experience').innerText;
        const jobStatus = parentNode.querySelector('.job-status').innerText;
        parentNode.querySelector('.job-status').innerText = 'INTERVIEWED'
        updateMainCardUI(companies, 'INTERVIEWED');


        parentNode.querySelector('.job-status').classList.remove('border-red-500')
        parentNode.querySelector('.job-status').classList.remove('text-red-500')
        parentNode.querySelector('.job-status').classList.remove('bg-red-200')
        parentNode.querySelector('.job-status').classList.add('border-green-500')
        parentNode.querySelector('.job-status').classList.add('text-green-500')
        parentNode.querySelector('.job-status').classList.add('bg-green-200')



        const cardInfo = {
            companies,
            jobType,
            jobInfo,
            jobStatus: 'INTERVIEWED',
            jobExperience
        }

        const companiesExist = interveiwList.find(item => item.companies == cardInfo.companies);
        if (!companiesExist) {
            interveiwList.push(cardInfo);
        }
        rejectedList = rejectedList.filter(item => item.companies != cardInfo.companies);
        if (currentStatus == 'rejected-btn') {
            renderReject()
        }

        calculateCount()



    } else if (event.target.classList.contains('btn-rejected')) {
        const parentNode = event.target.parentNode.parentNode.parentNode;
        parentNode.classList.remove('border-gray-300')
        parentNode.classList.remove('border-green-400')
        parentNode.classList.add('border-red-400')
        const companies = parentNode.querySelector('.companies').innerText;
        const jobType = parentNode.querySelector('.job-type').innerText;
        const jobInfo = parentNode.querySelector('.job-info').innerText;
        const jobExperience = parentNode.querySelector('.job-experience').innerText;
        const jobStatus = parentNode.querySelector('.job-status').innerText;
        parentNode.querySelector('.job-status').innerText = 'REJECTED';
        updateMainCardUI(companies, 'REJECTED');

        parentNode.querySelector('.job-status').classList.remove('border-green-500')
        parentNode.querySelector('.job-status').classList.remove('text-green-500')
        parentNode.querySelector('.job-status').classList.remove('bg-green-200')
        parentNode.querySelector('.job-status').classList.add('border-red-500')
        parentNode.querySelector('.job-status').classList.add('text-red-500')
        parentNode.querySelector('.job-status').classList.add('bg-red-200')


        const cardInfo = {
            companies,
            jobType,
            jobInfo,
            jobExperience,
            jobStatus: 'REJECTED'
        }

        const companiesExist = rejectedList.find(item => item.companies == cardInfo.companies);
        if (!companiesExist) {
            rejectedList.push(cardInfo);
        }
        interveiwList = interveiwList.filter(item => item.companies != cardInfo.companies);

        if (currentStatus == 'interview-btn') {
            renderInterveiw()
        }

        calculateCount();
    } else if (event.target.closest('.delete-btn')) {

        const card = event.target.closest('.cards');
        const jobCompany = card.querySelector('.companies').innerText;

        interveiwList = interveiwList.filter(
            item => item.companies !== jobCompany
        );


        rejectedList = rejectedList.filter(
            item => item.companies !== jobCompany
        );


        card.remove();

        calculateCount();

        if (currentStatus === 'interview-btn') {
            renderInterveiw();
        } else if (currentStatus === 'rejected-btn') {
            renderReject();
        }
    }



})

function renderInterveiw() {
    filteredSection.innerHTML = '';
    if (interveiwList.length == 0) {
        emptyJobs.classList.remove('hidden')
        return;
    } else {
        emptyJobs.classList.add('hidden')
    }

    for (let interveiws of interveiwList) {
        let div = document.createElement('div');
        div.className = "cards  bg-white rounded-lg p-6 flex justify-between border border-green-400 border-l-8 "
        div.innerHTML = `
                       <div class="space-y-6">
                            <div>
                                <p class="companies text-[18px] font-semibold text-[#002C5C] leading-[26px]">${interveiws.companies}</p>
                                <p class="job-type text-[#64748B] leading-[22px]">${interveiws.jobType}</p>
                            </div>
                            <p class="job-info text-[#64748B] text-[14px] leading-5">${interveiws.jobInfo}</p>
                            <p class="job-status btn border-green-500 text-green-500 font-medium leading-5 bg-green-200">${interveiws.jobStatus}</p>
                            <p class="job-experience">${interveiws.jobExperience}</p>
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



function renderReject() {
    filteredSection.innerHTML = '';
     if (rejectedList.length == 0) {
        emptyJobs.classList.remove('hidden')
        return;
    } else {
        emptyJobs.classList.add('hidden')
    }
    for (let reject of rejectedList) {
        let div = document.createElement('div');
        div.className = "cards  bg-white rounded-lg p-6 flex justify-between border border-red-400 border-l-8"
        div.innerHTML = `
               <div class="space-y-6">
                    <div>
                        <p class="companies text-[18px] font-semibold text-[#002C5C] leading-[26px]">${reject.companies}</p>
                        <p class="job-type text-[#64748B] leading-[22px]">${reject.jobType}</p>
                    </div>
                    <p class="job-info text-[#64748B] text-[14px] leading-5">${reject.jobInfo}</p>
                    <p class="job-status border-red-600 text-red-600 btn font-medium leading-5 bg-red-200">${reject.jobStatus}</p>
                    <p class="job-experience">${reject.jobExperience}</p>
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
