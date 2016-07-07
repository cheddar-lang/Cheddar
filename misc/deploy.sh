set -e # error if anything errors

if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != $DEPLOY_BRANCH ]; then
    echo "Not a deploy enviornment. Exiting..."
    exit 0
fi

COMMIT_DATA_SHA=`git rev-parse --verify HEAD`
COMMIT_DATA_MESSAGE=`git log -n 1 --pretty=format:'%s'`

# De-encrypt the deployment private key
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $encrypted_c66588929ae5_key -iv $encrypted_c66588929ae5_iv -in deploykey.enc -out deploykey -d
chmod 600 deploykey
eval `ssh-agent -s`
ssh-add deploykey

REPO="cheddar-lang.github.io"
REMOTE_REPO="git@github.com:cheddar-lang/${REPO}.git"

git clone $REMOTE_REPO && cd $REPO

git config user.name "Travis CI"
git config user.email $COMMIT_AUTHOR_EMAIL

# Create the build
cd ..
make build
make browser_build

# Copy to the destination
cd $REPO
cp ../Cheddar.js ./repl/Cheddar.js

git add -A
git commit -am "$(printf "Auto-deploy from @/cheddar: SHA ${COMMIT_DATA_SHA}; ${COMMIT_DATA_MESSAGE}" )"

git push origin master