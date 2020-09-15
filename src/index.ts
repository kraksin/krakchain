const name = 'krak', age = 24, gender = 'male';

const sayHi = (name: string, age: number, gender: string): void => {
    console.log(name);
    console.log(age);
    console.log(gender);
}


sayHi(name, age, gender);

export {};