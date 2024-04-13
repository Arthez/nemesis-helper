const fs = require('fs');
const path = require('path');

const commitMsgPattern = new RegExp(`^(fix|feat|build|ci|docs|style|refactor|perf|test|config)\\(.+\\): .+|^Merge |^Revert |^Rebase `);
const commitMessageFile = path.resolve('.git/COMMIT_EDITMSG');
const commitMessage = fs.readFileSync(commitMessageFile, 'utf8');

if (!commitMsgPattern.test(commitMessage)) {
    console.error(`Commit message is invalid!`);
    process.exit(1);
}
