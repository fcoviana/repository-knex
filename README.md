# Repository knex

[![License][license-badge]][license-url]

Repository Knex is a simple implementation based on the `knex` queryBuilder of the repository pattern for NodeJS. It abstracts access to a supplied database table with simple `CRUD` methods.

## Settings

###### Create Personal Access Token

>https://github.com/settings/tokens

The token needs permission to read packages from the registry (write:packages).

###### Add a `.npmrc` file to your project root with the following content:
```
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
registry=https://npm.pkg.github.com/francisco1030
```

###### Install package

```bash
$ npm install @fcoviana/repository-knex
```

## License

[MIT](https://github.com/fcoviana/repository-knex/blob/master/LICENSE)

[license-badge]: https://img.shields.io/github/license/fcoviana/repository-knex.svg
[license-url]: https://opensource.org/licenses/MIT
