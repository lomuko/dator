---
title: "Zigbee en Home Assistant: coordinador, ZHA o Zigbee2MQTT y cómo tener una red estable"
date: 2026-10-09
categories: [domotica]
tags: [homeassistant, zigbee, zigbee2mqtt, zha, domotica]
excerpt: "Qué coordinador comprar, ZHA o Zigbee2MQTT, y los cinco errores que tiran abajo una red Zigbee, sacados de miles de mensajes de un grupo de Home Assistant."
toc: true
toc_sticky: true
header:
  overlay_color: "#1f2933"
  overlay_filter: 0.5
---

Zigbee es la forma más barata y fiable de llenar una casa de sensores e interruptores sin depender de la nube. También es, con diferencia, la que más dolores de cabeza da al principio.

Este post nace de leer el canal de Zigbee del grupo de Telegram **Un Loco y su Tecnología**: más de 36.000 mensajes de gente montando, rompiendo y arreglando redes Zigbee con Home Assistant. Los problemas se repiten tanto que se pueden resumir en unas pocas reglas.

---

## 📡 1. Lo mínimo que hay que entender

Zigbee es una **red en malla** (*mesh*) de baja potencia en la banda de 2,4 GHz, y tiene tres tipos de dispositivos:

| Rol | Qué es | Ejemplos |
| :--- | :--- | :--- |
| **Coordinador** | El cerebro. Uno por red, conectado a Home Assistant | Un dongle USB o un coordinador de red |
| **Router** | Cualquier dispositivo **enchufado a la corriente**. Repite la señal y amplía la malla | Enchufes, interruptores con neutro, bombillas |
| **End device** | Dispositivos **a pilas**. Duermen casi todo el tiempo y no repiten | Sensores de puerta, temperatura, botones |

La consecuencia práctica: **una red con solo sensores a pilas no es una malla**, es una estrella con el coordinador en el centro. Si el coordinador no llega, no hay nada que hacer. Los routers son los que hacen que Zigbee funcione bien.

---

## 🧩 2. El coordinador: USB o red

Es la pieza más importante, y la evolución en el grupo es clara: hace unos años dominaban el **ConBee** y los **dongles de Sonoff**; desde 2024, los coordinadores **SMLIGHT SLZB** (sobre todo el SLZB-06) son los más recomendados.

### USB
* **Sonoff ZBDongle-P** (chip TI CC2652P, driver `zstack`) y **ZBDongle-E** (chip Silicon Labs EFR32, driver `ember`). Baratos y probados.
* **Home Assistant Connect ZBT-1** (antes SkyConnect), el oficial de Nabu Casa.

**Truco que se repite cien veces en el grupo:** conéctalo siempre con un **alargador USB de 1 m**, nunca directamente al ordenador. Los puertos **USB 3** y los discos SSD generan interferencias en 2,4 GHz que destrozan la señal. Alejar el dongle un metro arregla muchos problemas "misteriosos".

### Por red (Ethernet / PoE)
* **SMLIGHT SLZB-06** y familia. Se conecta al switch por cable (y se alimenta por PoE si quieres).

Ventajas: puedes poner el coordinador **en el centro de la casa** en vez de donde esté el servidor, sin USB ni interferencias, y si migras el servidor (o usas Proxmox) no hay que pelearse con pasar el USB a la máquina virtual.

> ⚠️ **Un coordinador, un cliente.** Si tienes ZHA y Zigbee2MQTT intentando conectarse al mismo coordinador de red, verás errores como `ECONNRESET` o "Client limit has been reached". Solo uno de los dos puede usarlo.

---

## ⚔️ 3. ZHA o Zigbee2MQTT

| | **ZHA** | **Zigbee2MQTT (Z2M)** |
| :--- | :--- | :--- |
| Instalación | Integración nativa de HA, dos clics | Complemento + broker MQTT (Mosquitto) |
| Dispositivos soportados | Muy amplio | **El más amplio**, sobre todo en Tuya y marcas raras |
| Configuración por dispositivo | Básica | Muy detallada (sensibilidad, calibración, comportamiento al encenderse…) |
| Interfaz | Dentro de HA | Interfaz web propia con mapa de red, logs y OTA |
| Independencia | Ligado a HA | Funciona aunque HA esté caído; cualquier sistema puede leer MQTT |

