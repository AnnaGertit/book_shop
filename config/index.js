"use strict";

const nconf = require('nconf');
const yaml = require('nconf-yaml');

nconf.formats.yaml = yaml;

var fs = require('fs'),
  path = require('path'),
  environment = process.env.NODE_ENV || 'development',

  baseConfigPath = path.join(__dirname, 'config.yaml'),
  envConfigPath = path.join(__dirname, 'config.' + environment + '.yaml'),
  localConfigPath = path.join(__dirname, 'config.' + environment + '.local.yaml'),

  hasBaseConfig = fs.existsSync(baseConfigPath),
  hasEnvConfig = fs.existsSync(envConfigPath),
  hasLocalConfig = fs.existsSync(localConfigPath);

if (!hasBaseConfig && !hasEnvConfig) {
  throw new Error('Could not find "' + envConfigPath + ' or ' + baseConfigPath + '".');
}

nconf.argv();

if (hasLocalConfig) {
  nconf.file('local', {
    file: localConfigPath,
    format: yaml,
    search: true
  });
}

if (hasEnvConfig) {
  nconf.file('environment', {
    file: envConfigPath,
    format: yaml,
    search: true
  });
}

if (hasBaseConfig) {
  nconf.file('base', {
    file: baseConfigPath,
    format: yaml,
    search: true
  });
}

module.exports = nconf;
