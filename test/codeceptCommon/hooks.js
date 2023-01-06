const event = require('codeceptjs').event;

module.exports = ()  => {

  event.dispatcher.on(event.test.before, function (test) {
    global.scenarioData = {}
    // if (test.tags.indexOf('@populate') >= 0) {
    //   recorder.add('populate database', async () => {
    //     // populate database for this test
    //   })
    // }
  });
}