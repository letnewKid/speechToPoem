// must refator
function generatePoem(wordCorpus,numLine=4,numWord=4){
    let  wordChain = wordPairGenerator(wordCorpus);
    let poem = "";
    for(let i =0; i<numLine; i++){
        poem+= writeLine(wordChain,numWord)+"\n";
    }
    return poem;
}

function writeLine(wordPairs,linelength=3){
   let lineOfPoetry = [];
   let i=0;
   while( i < linelength){
       for(let word in wordPairs){
        lineOfPoetry.push(helper(word));
         i++;
         if(i === linelength){
             break;
         }
       }
   }
   
     function helper (word){
       let wordArray =  wordPairs[word];
       let randomWord =  wordArray[getRandomInt(0,wordArray.length)];
       return randomWord;
     }
     return lineOfPoetry.join(" ");
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
  }

function wordPairGenerator(text){
    let words = parseText(text);
    let wordPairs = {}
    for(let i =0; i<words.length-1; i++){
        let currElm = words[i];
        if(currElm in wordPairs){
            
            wordPairs[currElm].push(words[i+1]);

            
        }
        else{
            wordPairs[currElm] = [words[i+1]]
        }
        
    }
    return wordPairs;
}


function parseText(text){
    let words = text.replace(/[.|,|!|?|'|"|:|;|`|\n|()]/gi, "").toLowerCase().split(" ");
    
  return words;
}