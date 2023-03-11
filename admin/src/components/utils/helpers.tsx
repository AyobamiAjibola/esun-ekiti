export const phonePattern = /^[/+]?[(]?[0-9]{3}[)]?[-\s/.]?[0-9]{3}[-\s/.]?[0-9]{4,9}$/;
export const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*\W)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
export const loginValues = {
  phone_num: '',
  password: ''
}

export const obaValues = {
  fullName: '',
  bio: '',
  from: '',
  to: ''
}

export const chiefValues = {
  fullName: '',
  bio: '',
  title: '',
  duties: '',
  position: 0
}

export const newsValues = {
  title: '',
  news: ''
}

export const eventValues = {
  name: '',
  detail: ''
}

export const projectValues = {
  project: '',
  detail: ''
}

export const userValues = {
  fullName: '',
  phone_num: '',
  password: '',
  confirm_password: '',
  unique: ''
}

// export const userValues = {
//   fullName: '',
//   phone_num: '',
//   password: '',
//   confirm_password: ''
// }
