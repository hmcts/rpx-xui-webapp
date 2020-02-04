import { config } from 'config'
import { propsExist } from '../lib/objectUtilities'

/**
 * Get Environment
 *
 * See Readme for more information on how the configuration file is set.
 * 'Environmental Variables Setup & Error Handling'
 *
 * @see Readme
 * @returns {string} ie. - development / preview / aat / ithc, prod
 */
export const getEnvironment = () => process.env.NODE_CONFIG_ENV;

/**
 * Get Postgres Secret
 *
 * We're able to pull in the secrets into the application using the following:
 * secretsConfig['secrets']['rpx']['postgresql-admin-pw']
 *
 * The secret always comes from keyVaults.rpx.secrets.postgresql-admin-pw BUT on the PR environment it comes
 * from the POSTGRES_PASSWORD within values.preview.template.yaml passed into application via preview.yaml - Why?
 * - There is only one instance of Postgres used by the environments higher than AAT, and of course do not want to publish
 * passwords into git.
 *
 * On the build pipelines keyVaults.rpx.secrets are not available therefore we fallback to using database.password.
 *
 * @returns {string}
 */
export const getPostgresSecret = (secretsConfig, environment): string => {
    const PREVIEW = 'preview';
    const ERROR_POSTGRES_SECRET_NOT_FOUND =
        'secrets.rpx.postgresql-admin-pw not found on this environment, therefore using the password in the .yaml' +
        'file for this environment.';

    if (environment === PREVIEW) {
        return config.get('database.password');
    }

    if (propsExist(secretsConfig, ['secrets', 'rpx', 'postgresql-admin-pw'])) {
        return secretsConfig['secrets']['rpx']['postgresql-admin-pw'];
    } else {
        console.log(ERROR_POSTGRES_SECRET_NOT_FOUND);
        return config.get('database.password');
    }
};

export const getAppInsightsSecret = (secretsConfig): string => {
    const ERROR_APP_INSIGHT_SECRET_NOT_FOUND =
        'secrets.rpx.appinsights-instrumentationkey-tc not found on this environment.';

    if (propsExist(secretsConfig, ['secrets', 'rpx', 'appinsights-instrumentationkey-tc'])) {
        return secretsConfig['secrets']['rpx']['appinsights-instrumentationkey-tc'];
    } else {
        console.log(ERROR_APP_INSIGHT_SECRET_NOT_FOUND);
        return '';
    }
};

/**
 * Has Config Value
 *
 * Returns if the configuration value is available, using a config reference. It uses the reference to pull out the value
 * from the .yaml file
 *
 * Note: If within a .yaml file you have
 *
 * database:
 *   name: POSTGRES_DB_NAME
 *
 * If POSTGRES_DB_NAME is unable to be pulled from the JenkinsFile_CNP,
 * then .yaml will return a string of 'POSTGRES_DB_NAME'
 *
 * This means that config.has('database.name') will always return true
 * as 'database.name'.
 *
 * This also means that config.get('database.name') will return 'POSTGRES_DB_NAME' and not
 * undefined.
 *
 * We return null if the value config.get receives has not been overridden.
 *
 * @see /config .yaml
 * @see references.ts
 * @param reference - ie. 'services.ccdDefApi'
 * @param shouldBeOverridden - ie. 'POSTGRES_DB_NAME'
 */
export const hasConfigValue = (reference, shouldBeOverridden) => {
    const configurationValue = config.get(reference);

    return configurationValue !== shouldBeOverridden;
};

/**
 * Generate Environment Check Text
 *
 * We generate text to be used for debugging purposes, so as the person attempting to initialise the application knows
 * what the NODE_CONFIG_ENV is set as.
 */
export const environmentCheckText = () => `NODE_CONFIG_ENV is set as ${process.env.NODE_CONFIG_ENV}.`;
