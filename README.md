Frontend Scaffold
=================

This is just a basic project scaffold for a frontend project. Basically just project structure and leveraging bower for asset management, and gulp for preprocessing, etc.

Leverages [Gulp.js](http://gulpjs.com) for fun and profit!!1!

Basic Up And Running Stuff
--------------------------

First off you need to install [Node.js](http://nodejs.org/download), [NPM](http://npmjs.org), [Bower](http://bower.io), and [Gulp.js](http://gulpjs.com).

Once you are good to go, clone the project, and install the node/bower dependencies

    git clone https://github.com/bdunn313/frontend-scaffold.git project-name
    cd project-name
    npm install && bower install

First, just run the default gulp task to initialize the project

    gulp
    
Whenever you want to build out your production code, just run the default command.

Fire up a local dev server on port 4000 with live-reload and asset watching by running:

    gulp dev

This gives you a frontend project with [Twitter Bootstrap](http://getbootstrap.com)-powered less files that get compiled into minified CSS, as well as automatically uglifying js files, etc. Pretty cool!

Project Status
--------------

Really this project is mostly to make my new project workflow sane for frontend development work. I will be improving it as I used it more, or if people like the project and open up issues that I can address. Currently the goal is for my consumption, however, and for familiarizing myself with [Gulp.js](http://gulpjs.com).

Kudos
-----

These articles helped me write up the gulpfile:

- [Getting Started with Gulp](http://markgoodyear.com/2014/01/getting-started-with-gulp/) by [markgoodyear](http://github.com/markgoodyear)
- [Livereload Magic with Gulp](http://rhumaric.com/2014/01/livereload-magic-gulp-style/) by [rhumaric](http://github.com/rhumaric)

License
-------

Released under the [MIT License](LICENSE.txt)
