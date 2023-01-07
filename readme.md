# Performance Testing with K6 and grafana Modified by JuanP Carvajal

## start:
- `docker-compose up -d influxdb grafana`
- Load http://localhost:3000, and import the `grafana_dashboard.json` config to a new dashboard.
- `docker-compose run k6 run /tests/01-simple/test.js`

## To use cloud run Grafana (Not tested )

- Create an account with LoadImpact here to use the cloud run: [https://app.loadimpact.com/account/login](https://app.loadimpact.com/account/login)
- Replace `LI_TOKEN` in the `Dockerfile` with your account token.
- `docker-compose run k6 cloud /tests/01-simple/test.js` to run the test in the cloud

Look through the k6 docs here: https://support.loadimpact.com/4.0/