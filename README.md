### Project Setup Guide
```
git clone git@github.com:preeti-khachne/Alumni-Connect.git -b dev frontend
```

###### Step 1
```
cd frontend
```

###### Step 2
```
npm i
```

###### Step 3
- Rename `.env.local.example` -> `.env.local` and provide environment variables

###### Step 4
```
npm run dev
```

### If you face any issue in the last command then delete `node_modules/` and spin up the development Container by following steps:

###### Step 1
```
docker run -it -v .:/app -p 5173:5173 --workdir /app --entrypoint ash --name frontend node:22-alpine
```

###### Step 2
```
npm i
```

###### Step 3
```
npm run dev --host
```

###### Restart development Container

###### Step 1
```
docker start frontend
docker exec -it frontend ash
```

###### Step 2
```
npm run dev --host
```


##### Devlopment URL's
- [backend](http://localhost:8000)
- [frontend](http://localhost:5173)

- Backend Repo [URL](https://github.com/Pawan0516/Alumni_Connect)
