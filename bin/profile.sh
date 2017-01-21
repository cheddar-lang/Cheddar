#!/usr/bin/env bash

USRPATH="$(pwd -P)"

# Get the directory path
SCRIPTPATH="$( cd "$(dirname "$0")" ; dirname "$(pwd -P)" )"

cd /tmp
find . -name 'isolate-0x*' -delete 2> /dev/null

if [[ "$1" == "-" ]]; then
    echo "" | node --prof "$SCRIPTPATH/dist/cli/cheddar"
else
    node --prof "$SCRIPTPATH/dist/cli/cheddar"
fi

PROFFILE="`find . -name 'isolate-0x*' -type f 2> /dev/null`"
node --prof-process "$PROFFILE" > "$USRPATH/profile-$RANDOM$RANDOM.txt"
