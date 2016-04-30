import CheddarString from '../String';
import CheddarError from '../../consts/err';
console.log("CS", CheddarString, require('../String'));
export default new Map([
    [CheddarString, (self) => {
        let Stringified = "",
            Cast;
        for (let i = 0; i < self.value.length; i++) {
            Cast = self.value[i].constructor.Cast.get(CheddarString)(self.value[i]);
            console.log("D2", Cast)
            if (Cast)
                Stringified += Cast(self.value[i]) + ", ";
            else
                return CheddarError.CAST_FAILED;
        }
        return new CheddarString("[" + Stringified + "]");
    }]
]);