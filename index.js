const core = require('@actions/core');
const { execSync, exec } = require('child_process')

//Variables.
let heroku = {
    'app_name': core.getInput('heroku_app_name'),
    'api_key': core.getInput('heroku_api_key'),
    'email_address': core.getInput('heroku_email_address'),
    'want_to_login': core.getInput('want_to_just_login'),
    'use_git': core.getInput('use_git'),
    'use_docker': core.getInput('use_docker'),
}

//Create Netrc cat file used during login with cli.
const createNetrcFileForLogin = ({ email_address, api_key }) => {
    return execSync(`cat >~/.netrc <<EOF
machine api.heroku.com
  login ${email_address}
  password ${api_key}
machine git.heroku.com
  login ${email_address}
  password ${api_key}
        `);
}
//Login method to check if user is logged in.
const login = () => {
    try {
        createNetrcFileForLogin(heroku);
        const user = execSync('heroku auth:whoami').toString();
        console.log(`Successfully Logged in with user: ${user}`);
    } catch (error) {
        console.log(error.message);
        core.setFailed(error.message);
    }
}

//Adding remote repo to heroku.
const addRemote = ({ app_name }) => {
    try {
        const gitInit = execSync('git init').toString();
        console.log(gitInit);
        const remote = execSync(`heroku git:remote -a ${app_name}`).toString();
        console.log(remote.message);
    } catch (error) {
        core.setFailed(error.message);
        console.log(error.message);
    }
}


const deployWithDocker = () => {

}
deployWithGit = () => {
    try {
        console.log('Deploying with git');
        execSync(`git config user.name "Heroku-Django-Deploy"`);
        execSync(`git config user.email "${heroku.email_address}"`);
        const add = execSync("git add -A").toString();
        console.log(add);
        execSync("git status")
        execSync('git commit -m "Initial commit" ').toString();
        const push = execSync("git push heroku master").toString();
        console.log(push);
        const migrate = execSync("heroku run python manage.py migrate").toString();
        console.log(migrate);
    } catch (error) {
        console.log(error.message);
        core.setFailed(error.message);
        console.log("Attempting to disable `collecstatic` cmd");
        /*try {
            const disable = execSync("heroku config:set DISABLE_COLLECTSTATIC=1").toString();
            console.log(disable);
            const push = execSync("git push heroku master").toString();
            console.log(push);
            const migrate = execSync("heroku run python manage.py migrate").toString();
            console.log(migrate);
        } catch (error) {
            core.setFailed(error.message);
            console.log(error.message);
        }*/
    }
}
pushAndRelease = ({ use_docker, use_git }) => {
    console.log('Now in push and Release')
    console.log(use_docker, use_git);
    try {
        console.log('Now in try');
        if (use_docker === true) {
            deployWithDocker();
        } else if (use_git === true) {
            deployWithGit();
        }
        else if (use_docker === true && use_git === true) {
            //Error only one deployment method at a time is allowed
            core.setFailed('Error : One deployment method at a time is allowed');
            console.log('Error : One deployment method at a time is allowed');
        } else {
            //Nothing is configured attempting to use default git
            console.log('No deployment method is specified. Attempting to use default use git...');
            deployWithGit();
        }
    } catch (error) {
        core.setFailed(error.message);
        console.log(error.message);
    }
}

//Run Login
// if (heroku.want_to_just_login) {
//     login();
//     return //, use return if user jus want to login
// }

login();
addRemote(heroku);
pushAndRelease(heroku);

core.setOutput(
    "status",
    "Successfully deployed app from branch"
);

