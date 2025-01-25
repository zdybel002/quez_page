export const generateQuizQuestions = (items) => {
  return items.map((item) => {
    // Pobieramy 3 losowe odpowiedzi, które nie są poprawne
    const randomIncorrectAnswers = items
      .filter((otherItem) => otherItem.pojecie !== item.pojecie) // Wyklucz poprawną odpowiedź
      .sort(() => 0.5 - Math.random()) // Losowo mieszamy
      .slice(0, 3); // Bierzemy pierwsze 3

    // Tworzymy pytanie
    return {
      question: `Czym jest ${item.pojecie}?`,
      correctAnswer: item.definicja,
      options: [
        item.definicja, // Poprawna odpowiedź
        ...randomIncorrectAnswers.map((incorrect) => incorrect.definicja), // Błędne odpowiedzi
      ].sort(() => 0.5 - Math.random()), // Mieszamy odpowiedzi
    };
  });
};
