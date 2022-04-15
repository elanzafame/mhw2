function response(event) {
    const boxes=event.currentTarget;
    const id= boxes.dataset.questionId;
    const idc= boxes.dataset.choiceId;
    const box= document.querySelectorAll('.choice-grid div');
    
    for (const s of box){
        if(s.dataset.questionId===id){
            s.classList.add('overlay');
            const img=s.querySelector('.checkbox');
            img.src='images/unchecked.png';
        }
    }
    boxes.classList.remove('overlay');
    boxes.classList.add('response');
    const images=boxes.querySelector('.checkbox');
    images.src="images/checked.png";
    delete score[id];
    score[id]=idc;
    control();
}

const boxes = document.querySelectorAll('.choice-grid div');
for(const boxe of boxes){
    boxe.addEventListener('click',response);
}

const score={
    one: '',
    two: '',
    three:''
};

function control (){
        if(score.one!=='' && score.two!=='' && score.three !==''){
            const boxes = document.querySelectorAll('.choice-grid div');
            getResult();
            for(const boxe of boxes){
                boxe.removeEventListener('click', response);
            }
        }   
       
}

function getResult(){
    const p = personality();
    const resultContainer= document.querySelector('#result');
    const text=resultContainer.querySelector('p');
    const header=resultContainer.querySelector('h1');
    header.textContent = RESULTS_MAP[p].title;
    text.textContent = RESULTS_MAP[p].contents;
    resultContainer.classList.remove('hidden');
}

function personality(){
    if(score.one===score.two ||score.one===score.three || (score.one!==score.two && score.one!==score.three && score.two!==score.three)){
        console.log(score.one);
        return score.one;
    }
    if(score.two===score.three){
        console.log(score.two);
        return score.two;
    }

} 

function reStart(){
    const resultContainer=document.querySelector('#result');
    resultContainer.classList.add('hidden');
    score.one='';
    score.two='';
    score.three='';
    for (const section of boxes){
        section.classList.remove('overlay');
        section.classList.remove('response');
        section.classList.add('section');
        const img=section.querySelector('.checkbox');
        img.src='images/unchecked.png';
        section.addEventListener('click', response);
    }
}
const button=document.querySelector('button');
button.addEventListener('click', reStart);


