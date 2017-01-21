// Given a class, construct it given arguments
export default function HelperInit(Class, ...Args) {
    let A = new Class(null, null),
        B = A.init(...Args);

    return B && A 
}
