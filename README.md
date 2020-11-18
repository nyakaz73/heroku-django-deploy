# heroku-django-deploy
A simple github action that automatically deploys Django app to heroku

### Show some :heart: and :star: the repo to support the project

## Getting Started
heroku-django deploy uses three methods to deploy your Django app to heroku ie
* 1. Deploy with git
* 2. Deploy with Container Registry (Docker deploy)
* 3. Deploy with Build Manifest (Docker deploy)

Unless you are using git make sure you have a **Procfile** or a **Dockerfile**  or a **heroku.yml** in your project root directory together with the **requirements.txt** file.

### 1. Deploy with git
By default if you dont specify the deployment option it will use git see example below.

```yml
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]
jobs:
  heroku_git_deploy_job:
      runs-on: ubuntu-latest
      name: Git Deploy job- A job to deploy django app to heroku using git
      steps:
        - name: Checkout
          uses: actions/checkout@v2
        - name: Deploy django to heroku
          uses: nyakaz73/heroku-django-deploy@v0.59 #Uses an action in the root directory
          with: 
            heroku_app_name : ${{ secrets.HEROKU_APP_NAME }}
            heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
            heroku_email_address: 'tafadzwalnyamukapa@gmail.com'
```
### 2. Deploy with docker container registry
Make sure you specify the deployment option ie **use_docker** option.
Also make sure you have a **Procfile**, **Dockerfile**, and **requirements.txt** files in your root project directory.
```yml
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]
jobs:
  heroku_git_deploy_job:
      runs-on: ubuntu-latest
      name: Git Deploy job- A job to deploy django app to heroku using git
      steps:
        - name: Checkout
          uses: actions/checkout@v2
        - name: Deploy django to heroku
          uses: nyakaz73/heroku-django-deploy@v0.59 #Uses an action in the root directory
          with: 
            heroku_app_name : ${{ secrets.HEROKU_APP_NAME }}
            heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
            heroku_email_address: 'tafadzwalnyamukapa@gmail.com'
            use_docker: true
```

### 3. Deploy with docker build manifest
Make sure you specify the deployment option ie **use_build_manifest** option.
Also make sure you have a **heroku.yml** or **Dockerfile**, and **requirements.txt** files in your root project directory.

```yml
on:
  push:
    branches: [ master ]
  pull_request:
    branches: [ master ]
jobs:
  heroku_git_deploy_job:
      runs-on: ubuntu-latest
      name: Git Deploy job- A job to deploy django app to heroku using git
      steps:
        - name: Checkout
          uses: actions/checkout@v2
        - name: Deploy django to heroku
          uses: nyakaz73/heroku-django-deploy@v0.59 #Uses an action in the root directory
          with: 
            heroku_app_name : ${{ secrets.HEROKU_APP_NAME }}
            heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
            heroku_email_address: 'tafadzwalnyamukapa@gmail.com'
            use_build_manifest: true
```