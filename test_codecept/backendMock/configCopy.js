const fs = require('fs')
const path = require('path')

const files = fs.readdirSync(path.resolve(__dirname, '../../config'));

const secretsDir = '/mnt/secrets/';

function loadSecrets() {
    const secrets = {};
    if (fs.existsSync(secretsDir)) {
        fs.readdirSync(secretsDir).forEach(file => {
            const secretKey = path.basename(file); // Each filename is the key
            const secretValue = fs.readFileSync(path.join(secretsDir, file), 'utf8').trim();
            secrets[secretKey] = secretValue;
        });
    } else {
        console.error(`Secrets directory ${secretsDir} not found.`);
    }
    return secrets;
}

const secrets = loadSecrets();
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


