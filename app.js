
const levelContainer = document.querySelector('#level-container');
const lessonsBtn = document.querySelector('#lessons-btn');
const wordCntainer = document.querySelector('#word-container');


// load lessons
const loadLessons = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all'
    fetch(url)
        .then(res => res.json())
        .then(data => displayLesson(data))
}


// load words
const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayLevelWords(data.data))
}

// {
//     "id": 8,
//     "level": 2,
//     "word": "Hesitate",
//     "meaning": "দ্বিধা করা",
//     "pronunciation": "হেজিটেট"
// }
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
        return;
    }

     words.forEach(word => {
        const card = document.createElement('div');
        card.innerHTML =  `
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
            <h2 class="text-3xl font-bold">${word.word}</h2>
            <p class="">Meaning/Pronounciation</p>
            <p class="text-2xl font-bangla">"${word.meaning} / ${word.pronunciation}</p>
            <div class="flex justify-between items-center">
                <button class="btn bg-[#1A91FF10]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordCntainer.appendChild(card)
     })
}



const displayLesson = (lessons) => {
    lessonsData = lessons.data;
    lessonsData.forEach(lesson => {
        lessonsBtn.innerHTML += `
            <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary "> <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        `
    });
}



loadLessons()