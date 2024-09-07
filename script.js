// Liste des joueurs
const players = ["Louis", "Yann", "Nicolas", "Raphael", "Sacha"];
let currentPlayer = 0;
let currentQuestion = 0;
const scores = new Array(players.length).fill(0);

// Questions et réponses
const quizData = [
    {
        question: "Quel grand fleuve traverse l'Égypte ?",
        answers: ["Le Nil", "Le Mississippi", "Le Gange", "Le Danube"],
        correct: 0
    },
    {
        question: "Comment s'appelle le grand lion avec une tête humaine qui garde les pyramides ?",
        answers: ["Le Sphinx", "Le Minotaure", "Le Griffon", "Le Dragon"],
        correct: 0
    },
    {
        question: "Quel animal les Égyptiens adoraient-ils comme un dieu ?",
        answers: ["Le chien", "Le chat", "Le lion", "Le cheval"],
        correct: 1
    },
    {
        question: "Comment s'appelle le roi de l'Égypte antique ?",
        answers: ["Empereur", "Pharaon", "Roi", "Prince"],
        correct: 1
    },
    {
        question: "Quel objet les pharaons tenaient-ils souvent dans leurs mains ?",
        answers: ["Un sceptre", "Un livre", "Une épée", "Une plume"],
        correct: 0
    },
    {
        question: "Quel animal transporte souvent des gens et des objets dans le désert ?",
        answers: ["Le cheval", "Le chameau", "Le mouton", "L'âne"],
        correct: 1
    },
    {
        question: "Quel est le grand bâtiment qui a une tête humaine et un corps de lion ?",
        answers: ["Le Sphinx", "La Tour Eiffel", "La Pyramide", "Le Colisée"],
        correct: 0
    },
    {
        question: "Quel est le nom du soleil en Égypte antique ?",
        answers: ["Râ", "Luna", "Mars", "Jupiter"],
        correct: 0
    },
    {
        question: "Quel est le chapeau spécial que portaient les pharaons ?",
        answers: ["Une coiffe", "Un casque", "Un bonnet", "Un foulard"],
        correct: 0
    },
    {
        question: "Où les pharaons étaient-ils enterrés ?",
        answers: ["Dans des grottes", "Dans des maisons", "Dans des pyramides", "Dans des temples"],
        correct: 2
    },
    {
        question: "Quel insecte était sacré pour les Égyptiens ?",
        answers: ["Le papillon", "Le scarabée", "La fourmi", "L'abeille"],
        correct: 1
    },
    {
        question: "Comment s'appelle l'écriture des anciens Égyptiens ?",
        answers: ["Les hiéroglyphes", "L'alphabet", "Les chiffres", "Les symboles"],
        correct: 0
    },
    {
        question: "Quel trésor a été découvert dans la tombe de Toutankhamon ?",
        answers: ["Une épée", "Un masque d'or", "Un livre", "Une pierre précieuse"],
        correct: 1
    },
    {
        question: "Qui est le dieu égyptien avec une tête de faucon ?",
        answers: ["Anubis", "Horus", "Râ", "Osiris"],
        correct: 1
    },
    {
        question: "Quel est le nom de la reine la plus célèbre d'Égypte ?",
        answers: ["Néfertiti", "Cléopâtre", "Hatshepsout", "Isis"],
        correct: 1
    }
];

// Sélectionner les éléments HTML
const questionElement = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer');
const feedbackElement = document.getElementById('feedback');
const playerTurnElement = document.getElementById('player-turn');
const scoreElement = document.getElementById('score');

// Afficher la question actuelle
function showQuestion() {
    questionElement.textContent = quizData[currentQuestion].question;
    answerButtons.forEach((button, index) => {
        button.textContent = quizData[currentQuestion].answers[index];
    });
    feedbackElement.textContent = ""; // Réinitialise le feedback
    playerTurnElement.textContent = `C'est au tour de ${players[currentPlayer]} de répondre !`;
}

// Vérifier la réponse
function checkAnswer(index) {
    if (index === quizData[currentQuestion].correct) {
        feedbackElement.textContent = "Bonne réponse ! 🎉";
        scores[currentPlayer]++; // Ajouter un point au joueur
    } else {
        feedbackElement.textContent = `Mauvaise réponse. 😢 La bonne réponse était : ${quizData[currentQuestion].answers[quizData[currentQuestion].correct]}`;
    }
    updateScoreboard();

    // Passer à la question suivante après un court délai
    setTimeout(() => {
        currentQuestion++;
        currentPlayer = (currentPlayer + 1) % players.length; // Passer au joueur suivant
        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            feedbackElement.textContent = "Le quiz est terminé ! Voici les scores finaux.";
            displayFinalScores();
        }
    }, 2000);
}

// Mettre à jour l'affichage des scores
function updateScoreboard() {
    scoreElement.innerHTML = players.map((player, index) => `${player}: ${scores[index]} points`).join('<br>');
}

// Afficher les scores finaux
function displayFinalScores() {
    let finalScores = players.map((player, index) => `${player}: ${scores[index]} points`).join('<br>');
    feedbackElement.innerHTML += `<br><br> Scores finaux :<br>${finalScores}`;
}

// Ajouter les événements aux boutons de réponse
answerButtons.forEach((button, index) => {
    button.addEventListener('click', () => checkAnswer(index));
});

// Afficher la première question
showQuestion();
