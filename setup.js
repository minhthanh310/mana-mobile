/* eslint-disable no-console */
var fs = require("fs");

let env = "dev";
let store_version = "1.0.0";
let build_number = "01";
let version = "";
let log_enabled = false;

let HOSTS = {
  mana: {
    dev: "192.168.1.5",
    production: "mana.org.vn"
  }
};

let BUILD_BAT_TEMPLATE =
  "@echo off\n" +
  "set PLATFORM=%1\n" +
  "set CHANNEL=%2\n" +
  "\n" +
  'if "%PLATFORM%"=="ios" (\n' +
  "    echo exp build:ios --release-channel %CHANNEL%\n" +
  "    call exp build:ios --release-channel %CHANNEL%\n" +
  "    goto end\n" +
  ")\n" +
  'if "%PLATFORM%"=="android" (\n' +
  "    echo exp build:android --release-channel %CHANNEL%\n" +
  "    call exp build:android --release-channel %CHANNEL%\n" +
  "    goto end\n" +
  ")\n" +
  'if "%PLATFORM%"=="" (\n' +
  "    echo exp publish --release-channel %CHANNEL%\n" +
  "    call exp publish --release-channel %CHANNEL%\n" +
  "    goto end\n" +
  ")\n" +
  "\n" +
  ":invalid_platform\n" +
  "echo Invalid platforms! available platforms are `ios` and `android`. Call with empty platform to publish only.\n" +
  "\n" +
  ":end\n";

function patchJSfile(file, content) {
  fs.writeFile(__dirname + file, content, function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file " + __dirname + file + " was saved!");
  });
}

function generateConfig() {
  let configObj = {
    _env_: env,
    _version_: version,
    _store_version_: store_version,
    _log_enabled_: log_enabled,
    _hosts_: {}
  };
  for (let host in HOSTS) {
    configObj._hosts_[`_${host}_`] = HOSTS[host][env];
  }
  let config_str = "module.exports = " + JSON.stringify(configObj, null, 2);
  config_str = config_str.replace(/"_/g, "");
  config_str = config_str.replace(/_"/g, "");
  config_str = config_str.replace(/"/g, `'`);
  patchJSfile("/config/index.js", config_str);
}

function generateBuildScript() {
  if (!log_enabled) {
    patchJSfile("/build.bat", BUILD_BAT_TEMPLATE.replace("%2", env));
  } else {
    patchJSfile(
      "/build.bat",
      "@echo off\necho remove --log flag to generate build script!"
    );
  }
}

function main() {
  // setup
  let i = process.argv.findIndex(a => a === "--env");
  if (i !== -1) {
    env = process.argv[i + 1];

    if (env !== "dev" && env !== "production") {
      console.log("WARNING - ENVIRONMENT SHOULD BE SET TO dev OR production");
      console.log(
        "   Do it by passing '--env dev' or '--env production' to command arguments."
      );
      console.log("   Dev environment build is activated.");
      env = "dev";
    }

    if (env === "production") {
      console.log(
        "WARNING - Set environment to 'production' will affect LIVE tracking data"
      );
      console.log("   Make sure you understand what you are doing.");
      console.log("   PRODUCTION environment build is activated.");
    }

    if (process.argv.findIndex(a => a === "--log") !== -1) {
      log_enabled = true;
    }

    version = `${store_version}.${build_number}`;
    console.log(
      `Build app with: ENVIRONMENT=${env} | BUILD_NUMBER=${build_number} | LOG_ENABLED=${log_enabled}`
    );

    generateConfig();
    generateBuildScript();
  }
}

main();
