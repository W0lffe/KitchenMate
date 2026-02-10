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
            environment {
                REACT_APP_API_URL = credentials('BACKEND_URL')
            }
            steps {
                sh '''
                    echo "Backend URL: $REACT_APP_API_URL"
                    printenv | grep REACT
                    npm run build
                '''
            }
        }
        stage('Archive') { 
            when { branch 'master'}
            steps { archiveArtifacts artifacts: 'dist/**', fingerprint: true } 
            post {
                success { echo 'Artifact created' }
            }
        } 
        stage('Deploy') {
            when { branch 'master' }
            steps {
                sh 'npm install -g firebase-tools'
                withCredentials([string(credentialsId: 'FIREBASE_TOKEN', variable: 'FIREBASE_TOKEN')]) {
                    sh 'firebase deploy --token "$FIREBASE_TOKEN" --project kitchenmate-efe45'
                }
            }
            post{
                success { echo 'Deployment completed!'}
                failure { echo 'Deployment failed!'}
            }
        }  
    }

    post {
        always { cleanWs() }
    }
}

