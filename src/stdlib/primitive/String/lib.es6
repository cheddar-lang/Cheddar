import api from '../../api';
export default new Map([
    ["slice", new api.func(
        [
            ["A", { Type: api.number }],
            ["B", { Type: api.number }]
        ], function(scope, done, input) {
            done(new api.init(api.string,
                input("self").slice(
                    input("A"),
                    input("B")
                )
            ))
        }
    )]
]);