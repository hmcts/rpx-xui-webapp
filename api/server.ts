import { app } from './application'

import * as ejs from 'ejs'
import * as express from 'express'
import * as path from 'path'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.set('views', __dirname)

app.set('view engine', 'html')
app.set('views', __dirname)

app.use(express.static(path.join(__dirname, '..', 'assets'), { index: false }))
app.use(express.static(path.join(__dirname, '..'), { index: false }))

app.use('/*', (req, res) => {
    res.render('../index', {
        providers: [
            { provide: 'REQUEST', useValue: req },
            { provide: 'RESPONSE', useValue: res },
        ],
        req,
        res,
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Server listening on port 3000!')
})
