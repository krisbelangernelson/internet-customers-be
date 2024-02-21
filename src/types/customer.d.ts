export interface Customer {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
  phone: string
  credit_card_company: string
  credit_card_number: string
  create_date: string
  update_date: string
}

export interface CustomerBody {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
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
