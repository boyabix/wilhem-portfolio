// =============================
// Load Projects from JSON
// =============================
alert("projects.js loaded");
async function loadProjects() {

    console.log("Projects.js loaded");

    try {

        const response = await fetch("./data/projects.json");

        console.log("Response:", response);

        const projects = await response.json();

        console.log("Projects:", projects);

        displayProjects(projects);

    } catch (error) {

        console.error(error);

    }

}

function displayProjects(projects) {

    const container = document.getElementById("projects-container");

    if (!container) return;

    container.innerHTML = "";

    projects.forEach(project => {

        let techHTML = "";

        project.tech.forEach(tech => {
            techHTML += `<span>${tech}</span>`;
        });

        const card = document.createElement("div");

        card.className = "project-card";

        card.innerHTML = `
            <div class="project-image">
                <img src="${project.images[0]}" alt="${project.title}">
            </div>

            <div class="project-content">

                <span class="project-category">
                    ${project.category}
                </span>

                <h3>${project.title}</h3>

                <p>${project.description}</p>

                <div class="tech-stack">
                    ${techHTML}
                </div>

                <div class="project-footer">

                    <span class="status">
                        ${project.status}
                    </span>

                    <a href="project.html?id=${project.id}" class="view-btn">
                        View Details
                    </a>

                </div>

            </div>
        `;

        container.appendChild(card);

    });

}

loadProjects();