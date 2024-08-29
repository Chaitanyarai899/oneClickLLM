#!/bin/bash

sleep 10
url="http://llm-deployment:11434/api/pull"

request_result=$(curl -s -w "%{http_code}" -o "/dev/null" -X POST -H "Content-Type: application/json" -d "{\"name\": \"$MODEL\"}" "$url")

http_code=$(echo $request_result | awk '{print $1}')

response_message=$(echo $request_result | awk '{print $2}')

case $http_code in
  200)
    echo "Model $model_name pulled successfully."
    ;;
  400)
    echo "Error: Bad request. Response message: $response_message"
    exit 1
    ;;
  404)
    echo "Error: Not found. Response message: $response_message"
    exit 1
    ;;
  500)
    echo "Error: Internal server error. Response message: $response_message"
    exit 1
    ;;
  *)
    echo "Error: Unexpected HTTP status code $http_code. Response message: $response_message"
    exit 1
    ;;
esac


