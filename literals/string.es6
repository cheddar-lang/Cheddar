import CheddarLiteral from './literal';
import {STRING_DELIMITERS, STRING_ESCAPE} from '../chars';
import * as CheddarError from '../err/list';

export default class CheddarStringTok extends CheddarLiteral {
    exec() {

        this.open();

        let chr = this.getchar();

        if (STRING_DELIMITERS.indexOf(chr) > -1) {
            // in a string

            let qt = chr; // store quote

            while(chr = this.getchar())
                if (chr === qt)
                    break;
                else if (this.isLast)
                    return this.close(CheddarError.UNMATCHED_DELIMITER);
                else if (chr === STRING_ESCAPE)
                    this.addtoken(this.getchar());
                else
                    this.addtoken(chr);

            return this.close();

        } else {
            return this.close(CheddarError.EXIT_NOTFOUND);
        }

    }
}