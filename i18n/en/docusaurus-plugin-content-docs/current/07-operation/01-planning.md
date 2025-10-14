---
title: Planning Your Deployment
---

## Minimum Hardware Requirements

To ensure stable operation, installing TDengine IDMP requires at least the following hardware specifications:

- CPU: 2 cores
- Memory: 4 GB
- Disk: 10 GB of available space

## Supported Operating Systems

TDengine IDMP currently supports the following operating systems and architectures.

| Operating System | Version | x86-64 | arm64 |
|:---:|:---:|:---:|:---:|
| Ubuntu   | Ubuntu 20.04<br/>Ubuntu 22.04 | Yes | Yes |
| Debian   | Debian 10<br/>Debian 11<br/>Debian 12 | Yes | Yes |
| CentOS   | CentOS 8 | Yes | Yes |
| macOS 13 | macOS 13<br/>macOS 14<br/>macOS 15 | Yes | Yes |
| Windows  | n/a | No | No |

## Dependencies

The following dependencies are required to run TDengine IDMP:

1. Python 3.12
1. Java 21 or later    
1. glibc 2.25 or later
1. TDengine TSDB-Enterprise 3.3.7.0 or later
1. SMTP email service (required when Internet access is not available)

## Network Ports

TDengine IDMP uses the following default ports. Please ensure these ports are not occupied by other applications.

| Port | Protocol | Description |
|---|---|---|
| 6042 | HTTP | External Port: This port is used by the TDengine IDMP web interface and REST API for browser access and API communication. Please ensure that your firewall allows access to this port. |
| 6038 | HTTP | Internal Port: This port is used by the TDengine IDMP internal H2 database service for accessing the H2 database web console. |
| 6040 | HTTP | Internal Port: This port is used by the internal chat service API of TDengine IDMP for accessing the chat functionality. |
| 6039 | TCP  | Internal Port: Listening port for TDengine IDMP's internal H2 database service, used to access the internal H2 database. |

## Installation Directory

By default,TDengine IDMP is installed to the `/usr/local/taos/idmp` directory. This directory contains the following subdirectories.

| Subdirectory | Description |
|---|---|
| app        | softlink to standalone/app |
| backend    | backend service files |
| bin        | scripts to start and stop the service |
| chat       | chat service files |
| config      | TDengine IDMP configuration files |
| data       | data files (softlink to /var/lib/taos) |
| frontend   | frontend service files |
| lib        | backend service dependencies |
| logs       | log files (softlink to /var/log/taos) |
| quarkus    | backend service framework |
| service    | system service configuration files |
| standalone | frontend integrated service files |
