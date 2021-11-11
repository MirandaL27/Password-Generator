// Assignment code here
//password parameter class that stores the values from the user.
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
    this.includeLowerCase = window.confirm("Do you want to include lowercase letters?");
    this.includeUpperCase = window.confirm("Do you want to include uppercase letters?");
    this.includeNumerics = window.confirm("Do you want to include numeric charcaters?");
    this.includeSpecial = window.confirm("Do you want to include special characters?");
    return;
  }
}


var generatePassword = function (){
  passwordParameters.getPasswordParametersFromUser();
  var password = "";
  var characters = "";

  if(passwordParameters.includeLowerCase == true){
    characters += "abcdefghijklmnopqrstuvwxyz";
  }
  if(passwordParameters.includeUpperCase == true){
    characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  if(passwordParameters.includeNumerics == true){
    characters += "0123456789";
  }
  if(passwordParameters.includeSpecial){
    characters += " !#$%&'()*+,-./:;<=>?@[\]^_`{|}~" + '"';
  }

  for(var i = 0; i < passwordParameters.passwordLength; i++){
    //generate random characters here!
    password += characters[Math.floor(Math.random()*characters.length)];
  }
  return password;
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
