import axios, {AxiosError} from 'axios';

const Gender = {
    male: "male",
    female:"female",
} as const;
type GenderType = typeof Gender[keyof typeof Gender];

const BloodGroup  = {
    zeroMinus: "O-",
    zeroPlus: "O+",
    AMinus: "A-",
    APlus: "A+",
    BMinus: "B-",
    BPlus: "B+",
    ABMinus: "AB-",
    ABPlus: "AB+",
}
type BloodGroupType = typeof BloodGroup[keyof typeof BloodGroup];
interface Hair {
    color: string;
    type: string;
}

interface Coordinates {
    lat: number;
    lng: number;
}

interface Address {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: number;
    coordinates: Coordinates;
    country: string;
}

interface Bank {
    cardExpire: Date;
    cardNumber: number;
    cardType: string;
    currency: string;
    iban: string;
}

interface CompanyInfo {
    department: string;
    name: string;
    title: string;
    address: Address;
    country: string;
}

interface CryptoInfo {
    coin: string;
    wallet: string;
    network: string;
}

const Role =  {
    user: "user",
    admin: "admin",
    moderator: "moderator",
} as const;
type RoleType = typeof Role[keyof typeof Role];

interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: GenderType;
    email: string;
    birthDate: Date;
    image: string;
    bloodGroup: BloodGroupType;
    height: number;
    weight: number;
    eyeColor: string;
    hair: Hair;
    ip: string;
    address: Address;
    macAddress: string;
    university: string;
    bank: Bank;
    company: CompanyInfo;
    ein: string; //123-456
    ssn: string; //123-456-789
    userAgent: string;
    crypto: CryptoInfo;
    role: RoleType;
}

 async function fetchTodoData():Promise<User[]|undefined> {
    try {
        // 2. Pass the interface as a generic type parameter to axios.get()
        const response = await axios.get<User[]>('https://dummyjson.com/users');
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.error('Axios Error message:', error.message);
            console.error('Status code:', error.response?.status);
            //return [];
        } else if (error instanceof Error) {
            console.error('Error message:', error.message);
            //return [];
        } else {
            console.error('Unexpected error:', error);
            //return [];
        }
    }
}

const users:User[] | undefined = await fetchTodoData();
console.log(users);