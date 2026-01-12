import GatewayBasePathConfig from './common/_gateway-base-path.md'

# 使用 Helm 部署

Helm 是 Kubernetes 的包管理工具，用于简化 Kubernetes 应用程序的部署、配置和管理。本指南介如何在 Kubernetes 上通过 Helm Chart 部署 TDengine IDMP 服务。

## 前置条件

1. 本文适用 Kubernetes v1.24 以上版本
1. 已安装 Helm 3
1. （可选）如需启用持久化存储，需配置 PersistentVolume 供应器

## 安装 Helm

如未安装 Helm，可执行以下命令安装：

```bash
curl -fsSL -o get_helm.sh \
    https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
chmod +x get_helm.sh
./get_helm.sh
```

## 获取 TDengine IDMP Chart

```bash
git clone https://github.com/taosdata/tdengine-idmp-deployment.git
cd tdengine-idmp-deployment/helm
```

## 部署 TDengine IDMP 服务

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

| 参数                      | 描述                                       | 默认值                  |
|--------------------------|-------------------------------------------|------------------------|
| `replicaCount`           | 副本数量                                   | `1`                    |
| `image.repository`       | 镜像仓库                                   | `tdengine/idmp-ee` |
| `image.tag`              | 镜像标签                                   | `latest`               |
| `image.pullPolicy`       | 镜像拉取策略                               | `IfNotPresent`         |
| `service.type`           | Kubernetes 服务类型                        | `ClusterIP`            |
| `service.port`           | 服务端口                                   | `6042`                 |
| `resources`              | 资源请求和限制                             | `{}`                   |
| `persistence.enabled`    | 启用持久化存储                             | `false`                |
| `persistence.size`       | 持久卷大小                                 | `2Gi`                  |
| `persistence.storageClass`| 持久卷的存储类                            | `""`                   |
| `nodeSelector`           | Pod 分配的节点选择器                       | `{}`                   |
| `tolerations`            | Pod 分配的容忍设置                         | `[]`                   |
| `affinity`               | Pod 分配的亲和性规则                       | `{}`                   |

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
