const apiUrl = 'http://localhost:5678/api/works';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyNjE1ODg0MSwiZXhwIjoxNzI2MjQ1MjQxfQ.s58mjbDASptHoexJ9dkQgTDUs8elR7uC3Rv5l0zCAls';

// Fonction pour charger les projets depuis l'API et ajouter une icône de poubelle
function loadProjects() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(works => {
            const projectContainer = document.getElementById('projectContainer');
            projectContainer.innerHTML = ''; // Vider le conteneur avant d'ajouter les projets

            works.forEach(work => {
                const projectDiv = document.createElement('div');
                projectDiv.id = `project-${work.id}`;
                projectDiv.classList.add('project-item');

                // Image du projet
                const img = document.createElement('img');
                img.src = work.imageUrl;
                img.alt = `Image du projet ${work.title}`;
                img.style.width = '77px'; // Ajuster la largeur si nécessaire
                img.style.height = '103px'; // Ajuster la hauteur si nécessaire
                

                // Titre du projet
                const title = document.createElement('p');
                title.textContent = work.title;

                // Icône de poubelle
                const trashIcon = document.createElement('i');
                trashIcon.classList.add('fa-duotone', 'fa-solid', 'fa-trash-can');
                trashIcon.setAttribute('data-project-id', work.id);

                // Écouteur d'événement pour supprimer le projet
                trashIcon.addEventListener('click', () => deleteProject(work.id));

                // Ajouter les éléments au projectDiv
                projectDiv.appendChild(img);
                projectDiv.appendChild(trashIcon);

                // Ajouter le projectDiv au conteneur
                projectContainer.appendChild(projectDiv);
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des projets:', error));
}

// Fonction pour supprimer un projet
function deleteProject(projectId) {
    const deleteUrl = `http://localhost:5678/api/works/${projectId}`;
    
    fetch(deleteUrl, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Supprimer le projet du DOM
            const projectDiv = document.getElementById(`project-${projectId}`);
            if (projectDiv) {
                projectDiv.remove();
            }
            console.log('Projet supprimé avec succès.');
        } else {
            console.error('Échec de la suppression du projet.');
        }
    })
    .catch(error => console.error('Erreur lors de la suppression du projet:', error));
}

// Appeler loadProjects pour récupérer et afficher les projets lorsque le modal s'ouvre
loadProjects();
