#!/bin/bash

# Script to open new terminals and run port forwarding commands

# Open new terminal for customer-management-api port forwarding
osascript <<EOF
tell application "Terminal"
    do script "kubectl port-forward service/customer-management-api 8081:3000"
end tell
EOF

# Open new terminal for customer-facing-web-server port forwarding
osascript <<EOF
tell application "Terminal"
    do script "kubectl port-forward service/customer-facing-web-server 8080:3000"
end tell
EOF

# Open new terminal for customer-ui port forwarding
osascript <<EOF
tell application "Terminal"
    do script "kubectl port-forward service/customer-ui 8082:80"
end tell
EOF


