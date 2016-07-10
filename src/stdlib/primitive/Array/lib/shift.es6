export default (api) => ["shift", api.var(new api.func(
    [],
    function(scope, input) {
        return input("self").value.shift() || new api.nil;
    }
))];