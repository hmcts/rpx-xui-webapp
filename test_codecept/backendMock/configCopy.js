const fs = require('fs')
const path = require('path')

const files = fs.readdirSync(path.resolve(__dirname, '../../config'));

const secretsPath = '/mnt/secrets/rpx';

function readSecrets() {
  const secrets = {};
  
  fs.readdirSync(secretsPath).forEach(file => {
    const secretName = path.basename(file);
    const secretValue = fs.readFileSync(path.join(secretsPath, file), 'utf8').trim();
    secrets[secretName] = secretValue;
  });

  return secrets;
}

// Now you can use the secrets object in your config
const secrets = readSecrets();
console.log('Loaded secrets:', secrets);

console.log(files);
console.log(process.env);
const mockConfig = files.find(file => file === 'local-mock.json');
let defaultConfig;
let defaultSecrets;
if (process.env.LOCAL){
    defaultConfig = files.find((file) => file === 'local-development.json');
} else {
    if (files.find((file) => file === 'default.json')){
        const defaultConfigPath = path.join(__dirname, '../../config', 'default.json');
        defaultConfig = JSON.parse(fs.readFileSync(defaultConfigPath, 'utf8'));
        console.log(defaultConfig);
    }

}


if (mockConfig === undefined){
    fs.copyFileSync(path.resolve(__dirname, 'local-mock.json'), path.resolve(__dirname, '../../config/local-mock.json') )
}


