#include .env
#export

.PHONY: build deploy run

build-api:
	docker build -t domain-search .

build-ui:
	yarn --cwd ./ui
	yarn --cwd ./ui build

build: build-ui build-api

run: build
	docker run -p 5001:80 domain-search

pkg:
	docker save domain-search -o domain-search.tar


