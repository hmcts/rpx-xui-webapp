// Run: groovy scripts/notify-playwright-failures.test.groovy
def loader = new GroovyClassLoader()
def interrupted = loader.parseClass('''
package org.jenkinsci.plugins.workflow.steps
class FlowInterruptedException extends Exception {}
''')
def aborted = loader.parseClass('''
package hudson
class AbortException extends Exception { AbortException(String message) { super(message) } }
''')
loader.parseClass('''
package uk.gov.hmcts.contino
class ProjectBranch {
    String branchName
    ProjectBranch(String branchName) { this.branchName = branchName }
    boolean isMaster() { branchName == 'master' }
}
''')
loader.parseClass('''
package uk.gov.hmcts.contino.slack
class SlackChannelRetriever {
    def steps
    SlackChannelRetriever(steps) { this.steps = steps }
    String retrieve(String channel, String author) { steps.resolveSlackRecipient(channel, author) }
}
''')
def calls = []
def shellResult = 'E2E: 2 failed\n- 2: CCD: HTTP 503 observed; cause unconfirmed\n'
Exception shellError = null
Exception slackError = null
String mappedRecipient = '@test-author'
Exception mappingError = null
def binding = new Binding([
    env: [BUILD_URL: 'https://build.hmcts.net/job/xui/42/', BRANCH_NAME: 'master'],
    resolveSlackRecipient: { channel, author ->
        calls << ['recipient', channel, author]
        if (mappingError) { throw mappingError }
        author ? mappedRecipient : channel
    },
    sh: { args ->
        calls << ['sh', args]
        if (shellError) { throw shellError }
        args instanceof Map ? shellResult : null
    },
    slackSend: { args ->
        calls << ['slack', args]
        if (slackError) { throw slackError }
    },
    echo: { message -> calls << ['echo', message] }
])
def notifier = new GroovyShell(loader, binding).evaluate(new File('scripts/notify-playwright-failures.groovy'))
def reports = [
    [suite: 'API', path: 'functional-output/tests/playwright-api/odhin-report/ci-evidence/playwright.json'],
    [suite: 'Integration', path: 'functional-output/tests/playwright-integration/odhin-report/preview-workers-7/ci-evidence/playwright.json']
]
assert notifier.prepare(reports)
assert calls.last()[1] == "rm -f -- '${reports[0].path}' '${reports[1].path}'"
notifier.publish('#xui-pipeline', 'PREVIEW', reports)
def message = calls.find { it[0] == 'slack' }[1]
assert message.channel == '#xui-pipeline'
assert message.failOnError == false
assert message.message.contains('PREVIEW Playwright failure summary')
assert message.message.contains('E2E: 2 failed')
assert message.message.contains('<https://build.hmcts.net/job/xui/42/|Jenkins build and test reports>')
assert calls.findAll { it[0] == 'sh' }.last()[1].returnStdout
assert !calls.any { it[0] == 'recipient' }

binding.env.CHANGE_AUTHOR = 'test-github-author'
calls.clear()
notifier.publish('#xui-pipeline', 'Nightly', reports)
assert calls.find { it[0] == 'slack' }[1].channel == '#xui-pipeline'
assert !calls.any { it[0] == 'recipient' }

// Match Infrastructure notifyBuildFailure: PR author DM, channel fallback, bot suppression.
binding.env.BRANCH_NAME = 'PR-5491'
binding.env.CHANGE_AUTHOR = 'test-github-author'
calls.clear()
notifier.publish('#xui-pipeline', 'PREVIEW', reports)
assert calls.find { it[0] == 'recipient' } == ['recipient', '#xui-pipeline', 'test-github-author']
assert calls.find { it[0] == 'slack' }[1].channel == '@test-author'
mappedRecipient = null
calls.clear()
notifier.publish('#xui-pipeline', 'PREVIEW', reports)
assert calls.find { it[0] == 'slack' }[1].channel == '#xui-pipeline'
mappedRecipient = '@iamabotuser'
calls.clear()
notifier.publish('#xui-pipeline', 'PREVIEW', reports)
assert !calls.any { it[0] == 'slack' }
mappingError = new RuntimeException('sensitive mapping error')
calls.clear()
notifier.publish('#xui-pipeline', 'PREVIEW', reports)
assert !calls.any { it[0] == 'slack' }
assert !calls.toString().contains('sensitive mapping error')
mappingError = null
mappedRecipient = '@test-author'
binding.env.BRANCH_NAME = 'nightly'
binding.env.CHANGE_AUTHOR = null
calls.clear()
notifier.publish('#xui-pipeline', 'Nightly', reports)
assert calls.find { it[0] == 'slack' }[1].channel == '#xui-pipeline'

