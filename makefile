all: post

post:
	curl -X POST http://localhost:3000/images/upload

pic:
	curl -X POST -H "Content-Type: multipart/form-data" -F "image=@examplePic/denemeforkraken.jpg" localhost:3000/images/upload
