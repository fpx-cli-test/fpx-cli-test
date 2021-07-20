const spawn = require('cross-spawn');


const install = async (options) => {
  const cwd = options.cwd;
  return new Promise((resolve, reject) => {
    const command = options.package;
    const args = ['install', '--save-exact', '--loglevel', 'error'];
    const child = spawn(command, args, {
      cwd,
      stdio: ['pipe', process.stdout, process.stderr],
    });

    child.once('close', (code) => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`,
        });
        return;
      }
      resolve();
    });
    child.once('error', reject);
  })
};
module.exports = { install };