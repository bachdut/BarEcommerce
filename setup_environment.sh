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

# Install kubectl if not installed
if ! command_exists kubectl; then
  echo "kubectl not found. Installing kubectl..."
  brew install kubectl
else
  echo "kubectl is already installed."
fi


echo "All necessary tools are installed and ready to use."

