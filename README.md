# Datamancer

The small project for experiments with [AlaSQL](http://alasql.org/) library.
The library allows loading the data into memory, directly from browser, then manipulate them with using SQL query.

## Development

Build Docker image:

```sh
docker build -t datamancer .
```

Run it:

```sh
docker run -it -p 4200:4200 -v $(pwd):/usr/src/app -v /usr/src/app/node_modules --rm datamancer
```
