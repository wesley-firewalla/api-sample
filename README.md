# API Sample

This is the sample code to help you start a graphql api quickly.

## Development

```sh
yarn dev
```

## Deploy

### API

Run pm2 on production you can use `pm2 start pm2.config.js --only api-production`

```sh
pm2 start pm2.config.js --only api-<env> # env can be `development`, `test`, `staging`, `production`
```

## API Doc

```sh
yarn doc
```

## Social Credentials

1. Google

https://developers.google.com/+/web/api/rest/oauth

Get `access_token` from https://developers.google.com/oauthplayground, choose Google OAuth2 API v2 > https://www.googleapis.com/auth/userinfo.email

2. Facebook

Get `access_token` from https://developers.facebook.com/tools/accesstoken

## VS Code

Should install `Prettier` plugin to do code format.

## Debug

```sh
NODE_ENV=test node --inspect-brk index.js
```
