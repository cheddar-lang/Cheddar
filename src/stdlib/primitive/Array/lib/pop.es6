export default (api) => ["pop", api.var(new api.func(
    [],
    function(scope, input) {
        return input("self").value.pop() || new api.nil;
    }
))];