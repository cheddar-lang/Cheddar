#!/usr/bin/env python
# Cheddar changelog generator
# (c) cheddar-lang 2016-
# 
# Outputs data including name, hash, email & message


from subprocess import check_output
from collections import namedtuple, defaultdict
import re
import sys
import argparse

ITEM_LENGTH = 80
INDENT = ' - '

# Handle process arguments
parser = argparse.ArgumentParser()
parser.add_argument("logfile", help="file to write to, default stdout", nargs='?', type=argparse.FileType('w+'), default=sys.stdout)
parser.add_argument("--latest", help="only shows the latest changes", action="store_true")
args = parser.parse_args()

LOGFILE = args.logfile

# These do most of the heavy lifting
Commit = namedtuple('Commit', ['author', 'email', 'hash', 'change'])

def getlog(start, end):
    rawdata = check_output(["git", "log", start + ".." + end, "--format=%cn%n%ce%n%h%n%s"]).decode("utf-8").splitlines()
    ITEMS_PER_COMMIT = 4
    return list(map(Commit, *[iter(rawdata)] * ITEMS_PER_COMMIT))

# Get all info we need
if args.latest:
    tags = ["HEAD", check_output([ "git", "describe", "--tags", "--abbrev=0" ]).decode("utf-8").strip()]
else:
    tags = check_output([ "git", "for-each-ref", "--sort=taggerdate", "--format", "%(tag)" ]).decode("utf-8").strip().splitlines()[::-1]

# parse commit format
commit_format = re.compile(r"^(.+?) \[(.+?)\]: (.+)")

# Start generating change log
# Writes to `CHANGELOG`
with LOGFILE as log:
    # Generate changes
    # This goes from old -> new
    for i in range(len(tags) - 1):
        former, latter = tags[i + 1], tags[i]
        logItems = getlog(former, latter)

        longestName = len(max(logItems, key=lambda s: len(s.author)).author)

        log.write(
            (former + " -> " + latter).center(ITEM_LENGTH, ' ') + '\n'
        )

        log.write(  "=" * ITEM_LENGTH + '\n' )

        # Now handle sorting of commits
        commits = defaultdict(list)

        for item in logItems:
            res = re.match(commit_format, item.change)
            if res == None:
                commits['other'].append(item)
            elif res.group(1) != 'version':
                commits[res.group(1).lower().strip()].append(
                    item._replace(change='{}: {}'.format(res.group(2), res.group(3)))
                )

        for category, items in sorted(commits.items()):
            log.write("{}:\n".format(category))

            lastLogAuthor = ""
            for logItem in items:
                log.write(
                    INDENT + '{1} ({0.hash}) {0.change}\n'.format(logItem, logItem.author.ljust(longestName))
                )

        log.write('\n\n')
