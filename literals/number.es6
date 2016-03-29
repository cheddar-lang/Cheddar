import CheddarLiteral from './literal';
import {DIGITS} from '../chars';
import * as CheddarError from '../err/list';

export default class CheddarNumberTok extends CheddarLiteral {
    exec() {

        this.open();

        let chr = this.getchar();
        
        if (DIGITS.indexOf(chr) > -1) {
            
        }

        return this.close(CheddarError.EXIT_NOTFOUND);
    }
}