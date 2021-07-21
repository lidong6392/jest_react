const { exec } = require('child_process');

exec(`cd ${__dirname.replace('/Code', '')} &&  git diff --cached --name-only`, (error, stdout) => {
  if (error === null && stdout) {
    const fileList = stdout.split('\n').map(item => item.replace('Code', '.'));
    const filesPath = fileList.join(' ');
    exec(`npm run test-f ${filesPath}`, (err) => {
      if (err !== null) {
        throw err;
      }
    });
  }
});

console.log('test_hook >>> ');
