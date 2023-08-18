#!/bin/bash

CHART_DIRECTORY=$1
BRANCH=$2
BRANCH_PR_NUMBER=$3

cd ${CHART_DIRECTORY}
sed -i -e "s/^PREVIEW_DEPLOYMENT_ID:.*/PREVIEW_DEPLOYMENT_ID: exui-preview-deployment-BRANCH_PR_NUMBER/" "${CHART_DIRECTORY}/charts/xui-webapp/values.preview.template.yaml"

exit 1
