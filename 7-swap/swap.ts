const obj: Record<string, number> = {
    a: 1,
    b: 2
}

function swapKeysAndValues(obj: Record<string, number>):Record<number, string> {
    const newObj: Record<number, string> = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            newObj[value] = key;
        }
    }
    return newObj;
}

const res:Record<number, string> = swapKeysAndValues(obj);
//console.log(res);
/*
{
  1: 'a',
  2: 'b'
}
*/