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
export const createProductValidationSchema ={
    prodName: {
        notEmpty: true,
    },
    price: {
        notEmpty: true,
    },
};
export const createCLientValidationSchema ={
    name: {
        notEmpty: true,
    },
    age: {
        notEmpty: true,
    },
    email: {
        notEmpty: true,
    },
    address: {
        notEmpty: true,
    },
    // city: {
    //     notEmpty: true,
    // },
    // zip: {
    //     notEmpty: true,
    // },
    // address: {
    //     notEmpty: true,
    // },
};
export const createAddressValidationSchema ={
    street: {
        notEmpty: true,
    },
    city: {
        notEmpty: true,
    },
    zip: {
        notEmpty: true,
    },
    // address: {
    //     notEmpty: true,
    // },
};
// this file is for validation/ para maayos ang code tignan/ey ka muna , eyy