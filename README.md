# heroku-django-deploy
A simple github action that automatically deploys Django app to heroku
The github action can be found on github market place [here](https://github.com/marketplace/actions/heroku-django-deploy).
The repo can be found [here](https://github.com/nyakaz73/heroku-django-deploy). I encourage and welcome all pull requests.

### Show some :heart: and :star: the repo to support the project

## Getting Started
heroku-django deploy uses three methods to deploy your Django app to heroku ie
* 1. Deploy with git
* 2. Deploy with Container Registry (Docker deploy)
* 3. Deploy with Build Manifest (Docker deploy)

Unless you are using git make sure you have a **Procfile** or a **Dockerfile**  or a **heroku.yml** in your project root directory together with the **requirements.txt** file.

### 1. Deploy with git
By default if you dont specify the deployment option it will use git or else altenatively specify the **use_git: true** option in the with tag.  see example below.

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
          uses: nyakaz73/heroku-django-deploy@v0.68 
          with: 
            heroku_app_name : ${{ secrets.HEROKU_APP_NAME }}
            heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
            heroku_email_address: 'tafadzwalnyamukapa@gmail.com'
            use_git: true
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
          uses: nyakaz73/heroku-django-deploy@v0.68 
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
          uses: nyakaz73/heroku-django-deploy@v0.68
          with: 
            heroku_app_name : ${{ secrets.HEROKU_APP_NAME }}
            heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
            heroku_email_address: 'tafadzwalnyamukapa@gmail.com'
            use_build_manifest: true
```

## Options
The action has multiple here is a list of options you can use  under with with flag in your workflow
| Name                        | Required  | Description                      | Example                          |
| --------------------------- | --------  | -------------------------------- | -------------------------------- |
|  heroku_app_name            |  true     | This is the name of your heroku app, | heroku_app_name: my-heroku-app |
|  heroku_api_key             |  true     | This is your heroku API key you can find in Heroku settings, and will be used for authentication  | heroku_api_key: ${{ secrets.HEROKU_API_KEY }} |
|  heroku_email_address       |  true     | This is your heroku email address you use when login in, and will be used for authentication | heroku_email_address: myherokuemail@gmail.com |
|  use_git                    |  false    | Deployment method if you want to use git | use_git: true |
|  use_docker                 |  false    | Deployment method if you want to use docker container registry | use_docker:  true |
|  use_build_manifest         |  false    | Deployment method if you want to use docker heroku build manifest | use_build_manifest: true |
|  disable_collect_static     |  false    | Used when you want to disable Django COLLECTSTATIC cmd | disable_collect_static: true |
|  force_push                 |  false    | Used when you want to force push your app with git or docker,and or container registry | force_push: true |
|  working-directory          |  false    | Used when you want to specify a different working directory for your root app directory from default ./ | working-directory: ./newfolder_in_root/djangoherokuapp |

## Example
A full working example can be found under tests in the github repo [here](https://github.com/nyakaz73/heroku-django-deploy/tree/master/tests/djangoherokuapp).

## Pull Requests and Contributions
I Welcome and i encourage all Pull Requests. Lets make the repo big :)
Github repo [here](https://github.com/nyakaz73/heroku-django-deploy)

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/nyakaz73/heroku-django-deploy/blob/master/LICENSE) file for details