En el grupo, **Zigbee2MQTT es la opción mayoritaria** (se menciona unas cuatro veces más que ZHA), sobre todo porque cuando compras un dispositivo Tuya genérico en AliExpress, lo normal es que Z2M ya lo soporte o que alguien haya escrito un *converter*.

Mi recomendación:
* **Empiezas y tienes pocos dispositivos de marcas conocidas** (IKEA, Aqara, Philips): ZHA. Menos piezas.
* **Vas a crecer o compras dispositivos Tuya:** Zigbee2MQTT desde el principio. Migrar luego obliga a re-emparejar todo.

---

## 🛠️ 4. Las cinco causas de una red inestable

Lo que más se repite en el grupo cuando alguien escribe *"mi red Zigbee se cae y ya no sé qué hacer"*:

### 1. Interferencias con el WiFi
Zigbee y WiFi comparten 2,4 GHz. Los canales Zigbee **15, 20 y 25** son los que menos se pisan con los canales WiFi más usados (1, 6 y 11). Mira en qué canal está tu WiFi y elige el Zigbee lejos de él.

**Cambiar de canal obliga a re-emparejar muchos dispositivos**, así que decídelo bien al principio.

### 2. Pocos routers (o routers malos)
Pon routers repartidos por la casa: un enchufe Zigbee en cada zona suele bastar. Y ojo, **no todos los routers son buenos**: algunos dispositivos Tuya baratos enrutan mal y "secuestran" a los sensores. Si un sensor se cae siempre, mira en el mapa de red de Z2M por qué router pasa.

### 3. USB sin alargador
Ya está dicho, pero es el error número uno.

### 4. Firmware y driver desactualizados
Coordinadores con firmware viejo o drivers que cambian (los chips de Silicon Labs pasaron del driver `ezsp` al nuevo `ember`) provocan arranques fallidos. Mantén el firmware del coordinador al día y usa el driver que recomienda la documentación de Z2M para tu chip.

### 5. Backups de Proxmox que paran la máquina
Un caso curioso: copias nocturnas de Proxmox en modo *stop* que apagan la máquina virtual de HA, y al volver Z2M no reconecta con el coordinador de red. Usa backups en modo *snapshot*, o reinicia Z2M después de la copia con una automatización.

---

## 💾 5. Haz copia de seguridad del coordinador

La red Zigbee vive **en el coordinador** (claves, direcciones de red) y en la base de datos de Z2M. Si cambias de coordinador sin migrarla, **tendrás que re-emparejar todos los dispositivos**, uno a uno, subiéndote a una escalera para pulsar el botón del sensor del techo.

En Zigbee2MQTT, guarda estos ficheros de la carpeta de datos:
* `coordinator_backup.json`
* `database.db`
* `configuration.yaml`

Con ellos se puede **migrar a un coordinador nuevo** del mismo tipo de chip sin re-emparejar, manteniendo la misma dirección IEEE. Los backups completos de Home Assistant ya incluyen esta carpeta si Z2M es un complemento, pero tenerlos aparte no cuesta nada.

---

## ✅ Resumen

1. **Coordinador de red (tipo SLZB-06)** si puedes; si es USB, **siempre con alargador**.
2. **Zigbee2MQTT** si vas a crecer o compras Tuya.
3. **Canal Zigbee lejos de tu WiFi** (15, 20 o 25), elegido al principio.
4. **Routers repartidos**, de marcas fiables.
5. **Backup del coordinador** antes de tocar nada.

Con eso, la mayoría de las redes Zigbee pasan de "se cae cada dos días" a "me olvido de que existe", que es exactamente lo que tiene que pasar.

*Gracias a la comunidad del grupo de Telegram **Un Loco y su Tecnología**, de cuyo canal de Zigbee salen estos consejos.*
