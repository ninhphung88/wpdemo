/* eslint-disable import/no-extraneous-dependencies */
import 'react';
import 'font-awesome/css/font-awesome.css';
import 'purecss';
import './main.css';
import component from './component';
import { bake } from './shake';

bake();
document.body.appendChild(component());

/*var outputCharacter; 
var mode = 'UPPERCASE';
var digitChar;
do {
    digitChar = prompt('Enter some numbers ending with 10: ');
    var number = (digitChar - '0');
    digitChar = prompt('Enter some numbers ending with 10: ');
    while ((digitChar != 10) && (digitChar != ',')) {
        number = number * 10 + (digitChar - '0');
        digitChar = prompt('Enter some numbers ending with 10: ');
    }
    switch (mode) {
    case 'UPPERCASE':
        number = number % 27;
        outputCharacter = String.fromCharCode(parseInt(number) + 'A'.charCodeAt() -1);
        if (number == 0) {
            mode = 'LOWERCASE';
            continue;
        }
        break;
    case 'LOWERCASE':
        number = number % 27;
        outputCharacter = String.fromCharCode(parseInt(number) + 'a'.charCodeAt() -1);
        if (number == 0) {
            mode = 'PUNCTUATION';
            continue;
        }
        break;
    case 'PUNCTUATION':
        number = number % 9;
        switch (parseInt(number)) {
        case 1: outputCharacter = '!'; break;
        case 2: outputCharacter = '?'; break;
        case 3: outputCharacter = ','; break;
        case 4: outputCharacter = '.'; break;
        case 5: outputCharacter = ' '; break;
        case 6: outputCharacter = ';'; break;
        case 7: outputCharacter = '"'; break;
        case 8: outputCharacter = '\''; break;
        }
        if (number == 0) {
            mode = 'UPPERCASE';
            continue;
        }
        break;
    }
    alert(outputCharacter);
} while (digitChar != 10);*/