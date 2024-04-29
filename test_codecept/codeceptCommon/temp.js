

const fs = require('fs')
const path = require('path')
const functional_output_dir = path.resolve(__dirname, '../../functional-output/tests/codecept-ngIntegration')

async function cucumberReportUpdateEmbeddings() {
    const files = fs.readdirSync(functional_output_dir);
    for(const f of files){
        if(f.startsWith('cucumber_output') && f.endsWith('.json')){
            const jsonString = fs.readFileSync(functional_output_dir + '/' + f, 'utf-8');
            const json = JSON.parse(jsonString);

            const ObjCount = json.length;
            for (let i = 0; i < ObjCount; i++ ){
                const obj = json[i]
                for(const element of obj.elements){
                   for(const step of element.steps){
                       for (const embedd of step.embeddings) {
                           embedd.data = new Buffer(embedd.data, 'base64').toString('ascii')
                       }
                   }
                }
            }
            

            // console.log(json)
            fs.writeFileSync(functional_output_dir + '/' + f,JSON.stringify(json, null,2))


        }
        

    }

}


cucumberReportUpdateEmbeddings();
