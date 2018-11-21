const program = require('commander');
const axios = require('axios');
const jsdom = require("jsdom");

const {JSDOM} = jsdom;

program
    .version('1.0.0')
    .description('A command-line utility for information on file extension.');

program
    .command('exxt <extension>')
    .description('A command-line utility for information on file extension.')
    .action((extension) => {

        axios.get('https://fileinfo.com/extension/' + extension)
            .then(function (response) {
                console.log(getElementByXpath(response.data, '//*[@id="left"]/article/h1/span'));
            })
            .catch(function (error) {
                console.log(error);
            });
    });


function getElementByXpath(document, path) {
    const window = new JSDOM(document.body).window;
    return window.document.evaluate(path, window.document.documentElement, null, window.XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
}

program.parse(process.argv);
