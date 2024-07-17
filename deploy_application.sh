#!/bin/bash

# Function to wait until all pods are running
wait_for_pods() {
  echo "Waiting for all pods to be in Running status and Ready condition..."
  while true; do
    not_ready_pods=$(kubectl get pods -o jsonpath='{range .items[*]}{.metadata.name} {.status.phase} {.status.containerStatuses[0].ready}{"\n"}{end}' | grep -v 'Running true')
    if [ -z "$not_ready_pods" ]; then
      echo "All pods are running and ready."
      echo "Application deployed successfully."
      echo "You can start the port forwarding now..."
      break
    else
      echo "The following pods are not yet running or not ready:"
      echo "$not_ready_pods"
      echo "Waiting for 10 seconds before checking again..."
      sleep 10
    fi
  done
}

# Deploy MongoDB
kubectl apply -f mongodb/mongodb-deployment.yaml
kubectl apply -f mongodb/mongodb-service.yaml

# Deploy Kafka
kubectl apply -f kafka/kafka-deployment.yaml
kubectl apply -f kafka/kafka-service.yaml

sleep 3

# Deploy Zookeeper
kubectl apply -f kafka/zookeeper-deployment.yaml
kubectl apply -f kafka/zookeeper-service.yaml

# Deploy Metrics Server
kubectl apply -f metrics-server/metrics-server-deployment.yaml
kubectl apply -f metrics-server/metrics-server-service.yaml

# Deploy Customer UI
kubectl apply -f customer-ui/customer-ui-deployment.yaml
kubectl apply -f customer-ui/customer-ui-service.yaml
kubectl apply -f autoscaling/customer-ui-hpa.yaml

# Deploy Customer Facing Web Server
kubectl apply -f customer-facing-web-server/customer-facing-web-server-deployment.yaml
kubectl apply -f customer-facing-web-server/customer-facing-web-server-service.yaml
kubectl apply -f autoscaling/customer-facing-web-server-hpa.yaml

# Deploy Customer Management API
kubectl apply -f customer-management-api/customer-management-api-deployment.yaml
kubectl apply -f customer-management-api/customer-management-api-service.yaml
kubectl apply -f autoscaling/customer-management-api-hpa.yaml

# Deploy API Gateway
kubectl apply -f api-gateway/apigateway-config-map.yaml
kubectl apply -f api-gateway/api-gateway-deployment.yaml
kubectl apply -f api-gateway/api-gateway-service.yaml

wait_for_pods
