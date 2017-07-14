import { FormControl } from '@angular/forms';

export class AppFormValidators { 
  static validateEmail(c: FormControl) { 
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i; 
    
    return EMAIL_REGEXP.test(c.value) ? null : { 
      validateEmail: { valid: false } 
    }; 
  } 

  static validatePassComplexity(c: FormControl) { 
    // AT LEAST 3 OF 4 COMPLEXITY CRITERIA 
    let hasUpperCase = /[A-Z]/.test(c.value) ? 1 : 0; 
    let hasLowerCase = /[a-z]/.test(c.value) ? 1 : 0; 
    let hasNumbers   = /\d/.test(c.value)    ? 1 : 0; 
    let hasNonalphas = /\W/.test(c.value)    ? 1 : 0; 
    let levelOfComplexity = ((hasUpperCase + hasLowerCase + hasNumbers + hasNonalphas) >= 3); 

    return ((levelOfComplexity) && (c.value.length >= 8)) ? null : { 
      validatePassComplexity: { complex: false } 
    }; 
  } 
} 