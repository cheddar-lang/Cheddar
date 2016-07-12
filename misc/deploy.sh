echo "Verifing enviornment"
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != $DEPLOY_BRANCH ]; then
    echo "Not a deploy enviornment. Exiting..."
    exit 0
fi

echo "Gathering commit data"
COMMIT_DATA_SHA=`git rev-parse --verify HEAD`
COMMIT_DATA_MESSAGE=`git log -n 1 --pretty=format:'%s'`

echo "Decrypting keys...."
# De-encrypt the deployment private key
openssl aes-256-cbc -K $encrypted_06a29b5b80b3_key -iv $encrypted_06a29b5b80b3_iv -in misc/deploykey.enc -out deploykey -d
echo "Adjusting permissions..."
chmod 600 deploykey
echo "Starting SSH agent..."
eval `ssh-agent -s`
echo "Adding deploy key..."
ssh-add deploykey

REPO="cheddar-lang.github.io"
REMOTE_REPO="git@github.com:cheddar-lang/${REPO}.git"

CURRENT_PATH=`basename "$PWD"`
echo "Moving from $PWD"

cd ..

echo "Cloning deploy target..."
git clone $REMOTE_REPO && cd $REPO

echo "Successfully clones $REPO"

echo "Setting Git user..."
git config --global user.name "Travis CI"

# Create the build
echo "Preparing deploy build..."
cd ../$CURRENT_PATH

echo "Starting build..."
make build

echo "Compiling to target"
make browser_build

echo "Getting Version"
CHEDDAR_VERSION="$(node -pe "require('./package.json').version")"

# Copy to the destination
cd ../$REPO
echo "Moving to destination"
cp ../$CURRENT_PATH/Cheddar.js ./repl/Cheddar.js

echo "Starting template generation..."
cp ./repl/console.template.js ./repl/console.js

echo "Setting version..."
sed -i -e "s/@VERSION/$CHEDDAR_VERSION/g" ./repl/console.js

echo "Prepating changes..."
git add -A

echo "Commiting changes..."
git commit -am "$(printf "Auto-deploy from @/cheddar: SHA ${COMMIT_DATA_SHA}; ${COMMIT_DATA_MESSAGE}" )"

echo "Pushing to target..."
git push origin master
