set -e

# Delete the old repo
sudo su
rm -rf /home/ubuntu/html/bank-pro/
sudo su ubuntu

# clone the repo again
cd /home/ubuntu/html
git clone git@gitlab.informatika.org:if3110-2019-02-k03-18/bank-pro.git

cd /home/ubuntu/html/bank-pro

#install npm packages
echo "Running npm install"
npm install

#Build
echo "Running npm build"
npm run build
