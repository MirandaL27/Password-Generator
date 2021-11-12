// Assignment code here
//character tuple class with a character set and a boolean for if thats set was used in the password or not
class charSetTuple{
  charset;
  isUsed;
}

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
        window.alert("the password length must be at least 8 characters long.");
      }
      else if (this.passwordLength > 128){
        window.alert("The passowrd length must be 128 characters or less.");
      }
      else{
        break;
      }
    }
    while(1){
      this.includeLowerCase = window.confirm("Press OK if you want to include lowercase letters.");
      this.includeUpperCase = window.confirm("Press OK if you want to include uppercase letters.");
      this.includeNumerics = window.confirm("Press OK if you want to include numeric charcaters.");
      this.includeSpecial = window.confirm("Press OK if you want to include special characters.");
      if(this.includeLowerCase || this.includeUpperCase || this.includeSpecial || this.includeNumerics){
        break;
      }
      window.alert("You need to include at least one character option.");
    }
    return;
  }
}

//password manager class that keeps track of which character sets have been used and whether or not password meets acceptance criteria.
class passwordSetsManager{
  sets = [];
  passwordMeetsCriteria() {
    for(var i = 0; i < this.sets.length; i++){
      if(!this.sets[i].isUsed){
        return false;
      }
    }
    return true;
  }
  selectSets(){
    if(passwordParameters.includeLowerCase == true){
      var tuple = new charSetTuple();
      tuple.charset = "abcdefghijklmnopqrstuvwxyz";
      tuple.isUsed = false;
      this.sets.push(tuple);
    }
    if(passwordParameters.includeUpperCase == true){
      var tuple = new charSetTuple();
      tuple.charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      tuple.isUsed = false;
      this.sets.push(tuple);
    }
    if(passwordParameters.includeNumerics == true){
      var tuple = new charSetTuple();
      tuple.charset = "0123456789";
      tuple.isUsed = false;
      this.sets.push(tuple);
    }
    if(passwordParameters.includeSpecial){
      var tuple = new charSetTuple();
      tuple.charset = " !#$%&'()*+,-./:;<=>?@[\]^_`{|}~" + '"';
      tuple.isUsed = false;
      this.sets.push(tuple);
    }
  }
}

var generatePassword = function (){
  passwordParameters.getPasswordParametersFromUser();
  var password = [];
  var setManager = new passwordSetsManager();
  setManager.selectSets()
  while(1){
      //generate some random characters
    for(var i = 0; i < passwordParameters.passwordLength; i++){
      //use a random nunmber to pick which charset to use
      var whichSet = Math.floor(Math.random()*setManager.sets.length);
      setManager.sets[whichSet].isUsed = true;
      //pick randomly from chosen charset
      var length = setManager.sets[whichSet].charset.length;
      password.push(setManager.sets[whichSet].charset[Math.floor(Math.random()*length)]);
    }
    if(setManager.passwordMeetsCriteria()){
     //if password meets criteria (meaning it contains members of all of the charsets the user selected), 
     //break the while loop and return the password.
      break;
    }
    //otherwise, keep generating passwords until one meets the criteria (clear password array and start again).
    password.length = 0;
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
