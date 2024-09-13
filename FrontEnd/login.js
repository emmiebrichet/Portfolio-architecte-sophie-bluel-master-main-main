const requestOptions = {
  method: "GET",
  redirect: "follow"
};

const mesTravaux = fetch("http://localhost:5678/api/works", requestOptions)
.then((response) => response.json())
.then((data) => {
  if (Array.isArray(data) && data.length > 0) {
    const firstItem = data[0];
    console.log(firstItem);
    console.log(data);
  } else {    
    console.error("Le tableau de données est vide ou n'est pas un tableau.");
  }
})
.catch((error) => console.error(error));


document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Empêche la soumission par défaut du formulaire

  const email = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('errorMessage');

  if (email === 'sophie.bluel@test.tld' && password === 'S0phie') {
      // Redirection vers la page d'accueil
      window.location.href = 'homepage login.html';
  } else {
      // Affiche le message d'erreur si l'email ou le mot de passe est incorrect
      errorMessage.style.display = 'block'; // Affiche le message d'erreur
      errorMessage.textContent = 'Erreur dans l’identifiant ou le mot de passe';
  }
});
