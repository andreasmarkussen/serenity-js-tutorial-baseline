/// <reference types="protractor" />
// import { Config } from 'protractor';

const
    { ConsoleReporter } = require('@serenity-js/console-reporter'),
    { ArtifactArchiver } = require('@serenity-js/core'),
    { Photographer, TakePhotosOfInteractions } = require('@serenity-js/protractor'),
    { SerenityBDDReporter } = require('@serenity-js/serenity-bdd'),
    isCI = require('is-ci');

/** @type { Config } */
const protractorConfig = {
    baseUrl: 'https://juliemr.github.io/',

    chromeDriver: require(`chromedriver/lib/chromedriver`).path,

    SELENIUM_PROMISE_MANAGER: false,

    directConnect: true,

    // https://github.com/angular/protractor/blob/master/docs/timeouts.md
    allScriptsTimeout: 110000,

    framework: 'custom',
    frameworkPath: require.resolve('@serenity-js/protractor/adapter'),

    specs: ['features/**/*.feature'],

    serenity: {
        runner: 'cucumber',
        crew: [
            ArtifactArchiver.storingArtifactsAt('./target/site/serenity'),
            ConsoleReporter.forDarkTerminals(),
            Photographer.whoWill(TakePhotosOfInteractions),     // or Photographer.whoWill(TakePhotosOfFailures),
            new SerenityBDDReporter(),
        ]
    },

    /**
     * If you're interacting with a non-Angular application,
     * uncomment the below onPrepare section,
     * which disables Angular-specific test synchronisation.
     */
    // onPrepare: function() {
    //     browser.waitForAngularEnabled(false);
    // },

    cucumberOpts: {
        require: ['features/serenity/**/*.ts',],
        'require-module': ['ts-node/register'],
        tags: ['~@wip'],
        strict: false,
    },

    capabilities: {
        browserName: 'chrome',

        // see https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities#loggingpreferences-json-object
        loggingPrefs: {
            browser: 'SEVERE' // "OFF", "SEVERE", "WARNING", "INFO", "CONFIG", "FINE", "FINER", "FINEST", "ALL".
        },

        chromeOptions: {
            args: [
                '--no-sandbox',
                '--disable-infobars',
                '--disable-dev-shm-usage',
                '--disable-extensions',
                '--log-level=3',
                '--disable-gpu',
                '--window-size=1920,1080',
            ]//.concat(isCI ? ['--headless'] : [])    // run in headless mode on the CI server
        }
    }
};

/** @type { Config } */
const sauceLabConfig = {
    directConnect: undefined,
    sauceKey: '0b7ca6bc-6aa6-4352-972e-189fe240d284',
    sauceUser: 'serenity-cucumber-tests',
    sauceRegion: 'us-west-1'
}


exports.config = { ...protractorConfig, ...sauceLabConfig};