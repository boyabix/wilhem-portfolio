const words=[

"Software Developer",

"IT Support Specialist",

"Computer Technician",

"System Developer",

"Database Developer",

"Problem Solver"

];

let wordIndex=0;

let letterIndex=0;

let currentWord="";

let isDeleting=false;

const typing=document.getElementById("typing");

function type(){

currentWord=words[wordIndex];

if(isDeleting){

typing.textContent=currentWord.substring(0,letterIndex--);

}else{

typing.textContent=currentWord.substring(0,letterIndex++);

}

let speed=isDeleting?50:100;

if(!isDeleting && letterIndex===currentWord.length+1){

speed=1500;

isDeleting=true;

}

if(isDeleting && letterIndex===0){

isDeleting=false;

wordIndex++;

if(wordIndex===words.length){

wordIndex=0;

}

}

setTimeout(type,speed);

}

type();