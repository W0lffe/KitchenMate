pipeline {
    agent any  // run on Jenkins container
    tools {
        nodejs 'node-20'  // must match your Global Tool Config
    }
    stages {
        stage('Checkout') {
            when { branch '57-jenkins-cicd' }
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
