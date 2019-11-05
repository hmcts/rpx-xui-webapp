const pact = require("@pact-foundation/pact-node")
const path = require("path")
const opts = {
  pactFilesOrDirs: [
    path.resolve(
      __dirname,
      "../pacts/"
    ),
  ],
  pactBroker: "https://pact-broker.platform.hmcts.net",
  pactBrokerUsername: "",
  pactBrokerPassword: "",
  tags: ["test", "test"],
  consumerVersion:
    "1.0." +
    (process.env.TRAVIS_BUILD_NUMBER
      ? process.env.TRAVIS_BUILD_NUMBER
      : Math.floor(new Date() / 1000)),
}

pact
  .publishPacts(opts)
  .then(() => {
    console.log("Pact contract publishing complete!")
    console.log("")
    console.log("Head over to https://pact-broker.platform.hmcts.net ")
    console.log("to see your published contracts.")
  })
  .catch(e => {
    console.log("Pact contract publishing failed: ", e)
  })
