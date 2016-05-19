// Cheddar variable class
// simply provides a struct
//  for properties and to
//  store variable data
//
// typedef struct {
//     Any : Value
//     Bool: Writeable
// } CheddarVariable

export default class CheddarVariable {

    constructor(Value, {
        Writeable = true,
        StrictType = null
    } = {}) {
        this.Value = Value;

        this.Writeable = Writeable;
        this.StrictType = StrictType;
    }

    Mutate(nval) {
        if (this.Writeable)
            this.Value = nval;
    }

}