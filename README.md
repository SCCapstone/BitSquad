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

## Running
To open on localhost port 4200:

>ng serve --open

# Deployment

Webapps need a deployment section that explains how to get it deployed on the
Internet. These should be detailed enough so anyone can re-deploy if needed
. Note that you **do not put passwords in git**.

Mobile apps will also sometimes need some instructions on how to build a
"release" version, maybe how to sign it, and how to run that binary in an
emulator or in a physical phone.

# Testing

In 492 you will write automated tests. When you do you will need to add a
section that explains how to run them.

The unit tests are in `/test/unit`.

The behavioral tests are in `/test/casper/`.

## Testing Technology

For behavior test, we use selenium IDE to write and selenium-side-runner to run our tests.
To run our tests through selenium-side-runner. you must first have it installed.
the command line to install it: npm install -g selenium-side-runner
after that you will need to install chrome driver(assuming you are using chrome)
here is the website to download the zipped chrome driver: https://chromedriver.chromium.org/downloads
after you downloaded it, unzip the chrome driver to somewhere and then put the directory where you have the chrome driver to the PATH
then you can run out test by using command: selenium-side-runner <path to our tests>


## Running Tests

open command line, then run command: selenium side runner \PATH\TO\DIR

# Authors

* Kelli Alan alankelli64@gmail.com
* Patterson Howell pattersonhowell12@gmail.com
* Branavan Kalapathy kalapatb@email.sc.edu
* zhiquan xie zhiquan@email.sc.edu
* William DesMarteau desmartw@email.sc.edu
