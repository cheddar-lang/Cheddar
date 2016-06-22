<p align="center">
  <a href="https://github.com/vihanb/Cheddar">
    <img src="https://raw.githubusercontent.com/vihanb/Cheddar/master/misc/logo_wide.png" alt="Cheddar" width="846">
  </a>
</p>

<p align="center">
  <a href="https://travis-ci.org/cheddar-lang/Cheddar"><img alt="Travis Status" src="https://travis-ci.org/cheddar-lang/Cheddar.svg?branch=master"></a>
  <a href="https://gitter.im/cheddar-lang/Cheddar?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"><img alt="Join the chat at https://gitter.im/cheddar-lang/Cheddar" src="https://badges.gitter.im/cheddar-lang/Cheddar.svg"></a>
  <a href="https://codeclimate.com/github/cheddar-lang/Cheddar"><img src="https://codeclimate.com/github/cheddar-lang/Cheddar/badges/gpa.svg" /></a>
  <a href="https://codecov.io/gh/cheddar-lang/Cheddar">
    <img src="https://codecov.io/gh/cheddar-lang/Cheddar/branch/master/graph/badge.svg" alt="Codecov" />
  </a>
  <a href='https://coveralls.io/github/cheddar-lang/Cheddar?branch=tests'><img src='https://coveralls.io/repos/github/cheddar-lang/Cheddar/badge.svg?branch=tests' alt='Coverage Status' /></a>
  <img src='https://david-dm.org/cheddar-lang/Cheddar.svg' alt='Dependency Status' />
</p>

<p align="center">
  <p align="center">
    <a href="http://cheddar.vihan.org/">Website</a> &mdash;
    <a href="http://cheddar.vihan.org/#download">Download</a> &mdash;
    <a href="http://docs.cheddar.vihan.org/">Documentation</a>
  </p>
  <p align="center">
    The language that works for you
  </p>
</p>

## Manual Installation

Manual installation is simple. The only dependencies you must have are [git](https://git-scm.com) and [nodejs + npm](https://nodejs.org/en/). Additionally you should have [make](https://www.gnu.org/software/make/) (preferably GNU), but this comes by default on almost every *nix system.

1. The first step is the clone from GitHub:

```bash
$ git clone https://github.com/cheddar-lang/Cheddar.git && cd Cheddar
```

**Note:** If you want to clone a specific branch (e.g. develop for development). Use the following command:

```bash
$ git clone -b <branch> https://github.com/cheddar-lang/Cheddar.git && cd Cheddar
```

2. The next step is to install the dependencies with npm. An automatic build should trigger if dependencies are install succesfully. Once this command is finished you should see a `dist/` directory created. If you don't look for any errors in the install.

```bash
$ npm install
```

3. Manually building / testing

You can use `make` to run the build, test, and install tasks
```bash
$ make         # Production Build
$ make build   # Development Build
$ make test    # Run tests
```

 4. Installing. If you want to install the Cheddar CLI. You have some options. If you are doing a production install. Use `make install`. For all other cases use `./bin/install`; with this you can pass a `--method` argument to specify whether you'd like to install for yourself (`--method=alias`) or for everyone on your computer (`--method=path`, the default) whicb may require eleveated privledges. With `--method=alias`, provide the location of your bash rc or equivilent with the `--rcloc` flag (usually for *nix systems this is `~/.bashrc` for Mac this is `~/.bash_profile`). With `--method=path`, you may specify the install path, Cheddar installs the binary in `<path>/bin/cheddar` and `<path>/share/cheddar`, this defaults to `/usr/local`

## Roadmap

**Tokenizer roadmap excluded.**

 - [x] Define streams
 - [x] Define class structure
 - [x] Define basic runtime enviorment
 - [x] Token linking
 - [x] Call stack handling
 - [x] Define namespaces
 - [x] Handle lookups
 - [x] Define primitive classes
  - [x] String
  - [x] Array
  - [x] Number
  - [x] Boolean
  - [x] Nil
 - [x] Expression evaluation integration
  - [x] Linking
  - [x] Call stack configuration
  - [x] Scope linking
  - [x] Explicit Casting
 - [x] Conditional expression handling
 - [x] Loop expression handling
 - [x] Functions
  - [ ] Syntax definition
  - [x] Functional design
  - [x] Function scope
  - [x] Function handling
  - [x] Function lookup
  - [x] Function execution
  - [ ] Token linking
 - [ ] Class handling
  - [x] Syntax definition
  - [x] Class design, and implementation
  - [x] Class scoping
  - [x] Class lookup
  - [x] Class Execution
  - [ ] Token linking
 - [x] I/O Interfacing
 - [x] Statement handling
 - [x] Interpretation
 - [x] Call stack optimization
 
Congrats! Cheddar is done!

Critical Running Bugs:

 - [x] Fix infinite precedence with unary operators bug
 - [x] Precendence ignored

Bugs:

 - [x] Stack overflowing during various invalid expression syntax
 - [ ] Error handling is completely borked.
  - [ ] Syntax Errors (index & prop data is lost)
  - [x] Runtime Errors

Further Development

 - [ ] JS Interfacing
 - [ ] A bunch of libraries
