# dad-api

A serverless supported simple dad joke api used by [Dad Bot](https://github.com/arhammusheer/dad-bot) to serve dad jokes.

## Base URL

https://dad.croissant.one

Hosted on google cloud run.

## Endpoits available

#### GET /api/joke
Random Dad Joke https://dad.croissant.one/api/joke
```
/api/joke
```

Response
```json
{
  "joke": [
    {
      "_id": "61ab0c0cbdc0271c47750a54",
      "type": "joke",
      "content": "What did the 0 say to the 8? Nice belt.",
      "date_created": "2021-12-04T06:33:51.602Z",
      "date_updated": "2021-12-04T06:33:51.602Z",
      "__v": 0
    }
  ]
}
```

#### GET /api/pickup
Random Pickup Line https://dad.croissant.one/api/pickup
```
/api/pickup
```

Response
```json
{
  "pickup": [
    {
      "_id": "61ab0ab215962058d8aa3025",
      "type": "pickup",
      "content": "I never need to see the sun again because your eyes light up my world.",
      "date_created": "2021-12-04T06:26:24.168Z",
      "date_updated": "2021-12-04T06:26:24.168Z",
      "__v": 0
    }
  ]
}
```
