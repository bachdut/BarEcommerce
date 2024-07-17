#!/bin/bash

check_pods_deleted() {
  echo "Checking if all pods are deleted..."
  while true; do
    pod_count=$(kubectl get pods --no-headers | wc -l)
    if [ "$pod_count" -eq 0 ]; then
      echo "All pods deleted successfully."
      break
    else
      echo "Waiting for pods to be deleted..."
      sleep 5
    fi
  done
}

# Delete Customer Management API
kubectl delete -f autoscaling/customer-management-api-hpa.yaml
kubectl delete -f customer-management-api/customer-management-api-service.yaml
kubectl delete -f customer-management-api/customer-management-api-deployment.yaml

# Delete Customer Facing Web Server
kubectl delete -f autoscaling/customer-facing-web-server-hpa.yaml
kubectl delete -f customer-facing-web-server/customer-facing-web-server-service.yaml
kubectl delete -f customer-facing-web-server/customer-facing-web-server-deployment.yaml

# Delete Customer UI
kubectl delete -f autoscaling/customer-ui-hpa.yaml
kubectl delete -f customer-ui/customer-ui-service.yaml
kubectl delete -f customer-ui/customer-ui-deployment.yaml

# Delete Metrics Server
kubectl delete -f metrics-server/metrics-server-service.yaml
kubectl delete -f metrics-server/metrics-server-deployment.yaml

# Delete Zookeeper
kubectl delete -f kafka/zookeeper-service.yaml
kubectl delete -f kafka/zookeeper-deployment.yaml

# Delete Kafka
kubectl delete -f kafka/kafka-service.yaml
kubectl delete -f kafka/kafka-deployment.yaml

# Delete MongoDB
kubectl delete -f mongodb/mongodb-service.yaml
kubectl delete -f mongodb/mongodb-deployment.yaml

# Deploy API Gateway
kubectl delete -f api-gateway/apigateway-config-map.yaml
kubectl delete -f api-gateway/api-gateway-deployment.yaml
kubectl delete -f api-gateway/api-gateway-service.yaml

check_pods_deleted