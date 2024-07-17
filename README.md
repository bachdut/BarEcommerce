# Application Setup Guide, And Structure workflow:

This guide will walk you through the process of setting up and running the application on a local Machine. Please follow the steps carefully to ensure a smooth setup.

## Prerequisites

Before you begin, ensure you have the following installed on your MacBook:

- Docker Desktop: Install from [Docker's official site](https://docs.docker.com/desktop/install/mac-install/). Choose the version appropriate for your silicon (Apple or Intel).
- Homebrew: The setup script will install Homebrew if it's not already installed, but you can manually install it by following the instructions on the [Homebrew website](https://brew.sh/).

## Setup Instructions

1. **Clone the Repository**:
   Open a terminal and run the following commands to clone the repository and navigate into the project directory:
   ```sh
   git clone https://github.com/bachdut/BarHA.git
   cd BarHA


2. **Run the Setup Script**:
   setup_environment.sh script will install necessary tools, homebrew and kubectl if they are not already installed. Make the script executable and run it:
   ```sh
   chmod +x setup_environment.sh
   ./setup_environment.sh
   ```

3. **Enable Kubernetes in Docker Desktop**

	Ensure Kubernetes is enabled in Docker Desktop:

	•	Go to Docker Desktop settings

	•	Select “Kubernetes” from the left-hand menu

	•	Check “Enable Kubernetes”

	•	Apply and restart Docker if necessary




4. **Build and Run the Application**:
   To build and run the application, use the following command:
   ```sh
   chmod +x deploy_application.sh
   bash ./deploy_application.sh
   ```

5. **Run Port Forwarding to access the service locally**:
   In order to expose the app locally, run those commands in 3 different terminals:
   ```sh
   kubectl port-forward service/customer-management-api 8081:3000
   kubectl port-forward service/customer-facing-web-server 8080:3000
   kubectl port-forward service/customer-ui 8082:80
   ```
	
   Or you can use the script port_forwarder.sh:
   ```sh
   chmod +x ./port_forwarder.sh
   ./port_forwarder.sh

5. **Access the Application**:
   Once the application is up and running, you can access it in your web browser at:

    `http://localhost:8082/`.

7. **Run Tests**:
   To run the tests for the application, use the following command:

   you can set a custom buy details for the application: 

   name: Messi,  user id: 4, price: 3000, timestamp: 2024-07-15T10:00:00Z

   And then click on **Buy**.

   After that, you can click on the **Get All User Buys** in order to see the purchase history.

8. **Shutting down the app**:
   Run those commands:
   ```sh
   chmod +x shutdown_application.sh
   bash ./shutdown_application.sh


9. **App Structure Workflow**:
    ![diagram (1)](https://github.com/user-attachments/assets/aa9e1f63-8bf2-4edb-88a1-642d00b40a6a)

10. **Microservices Diagram**:

    ![9b1172f7-181d-49e1-b56c-53f6ec9e3038](https://github.com/user-attachments/assets/cf27ffda-122d-45e5-bb95-7d22c60f031f)



	


**Have fun, Bar.**
