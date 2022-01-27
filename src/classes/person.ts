import IPerson from '@/models/person';

export default class Person implements IPerson {
  name: {
    title: string;
    first: string;
    last: string;
  };

  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };

  location: {
    street: {
      number: number;
      name: string;
    }
    city: string;
    state: string;
    postcode: number;
  };

  login: { uuid: string };

  dob: { date: string; age: number };

  phone: string;

  cell: string;

  constructor({
    name,
    picture,
    location,
    login,
    dob,
    phone,
    cell,
  }: IPerson) {
    this.name = name;
    this.picture = picture;
    this.location = location;
    this.login = login;
    this.dob = dob;
    this.phone = phone;
    this.cell = cell;
  }
}

// export default class Person {
//   name?: {
//     title: string;
//     first: string;
//     last: string;
//   };

//   picture?: {
//     large: string;
//     medium: string;
//     thumbnail: string;
//   };

//   location?: {
//     street: string;
//     city: string;
//     state: string;
//     postcode: number;
//   };

//   login?: {
//     uuid: string;
//   };

//   dob?: {
//     date: string;
//     age: number;
//   };

//   phone?: string;

//   cell?: string;
// }
