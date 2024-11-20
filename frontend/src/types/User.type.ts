export interface UserType {
  _id?: string;
  name: {
    first: string;
    mid?: string;
    last: string;
  };
  isBusiness: boolean;
  isAdmin: boolean;
  email: string;
  password: string;
  phone: string;
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: string;
  };
  image: {
    url: string;
    alt: string;
  };
  likes: string[];
  failedLoginAttempts?: number;
  lockUntil?: Date;
}
