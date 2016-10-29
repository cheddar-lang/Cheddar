export default (api) => ["flat", api.prop(new api.func(
    // no args because it's a property
    [],
    function(scope, input) {
        // equiv. .reduce((+)).map(flat) or something
        let flat = (arr) =>
            api.init(api.array, ...arr.value.reduce(
                (flt, toflt) => (
                    flt.concat(toflt.constructor.Name === "Array" ?
                        flat(toflt).value : toflt
                    )
                ),
                []
            ));
        return flat(input("self"));
    }
))];
