document.addEventListener('DOMContentLoaded', () => {
  console.log("I'm in");
});
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const speechRecognition = new SpeechRecognition();

const mic = document.getElementById('mic');

mic.addEventListener('click', function() {
  console.log('the mic was clicked');
  speechRecognition.start();
  console.log('recording');
});

// speechRecognition.onresult = function(event) {
//   const color = event.results[0][0].transcript
//   //.body.style.backgroundColor
//   document.body.style.backgroundColor = color
//   console.log(color)
// }
speechRecognition.onresult = function(event) {
  const song = event.results[0][0].transcript;
  const poem = generatePoem(song);
  alert(`${'This is your poem:' + '\n'}${poem}`); // figure out how to output this to a text box
};

function generatePoem(wordCorpus, numLine = 4, numWord = 4) {
  const wordChain = wordPairGenerator(wordCorpus);
  let poem = '';
  for (let i = 0; i < numLine; i++) {
    poem += `${writeLine(wordChain, numWord)}\n`;
  }
  return poem;
}

function writeLine(wordPairs, linelength = 3) {
  const lineOfPoetry = [];
  let i = 0;
  while (i < linelength) {
    for (const word in wordPairs) {
      lineOfPoetry.push(helper(word));
      i++;
      if (i === linelength) {
        break;
      }
    }
  }

  function helper(word) {
    const wordArray = wordPairs[word];
    const randomWord = wordArray[getRandomInt(0, wordArray.length)];
    return randomWord;
  }
  return lineOfPoetry.join(' ');
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function wordPairGenerator(text) {
  const words = parseText(text);
  const wordPairs = {};
  for (let i = 0; i < words.length - 1; i++) {
    const currElm = words[i];
    if (currElm in wordPairs) {
      wordPairs[currElm].push(words[i + 1]);
    } else {
      wordPairs[currElm] = [words[i + 1]];
    }
  }
  return wordPairs;
}

function parseText(text) {
  const words = text
    .replace(/[.|,|!|?|'|"|:|;|`|\n|()]/gi, '')
    .toLowerCase()
    .split(' ');

  return words;
}
