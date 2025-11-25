
export const createStudentValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "Name is required"
    },
    isLength: {
      options: { min: 3, max: 30 },
      errorMessage: "Name must be between 3–30 characters"
    }
  },

  age: {
    notEmpty: {
      errorMessage: "Age is required"
    },
    isInt: {
      errorMessage: "Age must be a number"
    }
  },

  marks: {
    notEmpty: {
      errorMessage: "Marks are required"
    },
    isNumeric: {
      errorMessage: "Marks must be a number"
    }
  },

  roles: {
    notEmpty: {
      errorMessage: "Roles is required"
    },
    isString: {
      errorMessage: "Roles must be a string"
    }
  }
};


export const createUserValidationSchema = {
  name : {
    notEmpty: {
      errorMessage : "Name is required"
    },
    isLength : {
      option : {min:3, max:30},
      errorMessage : "Name must be 3 - 30 charecters"
    }
  },
  phone : {
    notEmpty : {
      errorMessage : "phone number is required"
    },
    isNumeric : {
      errorMessage : "Phone Number must be is Numeric"
    }
  }

}


export const createMessageValidationSchema = {
  name: {
    notEmpty: {
      errorMessage: "Name cannot be empty"
    }
  },
  mail: {
    isEmail: {
      errorMessage: "Please provide a valid email"
    }
  },
  message: {
    notEmpty: {
      errorMessage: "Message cannot be empty"
    }
  }
}
