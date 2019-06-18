#!/usr/bin/env bash
PROJECT_ID=$1

a=$(ls dist/apps/)
arr=(${a})

for app in ${arr[@]} ; do
    echo "********************************"
    echo "Building docker image for $app..."
    echo "********************************"
  gcloud run deploy ${app} --image gcr.io/${PROJECT_ID}/${app}:latest
done
