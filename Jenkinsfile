pipeline {
    agent any  
    tools {
        nodejs 'node-20' 
    }
    stages {
        stage('Checkout') {
            steps { checkout scm }
            post {
                success { echo 'Checkout succeeded!' }
                failure { echo 'Checkout failed!' }
            }
        }
        stage('Install Dependencies') {
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
                success { echo 'Tests passed!' }
                failure { echo 'Tests failed!' }
            }
        } 
        stage('Build') { 
            steps { sh 'npm run build' } 
            post {
                success { echo 'Build succeeded!' }
                failure { echo 'Build failed!' }
            }
        }
        stage('Archive') { 
            when { branch 'master'}
            steps { archiveArtifacts artifacts: 'dist/**', fingerprint: true } 
            post {
                success { echo 'Artifact created' }
            }
        } 
       /*  stage('Deploy') {
            when { branch 'master' }
            steps {
                //deploying script 
            }
        } */
    }

    post {
        always { cleanWs() }
    }
}

