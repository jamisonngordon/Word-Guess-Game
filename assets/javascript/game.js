
var word;
var guessed = "";

document.addEventListener("DOMContentLoaded", function() {
    console.log(words);
    word = words[Math.floor(Math.random() * words.length)];
    console.log(word);
    setWord(word);
  });

  function setWord(word) {
    var wordWithDashes = "";
    for(x = 0; x < word.length; x++)
    {
        if(word.charAt(x) != " ")
        {
            wordWithDashes  += "-";
        }
        else 
        {
            wordWithDashes += " ";
        }
    }
    document.getElementById("word").innerHTML = "Word: " + wordWithDashes;
  }

  document.onkeyup = function(event) {
    if(notControlKey(event.key))
    {
        var input = isLetterOrNumber(event.key);
        if(input) 
        {
            guessed += input;
            document.getElementById("guessed").innerHTML = "Letters already guessed: " + guessed;
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
      console.log("String is: " + string);
      for(x = 0; x < notWanted.length; x++)
      {
        console.log("Term is: " + notWanted[x]);
        if(string === notWanted[x]) 
        {
            return false;
        }
      }
      return true;
  }