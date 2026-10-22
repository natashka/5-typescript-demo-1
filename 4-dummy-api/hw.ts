import axios, {AxiosError} from 'axios';

 enum Gender  {
    male= "male",
    female="female",
}
// type GenderType = typeof Gender[keyof typeof Gender];

enum BloodGroup {
    zeroMinus = "O-",
    zeroPlus = "O+",
    AMinus = "A-",
    APlus = "A+",
    BMinus = "B-",
    BPlus = "B+",
    ABMinus = "AB-",
    ABPlus = "AB+",
}
// type BloodGroupType = typeof BloodGroup[keyof typeof BloodGroup];
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

enum Role {
    user = "user",
    admin = "admin",
    moderator = "moderator",
}
// type RoleType = typeof Role[keyof typeof Role];

interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: Gender;
    email: string;
    birthDate: Date;
    image: string;
    bloodGroup: BloodGroup;
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
    role: Role;
}
interface ResponseInfo {
    users: User[];
    total:number;
    skip:number;
    limit:number;
}
 async function fetchTodoData():Promise<User[]|undefined> {
    try {
        // 2. Pass the interface as a generic type parameter to axios.get()
        const response = await axios.get<ResponseInfo>('https://dummyjson.com/users');
        return response.data.users;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            console.error('Axios Error message:', error.message);
            console.error('Status code:', error.response?.status);
            return [];
        } else if (error instanceof Error) {
            console.error('Error message:', error.message);
            return [];
        } else {
            console.error('Unexpected error:', error);
            return [];
        }
    }
}

fetchTodoData().then(ar => ar?.forEach(u => console.log(u.firstName)));
