FROM alpine:latest

RUN apk update 
RUN apk add curl bash

WORKDIR /app
COPY script.sh /app/
RUN chmod +x script.sh

CMD ["/bin/bash","/app/script.sh"]

