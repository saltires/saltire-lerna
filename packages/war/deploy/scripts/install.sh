
#!/bin/sh
# TIME_STAMP=$(date "+%Y%m%d%H%M%S")
# cp -a ${webroot}/pub ./pub-bak-$TIME_STAMP
rm -rf ${workspace}/${appName} 
unzip -n ${workspace}/tmp/${appName}-1.*.war -d ${workspace}/${appName} 
rm -rf ${workspace}/tmp/${appName}-1.*.war