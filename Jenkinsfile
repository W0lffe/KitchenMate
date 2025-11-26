pipeline {
    agent {
        docker { 
            image 'node:20-alpine'
            args '-u root:root'
        }
    }

    stages {
        stage('Checkout') {
            when { branch 'master' }
            steps { checkout scm }
        }

        stage('Install') {
             steps { sh 'npm ci' } 
        }
      /*   stage('Test') { 
            steps { sh 'npm test -- --watchAll=false' } 
        } */
        stage('Build') { 
            steps { sh 'npm run build' } 
        }
      /*   stage('Archive') { 
            steps { archiveArtifacts artifacts: 'build/**', fingerprint: true } 
        } */ 
    }

    post {
        success { echo 'Build succeeded!' }
        failure { echo 'Build failed!' }
        always { cleanWs() }
    }
}
