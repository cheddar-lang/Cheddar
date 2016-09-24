const equ = (x, y) => {
    return x.Scope.get("min") === y.Scope.get("min")
        && x.Scope.get("max") === y.Scope.get("max");
}

export default equ;
