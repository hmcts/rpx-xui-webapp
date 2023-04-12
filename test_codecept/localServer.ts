/**
 * Local.ts used to run the application locally.
 */
import { app } from '../api/application'
import { applicationConfiguration } from '../api/configuration/appConfig'
import { appInsights } from '../api/lib/appInsights'
import errorHandler from '../api/lib/error.handler'

import axios from 'axios'


import * as ejs from 'ejs';
import * as express from 'express';
import * as path from 'path';

import { removeCacheHeaders } from '../api/lib/middleware/removeCacheHeaders';
/**
 * Show the developer the application configuration when they are developing locally.
 */


app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, ''));


app.use([removeCacheHeaders, express.static(path.join(__dirname, '../dist/rpx-exui', 'assets'), { index: false, cacheControl: false })]);
app.use([removeCacheHeaders, express.static(path.join(__dirname, '../dist/rpx-exui'), { index: false, cacheControl: false })]);

app.use('/*', (req, res) => {
    res.set('Cache-Control', 'no-store, s-maxage=0, max-age=0, must-revalidate, proxy-revalidate');
    res.render('../dist/rpx-exui/index', {
        providers: [
            { provide: 'REQUEST', useValue: req },
            { provide: 'RESPONSE', useValue: res },
        ],
        req,
        res,
    });
});


console.log(applicationConfiguration())

app.use(appInsights)
app.use(errorHandler)


// app.listen(3000)
class ApplicationServer{
    server:any
    async start(){

        this.server = await app.listen(3000);
        try{
            const res = await axios.get('http://localhost:3000/auth/isAuthenticated')
            console.log(res.data)


        }catch(err){
            console.log(err)

        }


    }

    async stop(){
        return await this.server.close()
    }


}

const applicationServer = new ApplicationServer();

// applicationServer.start()
export default applicationServer;
