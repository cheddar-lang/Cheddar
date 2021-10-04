// Given a class, construct it given arguments
export default function HelperInit(Class, ...Args) {
    let A = new Class(null, null),
        B = A.init(...Args);
//i know this is not ol repository
    return B && A 
}
