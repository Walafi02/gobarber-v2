#!/bin/sh
yarn
yarn typeorm migration:run
yarn dev:server
