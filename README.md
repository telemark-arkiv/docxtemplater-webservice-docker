[![Build Status](https://travis-ci.org/telemark/docxtemplater-webservice-docker.svg?branch=master)](https://travis-ci.org/telemark/docxtemplater-webservice-docker)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# docxtemplater-webservice-docker

[![Greenkeeper badge](https://badges.greenkeeper.io/telemark/docxtemplater-webservice-docker.svg)](https://greenkeeper.io/)
Upload template and data, get formatted document in return

```sh
curl \
  -F "title=This is my title" \
  -F "description=Love my description" \
  -F "body=My body is beautiful" \
  -F "file=@test/data/testdoc.docx" \
  http://localhost:3000 > converted.docx
```

## Docker

Build the image

```sh
$ docker build -t docxtemplater .
```

Run the image

```sh
docker run -d -p 80:3000 --name docx docxtemplater
```