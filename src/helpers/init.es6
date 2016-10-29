// Given a class, construct it given arguments
export default function HelperInit(Class, ...Args) {
    let A = new Class(null, null),
        B;
    if ((B = A.init(...Args)) === true) {
        return A;
    } else {
        return B;
    }
}
