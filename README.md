## CsvViewer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.12.

Screenshot
![alt text](https://raw.githubusercontent.com/sidd9433/csv-viewer/master/screenshot.png)


### Development
This project was built with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

1. Clone repository and `cd` to the folder
2. Run `npm i`
3. Run `npm start` or `ng serve`
4. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build and deployment

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
Dist folder contains production build. 
For deployment, just need to have our server using Apache or nginx serve all requests to this index.html file. Angular will take care of the rest.

### Running unit tests
1. Run `ng test` to execute the unit tests via Karma.

### SonarQube analysis report
1. Run `sonar-scanner` to execute SonarQube analysis on the project root.
2. Analysis report available at [SonarCloud](https://sonarcloud.io/dashboard?id=sidd9433_csv-viewer)

Note: 
1. In order to run sonar analysis, `ng test` has to be run with a `--code-coverage` flag to generate the coverage report before running `sonar-scanner`.
2. SonarQube scanner distribution should be in `PATH`.
