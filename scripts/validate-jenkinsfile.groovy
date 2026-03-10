#!/usr/bin/env groovy

import groovy.lang.Binding
import groovy.lang.GroovyClassLoader
import groovy.lang.GroovyShell

def targetPath = (args && args.length > 0) ? args[0] : 'Jenkinsfile_CNP'
def targetFile = new File(targetPath)

if (!targetFile.isFile()) {
  System.err.println("Jenkinsfile not found: ${targetFile}")
  System.exit(1)
}

def classLoader = new GroovyClassLoader(this.class.classLoader)

[
  [
    fileName: 'LibraryDefault.groovy',
    source: '''
      @interface Library {
        String value()
      }
    '''
  ],
  [
    fileName: 'Library.groovy',
    source: '''
      package org.jenkinsci.plugins.workflow.libs

      @interface Library {
        String value()
      }
    '''
  ],
  [
    fileName: 'FlowInterruptedException.groovy',
    source: '''
      package org.jenkinsci.plugins.workflow.steps

      class FlowInterruptedException extends Exception {
        List<Object> causes = []

        List<Object> getCauses() {
          return causes
        }
      }
    '''
  ],
  [
    fileName: 'AbortException.groovy',
    source: '''
      package hudson

      class AbortException extends Exception {
        AbortException() {
          super()
        }

        AbortException(String message) {
          super(message)
        }
      }
    '''
  ],
  [
    fileName: 'AppPipelineDsl.groovy',
    source: '''
      package uk.gov.hmcts.contino

      class AppPipelineDsl {
        static class PactRoles {
          static final String CONSUMER = 'CONSUMER'
        }
      }
    '''
  ],
  [
    fileName: 'YarnBuilder.groovy',
    source: '''
      package uk.gov.hmcts.contino

      class YarnBuilder {
        YarnBuilder(Object script) {}
      }
    '''
  ],
].each { stub ->
  classLoader.parseClass(stub.source.stripIndent(), stub.fileName)
}

def binding = new Binding([
  env: [:],
  params: [:],
  steps: [:],
  currentBuild: [:],
  STAGE_NAME: 'local-parse',
])

new GroovyShell(classLoader, binding).parse(targetFile)
println("groovy-parse-ok ${targetFile.path}")
