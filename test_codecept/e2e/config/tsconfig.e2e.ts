{
    "compileOnSave": false,
    "compilerOptions": {
      "baseUrl": "./",
      "downlevelIteration": true,
      "outDir": "./out-tsc/app",
      "sourceMap": true,
      "declaration": false,
      "module": "commonjs",
      "moduleResolution": "node",
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "importHelpers": true,
      "target": "es5",
      "types": [
        "jasmine",
        "jasminewd2",
        "node"
        ]
      "typeRoots": [
        "node_modules/@types"
      ],
      "skipLibCheck": true,
      "lib": [
        "ES2020",
        "dom"
      ]
    },
    "ts-node": {
      "transpileOnly": true,
      "compilerOptions": {
        "module": "commonjs"
      }
    }
  }
  