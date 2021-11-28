#!/bin/sh
targetFolder="JSDocs"
if [[ -d ${targetFolder} ]]; then
    rm -rf ${targetFolder}
    else 
        echo "Error! ${targetFolder} does not exist."
fi
