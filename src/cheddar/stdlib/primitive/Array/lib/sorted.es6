export default (api) => ["sorted", api.prop(new api.func([],
    function(_, input) {
        let res;
        let op;
        try {
            res = input("self").value.sort((a, b) => {
                op = a.Operator && a.Operator.get(">");
                if (!op) {
                    throw `${a.Name || a.constructor.Name} is not comparable`;
                }

                op = op(a,b);
                if (op.constructor.Name !== "Boolean") {
                    throw `Unable to compare \`${
                        a.Name || a.constructor.Name
                    }\` and \`${
                        a.Name || a.constructor.Name
                    }\``;
                }

                if (op.value === true) {
                    return 1;
                } else {
                    op = a.Operator && a.Operator.get("<");
                    if (!op) {
                        throw `${a.Name || a.constructor.Name} is not comparable`;
                    }

                    op = op(a,b);
                    if (op.constructor.Name !== "Boolean") {
                        throw `Unable to compare \`${
                            a.Name || a.constructor.Name
                        }\` and \`${
                            a.Name || a.constructor.Name
                        }\``;
                    }

                    if (op.value === true) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
            });
        } catch(e) {
            return e.message;
        }

        return api.init(api.array, ...res);
    }
))];


