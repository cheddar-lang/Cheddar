# Prepares a new cheddar release & relevant tags
# Run with CAUTION
# It is a pain to remove all items caused by running this

# Variables on where and what to do
LEADING_BRANCH="master"
DEV_BRANCH="develop"

# Script body
while true; do
    # Make sure user is very sure they want to run this
    # -n 1 removed need to press enter
    read -p "Preparing Cheddar release. Are you 100% you want to do this [Y/n]? " -n 1 run_confirmation

    # Determine how to respond to given signal
    if [[ $run_confirmation == "Y" ]]; then
        break;
    elif [[ $run_confirmation == "n" ]]; then
        exit 1;
    else
        echo "Please enter either 'Y' or 'n'"
    fi
done

# Set variables to basic ANSI codes
bold=`tput bold`
normal=`tput sgr0`

# Start the processs
echo "Recieved affirmative signal to prepare release..."

echo "Switching to ${bold}${DEV_BRANCH}${normal} for version bump"
echo;

git checkout "$DEV_BRANCH"

# Do the actual version bump
node -e 'var fs=require("fs"); fs.writeFileSync("package.json", fs.readFileSync("package.json", "utf8").replace(/("version".+?)(\d+)(?=")/, (_, s, v) => s + (+v + 1)))'
VERSION=`node -e 'console.log("v" + require("./package.json").version)'`
echo;

echo "Succesfully bumped version to ${bold}${VERSION}${normal}"
echo;

git add package.json
git commit -S -s -m "version [bump]: Bumped version to $VERSION"

echo "Switching to ${bold}${LEADING_BRANCH}${normal} for merge"
echo;

git checkout "$LEADING_BRANCH"

git merge "$DEV_BRANCH"
echo;

echo "Sucesfully prepared release"
echo;

git tag -a "$VERSION"
echo;

echo "Created tag for ${bold}${VERSION}${normal}"
echo;

git checkout "$DEV_BRANCH"
git merge "$LEADING_BRANCH"
echo;

echo "Syncronized ${bold}${DEV_BRANCH}${normal} with ${bold}${LEADING_BRANCH}${normal}"
echo;

git checkout "$LEADING_BRANCH"
echo;

echo "Completed release preperation. Push with ${bold}git push --all --follow-tags${normal}"
echo " ${LEADING_BRANCH} is protected so once the tests pass. Perform ${bold}git push origin master:master${normal}"
echo;
