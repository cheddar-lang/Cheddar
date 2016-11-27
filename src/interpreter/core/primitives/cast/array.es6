import HelperInit from '../../../../helpers/init';

export default new Map([
    ['String', (self) => {
        // Get Dependencies
        let CheddarString = require('../String');

        let Stringified = "",
            Cast;
        for (let i = 0; i < self.value.length; i++) {
            Cast = self.value[i] && self.value[i].Cast ?
                self.value[i].Cast.has('String') : false;

            if (Cast)
                Stringified += (i ? ", " : "") + (
                    self.value[i].Cast.get('String')(self.value[i])
                ).value;
            else
                Stringified += (i ? ", " : "") + `<${self.value[i].constructor.Name || self.value[i].Name}>`;
        }
        return HelperInit(CheddarString, "[" + Stringified + "]");
    }]
]);
