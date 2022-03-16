# End-to-End Project

this branch showcases full project demo consisting of **Django** backend serve, **React** frontend & **Redis** for *channels* storage, with use of **Docker**.

## Steps to Run the Project

### Step 1: Clone the Project

Clone repository in your local system. Follow this step **only if you don't already have the repository.**

```bash
git clone https://github.com/Jay206-Programmer/react_realtime_graphs.git
```

### Step 2: Checkout to the end-to-end branch

Use this commend to checkout into **end-to-end** branch if you are not already in that branch.

```bash
git checkout end-to-end
```

### Step 3: Run Project

This step creates docker images & runs them via the **docker-compose** file.

##### Note: You will need [docker-desktop](https://www.docker.com/products/docker-desktop) installed locally to run this project.

```bash
docker-compose up --build -d
```

That's it! Go on [http://localhost:3000](http://localhost:3000) to visit the website.