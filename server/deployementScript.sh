#!/bin/sh

(exec docker rmi support-slack-api:previous)
(exec docker tag support-slack-api:latest support-slack-api:previous)
(exec docker build -t support-slack-api:latest .)


(exec docker stop support-slack-api)
(exec docker rm support-slack-api)
(exec docker run -d -p 8080:8080 --name=support-slack-api support-slack-api:latest)