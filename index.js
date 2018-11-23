#!/usr/bin/env node

const program = require('commander');
const axios = require('axios');
const cheerio = require("cheerio");
const ora = require('ora');
const spinner = ora('Loading');

program
    .version('1.0.0')
    .arguments('<extension>')
    .description('A command-line utility for information on file extension.')
    .action((extension) => {
        extensionToBeSearched = extension;  // required it for handling no arguments passed case
        getExtensionInfo(extension)
    });

program.parse(process.argv);

if (typeof extensionToBeSearched === 'undefined') {
    console.error('Please provide extension name.');
    process.exit(1);
}

function getExtensionInfo(extension) {
    spinner.start();
    axios.get('https://fileinfo.com/extension/' + extension.split('.').pop())
        .then(function (response) {
            spinner.stop();
            console.log('Name : ' + getName(response.data));
            console.log('Description : ' + getDesc(response.data));
            console.log('Reference : https://fileinfo.com/extension/' + extension.split('.').pop());
            console.log('Powered by : fileinfo.com');
        })
        .catch(function (error) {
            spinner.stop();
            if (error.response.status === 404)
                console.log('Extension not found.');
            else
                console.log('Something went wrong : ' + error.response.status);
        });
}

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
