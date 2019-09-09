import { appInsights } from 'lib/appInsights'
import { app } from './application'

app.use(appInsights)

app.listen(3001, () => console.log('Dev server listening on port 3001!'))
