#!/bin/sh
targetFolder="JSDocs"
if [[ $# == 1 ]]; then
    srcFolder=$1
    if [[ -d ${srcFolder} ]]; then
        ./node_modules/.bin/jsdoc ${srcFolder}/*.js --destination ${targetFolder}
        else 
            echo "Error! The designated source folder : ${srcFolder} does not exist."
    fi
    else
        echo "Error! 1 and only 1 argument needed"
        echo "Please provide the folder where all the .js files located"
fi
