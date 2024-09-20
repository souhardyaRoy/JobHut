import * as yup from 'yup';

export const createJobvalidationSchema = yup.object().shape({
  role: yup.string().min(2, 'Role must be at least 2 characters').required('Role is required'),
  jobtitle: yup.string().min(2, 'Job title must be at least 2 characters').required('Job title is required'),
  location: yup.string().min(2, 'Location must be at least 2 characters').required('Location is required'),
  minexp: yup
    .number()
    .min(0, 'Minimum experience cannot be less than 0')
    .required('Minimum experience is required'),
  maxexp: yup
    .number()
    .max(15, 'Maximum experience cannot be more than 15')
    .required('Maximum experience is required')
    .test('is-greater', 'Maximum Experience must be greater than minimum experience', function (value) {
        const { minexp } = this.parent;
        return value > minexp;
      }),
  minsal: yup
    .number()
    .required('Minimum salary is required'),
  maxsal: yup
    .number()
    .required('Maximum salary is required')
    .test('is-greater', 'Maximum salary must be greater than minimum salary', function (value) {
      const { minsal } = this.parent;
      return value > minsal;
    }),
  jd: yup.string().min(30, 'Job description must be at least 30 characters').required('Job description is required'),
});

