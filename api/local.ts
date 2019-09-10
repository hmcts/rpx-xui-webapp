import { app } from './application'
import { appInsights } from './lib/appInsights'

app.use(appInsights)

app.listen(3001, () => console.log('Dev server listening on port 3001!'))
