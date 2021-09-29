
const path = require('path');
const fs = require("fs");

const elements = fs.readFileSync('./array.json', 'utf8');


async function run() {


    function buildCodingURL(parent, node, code) {
        return `https://ops.tuk.dev/ops/fetchComponentSource/${parent}/${node}/${code}`.replace(/\s/, '%20');
    }
    
    let treeList = []
    for(let elem of elements){
        console.log(elem)
        let dir = elem.name.split('+')[0]
        let nodeName = elem.name.split('+')[1]
        let subfolder = elem.name.split('+')[2]
        for(let name of elem.elementsNames){
            treeList.push({
                path: path.join(__dirname, dir, nodeName,subfolder,name),
                name: name,
                code: {
                    react: buildCodingURL(elem.name, name, 'react'),
                    vue: buildCodingURL(elem.name, name, 'vue'),
                    angular: buildCodingURL(elem.name, name, 'angular'),
                    html: buildCodingURL(elem.name, name, 'html'),

                }
            })
        }

    }
    fs.writeFileSync('./components.json', JSON.stringify(treeList, null, 2), 'utf8');
}

run()