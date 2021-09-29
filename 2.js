
const path = require('path');
const fs = require("fs");
const got = require("got");

const token = fs.readFileSync('./token.txt', 'utf8');
const request = fs.readFileSync('./links.txt', 'utf8');

async function initialRequest(name,page) {
    if(!page ) page = 1
    let requestInfo = {}
    const {body} = await got(`https://ops.tuk.dev/ops/fetchHtmls/${name}.html?pageNumber=${page}&pageSize=1000`,{
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
            'Referer': 'https://app.tailwinduikit.com/',
            'Cookie': `token=${token}`
        },
        responseType: 'json'
    });
    let namesArray = []
    const names = body.htmls.map(({name})=>{
        return  namesArray.push(name)
    })
    requestInfo.name = name
    requestInfo.totalPages = body.totalPages
    requestInfo.totalComponents = body.totalComponents
    requestInfo.elementsNames = namesArray
    return requestInfo
}

async function run() {

  let array = []
    for(let item of request) {
       const getInfo = await initialRequest(item)
       console.log(getInfo)
        array.push(getInfo)
        fs.writeFileSync('./array.json', JSON.stringify(array, null, 2), 'utf8');
    }

}

run()