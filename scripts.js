function menu() { 
   var buttons = document.getElementById('nav-buttons'); 
   if (buttons.style.display === 'none') { 
      buttons.style.display = 'flex'; 
   } else { 
      buttons.style.display = 'none'; 
   } 
};

const quizData = {
   "Verdadeiro ou Falso": [
     {
       "pergunta": "O Provedor de Justiça Europeu pode investigar qualquer instituição da UE.",
       "respostas": ["Verdadeiro", "Falso"],
       "correta": "Verdadeiro"
     },
     {
       "pergunta": "Qualquer cidadão da UE ou entidade legal com sede na UE pode apresentar uma queixa ao Provedor de Justiça Europeu.",
       "respostas": ["Verdadeiro", "Falso"],
       "correta": "Verdadeiro"
     },
     {
       "pergunta": "O Provedor de Justiça Europeu é responsável por garantir que todas as instituições da UE cumpram os direitos humanos.",
       "respostas": ["Verdadeiro", "Falso"],
       "correta": "Falso"
     },
     {
       "pergunta": "O Provedor de Justiça Europeu só pode investigar queixas de cidadãos da UE.",
       "respostas": ["Verdadeiro", "Falso"],
       "correta": "Falso"
     }
   ],
   "Escolha Múltipla": [
     {
       "pergunta": "Onde está localizado o escritório do Provedor de Justiça Europeu?",
       "opções": [
         "a) Bruxelas, Bélgica",
         "b) Estrasburgo, França"
       ],
       "correta": "b) Estrasburgo, França"
     },
     {
       "pergunta": "Quem nomeia o Provedor de Justiça Europeu?",
       "opções": [
         "a) O Parlamento Europeu",
         "b) O Tribunal de Justiça da UE"
       ],
       "correta": "a) O Parlamento Europeu"
     },
     {
       "pergunta": "Qual é o mandato do Provedor de Justiça Europeu?",
       "opções": [
         "a) 3 anos",
         "b) 5 anos"
       ],
       "correta": "b) 5 anos"
     },
     {
       "pergunta": "Qual destas é uma das principais áreas de foco do Provedor de Justiça Europeu?",
       "opções": [
         "a) Políticas de segurança",
         "b) Proteção de dados"
       ],
       "correta": "b) Proteção de dados"
     }
   ],
   "Preencha a Lacuna": [
     {
       "pergunta": "O Provedor de Justiça Europeu é responsável por investigar queixas de ________ nas instituições da UE.",
       "opções": ["a) Má administração", "b) Discriminação"],
       "correta": "a) Má administração"
     },
     {
       "pergunta": "O Provedor de Justiça Europeu pode abrir uma investigação por sua própria ________.",
       "opções": ["a) Iniciativa", "b) Solicitação"],
       "correta": "a) Iniciativa"
     }
   ]
 };
 
 let currentCategory = getRandomCategory();
 let currentQuestionIndex = 0;
 let correctAnswers = 0;
 let wrongAnswers = 0;
 let totalQuestions = 0;
 
 function getRandomCategory() {
   const categories = Object.keys(quizData);
   const randomIndex = Math.floor(Math.random() * categories.length);
   return categories[randomIndex];
 }
 
 function loadQuestion() {
   const category = quizData[currentCategory];
   const question = category[currentQuestionIndex];
 
   const questionContainer = document.getElementById('question-container');
   const feedbackContainer = document.getElementById('feedback');
   
   feedbackContainer.textContent = '';
   
   // Display for "Verdadeiro ou Falso"
   if (currentCategory === "Verdadeiro ou Falso") {
     questionContainer.innerHTML = `
       <p>${question.pergunta}</p>
       <button onclick="checkAnswer('${question.respostas[0]}')">${question.respostas[0]}</button>
       <button onclick="checkAnswer('${question.respostas[1]}')">${question.respostas[1]}</button>
     `;
   }         
   // Display for "Escolha Múltipla"
   else if (currentCategory === "Escolha Múltipla") {
     questionContainer.innerHTML = `
       <p>${question.pergunta}</p>
       <button onclick="checkAnswer('${question.opções[0]}')">${question.opções[0]}</button>
       <button onclick="checkAnswer('${question.opções[1]}')">${question.opções[1]}</button>
     `;
   }
   // Display for "Preencha a Lacuna"
   else if (currentCategory === "Preencha a Lacuna") {
     questionContainer.innerHTML = `
       <p>${question.pergunta}</p>
       <button onclick="checkAnswer('${question.opções[0]}')">${question.opções[0]}</button>
       <button onclick="checkAnswer('${question.opções[1]}')">${question.opções[1]}</button>
     `;
   }
 }
 
 function checkAnswer(selectedAnswer) {
   const category = quizData[currentCategory];
   const correctAnswer = category[currentQuestionIndex].correta;
   
   const feedbackContainer = document.getElementById('feedback');
   totalQuestions++;
   
   if (selectedAnswer === correctAnswer) {
     correctAnswers++;
     feedbackContainer.textContent = "Resposta correta!";
     feedbackContainer.style.color = "green"
   } else {
     wrongAnswers++;
     feedbackContainer.textContent = `Resposta errada! A resposta correta é: ${correctAnswer}`;
     feedbackContainer.style.color = "red"
   }
   
   document.getElementById('next-button').style.display = 'inline-block';
 }
 
 function nextQuestion() {
   const category = quizData[currentCategory];
   currentQuestionIndex++;
   
   if (currentQuestionIndex >= category.length) {
     currentQuestionIndex = 0;
     currentCategory = getRandomCategory(); 
   }
   
   if (totalQuestions === (quizData["Verdadeiro ou Falso"].length + quizData["Escolha Múltipla"].length + quizData["Preencha a Lacuna"].length)) {
     showResults();
   } else {
     loadQuestion();
     document.getElementById('next-button').style.display = 'none';
   }
 }
 
 function showResults() {
   const resultContainer = document.getElementById('result-container');
   const resultText = document.getElementById('result');
   const questionContainer = document.getElementById('question-container');
   const nextButton = document.getElementById('next-button');
   const feedbackContainer = document.getElementById('feedback');
   feedbackContainer.style.display = "none"
   
   // Esconde as perguntas e o botão de próxima pergunta
   questionContainer.style.display = 'none';
   nextButton.style.display = 'none';
   
   // Exibe o container de resultados
   resultContainer.style.display = 'flex';
   
   // Exibe o texto com os resultados
   resultText.textContent = `Você acertou ${correctAnswers} de ${totalQuestions} perguntas e errou ${wrongAnswers} perguntas.`;
 }
 
 loadQuestion();