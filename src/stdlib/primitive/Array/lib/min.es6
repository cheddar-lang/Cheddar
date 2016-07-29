export default (api) => ["min", api.prop(new api.func([],
    function(_, input) {
        var self = input("self").value;
        if (self.length === 0)
            return `Cannot find min of empty array`;
        var pending = self[0].value;
        for (var i = 0; i < self.length; i++) {
            if (!(self[i] instanceof api.number))
                return `Item @${i} was ${
                    self[i].Name ||
                    self[i].constructor.Name ||
                    "object"
                }, expected Number`;
            if (self[i].value < pending)
                pending = self[i].value;
        }
        return api.init(api.number, 10, 0, pending);
        
    }
))];

