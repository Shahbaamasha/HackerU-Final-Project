import * as Yup from 'yup';

export const cardSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    subtitle: Yup.string().required('Subtitle is required'),
    description: Yup.string().required('Description is required'),
    phone: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    web: Yup.string().url('Invalid URL format'),
    image: Yup.object({
      url: Yup.string().url('Invalid image URL').required('Image URL is required'),
      alt: Yup.string().required('Image description is required'),
    }),
    address: Yup.object({
      state: Yup.string().required('State is required'),
      country: Yup.string().required('Country is required'),
      city: Yup.string().required('City is required'),
      street: Yup.string().required('Street is required'),
      houseNumber: Yup.string().required('House number is required'),
    }),
  })