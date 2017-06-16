#!/bin/sh

TAG=$(git rev-parse HEAD)

docker build -t capeia/frontend .
docker tag capeia/frontend:latest 962275371155.dkr.ecr.us-east-1.amazonaws.com/capeia-frontend:$TAG
echo -n $TAG > __DOCKER_IMAGE_TAG
