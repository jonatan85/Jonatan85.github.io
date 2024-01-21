document.addEventListener('DOMContentLoaded', function() {
    // Valor de las cartas
    const cardValidas = ['A', 'B', 'C', 'D' ,'E' ,'F' ,'G', 'H'];
    // Total de pares. Usamos un .length para leer toda la variable cardValidas
    const totalPairs = cardValidas.length;
    // Duplicamos la baraja de cartas
    const cardDeck = [...cardValidas, ...cardValidas];

    // Barajamos las cartas. sort para barajar el array, utilizamos Math.random 0.5 para distribuir las cartas de manera aleatoria
    cardDeck.sort(() => Math.random() - 0.5);

    // Seleccionamos el div de el DOM
    const gameContainer = document.querySelector('#game-container');

    // Inicializamos las variables de el juego. Estas variables se utilizan para rastrear las carta seleccionadas, los id y los pares encontrados
    let selectedCards = []
    let selectedCardsID = []
    let pairsFound = 0;

    // Creamos el tablero de el juego
    function createBoard() {
        cardDeck.forEach((value, i) => {
            // Creamos las card
            const card = document.createElement('div');
            // Le añadimos una clase
            card.classList.add('card');
            // Le añadimos un id
            card.dataset.id = i;
            // Le añadimos contenido a la carta
            card.textContent = '?';
            // Agregamos evento click a la carta
            card.addEventListener('click', flipCard);
            // Añadimos la carta a el DOM
            gameContainer.appendChild(card);
        })
    }

    // Funcion para voltear cartas
    function flipCard() {
        // Obtener carta seleccionada
        const selectedCard = this;
        // obtenemos el id de la carta
        const cardId = selectedCard.dataset.id;
        // Mostrar el valor de la carta en la interfaz grafica
        selectedCard.textContent = cardDeck[cardId];
        // Almacenar la carta seleccionada y su ID. Guardamos el valor de las cartas y su id en las variables con arrays vacios que he creado antes
        selectedCards.push(cardDeck[cardId]);
        selectedCardsID.push(cardId);

        // Hago la verificacion de si he seleccionado dos cartas
        if(selectedCards.length === 2) {
            // Invocamos la funcion checkFormMatch, con un selector de tiempo
            setTimeout(checkForMatch, 500);
        }
    }   

    // Se encarga de verificar dos cartas seleccionadas en el juego de si son parejas o no
    function checkForMatch() {
        // Seleccionar todas las cartas
        const cards = document.querySelectorAll('.card');
        // Obtenemos los ids y valores de las cartas seleccionadas, desestructuramos las variables con los arrays que contienen las cartas
        const [id1, id2] = selectedCardsID;
        const [card1, card2] = selectedCards;

        // Verificamos que las cartas son iguales o diferentes
        if (card1 === card2 && id1 !== id2) {
            cards[id1].style.backgroundColor = 'green';
            cards[id2].style.backgroundColor = 'green';
            pairsFound++;

            // Verificamos si han sido encotradas todas las parejas
            if(pairsFound === totalPairs) {
                alert('Feliciades!!! Has encontrado todas las parejas.');
                // Reseteamos el juego.
                resetGame();
            } 
        } else {
            // Si las cartas no son iguales
            cards[id1].textContent = '?';
            cards[id2].textContent = '?';
        }

        // Limpiamos los arrays para la siguiente jugada
        selectedCards = [];
        selectedCardsID = [];
    }

    // Funcion para reiniciar el juego
    function resetGame() {
        // Limpiamos el contenido html
        gameContainer.innerHTML = '';
        // Reseteamos las variables de el juego
        selectedCards = [];
        selectedCardsID = [];
        pairsFound = 0;

        // Barajamos las cartas para la siguiente partida
        cardDeck.sort( () => Math.random() - 0.5);

        // Volvemos a crear el tablero de el juego
        createBoard();
    }

    createBoard();
})