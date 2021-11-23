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

deploy_result=`git push product`
push_result=`git push origin`

if [[ ${deploy_result} != *"completed"* ]]; then
    echo "Error! Failed deploying to the testing server."
    else
        echo "Succeed! Great job! Feel free to visit : "
        echo "         https://testing.tianyuezhang1997.site/cse110-fa21-group8/${currBranch}"
        echo "to see your deployed work."
fi
if [[ ${push_result} != *"completed"* ]]; then
    echo "Error! Failed pushing to the team repo."
    else
        echo "Succeed! Great job! Feel free to visit : "
        echo "         https://github.com/cse110-fa21-group8/cse110-fa21-group8/actions"
        echo "to see the testing result of your work"
fi