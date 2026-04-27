function merge(...objects) {
  return objects.reduce((acc, current) => {
    Object.keys(current).forEach(key => {
      if (!(key in acc)) {
        acc[key] = current[key];
      }
    });
    return acc;
  }, {});
}

const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const obj3 = { a: 5, d: 6 };

console.log(merge(obj1, obj2, obj3));