calls.clear()
shellResult = ''
notifier.publish('#xui-pipeline', 'AAT', reports)
assert !calls.any { it[0] == 'slack' }
assert !calls.any { it[0] == 'recipient' }
calls.clear()
notifier.publish('#xui-pipeline', 'AAT', [])
assert calls.empty

// Invalid paths never reach a shell, and failure to clear evidence disables summary publication.
assert !notifier.prepare([[suite: 'API', path: "bad'; touch injected"]])
assert !calls.any { it[0] == 'sh' }
shellError = new RuntimeException('sensitive setup error')
assert !notifier.prepare(reports)
notifier.publish('#xui-pipeline', 'AAT', reports)
assert !calls.toString().contains('sensitive setup error')
shellError = null
shellResult = 'API: 1 failed'
slackError = new RuntimeException('sensitive Slack error')
notifier.publish('#xui-pipeline', 'Nightly', reports)
assert !calls.toString().contains('sensitive Slack error')
slackError = null

// Preserve cancellation rather than converting it into a successful reporting step.
for (error in [interrupted.getDeclaredConstructor().newInstance(), aborted.getDeclaredConstructor(String).newInstance('script returned exit code 143')]) {
    shellError = error
    for (action in [{ notifier.prepare(reports) }, { notifier.publish('#xui-pipeline', 'AAT', reports) }]) {
        def caught = null
        try { action() } catch (Exception e) { caught = e }
        assert caught.is(error)
    }
}
shellError = null
binding.env.BUILD_URL = 'https://build.hmcts.net/|injected> <!channel>'
calls.clear()
notifier.publish('#xui-pipeline', '<!channel>', reports)
assert !calls.find { it[0] == 'slack' }[1].message.contains('<!channel>')

// Execute the actual pipeline profile resolvers: publication must use the same paths as the runner.
for (pipeline in ['Jenkinsfile_CNP', 'Jenkinsfile_nightly']) {
    def source = new File(pipeline).text
    def resolvers = source.substring(source.indexOf('def resolveIntegrationProfileRuns ='), source.indexOf('def runPlaywrightIntegrationProfileMatrix ='))
    def call = pipeline == 'Jenkinsfile_CNP' ? "resolveIntegrationRunConfigs('preview')" : 'resolveIntegrationRunConfigs()'
    def profileBinding = new Binding([params: [:]])
    def shell = new GroovyShell(profileBinding)
    def runs = shell.evaluate(resolvers + "\nreturn ${call}")
    assert runs*.reportDir == ['functional-output/tests/playwright-integration/odhin-report']
    profileBinding.params = [INTEGRATION_PW_PROFILE_RUNS: 'workers=3;workers=7 shard=1/2']
    runs = shell.evaluate(resolvers + "\nreturn ${call}")
    assert runs.size() == 2
    assert runs[0].reportDir.endsWith('-workers-3')
    assert runs[1].reportDir.endsWith('-workers-7-shard-1-2')
    assert source.contains('failureSummary.prepare(failureReports)')
    assert source.contains('summaryReady ? failureReports : []')
    if (pipeline == 'Jenkinsfile_CNP') {
        // Accessibility-only runs intentionally omit these suites; dormant matrix config must not be evaluated.
        def position = 0
        for (phase in ['preview', 'aat']) {
            def start = source.indexOf('def failureReports =', position)
            def end = source.indexOf('\n            try {', start)
            def setup = source.substring(start, end)
            def prepared = false
            def disabled = new Binding([
                params: [RUN_PLAYWRIGHT_ACCESSIBILITY: true],
                resolveIntegrationRunConfigs: { ignored -> throw new AssertionError('Unused matrix was resolved') },
                failureSummary: [prepare: { ignored -> prepared = true }]
            ])
            assert new GroovyShell(disabled).evaluate(setup + '\nreturn failureReports') == []
            assert !prepared
            position = end
        }
    }
}
println 'Playwright Slack lifecycle checks passed'
