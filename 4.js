const fs = require('fs');
const got = require('got');
const path = require('path');
const get = require('lodash/get');
const slugify = require('slugify');

function getFileExt(type) {
    switch(type){
        case 'react':
            return 'jsx';
        case 'html':
            return 'html';
        default:
            return 'js'
    }
}

(async () => {
    try {
        const trees = JSON.parse(fs.readFileSync('./components1.json', 'utf8'));
        const token = fs.readFileSync('./token.txt', 'utf8');

        for (let i =0; i<trees.length;i++) {
            const node = trees[i];
            const codes = Object.keys(node.code);
            const fileName = slugify(node.name).replace(/_/g,'-').toLowerCase();
            console.log(`[-] ${fileName}`)
            for (let j =0;j <codes.length;j++) {
                console.log(`+ Downloading ${codes[j]} code...`)
                const codeUrl = node.code[codes[j]];
                const {body} = await got(codeUrl, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
                        'Authorization': `Bearer ${token}`,
                        'Referer': 'https://app.tailwinduikit.com/'
                    },
                    responseType: 'json'
                });

                if(body && body.success) {
                    fs.mkdirSync(node.path, { recursive: true });
                    let content = get(body, 'data.script');
                    if(content) {
                        fs.writeFileSync(path.join(node.path, `${fileName}.${codes[j]}.${getFileExt(codes[j])}`), content, 'utf8');
                        content = get(body, 'data.html');
                        if(content) {
                            fs.writeFileSync(path.join(node.path, `${fileName}.${codes[j]}.component.html`), content, 'utf8');
                        }
                    }

                    content = get(body, 'data.html');
                    if(content) {
                        fs.writeFileSync(path.join(node.path, `${fileName}.${codes[j]}.html`), content, 'utf8');
                    }

                    if(!get(body, 'data.script') && !get(body, 'data.html')) {
                        console.log(body);
                    }
                } else {
                    console.log(body)
                }

                // delay 1s
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }

            console.log('');
        }

        console.log('Download completed!');
    } catch (e) {
        console.error(e)
    }
})()