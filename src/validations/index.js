import * as Yup from 'yup';

const loginValidation = Yup.object().shape({
  email: Yup.string().required('Email Is Required'),
  password: Yup.string()
    .required('Password Is Required')
    .min(6, 'Min six characters are required')
    .max(15, 'Max fifteen characters required'),
});
const addProductValidation = Yup.object().shape({
  categoryId: Yup.string().required('Category Id Is Required'),
  productName: Yup.string().required('Product Name Is Required'),
  price: Yup.string()
    .required('Price Is Required')
    .max(9, 'Enter price not mobile price')
    .matches(/^[0-9]*$/, 'Enter valid price'),
  description: Yup.string().required('Description Is Required'),
});

export {loginValidation, addProductValidation};
