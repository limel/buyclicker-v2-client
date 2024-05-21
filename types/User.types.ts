export type UserData = {
  _id: string
  name: string
  lastName: string
  email: string
  gender: 'male' | 'female'
  phone: string
  password: string
  receiveMail: boolean
  birthdate: string
  years: number
  nameInitials: string
  role: string
  createdAt: string
}

export interface IUser {
  name: string
  lastName: string
  nameInitials: string
  birthdate: string
  email: string
  gender: string
  phone: string
  password: string
  receiveMail: boolean
  years: number
  role: string
  createdAt: string
}
