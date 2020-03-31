# authenticator

Timestamp authenticator to sign HTTP requests for Allied REST api.

Public / Private Key Required.

## Usage

```js
const config = {
  publicKey: 'PUBLICKEY',
  privateKey: 'PRIVATEKEY',
  api: 'https://api.demo.alliedpayment.com',
  domain: 'ALLIED',
  username: 'support',
  onBehalfOf: undefined // optional
};
const Authenticator = require('@alliedpayment/authenticator');
const authenticator = new Authenticator(config);
const header = authenticator.sign('url/to/resource');
```
