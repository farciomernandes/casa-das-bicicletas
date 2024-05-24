#!/bin/bash
tsc
npm run migration:latest && npm run seed && npm run seed && npm run start
