// Assignment code here
//password parameter class that stores the values from the user.

//character tuple class with a character and a position (string index)
class characterTuple{
  character;
  position;
}

var passwordParameters = {
  passwordLength: "",
  includeLowerCase: false,
  includeUpperCase: false,
  includeNumerics: false,
  includeSpecial: false,
  getPasswordParametersFromUser(){
    while(1){
      this.passwordLength = window.prompt("Type in a password length, it must be between 8 and 128 characters.");
      if(!this.passwordLength || isNaN(this.passwordLength)){
        window.alert("please enter a number between 8 and 128.");
      }
      else if(this.passwordLength < 8){
        window.alert("the password length must be ast least 8 characters long.");
      }
      else if (this.passwordLength > 128){
        window.alert("The passowrd length must be 128 characters or less.");
      }
      else{
        break;
      }
    }
    while(1){
      this.includeLowerCase = window.confirm("Do you want to include lowercase letters?");
      this.includeUpperCase = window.confirm("Do you want to include uppercase letters?");
      this.includeNumerics = window.confirm("Do you want to include numeric charcaters?");
      this.includeSpecial = window.confirm("Do you want to include special characters?");
      if(this.includeLowerCase || this.includeUpperCase || this.includeSpecial || this.includeNumerics){
        break;
      }
      window.alert("You need to include at least one character option.");
    }
    return;
  }
}


var generatePassword = function (){
  passwordParameters.getPasswordParametersFromUser();
  var password = [];
  var characters = "";
  var charsets = [];
  var singleChars = [];
  if(passwordParameters.includeLowerCase == true){
    characters += "abcdefghijklmnopqrstuvwxyz";
    charsets.push("abcdefghijklmnopqrstuvwxyz");
  }
  if(passwordParameters.includeUpperCase == true){
    characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    charsets.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  }
  if(passwordParameters.includeNumerics == true){
    characters += "0123456789";
    charsets.push("0123456789"); 
  }
  if(passwordParameters.includeSpecial){
    characters += " !#$%&'()*+,-./:;<=>?@[\]^_`{|}~" + '"';
    charsets.push(" !#$%&'()*+,-./:;<=>?@[\]^_`{|}~" + '"'); 
  }


  //use a series of character tuples with randomized characters from each set and a random position within the string.
  //This will guarantee that the password will have at least one character from each set the user selects.
  var offset = Math.floor(Math.random()*passwordParameters.passwordLength);
  for(var i = 0; i< charsets.length; i++){
    var character = Math.floor(Math.random()*charsets[i].length);
    var pos = (offset + i)%passwordParameters.passwordLength; // used this method to make sure the same position isn't accidentally selected.
    var tuple = new characterTuple();
    tuple.character = charsets[i][character];
    tuple.position = pos;
    singleChars.push(tuple);
  }


  //generate some random characters
  for(var i = 0; i < passwordParameters.passwordLength; i++){
    password.push(characters[Math.floor(Math.random()*characters.length)]);
  }

  //add in the character tuples 
  for(var i = 0; i<singleChars.length; i++){
    //password[singleChars[i].position] = singleChars[i].character;
    console.log(singleChars[i].character, singleChars[i].position);
    password[singleChars[i].position] = singleChars[i].character

  }
  var str = password.toString().replaceAll(',','');

  return str;
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
