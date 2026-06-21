pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            agent {
                docker {
                    image 'maven:3.9-eclipse-temurin-21'
                    args '-v $HOME/.m2:/root/.m2'
                }
            }
            steps {
                dir('backend') {
                    sh 'chmod +x ./mvnw'
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        stage('Test Backend') {
            agent {
                docker {
                    image 'maven:3.9-eclipse-temurin-21'
                    args '-v $HOME/.m2:/root/.m2'
                }
            }
            steps {
                dir('backend') {
                    sh 'chmod +x ./mvnw'
                    sh './mvnw test'
                }
            }
        }

        stage('Build Frontend') {
            agent {
                docker { image 'node:20-alpine' }
            }
            steps {
                dir('frontend') {
                    sh 'npm ci'
                    sh 'npm run build -- --configuration production'
                }
            }
        }

        stage('Build das Imagens Docker') {
            steps {
                sh 'docker compose build'
            }
        }
    }

    post {
        success {
            echo 'Pipeline executada com sucesso!'
        }
        failure {
            echo 'Pipeline falhou. Verifique os logs.'
        }
    }
}