
const levelContainer = document.querySelector('#level-container');
const lessonsBtn = document.querySelector('#lessons-btn');
const wordCntainer = document.querySelector('#word-container');


// create HTML element for word synonyms
const createHTMLElements = (arr) => {
    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`)
    return htmlElements.join(" ");
}

// spinner 
const manageSpinner = (status) => {
    if(status === true){
        document.getElementById('spinner').classList.remove('hidden')
        document.getElementById('word-container').classList.add('hidden')
    }else{
        document.getElementById('spinner').classList.add('hidden')
        document.getElementById('word-container').classList.remove('hidden')
    }
}

// load lessons
const loadLessons = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all'
    fetch(url)
        .then(res => res.json())
        .then(data => displayLesson(data))
}

const removeActiveClass = () => {
    const lessonButtons = document.querySelectorAll('.lesson-btn')
    lessonButtons.forEach(btn => btn.classList.remove('active'))
}

// load words
const loadLevelWord = (id) => {
    manageSpinner(true);

    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => {

        removeActiveClass(); // remove active class from btn

        const clickedBtn = document.getElementById(`lesson-btn-${id}`)
        clickedBtn.classList.add('active') // add active class to btn
        displayLevelWords(data.data)

    })
}

// load word details
const loadWordDetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}

// {
//     "word": "Grateful",
//     "meaning": "কৃতজ্ঞ",
//     "pronunciation": "গ্রেটফুল",
//     "level": 3,
//     "sentence": "I am grateful for your help.",
//     "points": 3,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "thankful",
//         "appreciative",
//         "obliged"
//     ],
//     "id": 7
// }

const displayWordDetails = (word) => {
    console.log(word);
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
    <h3 class="text-2xl font-bold">${word.word} <i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation}</h3>
        <div>
          <h4>${word.word}</h4>
          <p>${word.meaning}</p>
        </div>
        <div>
          <h4>Example</h4>
          <p>${word.sentence}</p>
        </div>
        <div>
          <h4>সমার্থক শব্দ গুলো</h4>
            <div>${createHTMLElements(word.synonyms)}</div>
        </div>
        `
    document.getElementById('word_modal').showModal();

}


// display level words
const displayLevelWords = (words) => {
     wordCntainer.innerHTML = "";

    //  show message when no data found
    if(words.length == 0){
        wordCntainer.innerHTML = `
        <div class="text-center bg-sky-100 col-span-full rounded-xl py-10 space-y-6 font-bangla">
            <img class="mx-auto" src="./assets/alert-error.png"/>
            <p class="text-xl font-medium text-gray-600">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি!</p>
            <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান।</h2>
         </div>
        `
        manageSpinner(false);
        return;
    }

     words.forEach(word => {
        const card = document.createElement('div');
        card.innerHTML =  `
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="text-3xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="">Meaning/Pronounciation</p>
            <p class="text-2xl font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronounciation নেই"}</p>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordCntainer.appendChild(card)
     })

     manageSpinner(false);
}



const displayLesson = (lessons) => {
    lessonsData = lessons.data;
    lessonsData.forEach(lesson => {
        lessonsBtn.innerHTML += `
            <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
             </button>
        `
    });
}



loadLessons()