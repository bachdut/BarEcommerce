#!/bin/bash

# Function to check if a command exists
command_exists() {
  command -v "$1" &>/dev/null
}

# Install Homebrew if not installed
if ! command_exists brew; then
  echo "Homebrew not found. Installing Homebrew..."
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
else
  echo "Homebrew is already installed."
fi

# Install Node.js and npm if not installed
if ! command_exists node || ! command_exists npm; then
  echo "Node.js and npm not found. Installing Node.js..."
  brew install node
else
  echo "Node.js and npm are already installed."
fi

# Install kubectl if not installed
if ! command_exists kubectl; then
  echo "kubectl not found. Installing kubectl..."
  brew install kubectl
else
  echo "kubectl is already installed."
fi

# Install Helm if not installed
if ! command_exists helm; then
  echo "Helm not found. Installing Helm..."
  brew install helm
else
  echo "Helm is already installed."
fi


#Edit etc/hosts for local connection to the app
echo "127.0.0.1 customer-facing-web-server.local" | sudo tee -a /etc/hosts
echo "127.0.0.1 customer-management-api.local" | sudo tee -a /etc/hosts
echo "127.0.0.1 customer-ui.local" | sudo tee -a /etc/hosts

echo "Hosts file updated."

echo "All necessary tools are installed and ready to use."

