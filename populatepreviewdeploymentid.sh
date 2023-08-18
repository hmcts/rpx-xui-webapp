#!/bin/bash

BRANCH_PR_NUMBER=$1

sed -i -e "s/^PREVIEW_DEPLOYMENT_ID:.*/PREVIEW_DEPLOYMENT_ID: exui-preview-deployment-$BRANCH_PR_NUMBER/" "/charts/xui-webapp/values.preview.template.yaml"

exit 1
