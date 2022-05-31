import { FormControl } from '@angular/forms';

//TODO: temporal
export const nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";



export const noPuedeSerStrider = ( control: FormControl) => {
    const valor: string = control.value?.trim().toLowerCase();
    if ( valor === 'strider') {
      return {
        noStrider: true
      }
    }

    return null;
  }