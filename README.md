## Credentials for postgres DB

```bash
$ ./config/database.json
```

## Installation

```bash
$ npm install
```

## Start

Firstly create a database and provide it with convenient data using [saver](https://github.com/ivkazanovskiy/ether-saver-test) script.

Then start the server:

```bash
$ npm start
```

Endpoint:

> GET https://localhost:3000/

Returns string value and status code 200 or 404 if there are no records in the database.
