---
title: Helm Deployment
sidebar_label: Helm Deployment
---

# 14.3.4 Helm Deployment

import GatewayBasePathConfig from './common/_gateway-base-path.md'

Helm is a package manager for Kubernetes that simplifies the deployment, configuration, and management of Kubernetes applications. This guide introduces how to deploy the TDengine IDMP service on Kubernetes using a Helm Chart.

## 14.3.4.1 Prerequisites

The following components must be in place before deploying TDengine IDMP with the Helm chart.

1. Install Kubernetes v1.24 or later.
1. Install Helm 3.
1. (Optional) To persist data, configure a PersistentVolume.

## 14.3.4.2 Install Helm

Run the following command to install Helm:

```bash
curl -fsSL -o get_helm.sh \
    https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
chmod +x get_helm.sh
./get_helm.sh
```

## 14.3.4.3 Obtain the TDengine IDMP Helm chart

```bash
git clone https://github.com/taosdata/tdengine-idmp-deployment.git
cd tdengine-idmp-deployment/helm
```

## 14.3.4.4 Install TDengine IDMP

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

<table>
<colgroup><col style="width:16em"/><col/><col/></colgroup>
<thead><tr><th>Parameter</th><th>Description</th><th>Default</th></tr></thead>
<tbody>
<tr><td><code>replicaCount</code></td><td>Number of replicas</td><td><code>1</code></td></tr>
<tr><td><code>image.repository</code></td><td>Image repository</td><td><code>tdengine/idmp-ee</code></td></tr>
<tr><td><code>image.tag</code></td><td>Image tag</td><td><code>latest</code></td></tr>
<tr><td><code>image.pullPolicy</code></td><td>Image pull policy</td><td><code>IfNotPresent</code></td></tr>
<tr><td><code>service.type</code></td><td>Kubernetes service type</td><td><code>ClusterIP</code></td></tr>
<tr><td><code>service.port</code></td><td>Service port</td><td><code>6042</code></td></tr>
<tr><td><code>resources</code></td><td>Resource requests and limits</td><td><code>{}</code></td></tr>
<tr><td><code>persistence.enabled</code></td><td>Whether persistence is enabled</td><td><code>false</code></td></tr>
<tr><td><code>persistence.size</code></td><td>Size of persistent volume</td><td><code>2Gi</code></td></tr>
<tr><td><code>persistence.storageClass</code></td><td>Persistent volume class</td><td><code>""</code></td></tr>
<tr><td><code>nodeSelector</code></td><td>Node selector for pod allocation</td><td><code>{}</code></td></tr>
<tr><td><code>tolerations</code></td><td>Tolerance for pod allocation</td><td><code>[]</code></td></tr>
<tr><td><code>affinity</code></td><td>Affinity for pod allocation</td><td><code>{}</code></td></tr>
</tbody>
</table>

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
