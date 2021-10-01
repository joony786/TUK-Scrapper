
const fs = require("fs");
const got = require("got");

const token = fs.readFileSync('./token.txt', 'utf8');
const request = JSON.parse(fs.readFileSync('./finalLinks.json', 'utf8'));

async function initialRequest(name,page) {
    console.log('inside initialReq Fn')
    if(!page ) page = 1
    let requestInfo = {}
    let r = `https://ops.tuk.dev/ops/fetchHtmls/${name}.html?pageNumber=${page}&pageSize=1000`

    const {body} = await got(r,{
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
    console.log('inside run')
  let array = []
    for(const [key,item] of request.entries()) {
        console.log(`Current pushing ${key+1} - ${item} of ${request.length}`)
       const getInfo = await initialRequest(item)
        array.push(getInfo)
        fs.writeFileSync('./array2.json', JSON.stringify(array, null, 2), 'utf8');
    }

}

run()