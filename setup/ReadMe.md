# Setup

## Tools Required

* Node Version Manager (NVM) - [Install Instructions](https://github.com/nvm-sh/nvm#installing-and-updating)
* Yarn - [Old Install Instructions](https://yarnpkg.com/lang/en/docs/install/#mac-stable) - [New Install Instructions](https://yarnpkg.com/getting-started/install)
* Azure CLI - [Install Instructions](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)

> Do not forget to run `nvm use` to set the correct node version for the project.
> And then install the dependencies with `yarn install`.

## Getting the configuration

Open a terminal at the root level of the repository and run the following command:

``` bash
yarn config:aat
```

This will retrieve the configuration from the AAT environment and place it in the `config` folder.

Alternatively, you can run the following command to retrieve the configuration from the AAT environment point to the Docker containers where possible

``` bash
yarn config:docker
```
