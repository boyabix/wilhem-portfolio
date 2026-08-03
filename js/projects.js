// =============================
// Load Projects from JSON
// =============================

async function loadProjects() {
    try {
        const response = await fetch("data/projects.json");

        if (!response.ok) {
            throw new Error(`Failed to load projects.json: ${response.status}`);
        }

        const projects = await response.json();
        displayProjects(projects);

    } catch (error) {
        console.error(error);

        const container = document.getElementById("projects-container");
        if (container) {
            container.innerHTML = `
                <div class="project-card">
                    <div class="project-content">
                        <h3>Projects could not be loaded</h3>
                        <p>${error.message}</p>
                    </div>
                </div>
            `;
        }
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
