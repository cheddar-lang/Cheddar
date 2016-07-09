export default (api) => ["push", api.var(new api.func(
    [
        ["item", {}]
    ],
    function(scope, input) {
        let array = input("self").value;
        array.push(input("item"));
        return api.init(api.number, 10, 0, array.length);
    }
))];