#!/bin/bash
PROJECT_ID=$1

a=$(ls dist/apps/)
arr=($a)

for app in ${arr[@]} ; do
    echo "Building docker image for $app"
    docker build --tag=gcr.io/${PROJECT_ID}/${app} --file=${app}.Dockerfile --cache-from gcr.io/${PROJECT_ID}/${app}:latest .
done

