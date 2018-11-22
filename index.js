const program = require('commander');
const axios = require('axios');
const cheerio = require("cheerio");
const ora = require('ora');

const spinner = ora('Loading').start();

program
    .version('1.0.0')
    .description('A command-line utility for information on file extension.');

program
    .command('exxt <extension>')
    .description('A command-line utility for information on file extension.')
    .action((extension) => {
        spinner.start();
        axios.get('https://fileinfo.com/extension/' + extension)
            .then(function (response) {
                spinner.stop();
                console.log('Name : ' + getName(response.data));
                console.log('Description : ' + getDesc(response.data));
                console.log('Reference : https://fileinfo.com/extension/' + extension);
                console.log('Powered by : fileinfo.com');
            })
            .catch(function (error) {
                console.log(error);
            });
    });


function getName(document) {
    const $ = cheerio.load(document);
    const type = $("section.ext > h2:nth-child(1) > span:nth-child(2)");
    return type.html();
}

function getDesc(document) {
    const $ = cheerio.load(document);
    const desc = $("div.infoBox > p > span");
    return desc.html();
}

program.parse(process.argv);
