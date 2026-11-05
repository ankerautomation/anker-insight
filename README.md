<img src="client/src/assets/images/logo.svg" alt="Anker Insight logo" width="96" />

# Anker Insight

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-22%20LTS-green)](https://nodejs.org/)

Anker Insight is a **web-based SCADA / HMI platform** for industrial automation, IoT and real-time process visualization from Anker Automation.

Build dashboards, connect industrial devices and monitor machines using standard industrial protocols such as **Modbus, OPC-UA, MQTT and Siemens S7**.

## Features

- **Industrial protocol support:** Modbus RTU/TCP, Siemens S7, OPC-UA, BACnet IP, MQTT, Ethernet/IP (Allen Bradley), ODBC, ADSclient, Gpio (Raspberry), WebCam, MELSEC, Redis, SNMP
- **Data storage:** built-in data historian (DAQ) with support for SQLite, InfluxDB and other time-series databases, plus external integrations via ODBC and Redis
- **Web-based editor:** engineering and design completely in the browser
- **Cross-platform:** Node.js backend and Angular frontend, running on Linux, Windows, macOS, Docker and Raspberry Pi

## Installing and running

### Docker

```
docker compose up -d --build
```

Application data is stored in `./appdata`, `./db`, `./logs` and `./images`. Open http://localhost:1881 in a browser.

### From source

You need [Node.js](https://nodejs.org/en/about/previous-releases) 22 LTS.

```
cd ./server
npm install
npm start
```

Open http://localhost:1881 in a browser.

**Note:** on Linux (especially Raspberry Pi), native dependencies may need additional build tools. You can remove `node-snap7` from `server/package.json` if you do not need Siemens S7 communication, and `odbc` if you do not need external database connectivity.

## Building

Build the frontend for production:

```
cd ./client
npm install
npm run build -- --configuration=production
```

Build the desktop application with Electron after building the server and client:

```
cd ./app
npm install
npm run package
```

## Documentation

The documentation source is in the [`docs`](docs) directory and is built with MkDocs (Material theme).

## License and attribution

Anker Insight is based on [FUXA](https://github.com/frangoteam/FUXA) by frangoteam and is distributed under the [MIT License](LICENSE). The original copyright notice is retained in the `LICENSE` file.

Some internal names still use `fuxa`, such as `.fuxap` project files and the Node-RED node types, so that projects and flows made with FUXA keep working.
