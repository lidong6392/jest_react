const { exec } = require('child_process');

exec(`cd ${__dirname} &&  git diff --cached --name-only`, (error, stdout) => {
  if (error === null && stdout) {
    const fileList = stdout.split('\n');
    const filesPath = fileList.join(' ');
    exec(`npm run test-f ${filesPath}`, (err) => {
      if (err !== null) {
        console.error(`
          测试用例执行不通过，请检查！
          测试用例执行不通过，请检查！
          测试用例执行不通过，请检查！
        `);
        throw err;
      }
    });
  }
});

