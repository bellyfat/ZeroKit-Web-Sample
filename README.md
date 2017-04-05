# ZeroKit Web Sample

This repository is a template of a basic example application that shows you how to use 
ZeroKit for zero knowledge authentication and end-to-end encryption.

It makes use of the [ZeroKit sample backend](https://travis-ci.org/tresorit/ZeroKit-NodeJs-backend-sample)
  
### Supported browsers

We recommend to use the latest Chrome or Firefox for testing.
A full list of supported browsers:
- Chrome 38+
- Firefox 35.0+
- Microsoft Edge (25.10586+)
- Safari 8+
- Internet Explorer 11

## Setting up the example application

- Make sure you have the Example backend up and running, if not please see 2.1 Node.js backend sample
- Download the example from the management portal or from GitHub
    - You can also fork and/or clone the repository from https://github.com/tresorit/ZeroKit-NodeJs-backend-sample
- Edit config.js: You need to set the server url to where you set the example backend up. By default it's set for a backend running locally, on port 3000.
- Serve the application: you have multiple options here:
    - If you have Node.js installed you should:
        1. install express by: ```npm install express```
        2. run the server by:  ```node server.js```
        
        This will start serving the example application on port 3002.
    - If you have python installed you can run: ```python -m SimpleHttpServer 3002```
- Navigate to http://localhost:3002/ and try it out.
