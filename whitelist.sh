export
if [[ $HOSTNAME = *xui-webapp-pr* ]]
then

NUMBERSTR=$(echo "$HOSTNAME" |  grep -o -E '\-[0-9]+\-')
NUMBER=$(echo "$NUMBERSTR" |  grep -o -E '[0-9]+')
 
echo "PR Number $NUMBER" 
https_proxy=proxyout.reform.hmcts.net:8080 curl -v -X PATCH \
 https://idam-api.aat.platform.hmcts.net/testing-support/services/judicial-ui \
 -H 'Accept: application/json' \
 -H 'Content-Type: application/json' \
 -d '[{
   "operation": "add",
   "field": "redirect_uri",
  "value": "https://xui-webapp-pr-$NUMBER.service.core-compute-preview.internal/oauth2/callback"
}]'

fi

