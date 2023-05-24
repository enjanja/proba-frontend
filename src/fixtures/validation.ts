import { PatientType } from '../interfaces/dataTypes' 

export const usernameValidation = {
  required: 'This field is required',
  minLength: {
    value: 6,
    message: 'Username must have at least 6 characters',
  },
}

export const passwordValidation = {
  required: 'This field is required',
  pattern: {
    value: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
    message: 'Password must have letters and numbers, with at least 6 characters' 
  },
  minLength: {
    value: 6,
    message: 'Password must have at least 6 characters',
  },
}

export interface AddDrValidationType {
  name: string
  validations: {
    required: string
    minLength: {
      value: number
      message: string
    }
  }
}

export const addDoctorValidations = [
  {
    name: 'name',
    validations: {
      required: 'This field is required',
      minLength: {
        value: 2,
        message: 'Full name must have at least 2 characters',
      },
    },
  },
  {
    name: 'username',
    type: 'number',
    validations: {
      required: 'This field is required',
      minLength: {
        value: 6,
        message: 'Username must have at least 6 characters',
      },
    },
  },
  {
    name: 'password',
    validations: {
      required: 'This field is required',
      minLength: {
        value: 6,
        message: 'Password must have at least 6 characters',
      },
    },
  },
]

type PatientTypeKeys = Extract<keyof PatientType, string>;

export interface AddPatientValidationType {
  name: PatientTypeKeys
  disabled: boolean | ((param: string) => boolean)
  validations: {
    required: string
    minLength?: {
      value: number
      message: string
    },
    pattern?: {
      value: RegExp,
      message: string
    } | undefined
  }
}

export const addPatientValidations: AddPatientValidationType[] = [
  {
    name: 'name',
    disabled: false,
    validations: {
      required: 'This field is required',
      minLength: {
        value: 2,
        message: 'Full name must have at least 2 characters'
      }
    },
  },
  {
    name: 'jmbg',
    disabled: (param: string) => param === 'jmbg',
    validations: {
      required: 'This field is required',
      pattern: {
        value: /^\d{13}$/,
        message: 'Allowed length = 13 characters. No letters allowed.'  
      }
    },
  },
  {
    name: 'lbo',
    disabled: false,
    validations: {
      required: 'This field is required',
      pattern: {
        value: /^\d{11}$/,
        message: 'Allowed length = 11 characters. No letters allowed.'
      }
    },
  }
]
