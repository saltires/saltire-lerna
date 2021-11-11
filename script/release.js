const chalk = require('chalk');
const execa = require('execa');
const path = require('path');
const yParser = require('yargs-parser');
const exec = require('./utils/exec');
const { writeFileSync, readFileSync } = require('fs');
const { getChangelog } = require('./utils/changelog');
const git = require('./utils/git');

const cwd = process.cwd();
const args = yParser(process.argv.slice(2));
const lernaCli = path.resolve(cwd, 'test.js');
const resolveFile = (_path) => path.resolve(cwd, _path);

function printErrorAndExit(message) {
  console.error(chalk.red(message));
  process.exit(1);
}

async function release() {
  // Check git status
  const { stdout: gitStatus } = execa.sync('git', ['status', '--porcelain']);
  if (gitStatus.length) {
    printErrorAndExit('Your git status is not clean. Aborting.');
  }

  const latestTag = await git.latestTagOrFirstCommit();
  // const latestTag = "@hui/router@0.0.45";

  let originalChangelog = '';

  try {
    originalChangelog = readFileSync(resolveFile('./docs/CHANGELOG.md')).toString();
  } catch (error) {
    console.log(error);
  }

  // Bump version and publish
  console.log('start process lerarncli');
  console.log('lernaCli', lernaCli);
  await exec('lerna', ['publish', '--exact', '--no-commit-hooks', '--no-push'], {
    env: {
      PATH: process.env.PATH,
    },
  });

  // get release notes
  const releaseNotes = await getChangelog(latestTag, originalChangelog);

  writeFileSync(resolveFile('./docs/CHANGELOG.md'), releaseNotes);

  // Commit
  const commitMessage = `docs: update CHANGELOG`;
  await exec('git', ['commit', '--all', '--message', commitMessage]);

  // Push
  await exec('git', ['push', 'origin', 'feature-rgbhex']);
}

// require('@toolkit-js/ibuild')
//   .default()
//   .then(release)
//   .catch((err) => {
//     console.error(err);
//     process.exit(1);
//   });

release().catch((error) => console.log(error));
