---
title: Helm Deployment
---

import GatewayBasePathConfig from './common/_gateway-base-path.md'

Helm is a package manager for Kubernetes that simplifies the deployment, configuration, and management of Kubernetes applications. This guide introduces how to deploy the TDengine IDMP service on Kubernetes using a Helm Chart.

## Prerequisites

1. Install Kubernetes v1.24 or later.
1. Install Helm 3.
1. (Optional) To persist data, configure a PersistentVolume.

## Install Helm

Run the following command to install Helm:

```bash
curl -fsSL -o get_helm.sh \
    https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
chmod +x get_helm.sh
./get_helm.sh
```

## Obtain the TDengine IDMP Helm chart

```bash
git clone https://github.com/taosdata/tdengine-idmp-deployment.git
cd tdengine-idmp-deployment/helm
```

## Install TDengine IDMP

:::info

- To install TDengine TSDB-Enterprise, refer to the following document: [Deploy TDengine with Helm](https://docs.tdengine.com/operations-and-maintenance/deploy-your-cluster/kubernetes-deployment/#deploy-tdengine-with-helm)
- <GatewayBasePathConfig />

:::

1. Install TDengine IDMP with the Helm chart:

   ```bash
   cd tdengine-idmp-deployment/helm
   helm install tdengine-idmp .
   ```

   To use custom settings, you can specify a values file:

   ```bash
   helm install tdengine-idmp . -f my-values.yaml
   ```

   or command-line parameters:

   ```bash
   helm install tdengine-idmp . --set key=value
   ```

The Helm parameters used to deploy TDengine IDMP are described as follows: You can set these parameters on the command line or in a values file.

| Parameter                      | Description                                       | Default                  |
|--------------------------|-------------------------------------------|------------------------|
| `replicaCount`           | Number of replicas                                   | `1`                    |
| `image.repository`       | Image repository                                   | `tdengine/idmp-ee` |
| `image.tag`              | Image tag                                   | `latest`               |
| `image.pullPolicy`       | Image pull policy                               | `IfNotPresent`         |
| `service.type`           | Kubernetes service type                        | `ClusterIP`            |
| `service.port`           | Service port                                   | `6042`                 |
| `resources`              | Resource requests and limits                             | `{}`                   |
| `persistence.enabled`    | Whether persistence is enabled                             | `false`                |
| `persistence.size`       | Size of persistent volume                                 | `2Gi`                  |
| `persistence.storageClass`| Persistent volume class                            | `""`                   |
| `nodeSelector`           | Node selector for pod allocation                       | `{}`                   |
| `tolerations`            | Tolerance for pod allocation                         | `[]`                   |
| `affinity`               | Affinity for pod allocation                      | `{}`                   |

1. Access the service

   - **ClusterIP (Default):**
   Forward the port as follows:

   ```bash
   kubectl port-forward svc/tdengine-idmp 6042:6042 --address 0.0.0.0
   ```

   Then access `localhost:6042` in a web browser.

   - **NodePort:**
     1. Obtain the node port and IP:

        ```bash
        kubectl get svc tdengine-idmp
        kubectl get nodes -o wide
        ```

     2. Access `https://<ip>:<nodeport>` in a browser.

   - **LoadBalancer:**
     Access the service through the external IP address provided by your cloud service provider.

1. To configure persistent storage, add the following configuration to `values.yml`:

   ```yaml
   persistence:
     enabled: true
     size: 2Gi
   ```

   Ensure that you have configured a PersistentVolume.

1. Run the following command to uninstall TDengine IDMP:

   ```bash
   helm uninstall tdengine-idmp
   ```
