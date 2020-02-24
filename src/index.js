import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import Amplify from 'aws-amplify';
import config from './config';

//initialize AWS Amplify
//1.mandatorySignIn - users have to be signed in
//2. name: notes (endpoint), you can add multiple APIs here
//3. just setting up the resources we can use here

Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
      identityPoolId: config.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    Storage: {
      region: config.s3.REGION,
      bucket: config.s3.BUCKET,
      identityPoolId: config.cognito.IDENTITY_POOL_ID
    },
    API: {
      endpoints: [
        {
          name: "notes",
          endpoint: config.apiGateway.URL,
          region: config.apiGateway.REGION
        },
      ]
    }
});

//use BrowserRouter as router to use browser's history API to create real urls
// User Router to render App component
ReactDOM.render(
    <Router>
      <App />
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
