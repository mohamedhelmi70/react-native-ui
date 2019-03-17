
const validate = (val, rules, connectedValue) => {
 
      let isValid = true;
    
      for (let rule in rules) {
        switch(rule){
          case 'isfullName':
            isValid = isValid && fullNameValidator(val);
            break;  
          case 'isEmail':
            isValid = isValid && emailValidator(val);
            break;
          case 'menLength':
            isValid = isValid && menLengthValidator(val, rules[rule]);
            break;
          case 'equalTo':
            isValid = isValid && equalToValidator(val, connectedValue[rule]);
            break;
          case 'isDate':
            isValid = isValid && dateValidator(val);
            break;
          case 'isPhoneNumber':
            isValid = isValid && phoneValidator(val);
            break;   
          case 'isAddress':
            isValid = isValid && addressValidator(val);  
          default:
            return isValid;   
        }  
      }
      return isValid;
}

const fullNameValidator = val => {
  const re =  /^[a-zA-Z ]{6,40}$/;
  return re.test(val);
}

const emailValidator = val => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(val));  
}

const dateValidator = val => {
  const re = /(^(((0[1-9]|1[0-9]|2[0-8])[-](0[1-9]|1[012]))|((29|30|31)[-](0[13578]|1[02]))|((29|30)[-](0[4,6,9]|11)))[-](19|[2-9][0-9])\d\d$)|(^29[-]02[-](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
  return re.test(val);
}

const menLengthValidator = (val, menLen) => {
  return val.length >= menLen;
}

const equalToValidator = (val , checkValue) => {
  return val === checkValue;
}

const phoneValidator = val => {
  const re = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  return re.test(val);
}

const addressValidator = val => {
  const re = /^\d+\w*\s*(?:[\-\/]?\s*)?\d*\s*\d+\/?\s*\d*\s*/;
  return re.test(val);
}

export default validate;