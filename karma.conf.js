module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        reporters: ['mocha', 'coverage', 'junit'],
        browsers: ['PhantomJS'],
        singleRun: true,
        coverageReporter: {
            dir: './coverage',
            reporters: [
                {
                    type: 'json',
                    subdir: '.',
                    file: 'coverage-final.json'
                },
                {type: 'lcovonly', subdir: 'report-lcov'},
                {type: 'html'}
            ]
        },
        preprocessors: {
            'src/js/sebastian-carousel.js': 'coverage',
        },
        files: [
            'src/js/sebastian-carousel.js',
            {
                pattern: 'src/test/*.spec.js', included: true, watched: true
            }
        ],
        exclude: [
            '**/node_modules/**/*.spec.js'
        ],
        junitReporter: {
            outputDir: './coverage', // results will be saved as $outputDir/$browserName.xml
            outputFile: 'jasmine.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
            suite: '', // suite will become the package name attribute in xml testsuite element
            useBrowserName: false, // add browser name to report and classes names
            nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
            classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element,
            properties: {} // key value pair of properties to add to the <properties> section of the report
        }
    });
};
