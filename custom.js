"use strict";

function Exam(code, name, credits, date, score, laude=false) {
    this.code = code;
    this.name = name;
    this.credits = credits;
    this.score = score;
    this.laude = laude;
    this.date = dayjs(date);
  
  
};

function ExamList(){

    this.List = [];

    this.init = () =>{
        this.List.push(
            new Exam('02GOL','Architetture sistemi', 10, '2021-02-08',28, false),
            new Exam('02TRE','Matematica fortissima', 10, '2019-01-06',25, false),
            new Exam('02FER','Fisisca potente', 10, '2020-03-12',31, true)
        )
    }

    this.getAll = () => {
        return this.List;
    }

    this.get2021 = () => {
        return this.List.filter(exam => exam.date.isAfter('2021-01-01'));
    }

}

//DOM manipulation

function createExamRow(e){

    return `<tr>
    <td>${e.date.format('DD/MM/YYYY')}</td>
    <td>${e.name}</td>
    <td>${e.credits}</td>
    <td>${e.score}${e.laude ? "L" : ""}</td>
    <td><button class="btn btn-danger">X</button></td>
    </tr>`;

}

function creaRiga(e){

    const tr = document.createElement('tr');

    const tdDate = document.createElement('td');
    tdDate.innerText = e.date.format('DD/MM/YYYY');
    tr.appendChild(tdDate);

    const tdName = document.createElement('td');
    tdName.innerText = e.name;
    tr.appendChild(tdName);

    const tdCred = document.createElement('td');
    tdCred.innerText = e.credits;
    tr.appendChild(tdCred);

    const tdScore = document.createElement('td');
    tdScore.innerText = e.score;
    tr.appendChild(tdScore);

    const tdButton = document.createElement('td');
    tdButton.innerHTML = `<button id="${e.code}" class="btn btn-danger">X</button>`;
    tr.appendChild(tdButton);

    



    return tr;
}

function fillExamTable(exams){
    const t = document.getElementById("examTable");
    for (const e of exams){

        const el = creaRiga(e);
        t.prepend(el);
        
        /* const el = createExamRow(e);
        t.insertAdjacentHTML('afterbegin',el); */
    }
    

}

function initTable(){
    const t = document.getElementById("examTable");
    t.innerHTML= `<tr>
            <td><input class="form-control" type="date"></td>
            <td><input class="form-control" type="text"></td>
            <td><input class="form-control" type="text" size="2"></td>
            <td><input class="form-control" type="text" size="3"></td>
            <td><button class="btn btn-success">+</button></td>
        </tr>`

}

/* Event listener & handler */
document.querySelector("#filter-2021").addEventListener('click', (event) => {
    const exams = examList.get2021();
    initTable();
    fillExamTable(exams);
})

document.querySelector("#filter-all").addEventListener('click', (event) => {
    const exams = examList.getAll();
    initTable();
    fillExamTable(exams);
})


//main
const examList = new ExamList();
examList.init();

//reimpire tabella esami
const exams = examList.getAll();
fillExamTable(exams);

document.querySelector("#02GOL").addEventListener('click', (event) => {
    console.log("cancello "+event.target.id);
})


