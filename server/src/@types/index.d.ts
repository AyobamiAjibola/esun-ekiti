declare namespace Express {
  export interface Request {
    user: string,
    phone_num: string;
    role: string;
  }
}

declare namespace Express {
  export interface Request {
    data: any;
  }
}
