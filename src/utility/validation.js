
const validate = (val, rules, connectedValue) => {
  let isValid = true;
  for (let rule in rules) {
    switch(rule){
        case 'isEmail':
          isValid = isValid && emailValidator(val);
          break;
        case 'menLength':
          isValid = isValid && menLengthValidator(val , rules[rule]);
          break;
          case 'equalTo':
          isValid = isValid && equalToValidator(val, connectedValue[rule]);
          break;
          default:
          return isValid;   
    }  
  }
  return isValid;
}

const emailValidator = val => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(val));  
}

const menLengthValidator = (val , menLength) => {
    return val.length >= menLength;
}

const equalToValidator = (val , checkValue) => {
   return val === checkValue;
}

export default validate;

