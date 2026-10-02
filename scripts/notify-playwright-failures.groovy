// Companion notification only: the shared library still owns the build notification.
def reportArguments(List reports) {
    reports.collect { report ->
        if (!(report.suite in ['API', 'E2E', 'Integration']) ||
            !(report.path ==~ /functional-output\/tests\/playwright-(api|e2e|integration)\/odhin-report\/(?:[A-Za-z0-9_-][A-Za-z0-9._-]*\/)?ci-evidence\/playwright\.json/)) {
            throw new IllegalArgumentException('Unexpected Playwright summary report path')
        }
        "--suite '${report.suite}' '${report.path}'"
    }.join(' ')
}

def preserveInterruption(Exception error) {
    if (error instanceof org.jenkinsci.plugins.workflow.steps.FlowInterruptedException ||
        (error instanceof hudson.AbortException && ((error.message ?: '') =~ /(exit code|status)\s+(129|137|143)/).find())) {
        throw error
    }
}

def prepare(List reports) {
    try {
        reportArguments(reports)
        // Delete only this run's expected JSON before any lane can fail during setup.
        sh "rm -f -- ${reports.collect { "'${it.path}'" }.join(' ')}"
        return true
    } catch (Exception error) {
        preserveInterruption(error)
        echo '[playwright-summary] Could not clear previous evidence; notification disabled for this run.'
        return false
    }
}

def publish(String channel, String phase, List reports) {
    if (!reports) {
        return
    }
    try {
        def summary = sh(
            script: "node scripts/playwright-failure-summary.cjs ${reportArguments(reports)}",
            returnStdout: true
        ).trim()
        if (!summary) {
            return
        }
        def safePhase = phase in ['PREVIEW', 'AAT', 'Nightly'] ? phase : 'CI'
        def buildUrl = env.BUILD_URL ?: ''
        def reportLink = buildUrl ==~ /https:\/\/[A-Za-z0-9.\-]+(?::[0-9]+)?\/[A-Za-z0-9\/%._~\-]+/ ?
            "\n<${buildUrl}|Jenkins build and test reports>" : ''
        slackSend(
            channel: channel,
            color: 'warning',
            failOnError: false,
            message: "*${safePhase} Playwright failure summary*\n${summary}${reportLink}"
        )
    } catch (Exception error) {
        preserveInterruption(error)
        // Do not replace the test result with a reporting failure or log raw error data.
        echo '[playwright-summary] Summary notification unavailable; see the Jenkins test reports.'
    }
}

return this
