# Testing

The unit tests deliberately exercise handlers that do not require a live database. Database-backed behavior is validated after deployment with the authenticated node smoke path and controlled discovery records.

```sh
deno task test
```

The SIA worker contract tests are independent:

```sh
cd workers/sia
npm test
```
