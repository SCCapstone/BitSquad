# BitSquad
# Screen Time Limiter

The Screen Time Limiter is a web application built using the Angular framework. All users can set up timers and create schedules for gaming applications. Browser notifications alert users when time is up. Windows users can download the desktop app which will kill the specified process automatically when a process reaches its specified limit for the day. Lastly, users can view graphs that show how much time they spent gaming overall, and per application.

[Architecture](https://github.com/SCCapstone/BitSquad/wiki/Architecture)

### Code Styling Guides
[TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)

[HTML/CSS Style Guide](https://google.github.io/styleguide/htmlcssguide.html)



## External Requirements

In order to build this project you first need to install:

[Node.js](https://nodejs.org/en/download)

* Check that installation was successful. You should receive a version number after executing each of the these commands:
>* node -v
>* npm -v

* Make sure npm is up to date:
>* npm install -g npm




## Setup

After cloning the repo, you must add the Angular build kit to the directory where you cloned the project. The build kit is part of node-modules.

>ng add node-modules

You will also need Firebase dependencies.

>ng add @angular/fire

To view the analytics page you will need to install another module

>npm install ng2-charts --save

To view the embedded YouTube demo video on the about page you will need to install another module

>npm i @angular/youtube-player

## Running
To open on localhost port 4200:

>ng serve --open

# Deployment

To deploy a version of the BitSquad Screen Time Tracker, run the commands:
>ng build

>firebase deploy

# Testing

The unit tests are in `src/app/tests/unit`.

The behavioral tests are in `src/app/tests/selenium`.

## Testing Technology

Unit tests are developed with Jasmine, which comes with the Angular framework.

Behavorial tests are developed with the Selenium IDE, which requires the following setup to execute tests from the command line:

1. Install the Selenium command line runner
    >npm install -g selenium-side-runner

2. Install the version of Chrome Driver that matches your Chrome version from https://chromedriver.chromium.org/downloads
    
    **How to Find Your Chrome Version**
    1. Click the 3 dots in the upper right hand corner of your Chrome Browser
    2. Select "Help"
    3. Select "About Google Chrome" and the version will be listed

3. Select the Windows download: chromedriver_win32.zip 
4. Unzip the Chrome Driver download to any directory on your computer
5. In the Windows search bar, type "environment variables" and select "Edit the system environment variables"
6. Select "Environment Variables"
7. Select the "Path" variable in the "System variables" section
8. Select "Edit"
9. Select "New"
10. Select "Browse"
11. Navigate to the directory where you unzipped the Chrome Driver download (step 3), then click "OK" to close all dialog boxes
12. **Restart your computer before attempting to run any tests**


## Running Tests
First make sure the program is running in another terminal:
>ng serve

The following command will execute our unit tests and launch the Karma debugger in a Chrome window
> ng test

The following command will execute our behavioral tests and launch a Chrome window
> selenium-side-runner.cmd src/app/tests/selenium/*.side


# Authors

* Kelli Alan alankelli64@gmail.com
* Patterson Howell pattersonhowell12@gmail.com
* Branavan Kalapathy kalapatb@email.sc.edu
* zhiquan xie zhiquan@email.sc.edu
* William DesMarteau desmartw@email.sc.edu
