#!/bin/bash

# Exit if any step fails
set -e

# Config values
haProxyConfig=/etc/haproxy/haproxy.cfg

DEPENDENCIES=(curl nodejs haproxy)

COL_NC='\e[0m' # No Color
COL_LIGHT_GREEN='\e[1;32m'
COL_LIGHT_RED='\e[1;31m'
TICK="[${COL_LIGHT_GREEN}✓${COL_NC}]"
CROSS="[${COL_LIGHT_RED}✗${COL_NC}]"
INFO="[i]"
# shellcheck disable=SC2034
DONE="${COL_LIGHT_GREEN} done!${COL_NC}"
OVER="\\r\\033[K"

update=false

for var in "$@"; do
    case "$var" in
        "--update" ) update=true;;
    esac
done

is_command() {
    # Checks for existence of string passed in as only function argument.
    # Exit value of 0 when exists, 1 if not exists. Value is the result
    # of the `command` shell built-in call.
    local check_command="$1"

    command -v "${check_command}" >/dev/null 2>&1
}

check_hostname() {
	if [[ $(< /etc/hostname) != "grow" ]]; then
		printf "Hostname should be grow, is %s\\n" "$(< /etc/hostname)"
		exit 1
	fi
	printf "Hostname is configured correctly\\n"
}

install_dependencies() {
	printf "You need to install dependencies manually for now\\n"
	printf "Required:\\n"
	printf "%s\\n" "${DEPENDENCIES[@]}"
}

download_latest() {
	printf "Downloading the latest version of Grow.local...\\n"
	curl -sSL -o grow-local.zip https://github.com/curieos/Grow.local-Server/releases/download/v0.1.2/grow-local.zip
	unzip -o -q grow-local.zip
}

install_node_packages() {
	printf "Installing Node.js Packages\\n"
	npm install --prod
	sudo npm install -g pm2
}

setup_configs() {
	printf "Overwriting HAProxy Config\\n"
	sudo cp -f ./configurations/haproxy.cfg $haProxyConfig
}

start_proxy() {
	restart_service haproxy
}

start_server() {
	printf "Starting the server using pm2\\n"
	pm2 start
}

stop_pm2() {
	local str="Stopping ${1} service"
    printf "  %b %s..." "${INFO}" "${str}"
	pm2 stop "${1}" &> /dev/null || true
	printf "%b  %b %s...\\n" "${OVER}" "${TICK}" "${str}"
}

stop_service() {
    # Stop service passed in as argument.
    # Can softfail, as process may not be installed when this is called
    local str="Stopping ${1} service"
    printf "  %b %s..." "${INFO}" "${str}"
    if is_command systemctl ; then
        systemctl stop "${1}" &> /dev/null || true
    else
        service "${1}" stop &> /dev/null || true
    fi
    printf "%b  %b %s...\\n" "${OVER}" "${TICK}" "${str}"
}

restart_pm2() {
	local str="Restarting ${1} service"
    printf "  %b %s..." "${INFO}" "${str}"
	pm2 restart "${1}" &> /dev/null
	printf "%b  %b %s...\\n" "${OVER}" "${TICK}" "${str}"
}

restart_service() {
    # Local, named variables
    local str="Restarting ${1} service"
    printf "  %b %s..." "${INFO}" "${str}"
    # If systemctl exists,
    if is_command systemctl ; then
        # use that to restart the service
        systemctl restart "${1}" &> /dev/null
    # Otherwise,
    else
        # fall back to the service command
        service "${1}" restart &> /dev/null
    fi
    printf "%b  %b %s...\\n" "${OVER}" "${TICK}" "${str}"
}

make_service() {
	printf "Making the service\\n"
	pm2 startup
	printf "Run the above command to automatically make PM2 start on boot"
}

main() {
	printf "Grow.local server installer\\n"

	# if [[ "${EUID}" -eq 0 ]]; then
	# 	printf "Sudo Achieved\\n"
	# else
	# 	printf "Need Sudo\\n"
	# 	exit 1
	# fi

	if [[ "${PWD##*/}" != "grow-local" ]]; then
		printf "Not in directory grow-local, making directory and moving to it..."
		mkdir grow-local
		cd grow-local/
	fi

	if $update ; then
		stop_pm2 Grow.local
	fi

	download_latest

	check_hostname

	install_dependencies

	install_node_packages

	setup_configs

	start_proxy

	start_server

	make_service
}

main "$@"
