const fs = require("fs")


const request = JSON.parse(fs.readFileSync('./links.json', 'utf8'));
const request2 = JSON.parse(fs.readFileSync('./marketing.json', 'utf8'));
let newArray = []
function covertFormat(array,array2) {
    let a1 = []
    let a2 =[]
    for(let a of array ){
        a1.push(a.slice(9).replace(/\//g, '+'))
    }
    for(let b of array2 ){
        a2.push(b.slice(9).replace(/\//g, '+'))
    }
    let a3 = a1.concat(a2)
    fs.writeFileSync('./finalLinks.json', JSON.stringify(a3, null, 2), 'utf8');
    console.log('sucess')
}
covertFormat(request,request2)


