/*==========================
    NAVBAR SCROLL
===========================*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(window.scrollY > 60){

        navbar.style.background="rgba(10,15,30,.85)";
        navbar.style.backdropFilter="blur(25px)";
        navbar.style.boxShadow="0 10px 35px rgba(0,0,0,.35)";

    }else{

        navbar.style.background="rgba(255,255,255,.05)";
        navbar.style.boxShadow="none";

    }

});


/*==========================
    SMOOTH SCROLL
===========================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        const target=document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


/*==========================
    SCROLL REVEAL
===========================*/

const reveals=document.querySelectorAll(".reveal");

function reveal(){

    reveals.forEach(item=>{

        const windowHeight=window.innerHeight;

        const revealTop=item.getBoundingClientRect().top;

        const revealPoint=120;

        if(revealTop<windowHeight-revealPoint){

            item.classList.add("active");

        }

    });

}

window.addEventListener("scroll",reveal);


/*==========================
 BACK TO TOP
===========================*/

const topBtn=document.getElementById("backToTop");

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topBtn.style.display="flex";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};


/*==========================
 SCROLL PROGRESS
===========================*/

window.addEventListener("scroll",()=>{

const scrollTop=document.documentElement.scrollTop;

const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;

const percent=(scrollTop/height)*100;

document.getElementById("progress-bar").style.width=percent+"%";

});