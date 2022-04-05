const { emailPasswordReset } = require('../dist/index.js');

emailPasswordReset(
  { firstName: 'Jacob', href: 'https://app.signupclinic.com' },
  { address: 'jacobclarke718@gmail.com' }
);
