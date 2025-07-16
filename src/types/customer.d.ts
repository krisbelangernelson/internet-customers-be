export interface Customer {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
  phone: string
  create_date: string
  update_date: string
}

export interface AccessToken {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface CustomerBody extends Pick<AccessToken, 'firstName' | 'lastName' | 'email' | 'phone'> {
  id?: string
  password?: string
}

export interface Login extends Pick<Customer, 'email' | 'password'> { }

export interface LoginResponse extends AccessToken {
  accessToken: string
}

export interface CustomerExists {
  email?: string
  phone?: string
}
