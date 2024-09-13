document.addEventListener("DOMContentLoaded", function() {
    // URL de l'API pour récupérer les projets
    const apiUrl = "http://localhost:5678/api/works";
    
    // Sélection de l'élément HTML où les projets seront affichés
    const projectsContainer = document.getElementById("projects-container");

    // Fonction pour récupérer et afficher les projets
    async function fetchProjects() {
        try {
            // Récupération des projets via une requête GET
            const response = await fetch(apiUrl);
            // Vérification que la requête s'est bien passée
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            // Conversion de la réponse en JSON
            const projects = await response.json();

            // Itération sur les projets et ajout au DOM
            projects.forEach(project => {
                const projectFigure = document.createElement("figure");
                projectFigure.innerHTML = `
                    <img src="${project.imageUrl}" alt="${project.title}">
                    <figcaption>${project.title}</figcaption>
                `;
                projectsContainer.appendChild(projectFigure);
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des projets :", error);
        }
    }

    // Appel de la fonction pour récupérer les projets au chargement de la page
    fetchProjects();
});
  
document.addEventListener("DOMContentLoaded", function() {
    const apiUrlWorks = "http://localhost:5678/api/works"; // URL de l'API pour récupérer les projets
    const apiUrlCategories = "http://localhost:5678/api/categories"; // URL de l'API pour récupérer les catégories
    const projectsContainer = document.getElementById("projects-container"); // Sélection du conteneur pour les projets
    const filterButtonsContainer = document.getElementById("filter-buttons"); // Conteneur des boutons de filtre
    let allProjects = [];

    // Fonction pour "sanitiser" le nom des catégories pour en faire une classe CSS valide
    function sanitizeCategoryName(name) {
        return name.toLowerCase().replace(/[\s&]/g, '-'); // Remplace les espaces et "&" par des tirets
    }

    // Fonction pour récupérer et afficher les projets
    async function fetchProjects() {
        try {
            const response = await fetch(apiUrlWorks);
            if (!response.ok) {
                throw new Error(`Erreur HTTP! statut: ${response.status}`);
            }
            const projects = await response.json();
            allProjects = projects;
            showProjects(); // Afficher tous les projets après récupération
        } catch (error) {
            console.error("Erreur lors de la récupération des projets :", error);
        }
    }

    // Fonction pour récupérer et afficher les catégories
    async function fetchCategories() {
        try {
            const response = await fetch(apiUrlCategories);
            if (!response.ok) {
                throw new Error(`Erreur HTTP! statut: ${response.status}`);
            }
            const categories = await response.json();
            
            // Ajouter un bouton "Tous" pour afficher tous les projets
            const allButton = document.createElement('button');
            allButton.textContent = 'Tous';
            allButton.classList.add('btn-Tous');
            allButton.addEventListener('click', function() {
                showProjects('all'); // Afficher tous les projets
            });
            filterButtonsContainer.appendChild(allButton);

            // Itérer sur les catégories et créer un bouton pour chacune
            categories.forEach(category => {
                const sanitizedCategoryName = sanitizeCategoryName(category.name);
                const categoryButton = document.createElement('button');
                categoryButton.textContent = category.name;
                categoryButton.classList.add(`btn-${sanitizedCategoryName}`);
                categoryButton.addEventListener('click', function() {
                    showProjects(category.id); // Afficher les projets de cette catégorie
                });
                filterButtonsContainer.appendChild(categoryButton);
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
        }
    }

    // Fonction pour afficher les projets selon la catégorie
    function showProjects(categoryId = 'all') {
        // Vider le conteneur des projets
        projectsContainer.innerHTML = '';

        // Filtrer les projets selon la catégorie sélectionnée
        const filteredProjects = allProjects.filter(project => {
            return categoryId === 'all' || project.categoryId === categoryId;
        });

        // Afficher les projets filtrés
        filteredProjects.forEach(project => {
            const projectFigure = document.createElement("figure");
            projectFigure.innerHTML = `
                <img src="${project.imageUrl}" alt="${project.title}">
                <figcaption>${project.title}</figcaption>
            `;
            projectsContainer.appendChild(projectFigure);
        });
    }

    // Appeler les fonctions pour récupérer les projets et les catégories au chargement de la page
    fetchProjects();
    fetchCategories();
});
