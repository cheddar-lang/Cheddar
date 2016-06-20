import api from '../../api';
export default new Map([
    // TODO: Move to ./lib/
    ["slice", api.var(new api.func(
        [
            ["A", { Type: api.number }],
            ["B", { Type: api.number }]
        ], function(scope, input) {
            return new api.init(api.string,
                input("self").slice(
                    input("A"),
                    input("B")
                )
            )
        }
    ))]
]);