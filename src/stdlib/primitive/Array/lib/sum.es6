export default (api) => ["sum", api.prop(new api.func([],
    function(_, input) {
        var s = new bindings.number();
        let self = input("self").value;
        for (var i = 0; i < self.length; i++) {
            if (!(self[i] instanceof api.number))
                return `Item @${i} was ${
                    self[i].Name ||
                    self[i].constructor.Name ||
                    "object"
                }, expected Number`;
            s.add(self[i].value);
        }
        return api.init(api.number, 10, 0, s);
    }
))];

