// Mock flashcards data organized by module.
// Each module contains objects named card1, card2, ...
// Each card is an array with two strings: [term, definition].
export const flashcardsByModule: Record<number, Record<string, [string, string]>> = {
  1: {
    card1: [
      "What is Utilitarianism?",
      "An ethical theory suggesting that the best action is the one that maximizes overall utility (happiness or pleasure) for the greatest number of people.",
    ],
    card2: [
      "What do Utilitarians mean by \"utility\"?",
      "Utility refers to something good, like happiness or pleasure, that is numerically measurable.",
    ],
    card3: [
      "What does the Greatest Happiness Principle state?",
      "The right action is the one that produces the greatest happiness for the greatest number.",
    ],
    card4: [
      "Define Hedonism in ethical philosophy.",
      "The view that pleasure is the highest good and proper aim of human life.",
    ],
    card5: [
      "What is Utilitarianism?",
      "An ethical theory suggesting that the best action is the one that maximizes overall utility (happiness or pleasure) for the greatest number of people.",
    ],
    card6: [
      "What do Utilitarians mean by \"utility\"?",
      "Utility refers to something good, like happiness or pleasure, that is numerically measurable.",
    ],
    card7: [
      "What does the Greatest Happiness Principle state?",
      "The right action is the one that produces the greatest happiness for the greatest number.",
    ],
    card8: [
      "Define Hedonism in ethical philosophy.",
      "The view that pleasure is the highest good and proper aim of human life.",
    ],
  },

  2: {
    card1: [
      "What is Deontology?",
      "An ethical theory that uses rules to distinguish right from wrong and focuses on duties and obligations rather than consequences.",
    ],
    card2: [
      "Who is a major proponent of modern deontological ethics?",
      "Immanuel Kant — known for arguing that moral actions are those performed from duty according to universalizable maxims.",
    ],
    card3: [
      "What is the Categorical Imperative?",
      "A central Kantian principle: act only according to that maxim whereby you can at the same time will that it should become a universal law.",
    ],
  },

  3: {
    card1: [
      "What is Virtue Ethics?",
      "An approach to ethics that emphasizes an individual's character as the key element of ethical thinking, rather than rules or consequences.",
    ],
    card2: [
      "Name one central virtue in Aristotelian ethics.",
      "Practical wisdom (phronesis) — the ability to deliberate well about what is good and beneficial for living well.",
    ],
  },
};

export default flashcardsByModule;

