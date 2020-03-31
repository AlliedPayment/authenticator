const newline = '\r\n';
const CryptoJS = require('crypto-js');

class Authenticator {
  constructor(config) {
    this.config = config;
    if (!this.config) {
      throw new Error('auth config missing');
    }
  }
  sign(url) {
    const privateKey = Buffer.from(this.config.privateKey, 'base64').toString(
      'utf8'
    );
    const publicKey = Buffer.from(this.config.publicKey, 'base64').toString(
      'utf8'
    );
    const timestamp = new Date().toISOString();
    const message = `${url}${newline}${timestamp}${newline}`;
    const hash = CryptoJS.HmacSHA1(message, privateKey);
    const signature = hash.toString(CryptoJS.enc.Base64);
    var header = 'TIMESTAMP ';
    if (this.config.username) {
      header = `${header}username=${this.config.username};`;
    }
    if (this.config.domain) {
      header = `${header}domain=${this.config.domain};`;
    }
    if (this.config.onBehalfOf) {
      header = `${header}onBehalfOf=${this.config.onBehalfOf};`;
    }
    header = `${header}timestamp=${timestamp};signature=${signature};publickey=${publicKey};`;
    return header;
  }
}

module.exports = Authenticator;
