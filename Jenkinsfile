pipeline {
    agent any  
    tools {
        nodejs 'node-20' 
    }
    stages {
        stage('Checkout') {
            when { branch 'master' }
            steps { checkout scm }
        }

        stage('Install') {
             steps { sh 'npm ci' } 
        }
        stage('Test') { 
            steps { 
                sh 'npm run test -- --reporter junit --outputFile test-results/results.xml' 
            } 
            post {
                always {
                    junit "test-results/**/*.xml"
                }
            }
        } 
        stage('Build') { 
            steps { sh 'npm run build' } 
        }
        /* stage('Archive') { 
            steps { archiveArtifacts artifacts: 'dist/**', fingerprint: true } 
        }  */
    }

    post {
        success { echo 'Build succeeded!' }
        failure { echo 'Build failed!' }
        always { cleanWs() }
    }
}

