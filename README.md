# TailwindUIKit Downloader
This script will download all example codes that available in your account.

## Prerequisites
- NodeJS 14.x

## Run
1. Run `$ npm install` to install module dependencies. (Run once)
2. Fill your login in `login.txt`
3. Run `$ node login` to get token. If the login successful, you will see a message and `token.txt` file will be created.
4. Run `$ node 1 and 2` to build text file that contains webcom. links for all available components. A `finalLinks.json` file will be created when the command successful.
5. Run `$ node 2` to build json file that contains files names . A `array1.json` file will be created when the command successful.
6. Run `$ node 3` to build json file that contains folder structure of all components.A `components2.json` file will be created when the command successful.
6. Run `$ node 4` to begin download component codes.

###For me, it took a lot of time for scrapping so be patient.

Repeat 2 - 6 if you want to re-download.