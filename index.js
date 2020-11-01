const core = require('@actions/core');
const { execSync, exec } = require('child_process')
//Variables
/*let heroku = {
    'app_name': 'django-heroku-app001',
    'api_key': 'c8cc8d0dc5-b53b-4d03-812e-1c09582e8fa4',
    'email_address': 'tafadxzwalnyamukapa@gmail.com',
    'want_to_login': true
}*/
let heroku = {
    'app_name': core.getInput('heroku_app_name'),
    'api_key': core.getInput('heroku_api_key'),
    'email_address': core.getInput('heroku_email_address'),
    'want_to_login': core.getInput('want_to_login')
}

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

//Run Login
if (heroku.want_to_login) {
    login();
}
console.log('After login')

core.setOutput(
    "status",
    "Successfully deployed app from branch"
);

