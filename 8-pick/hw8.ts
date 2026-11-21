const user = {
    name: "Vasiliy",
    age: 8,
    skills: ['typescript', 'javascript']
}
type notRequired<T> = {
    [K in keyof T]+?: T[K];
} ;

function pickObjectKeys<T, K extends keyof T>(obj:T, arr:K[]):{ [P in K]: T[P] } {
    let newObj = {} as { [P in K]: T[P] };
    for (let el of arr) {
        newObj[el] = obj[el];
    }
    return newObj;
}

const res1 = pickObjectKeys(user, ['age', 'skills']);
/*
{
  age: 8,
  skills: ['typescript', 'javascript']
}
*/
console.log(res1);