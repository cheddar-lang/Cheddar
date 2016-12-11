<p align="center">
  <a href="https://github.com/cheddar-lang/Cheddar">
    <img src="https://raw.githubusercontent.com/cheddar-lang/Cheddar/master/misc/logo_wide.png" alt="Cheddar" width="846">
  </a>
</p>

<p align="center">
  <a href="https://travis-ci.org/cheddar-lang/Cheddar"><img alt="Travis Status" src="https://travis-ci.org/cheddar-lang/Cheddar.svg?branch=master"></a>
  <a href='https://coveralls.io/github/cheddar-lang/Cheddar?branch=develop'><img src='https://coveralls.io/repos/github/cheddar-lang/Cheddar/badge.svg?branch=develop' alt='Coverage Status' /></a>
  <a href="https://codecov.io/gh/cheddar-lang/Cheddar"><img src="https://codecov.io/gh/cheddar-lang/Cheddar/branch/develop/graph/badge.svg" alt="Codecov" /></a>
  <a href="https://gitter.im/cheddar-lang/Cheddar?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge"><img alt="Join the chat at https://gitter.im/cheddar-lang/Cheddar" src="https://badges.gitter.im/cheddar-lang/Cheddar.svg"></a>
  <a href="https://www.npmjs.com/package/cheddar-lang"><img alt='npm' src="https://img.shields.io/npm/dt/cheddar-lang.svg"></a>
  <img src='https://david-dm.org/cheddar-lang/Cheddar.svg' alt='Dependency Status' />
  <a href="http://waffle.io/cheddar-lang/Cheddar"><img alt="Ready Items" src="https://badge.waffle.io/cheddar-lang/Cheddar.svg?label=ready&title=Todo"></a>
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

## Developing

Development for cheddar is described [in detail on the docs](https://docs.cheddar.vihan.org/Developing/). But first, to clone the cheddar repository, use the following:

```sh
$ git clone --recursive https://github.com/cheddar-lang/Cheddar.git
```

Additionally, when _syncinc_ your branch with the latest update to `develop`, use the following command to avoid merge commmits:

```sh
$ git rebase develop -X theirs
```

Once your changes are ready to merge, submit a PR to the `develop` branch where it'll be reviewed and then merged if applicable

## Manual Installation

Manual installation is simple. The only dependencies you must have are [git](https://git-scm.com) and [nodejs + npm](https://nodejs.org/en/). Additionally you should have [make](https://www.gnu.org/software/make/) (preferably GNU), but this comes by default on almost every *nix system.

 - First, refer to the "Development" section for cloning the Cheddar repository.

 - The next step is to install the dependencies with npm. An automatic build should trigger if dependencies are installed succesfully. Once this command is finished you should see a `dist/` directory created. If you don't, look for any errors in the installation.

  ```bash
$ npm install
```

 - Manually building / testing

  You can use `make` to run the build, test, and install tasks:
  ```bash
$ make         # Production Build
$ make build   # Development Build
$ make test    # Run tests
```

 - Installing.

  If you want to install the Cheddar CLI, you have some options. If you are doing a production installation, use `make install`. For all other cases use `./bin/install`; with this you can pass a `--method` argument to specify whether you'd like to install for yourself (`--method=alias`) or for everyone on your computer (`--method=path`, the default) which may require elevated privileges. With `--method=alias`, provide the location of your bashrc file or equivalent with the `--rcloc` flag (usually for *nix systems this is `~/.bashrc`, and for Mac this is `~/.bash_profile`). You may specify the installation path with `--method=path`, Cheddar installs the binary in `<path>/bin/cheddar` and `<path>/share/cheddar`; this defaults to `/usr/local`.
