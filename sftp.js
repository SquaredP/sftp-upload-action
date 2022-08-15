import core from '@actions/core';
import Deployer from "./lib/deployer.js";

const config = {
  host: core.getInput('host'), // Required.
  port: core.getInput('port'), // Optional, Default to 22.
  username: core.getInput('username'), // Required.
  password: core.getInput('password'), // Optional.
  privateKey: core.getInput('privateKey'), // Optional.
  passphrase: core.getInput('passphrase'), // Optional.
  agent: core.getInput('agent'),   // Optional, path to the ssh-agent socket.
  localDir: core.getInput('localDir'), // Required, Absolute or relative to cwd.
  remoteDir: core.getInput('remoteDir') // Required, Absolute path only.
};

const options = {
  dryRun: JSON.parse(core.getInput('dryRun')), // Enable dry-run mode. Default to true
  exclude: core.getInput('exclude').split(','), // exclude patterns (glob)
  forceUpload: JSON.parse(core.getInput('forceUpload')) // Force uploading all files, Default to false(upload only newer files).
};

console.log('config->', config, options);

new Deployer(config, options)
  .sync()
  .then(()=> console.log('sftp upload success!'));

