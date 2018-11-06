
var word;
var wordArray = [];
var guessed = [];
var wordWithDashes = [];
var wins = 0;
var remainingGuesses;
var elementsHidden = true;

document.addEventListener("DOMContentLoaded", function() {
    initialize();
  });

  function initialize () 
  {
    remainingGuesses = 5;
    guessed = [];
    wordWithDashes = [];
    word = words[Math.floor(Math.random() * words.length)];
    console.log(word);
    wordArray = word.split('');
    document.getElementById("guessed").innerHTML = "Letters already guessed: " + guessed.join(" ");
    document.getElementById("remaining").innerHTML = "Guesses remaining: " + remainingGuesses;
    document.getElementById("wins").innerHTML = "Wins: " + wins;
    setWord(word);
  }

  function setWord(word) 
  {
    for(x = 0; x < word.length; x++)
    {
        if(word.charAt(x) != " ")
        {
            wordWithDashes[x] = "-";
        }
        else 
        {
            wordWithDashes[x] = " ";
        }
    }
    document.getElementById("word").innerHTML = "Word: " + wordWithDashes.join("");
  }

  document.onkeyup = function(event) {
    if(elementsHidden)
    {
        elementsHidden = false;
        document.getElementById("start").style.display = "none";

        document.getElementById("wins").style.display = "block";
        document.getElementById("remaining").style.display = "block";
        document.getElementById("guessed").style.display = "block";
        document.getElementById("word").style.display = "block";
    }
    else if(notControlKey(event.key))
    {
        var input = isLetterOrNumber(event.key);
        var wrongGuess = true;
        input = input.toLowerCase();
        if(input) 
        {
            if(guessed.indexOf(input) === -1)
            {
                guessed[guessed.length + 1] = input;
            }
            document.getElementById("guessed").innerHTML = "Letters already guessed: " + guessed.join(" ");
            for(x = 0; x < wordArray.length; x++)
            {
                if(input === wordArray[x])
                {
                    wordWithDashes[x] = input;
                    wrongGuess = false;
                }
            }
            
            document.getElementById("word").innerHTML = "Word: " + wordWithDashes.join("");

            if(wrongGuess)
            {
                remainingGuesses = remainingGuesses - 1;
                document.getElementById("remaining").innerHTML = "Guesses remaining: " + remainingGuesses;
                if(remainingGuesses === 0)
                {
                    alert("Game Over!");
                    initialize();
                }
            }

            if(wordWithDashes.indexOf('-') === -1)
            {
                wins++;
                wordWithDashes = [];
                document.getElementById("word").innerHTML = "Word: ";
                document.getElementById("wins").innerHTML = "Wins: " + wins;
                initialize();
            }
        }
    }
  };

  //figures out if a character is a letter or number and returns the input if it is, false otherwise
  function isLetterOrNumber (char) {
    if(char.match(/^[A-Za-z0-9]/) !== null)
    {
        return char;
    }
    else 
    {
        return false;
    }
  }

  function notControlKey(string)
  {
      var notWanted = ["Backspace", "Alt", "Shift", "Control", "Meta", "Enter", "Tab", "CapsLock", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
      for(x = 0; x < notWanted.length; x++)
      {
        if(string === notWanted[x]) 
        {
            return false;
        }
      }
      return true;
  }

  function unHideElements() {
    document.getElementById("start").style.display = "none";
    document.getElementById("start").style.display = "none";
    document.getElementById("start").style.display = "none";
  }