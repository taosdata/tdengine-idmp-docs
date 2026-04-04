---
title: 使用 Helm 部署
sidebar_label: 使用 Helm 部署
---

import GatewayBasePathConfig from './common/_gateway-base-path.md'

# 14.3.4 使用 Helm 部署

Helm 是 Kubernetes 的包管理工具，用于简化 Kubernetes 应用程序的部署、配置和管理。本指南介绍如何在 Kubernetes 上通过 Helm Chart 部署 TDengine IDMP 服务。

## 14.3.4.1 前置条件

使用 Helm 在 Kubernetes 上部署 TDengine IDMP 前，请确认集群环境已满足以下版本和配置要求。

1. 本文适用 Kubernetes v1.24 以上版本
1. 已安装 Helm 3
1. （可选）如需启用持久化存储，需配置 PersistentVolume 供应器

## 14.3.4.2 安装 Helm

如未安装 Helm，可执行以下命令安装：

```bash
curl -fsSL -o get_helm.sh \
    https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
chmod +x get_helm.sh
./get_helm.sh
```

## 14.3.4.3 获取 TDengine IDMP Chart

```bash
git clone https://github.com/taosdata/tdengine-idmp-deployment.git
cd tdengine-idmp-deployment/helm
```

## 14.3.4.4 部署 TDengine IDMP 服务

:::info

- 如需部署 TDengine TSDB-Enterprise 服务，请参考官方文档：[使用 Helm 部署 TDengine 集群](https://docs.taosdata.com/operation/deployment/#%E4%BD%BF%E7%94%A8-helm-%E9%83%A8%E7%BD%B2-tdengine-%E9%9B%86%E7%BE%A4)。
- <GatewayBasePathConfig />

:::

### 1. 使用默认配置安装

```bash
cd tdengine-idmp-deployment/helm
helm install tdengine-idmp .
```

### 2. 自定义参数安装

如需自定义参数，可通过自定义 values 文件后安装：

```bash
helm install tdengine-idmp . -f my-values.yaml
```

或通过命令行覆盖参数：

```bash
helm install tdengine-idmp . --set key=value
```

下表列出了部署 TDengine IDMP 时常用的 Helm 参数。您可以通过 `--set key=value` 或编辑 `values.yaml` 文件进行自定义。

<table>
<colgroup><col style="width:16em"/><col/><col/></colgroup>
<thead><tr><th>参数</th><th>描述</th><th>默认值</th></tr></thead>
<tbody>
<tr><td><code>replicaCount</code></td><td>副本数量</td><td><code>1</code></td></tr>
<tr><td><code>image.repository</code></td><td>镜像仓库</td><td><code>tdengine/idmp-ee</code></td></tr>
<tr><td><code>image.tag</code></td><td>镜像标签</td><td><code>latest</code></td></tr>
<tr><td><code>image.pullPolicy</code></td><td>镜像拉取策略</td><td><code>IfNotPresent</code></td></tr>
<tr><td><code>service.type</code></td><td>Kubernetes 服务类型</td><td><code>ClusterIP</code></td></tr>
<tr><td><code>service.port</code></td><td>服务端口</td><td><code>6042</code></td></tr>
<tr><td><code>resources</code></td><td>资源请求和限制</td><td><code>{}</code></td></tr>
<tr><td><code>persistence.enabled</code></td><td>启用持久化存储</td><td><code>false</code></td></tr>
<tr><td><code>persistence.size</code></td><td>持久卷大小</td><td><code>2Gi</code></td></tr>
<tr><td><code>persistence.storageClass</code></td><td>持久卷的存储类</td><td><code>""</code></td></tr>
<tr><td><code>nodeSelector</code></td><td>Pod 分配的节点选择器</td><td><code>{}</code></td></tr>
<tr><td><code>tolerations</code></td><td>Pod 分配的容忍设置</td><td><code>[]</code></td></tr>
<tr><td><code>affinity</code></td><td>Pod 分配的亲和性规则</td><td><code>{}</code></td></tr>
</tbody>
</table>

### 3. 访问服务

- **ClusterIP（默认）：**
  使用端口转发访问：

  ```bash
  kubectl port-forward svc/tdengine-idmp 6042:6042 --address 0.0.0.0
  ```

  然后访问 [http://localhost:6042](http://localhost:6042)。

- **NodePort：**
  1. 获取 NodePort 和节点 IP：

     ```bash
     kubectl get svc tdengine-idmp
     kubectl get nodes -o wide
     ```

  2. 通过 `http://<节点IP>:<NodePort>` 访问服务。

- **LoadBalancer：**
  通过云服务商分配的外部 IP 访问。

### 4. 持久化存储

如需启用持久化，在 `values.yaml` 中设置：

```yaml
persistence:
  enabled: true
  size: 2Gi
```

确保集群已配置 PersistentVolume 供应。

### 5. 卸载与清理

如需删除所有资源，执行：

```bash
helm uninstall tdengine-idmp
```
