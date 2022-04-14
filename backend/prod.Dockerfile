FROM python:3.8.12-alpine

WORKDIR /root
RUN apk add git vim
RUN apk add build-base libffi-dev
RUN apk add mysql-client
RUN pip install --upgrade pip

COPY . /root/app
WORKDIR /root/app
RUN pip install -e .
CMD ["flask", "run"]

EXPOSE 5000