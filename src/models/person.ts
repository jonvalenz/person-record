export default interface IPerson {
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
    };
    city: string;
    state: string;
    postcode: number;
  };

  login: {
    uuid: string;
  };

  dob: {
    date: string;
    age: number;
  };

  phone: string;
  cell: string;
}
