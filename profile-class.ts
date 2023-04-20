import countries from './countries.js';

function myDecorator() {
    // wraps a method
    // decorator can modify the given variable

    return function (target: object, propertyKey: string, descriptor: any) {
        const fn = descriptor.value; // <- variable | function below the decorator

        descriptor.value = function (...arg: any[]) {
            console.log('the argument is: ', ...arg);
            // do something before running the function
            fn.bind(this)(...arg);
            // do something after running the function
        };
    };
}

// this is a profile generator library
export class Profile {
    // : for type definitions
    // = for assigning values

    user: {
        flag: string;
        country: string;
        name: string;
        age: number;
        gender: 'male' | 'female';
    };

    constructor(name: string, age: number, gender: 'male' | 'female', countryCode: string) {
        // setup this.user data
        this.user = {
            name, // name: name
            age: age,
            gender,
            country: countries[countryCode].name,
            flag: countries[countryCode].flag
        };
    }

    @myDecorator()
    changeMyProfile(name: string, age: number, gender: 'male' | 'female', countryCode: string) {
        // setup this.user data
        this.user = {
            name, // name: name
            age: age,
            gender,
            country: countries[countryCode].name,
            flag: countries[countryCode].flag
        };
    }

    createHtmlDiv(): HTMLDivElement {
        let nameDiv = document.createElement('div');
        nameDiv.textContent = `${this.user.name} from ${this.user.country} ${this.user.flag}`;

        if (this.user.gender === 'male') {
            nameDiv.style.backgroundColor = 'blue';
        }
        else if (this.user.gender === 'female') {
            nameDiv.style.backgroundColor = 'red';
        }

        nameDiv.style.color = 'white';
        nameDiv.style.fontSize = '4em';
        return nameDiv;
    }

    purchaseCigar(): string {
        if (this.user.age < 18) {
            return `${this.user.name} must be over 18 to purchase the cigar. ${this.user.name} is currently ${this.user.age}`;
        }

        return `${this.user.name} has purchased a cigar`;
    }
}