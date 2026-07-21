const params = new URLSearchParams(window.location.search);

const projectId = params.get("id");

async function loadProject() {

    const response = await fetch("data/projects.json");

    const projects = await response.json();

    const project = projects.find(p => p.id === projectId);

    if (!project) {

        document.getElementById("project-details").innerHTML =
        "<h2>Project not found.</h2>";

        return;

    }

    showProject(project);

}

function showProject(project){

    const container = document.getElementById("project-details");

    let tech = "";

    project.tech.forEach(item=>{

        tech += `<span>${item}</span>`;

    });

    let features = "";

    project.features.forEach(item=>{

        features += `<li>${item}</li>`;

    });

    let learning = "";

    project.learning.forEach(item=>{

        learning += `<li>${item}</li>`;

    });

    let screenshots = "";

project.images.forEach((img, index) => {
currentImages = project.images;
    screenshots += `
    

        <div class="gallery-item">

            <img
                src="${img}"
                alt="${project.title}"
                onclick="openLightbox(${index})"
            >

        </div>
        <div id="lightbox" class="lightbox">

    <span class="close-lightbox"
          onclick="closeLightbox()">

        &times;

    </span>

    <button class="light-prev"
            onclick="previousImage()">

        ❮

    </button>

    <img id="lightboxImage">

    <button class="light-next"
            onclick="nextImage()">

        ❯

    </button>

</div>

    `;

});


    container.innerHTML = `

    <div class="project-banner">

    <img
        src="${project.images[0]}"
        alt="${project.title}"
    >

    <div class="banner-overlay">

        <span class="status-badge">

            ${project.status}

        </span>

        <h1>

            ${project.title}

        </h1>

        <p>

            ${project.description}

        </p>

        <div class="project-tags">

            ${tech}

        </div>

    </div>

</div>
<div class="project-info">

    <div class="info-box">

        <i class="fas fa-calendar"></i>

        <h3>Year</h3>

        <p>${project.year}</p>

    </div>

    <div class="info-box">

        <i class="fas fa-user"></i>

        <h3>Client</h3>

        <p>${project.client}</p>

    </div>

    <div class="info-box">

        <i class="fas fa-code"></i>

        <h3>Role</h3>

        <p>${project.role}</p>

    </div>

    <div class="info-box">

        <i class="fas fa-clock"></i>

        <h3>Duration</h3>

        <p>${project.duration}</p>

    </div>

</div>
    <div class="gallery">

        ${screenshots}

    </div>
<div class="case-study">

    <div class="case-card">

        <h2>❗ Problem</h2>

        <p>${project.problem}</p>

    </div>

    <div class="case-card">

        <h2>💡 Solution</h2>

        <p>${project.solution}</p>

    </div>

    <div class="case-card">

        <h2>🏆 Outcome</h2>

        <p>${project.outcome}</p>

    </div>

</div>
    <div class="project-grid">

        <div class="project-box">

            <h2>Key Features</h2>

            <ul>

                ${features}

            </ul>

        </div>

        <div class="project-box">

            <h2>What I Learned</h2>

            <ul>

                ${learning}

            </ul>

        </div>

    </div>

    `;

}
let currentImages = [];

let currentIndex = 0;

function openLightbox(index){

    currentIndex = index;

    const lightbox =
        document.getElementById("lightbox");

    const image =
        document.getElementById("lightboxImage");

    image.src = currentImages[index];

    lightbox.style.display = "flex";

}

function closeLightbox(){

    document.getElementById("lightbox")
        .style.display = "none";

}

function nextImage(){

    currentIndex++;

    if(currentIndex >= currentImages.length){

        currentIndex = 0;

    }

    document.getElementById("lightboxImage").src =
        currentImages[currentIndex];

}

function previousImage(){

    currentIndex--;

    if(currentIndex < 0){

        currentIndex =
            currentImages.length - 1;

    }

    document.getElementById("lightboxImage").src =
        currentImages[currentIndex];

}
loadProject();