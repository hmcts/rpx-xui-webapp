const fs = require('fs');

const testType = process.env.TEST_TYPE


class StatsReporter{

    constructor(){
        this.analysisOutputFile = `${__dirname}/../../functional-output/tests/run-analysis-${testType}.txt`;
        this.statLogsDir = `${__dirname}/../../functional-output/tests/featureLogs-${testType}`;
        this.stats = {
            features :[]
        }

        this.analysis = [];
    }



    updateScenario(featureName, scenarioName, status, result){
        let feature = this.stats.features.find(f => f.name === featureName)
        if (!feature){
            feature = {
                name: featureName,
                scenarios:[]
            }
            this.stats.features.push(feature)
        }

        let scenario = feature.scenarios.find(scr => scr.name === scenarioName)
        if (!scenario) {
            scenario = {
                name: scenarioName,
                status: status
            }
            feature.scenarios.push(scenario)
        }

        scenario.status = status
        scenario.result = result

    }

    collectLogs(){
        const dir = fs.readdirSync(this.statLogsDir)
        for(const f of dir){
            
            const fileContent = fs.readFileSync(`${this.statLogsDir}/${f}`,'utf-8')

            for (const line of fileContent.split(/\r?\n/)){
                // console.log(`Line from file: ${line}`);
                if (line.includes('************ Test started')){
                    let testName = line.split(':')[1]
                    testName = testName.endsWith('{') ? testName.replace('{', '') : testName;
                    this.updateScenario(f.replace('.txt',''), testName, 'Started','unknown')

                }
                if (line.includes('************ Test status')) {
                    const testName = line.split(':')[2]
                    const result = line.split(':')[1]
                    this.updateScenario(f.replace('.txt', ''), testName, 'Completed', result)

                }
            }

        }
        
    }

    generateStats(){
        const featureStats = [];

        this.stats.features.forEach(f => {
         
            const scrStarted = f.scenarios.filter(scr => scr.result === 'unknown').length
            const scrCompleted = f.scenarios.filter(scr =>  scr.result !== 'unknown').length

            const inProgress = f.scenarios.filter(scr => scr.result === 'unknown')
            const completed = f.scenarios.filter(scr => scr.result !== 'unknown')


            featureStats.push({ name: f.name, startedCount: scrStarted, completedCount: scrCompleted, inProgress: inProgress, completed:completed })
           
        })
        this.analysis = {
            features: featureStats
        }
        

    }

    run(){
        if (!fs.existsSync(this.statLogsDir)) {
            return;
        }
        this.collectLogs()
       
        // console.log(JSON.stringify(this.stats, null, 2))
        this.generateStats();
        this.reportDatatable(this.analysis)
        // console.log(JSON.stringify(this.analysis, null, 2))
    }



    reportDatatable(analysis) {
      
        // fs.writeFileSync(this.analysisOutputFile, JSON.stringify(analysis,null,2))
        fs.writeFileSync(this.analysisOutputFile, '**** Run nalaysis *****')


        analysis.features.forEach(f => {
            fs.appendFileSync(this.analysisOutputFile, `\n${f.name} => started ${f.startedCount} , completed ${f.completedCount}`)
            
            const inprogress = f.inProgress.map(scr => scr.name)
            const completed = f.completed.map(scr => scr.name)

            if (inprogress.length > 0){
                fs.appendFileSync(this.analysisOutputFile, `\n${JSON.stringify(inprogress, null, 2)}`)
                // fs.appendFileSync(this.analysisOutputFile, `\n${JSON.stringify(completed, null, 2)}`)
            }

        })
    }


}
const instance = new StatsReporter();
module.exports = instance;

instance.run();
