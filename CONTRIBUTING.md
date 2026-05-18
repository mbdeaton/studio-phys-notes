# Contributing Guide

## Two repos
This project spans two codebases:

- [phys-notes-studio](https://github.com/mbdeaton/studio-phys-notes):
  the Sanity Studio (this repo)
- [phys-notes](https://github.com/mbdeaton/phys-notes):
  the Vite/React frontend

Schema changes (adding or modifying content fields) changes go here.

## Local dev
The local frontend reads from the live Sanity `production` dataset, so real
content is visible immediately.

Studio:
```bash
npm install
npx sanity dev # starts at http://localhost:3333
```

Changes to the schema are reflected live in the local Studio. Deploy changes
with `npx sanity deploy`.