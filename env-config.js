const { platform } = require('os');
const { execSync } = require("child_process");
const { writeFileSync } = require('fs');

const env = process.env.REMOTE_ENV
if (!env) {
    throw new Error('Environment variable REMOTE_ENV is required')
}

function getSecret(targetEnv, secret) {
    let cmd = `az keyvault secret show --vault-name "rpx-${targetEnv}" -o tsv --query value --name ${secret}`
    if (platform() == 'win32') {
        cmd = `cmd /c ${cmd}`
    }

    return execSync(cmd).toString().trim()
}

const template = getSecret('aat', 'local-development')
const jsonConfig = JSON.parse(template.replace(/\$\{env\}/g, env))
Object.keys(jsonConfig.secrets.rpx).forEach(key => jsonConfig.secrets.rpx[key] = getSecret(env, key))

writeFileSync('config/local-development.json', JSON.stringify(jsonConfig, null, 4))
