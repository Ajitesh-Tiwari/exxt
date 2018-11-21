const program = require('commander');

program
    .version('1.0.0')
    .description('A command-line utility for information on file extension.');

program
    .command('exxt')
    .description('A command-line utility for information on file extension.')
    .action(() => {
        console.log('Hello')
    });
