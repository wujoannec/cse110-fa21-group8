#!/bin/sh
currBranch=`git rev-parse --abbrev-ref HEAD`
product="product"
remotes=`git remote -v`
if [[ ${remotes} != *${product}* ]]; then
    echo "Error! Failed to deploy. Remote ${product} not added"
    echo "Please run the following command:"
    echo "       git remote add product ssh://root@tianyuezhang1997.site/var/repo/cse110-fa21-group8.git"
    echo "to add ${product} as a remote repo before deploying your work"
fi

# First, deploy current branch to the testing server 
deploy_result=`git push --porcelain product`

if [[ ${deploy_result} != *"Done"* || ${deploy_result} == *"up to date"* ]]; then
    echo "Error! Failed deploying to the testing server."
else
    echo "Succeed! Great job! Feel free to visit : "
    echo "         https://testing.tianyuezhang1997.site/cse110-fa21-group8/${currBranch}"
    echo "to see your deployed work."
    # After successfully deploying to the testing server 
    # push current to the team repo
    push_result=`git push --porcelain origin`
    if [[ ${push_result} != *"Done"* || ${push_result} == *"up to date"* ]]; then
        echo "Error! Failed pushing to the team repo."
    else
        echo "Succeed! Great job! Feel free to visit : "
        echo "         https://github.com/cse110-fa21-group8/cse110-fa21-group8/actions"
        echo "to see the testing result of your work"
    fi
fi
