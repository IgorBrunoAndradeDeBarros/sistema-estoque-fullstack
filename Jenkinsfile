pipeline {
    agent none

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    environment {
        DOCKER_BUILDKIT       = '1'
        COMPOSE_DOCKER_CLI_BUILD = '1'
    }

    stages {

        stage('Checkout') {
            agent any
            steps {
                checkout scm
                stash name: 'source', includes: '**', useDefaultExcludes: true
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
                unstash 'source'
                dir('backend') {
                    sh 'mvn -B clean package -DskipTests'
                }
                stash name: 'backend-artifact', includes: 'backend/target/quarkus-app/**,backend/target/*.jar', allowEmpty: true
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
                unstash 'source'
                dir('backend') {
                    sh 'mvn -B test'
                }
            }
            post {
                always {
                    junit testResults: 'backend/target/surefire-reports/*.xml', allowEmptyResults: true
                }
            }
        }

        stage('Build Frontend') {
            agent {
                docker { image 'node:20-alpine' }
            }
            steps {
                unstash 'source'
                dir('frontend') {
                    sh 'npm ci'
                    sh 'npm run build -- --configuration production'
                }
                stash name: 'frontend-artifact', includes: 'frontend/dist/**'
            }
        }

        stage('Build das Imagens Docker') {
            agent any
            steps {
                unstash 'source'
                unstash 'backend-artifact'
                unstash 'frontend-artifact'
                sh 'docker compose build'
            }
        }
    }

    post {
        always {
            node('') {
                cleanWs()
            }
        }
        success {
            echo 'Pipeline executada com sucesso!'
        }
        failure {
            echo 'Pipeline falhou. Verifique os logs.'
        }
    }
}