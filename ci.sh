#!/usr/bin/env bash
PROJECT_ID=$1

a=$(ls dist/apps/)
arr=($a)

for app in ${arr[@]} ; do
    echo "********************************"
    echo "Building docker image for $app..."
    echo "********************************"
    docker build --tag=gcr.io/${PROJECT_ID}/${app} --file=apps/${app}/Dockerfile --cache-from gcr.io/${PROJECT_ID}/${app}:latest .

    echo "********************************"
    echo "Pushing docker image for $app..."
    echo "********************************"
    docker push gcr.io/${PROJECT_ID}/${app}

    echo "********************************"
    echo "Deploying docker image for $app on Cloud Run..."
    echo "********************************"
done

