import { ErrorMessageOptions } from 'zod-error';
// eslint-disable-next-line linebreak-style

export const options: ErrorMessageOptions = {
  code: {
    enabled: false,
  },
  delimiter: {
    component: ' - ',
  },
  message: {
    enabled: true,
    label: '',
  },
  path: {
    enabled: true,
    type: 'breadcrumbs',
    label: 'Field: ',
  },
  maxErrors: 1,
};
