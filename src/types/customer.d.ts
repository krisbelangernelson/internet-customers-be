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
  id?: string
  firstName: string
  lastName: string
  email: string
  phone: string
  password?: string
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
}

export interface AccessToken {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface CustomerExists {
  email?: string
  phone?: string
}
