set -e
sudo echo "deploying to 52.220.86.67"
sudo ssh -v -i ./aws-key/engimaInstance.pem ubuntu@52.220.86.67 'bash' < ./deploy/updateAndRestart.sh
