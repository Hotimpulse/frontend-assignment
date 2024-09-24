This project uses the Vite/TS React template

**Difficulties:**

- no image url (solved by using a placeholder image as I did not think it to be an important part in this particular task, although I could have used some photo API);
- no ready design/ui kit (solved with own design solution, tried antd for the first time, went with bootstrap for react as I had prior experience);
- many features require complex state solutions (used react query and redux toolkit for complex things like pagination and useState for modals and order states);
- many components quickly grew in size (there are plenty more things that could be further refactored but I tried finding middle ground; it was a fun challenge as I had serious time constraints);

**Shortcomings fixed / new features added after the deadline**

1. Likes component added | doesn't save on refresh, possible solution to make a "liked" boolean field
2. Better error handling
3. Styling improved on the orders page
4. Images are dynamically created with the names of the products
5. The app has been dockerized
6. The form for adding new ads is checked for validation

To run this app, do the following:

```
1. clone the Github repo and cd into the project's folder
2. install the dependencies
3. npm run dev
4. npm run server
5. the app is ready for interaction
```

OR

Get the Docker images here:

```
docker pull hotimpulse/my-react-app:latest
docker pull hotimpulse/my-json-server:latest
```

Run the images:

```
docker run -d -p 8000:8000 hotimpulse/my-json-server:latest
docker run -d -p 3000:3000 hotimpulse/my-react-app:latest

```
