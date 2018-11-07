
var word;
var wordArray = [];
var guessed = [];
var wordWithDashes = [];
var wins = 0;
var remainingGuesses;
var elementsHidden = true;
var elements = ["wins", "remaining", "guessed", "word", "top-right", "top-left", "bottom-right", "bottom-left"]

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
    document.getElementById("guessed").innerHTML = "Letters already guessed: <span id='guessed-letters' class='general-text'>" + guessed.join(" ") + "</span>";
    document.getElementById("remaining").innerHTML = "Guesses remaining: <span id='remaining-number' class='general-text'>" + remainingGuesses + "</span>";
    document.getElementById("wins").innerHTML = "Wins: <span id='win-number' class='general-text'>" + wins + "</span>";
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
    document.getElementById("word").innerHTML = wordWithDashes.join("");
  }

  document.onkeyup = function(event) {
    if(event.key === "Enter")
    {
        $('#modal').modal('hide');
    }
    if(elementsHidden)
    {
        elementsHidden = false;
        document.getElementById("start").style.display = "none";
        
        unHideElements();
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
            else
            {
                wrongGuess = false;
            }
            document.getElementById("guessed").innerHTML = "Letters already guessed: <span id='guessed-letters' class='general-text'>" + guessed.join(" ") + "</span>";
            for(x = 0; x < wordArray.length; x++)
            {
                if(input === wordArray[x])
                {
                    wordWithDashes[x] = input;
                    wrongGuess = false;
                }
            }
            
            document.getElementById("word").innerHTML = wordWithDashes.join("");

            if(wrongGuess)
            {
                remainingGuesses = remainingGuesses - 1;
                document.getElementById("remaining").innerHTML = "Guesses remaining: <span id='remaining-number' class='general-text'>" + remainingGuesses + "</span>";
                if(remainingGuesses === 0)
                {
                    var modal = $('#modal');
                    modal.find('.modal-body').text('You loose! Better luck next time!');
                    modal.find('.modal-header').html('You loose');
                    $('#modal').modal('show');
                    
                    initialize();
                }
            }

            if(wordWithDashes.indexOf('-') === -1)
            {
                wins++;
                wordWithDashes = [];
                var modal = $('#modal');
                modal.find('.modal-header').html('You win');
                modal.find('.modal-body').text('Congrats, you correctly guessed the word: ' + word);
                $('#modal').modal('show');
                document.getElementById("wins").innerHTML = "Wins: <span id='win-number' class='general-text'>" + wins + "</span>";
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

  function unHideElements() 
  {
      for(x = 0; x < elements.length; x++)
      {
        document.getElementById(elements[x]).style.display = "block";
      }
  }