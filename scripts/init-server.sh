
#!/bin/bash
# Amazon Linux
yum upgrade -y
yum update -y
yum install -y git
curl -sL https://rpm.nodesource.com/setup_10.x | bash -
yum install -y nodejs nginx zsh
npm i pm2 -g

chkconfig nginx on

sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
