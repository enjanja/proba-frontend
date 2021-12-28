export const usernameValidation = {
  required: 'This field is required',
  minLength: {
    value: 6,
    message: 'Username must have at least 6 characters',
  },
}

export const passwordValidation = {
  required: 'This field is required',
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

export interface AddPatientValidationType {
  name: string
  validations: {
    required: string
    maxLength?: {
      value: number
      message: string
    }
    minLength?: {
      value: number
      message: string
    }
  }
}

export const addPatientValidations = [
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
    name: 'jmbg',
    validations: {
      required: 'This field is required',
      maxLength: {
        value: 13,
        message: 'JMBG must be at least 13 characters',
      },
      minLength: {
        value: 13,
        message: 'JMBG must be at least 13 characters',
      },
    },
  },
]
