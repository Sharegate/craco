process.env.NODE_ENV = process.env.NODE_ENV || "development";

const { findArgsFromCli } = require("../lib/args");

// Make sure this is called before "paths" is imported.
findArgsFromCli();

const { log } = require("../lib/logger");
const { getCraPaths, start } = require("../lib/cra");
const { loadCracoConfigAsync } = require("../lib/config");
const { overrideWebpackDev } = require("../lib/features/webpack/override");
const { overrideDevServer } = require("../lib/features/dev-server/override");
const { overrideCraPaths } = require("../lib/features/cra-paths/override");

log("Override started with arguments: ", process.argv);
log("For environment: ", process.env.NODE_ENV);

const context = {
    env: process.env.NODE_ENV
};


loadCracoConfigAsync(context).then(cracoConfig => {
    context.paths = getCraPaths(cracoConfig);
    overrideCraPaths(cracoConfig, context);
    overrideWebpackDev(cracoConfig, context);
    overrideDevServer(cracoConfig, context);

    start(cracoConfig);
});
