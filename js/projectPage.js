let currentImages = [];
let currentIndex = 0;

const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

async function loadProject() {
    try {
        const response = await fetch("data/projects.json");

        if (!response.ok) {
            throw new Error(`Failed to load projects.json: ${response.status}`);
        }

        const projects = await response.json();

        const project = projects.find(p => p.id === projectId);

        if (!project) {
            document.getElementById("project-details").innerHTML = `
                <div class="project-box">
                    <h2>Project not found</h2>
                    <p>No project exists with id: <strong>${projectId}</strong></p>
                </div>
            `;
            return;
        }

        showProject(project);

    } catch (error) {
        console.error(error);

        document.getElementById("project-details").innerHTML = `
            <div class="project-box">
                <h2>Error loading project</h2>
                <p>${error.message}</p>
            </div>
        `;
    }
}

function showProject(project) {

    currentImages = project.images || [];

    let tech = "";
    project.tech.forEach(item => {
        tech += `<span>${item}</span>`;
    });

    let features = "";
    project.features.forEach(item => {
        features += `<li>${item}</li>`;
    });

    let learning = "";
    project.learning.forEach(item => {
        learning += `<li>${item}</li>`;
    });

    let screenshots = "";
    currentImages.forEach((img, index) => {
        screenshots += `
            <div class="gallery-item">
                <img src="${img}" alt="${project.title}" onclick="openLightbox(${index})">
            </div>
        `;
    });

    document.getElementById("project-details").innerHTML = `
        <div class="project-banner">
            <img src="${currentImages[0]}" alt="${project.title}">
            <div class="banner-overlay">
                <span class="status-badge">${project.status}</span>
                <h1>${project.title}</h1>
                <p>${project.description}</p>
                <div class="project-tags">${tech}</div>
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

        <div class="case-study">
            <div class="case-card">
                <h2>❗ The Problem</h2>
                <p>${project.problem}</p>
            </div>
            <div class="case-card">
                <h2>💡 The Solution</h2>
                <p>${project.solution}</p>
            </div>
            <div class="case-card">
                <h2>🏆 The Outcome</h2>
                <p>${project.outcome}</p>
            </div>
        </div>

        <h2 class="gallery-title">Project Gallery</h2>

        <div class="gallery">
            ${screenshots}
        </div>

        <div class="project-grid">
            <div class="project-box">
                <h2>Key Features</h2>
                <ul>${features}</ul>
            </div>
            <div class="project-box">
                <h2>What I Learned</h2>
                <ul>${learning}</ul>
            </div>
        </div>

        <div class="project-actions">
            ${project.github ? `<a href="${project.github}" target="_blank" class="btn">GitHub</a>` : ""}
            ${project.demo ? `<a href="${project.demo}" target="_blank" class="btn-outline">Live Demo</a>` : ""}
        </div>

        <div id="lightbox" class="lightbox">
            <span class="close-lightbox" onclick="closeLightbox()">&times;</span>
            <button class="light-prev" onclick="previousImage()">❮</button>
            <img id="lightboxImage">
            <button class="light-next" onclick="nextImage()">❯</button>
        </div>
    `;
}

function openLightbox(index) {
    currentIndex = index;
    document.getElementById("lightboxImage").src = currentImages[index];
    document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

function nextImage() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    document.getElementById("lightboxImage").src = currentImages[currentIndex];
}

function previousImage() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    document.getElementById("lightboxImage").src = currentImages[currentIndex];
}

loadProject();
