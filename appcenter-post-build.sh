    if [ "$AGENT_JOBSTATUS" == "Succeeded" ]; then

#Step1
        mappingData=$(curl -X POST "https://api.appcenter.ms/v0.1/apps/{owner_name}/{app_name}/symbol_uploads" \
            -H "accept: application/json" \
            -H "X-API-Token: $MY_APPCENTER_API_TOKEN" \
            -H "Content-Type: application/json" \
            --fail \
            -d '{
                    "symbol_type": "AndroidProguard",
                    "file_name": "mapping.txt",
                    "build": "'"$versionCode"'",
                    "version": "'"$versionName"'"
                }')

        if [[ $? == 0 ]]; then
#Step2
            mappingSymbolUploadId=$(echo ${mappingData} | python -c "import json,sys;obj=json.load(sys.stdin);print obj['symbol_upload_id'];")
            mappingUploadURL=$(echo ${mappingData} | python -c "import json,sys;obj=json.load(sys.stdin);print obj['upload_url'];")

            curl -X PUT \
            "$mappingUploadURL" \
            -H 'x-ms-blob-type: BlockBlob' \
            -T "$APPCENTER_SOURCE_DIRECTORY/app/build/outputs/mapping/{build_variant}/mapping.txt" \
            --silent \
            --show-error \
            --fail

            if [[ $? == 0 ]]; then
                mappingUploadStatus="committed"
            else
                mappingUploadStatus="aborted"
            fi
#Step 3
            curl -X PATCH "https://api.appcenter.ms/v0.1/apps/{owner_name}/{app_name}/symbol_uploads/$mappingSymbolUploadId" \
                -H "accept: application/json" \
                -H "X-API-Token: $MY_APPCENTER_API_TOKEN" \
                -H "Content-Type: application/json" \
                -d '{ "status": "'"$mappingUploadStatus"'"}'
        else
            echo "Couldn't upload mapping file"
        fi

    fi