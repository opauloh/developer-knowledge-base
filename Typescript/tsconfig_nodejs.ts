//this an example of .tsconfig for node.js

const tsconfig = {
    "compilerOptions": {
        "target": "es6",
        "outDir": "js",
        "noEmitOnError": true,
        "noImplicitAny": false,
        "removeComments": true,
        "module": "commonjs",
        "strictNullChecks": false,
        "experimentalDecorators": true
    },
    "include": [
        "ts/**/*"
    ]
}