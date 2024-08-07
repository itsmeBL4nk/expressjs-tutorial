export const createUserValidationSchema ={
    username: {
        isLength:{
            option:{
                min: 5,
                max: 32,
            },
            errorMessage:
            "Username must be atleast 5 characters with a max of 32 characters",
        },
        notEmpty: {
            errorMessage: "Username cannot be empty",
        },
        isString: {
            errorMessage: "Username must be String"
        },
    },
    displayName: {
        notEmpty:true,
    },
    password: {
        notEmpty: true,
    },
};
// this file is for validation/ para maayos ang code tignan/ey ka muna , eyy