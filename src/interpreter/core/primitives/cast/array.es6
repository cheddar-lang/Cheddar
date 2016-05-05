import CheddarError from '../../consts/err';
import CheddarString from '../String';

console.log("CS", CheddarString); // WHY IS CHEDDAR STRING UNDEFINED WTF
export default new Map([
    [CheddarString, (self) => {
        let Stringified = "",
            Cast;
        for (let i = 0; i < self.value.length; i++) {
            Cast = self.value[i].constructor.Cast.get(CheddarString);
            console.log("D2", self.value[i].constructor.Cast);
            if (Cast)
                Stringified += Cast(self.value[i]) + ", ";
            else
                return CheddarError.CAST_FAILED;
        }
        return new CheddarString("[" + Stringified + "]");
    }]
]);
