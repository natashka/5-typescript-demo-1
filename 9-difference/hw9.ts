interface IA {
    a: number;
    b: string;
    d:boolean;
}

interface IB {
    a: number;
    c: boolean;
}

let a: IA = { a: 5, b: '', d: false };
let b: IB = { a: 10, c: true, };

interface IDifference {
    b: string;
}

function difference<T extends object, U extends object>(a:T, b: U):Pick<T, Exclude<keyof T, keyof U>> {
    type ex = Exclude<keyof T, keyof U>;

    type pickType = Pick<T, ex>;
    const result = {} as Record<string, unknown>;

    //const result: Record<string, unknown> = {};

    for (const key of Object.keys(a)) {
        if (!(Object.prototype.hasOwnProperty.call(b, key))) {
            result[key] = a[key as keyof T];
        }
    }
    return result as pickType;

}

let v0: IDifference = difference(a, b);
console.log(v0);
