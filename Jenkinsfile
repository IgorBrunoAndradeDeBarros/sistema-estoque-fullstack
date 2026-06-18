pipeline {
    agent any

    environment {
        BACKEND_IMAGE  = "estoque-api"
        FRONTEND_IMAGE = "estoque-frontend"
        IMAGE_TAG      = "${env.BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend: Build & Test') {
            steps {
                dir('backend') {
                    sh './mvnw clean package'
                }
            }
        }

        stage('Backend: Build Docker Image') {
            steps {
                // Roda na raiz do repo porque o Dockerfile.jvm espera o contexto
                // apontando pra raiz (mesma lógica do docker-compose.yml)
                sh "docker build -f backend/src/main/docker/Dockerfile.jvm -t ${BACKEND_IMAGE}:${IMAGE_TAG} ."
            }
        }

        stage('Frontend: Install Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Frontend: Build Angular') {
            steps {
                dir('frontend') {
                    sh 'npx ng build --configuration production'
                }
            }
        }

        stage('Frontend: Build Docker Image') {
            steps {
                dir('frontend') {
                    sh "docker build -t ${FRONTEND_IMAGE}:${IMAGE_TAG} ."
                }
            }
        }
    }

    post {
        always {
            junit allowEmptyResults: true, testResults: 'backend/target/surefire-reports/*.xml'
        }
        success {
            echo "Build concluido! Imagens geradas: ${BACKEND_IMAGE}:${IMAGE_TAG} e ${FRONTEND_IMAGE}:${IMAGE_TAG}"
        }
        failure {
            echo "Build falhou. Verifique os logs dos estagios acima."
        }
    }
}