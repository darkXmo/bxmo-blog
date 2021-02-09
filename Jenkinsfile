Jenkinsfile (Declarative Pipeline)
pipeline {
    agent { docker 'node:14.15' }
    stages {
        stage('build') {
            steps {
                sh 'cd frontend && npm --version'
            }
        }
    }
}