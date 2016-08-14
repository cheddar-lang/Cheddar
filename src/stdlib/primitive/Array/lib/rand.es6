export default (api) => ["rand", api.prop(new api.func([],
    function(_, input) {
        var self = input("self").value;
        return self[Math.floor(Math.random() * self.length)];
    }
))];
