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

export interface CustomerBody {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
}

export interface Login {
  email: string
  password: string
}

export interface LoginResponse {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  accessToken: string
  code: string
}

export interface EmailExists {
  email: string
}
