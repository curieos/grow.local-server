# Grow.local

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/803eae1e5fc4423da19de6379f91af9b)](https://www.codacy.com/gh/Grow-local/Server?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Grow-local/Server&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.org/Grow-local/Server.svg?branch=master)](https://travis-ci.org/Grow-local/Server)
[![Coverage Status](https://coveralls.io/repos/github/Grow-local/Server/badge.svg?branch=master)](https://coveralls.io/github/Grow-local/Server?branch=master)

Grow.local is a SEAN stack app for plant care.

## Setup on a Raspberry Pi

### Pre-requisites

You need to have Curl, NodeJS/NPM, and HAProxy installed. I recommend using an install of Ubuntu Server or Raspberry Pi OS Lite.

You will need to change the hostname by editing `/etc/hostname` to `grow` or else the server will not work.

You may wish to enable SSH on your pi for remote management. Make sure you change the default password with `passwd` if you open it up to ssh.

### Setup

To install, run `curl -sSL https://github.com/curieos/Grow.local-Server/releases/download/v0.1.2-1/setup.sh | bash`

Once the script finishes, you will be asked to configure PM2, a Node-based process manager, to start on boot. Run the command given to do so.

## Setting up for Development

Make sure you have the required dependencies installed.

Navigate to the directory and run `npm install` to install the required npm packages.

The development node server can be started by running `npm run dev`. The angular frontend can be run via `ng serve` in a separate terminal.
