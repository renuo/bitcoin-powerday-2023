const Client = require('bitcoin-core');
const client = new Client({ 
  network: 'mainnet', 
  username: 'renuo', 
  password: 'powerday'
});

client.getBlockchainInfo().then((help) => console.log(help));
