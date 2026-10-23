---
title: "¿Dónde instalo Home Assistant? Raspberry, mini PC, Proxmox o Docker"
date: 2026-10-16
categories: [domotica]
tags: [homeassistant, proxmox, docker, hardware, homelab, domotica]
excerpt: "De la Raspberry Pi al thin client y a Proxmox: qué hardware y qué forma de instalación elegir para Home Assistant según lo que quieras hacer."
toc: true
toc_sticky: true
header:
  overlay_color: "#1f2933"
  overlay_filter: 0.5
---

Es la primera pregunta de cualquiera que empieza con Home Assistant, y también la que más vueltas da después: *¿en qué lo instalo?*

Yo empecé, como mucha gente, con una **Raspberry Pi 3 B**. A los seis meses cada actualización era un suplicio, así que lo pasé a un **HP T630**, un *thin client* de segunda mano con 8 GB de RAM y SSD (lo conté en la [serie Solar Home](/home-lab/home-assistant/)). Este post amplía esa decisión con lo que se discute en el grupo de Telegram **Un Loco y su Tecnología**, que tiene canales enteros dedicados a Proxmox y Docker.

---

## 🧭 1. Primero: las formas de instalar Home Assistant

| Forma | Qué es | Complementos | Para quién |
| :--- | :--- | :--- | :--- |
| **Home Assistant OS** (en el hardware directamente) | Sistema operativo completo de HA | ✅ Sí | La mayoría. Lo más sencillo |
| **Home Assistant OS en máquina virtual** (Proxmox) | Lo mismo, pero dentro de una VM | ✅ Sí | Quien quiere más servicios en la misma máquina |
| **Home Assistant Container** (Docker) | Solo el núcleo de HA en un contenedor | ❌ No | Quien ya domina Docker y quiere control total |

La gran diferencia está en los **complementos** (Mosquitto, Zigbee2MQTT, ESPHome, el addon de Kellerza…): con **Home Assistant OS** se instalan desde la tienda con dos clics y se actualizan solos. Con la versión **Container** tienes que montarlos tú, cada uno en su contenedor.

**Mi recomendación para empezar: Home Assistant OS.** Ya habrá tiempo de complicarse.

---

## 💻 2. El hardware

### Raspberry Pi
Sigue siendo la puerta de entrada, pero con matices:
* **Pi 3:** se queda corta en cuanto el sistema crece. Mi experiencia: actualizaciones eternas y complementos que no cabían.
* **Pi 4 / Pi 5:** dan para una instalación normal, **siempre con SSD**. La tarjeta SD es la causa número uno de instalaciones corruptas: Home Assistant escribe constantemente en su base de datos y las SD no aguantan.

Precio real de una Pi 5 con fuente, caja y SSD: no es mucho más barata que un mini PC.

### Thin clients de segunda mano
La opción "tapada": equipos de empresa como el **HP T630/T620**, Dell Wyse o Fujitsu Futro, que se encuentran por 50–100 € en el mercado de segunda mano. Son x86, silenciosos o sin ventilador, consumen poco y aceptan SSD y más RAM.

El mío lleva desde diciembre moviendo Home Assistant, el addon del inversor, el del BMS y el resto sin inmutarse.

### Mini PC con Intel N100 / N150
Es **la opción más recomendada en el grupo** desde 2024: mini PCs con Intel N100, N97 o N150, 16 GB de RAM y SSD NVMe, por unos 150–250 €. Consumen unos pocos vatios en reposo y tienen potencia de sobra para HA **y** para varios servicios más. Si vas a usar **Proxmox** o **Frigate** (cámaras con detección de objetos), apunta aquí.

Un aviso del grupo: los mini PCs más baratos de gama inferior (Celeron N4100, J5005) "valen para HA solo, pero son juguetes" en cuanto empiezas a meter más cosas.

---

## 🧱 3. ¿Proxmox sí o no?

**Proxmox VE** es un sistema de virtualización gratuito: instalas Proxmox en la máquina y dentro creas máquinas virtuales (VM) y contenedores ligeros (LXC). Es el tema estrella del canal de Proxmox del grupo.

### A favor
* **Varios servicios en una máquina:** HA en una VM y, al lado, AdGuard Home, un gestor de contraseñas, Frigate, un servidor de backups… cada uno aislado.
* **Copias de seguridad de la máquina entera**, con **Proxmox Backup Server (PBS)** en un LXC o en un NAS.
* **Snapshots:** antes de una actualización arriesgada, haces una instantánea y, si algo sale mal, vuelves atrás en segundos.

### En contra
* **Una capa más que aprender y mantener.** En el grupo abundan los mensajes del tipo *"me lo he cargado varias veces por novato"*.
* **Hardware USB** (dongles Zigbee, adaptadores RS485) que hay que **pasar a la VM** (*passthrough*). Funciona, pero es otra cosa que configurar y que puede romperse al reiniciar. Por eso tantos acaban con coordinadores Zigbee **por red**.
* **Backups en modo stop:** apagan la VM de HA cada noche. Usa el modo *snapshot*.

### Mi regla
* **Solo vas a correr Home Assistant:** Home Assistant OS **directamente en el hardware**. Es lo que yo tengo en el T630.
* **Quieres un homelab** (DNS, VPN, NAS, cámaras…): **Proxmox** con HA en una VM, en un mini PC N100 o mejor.

Los **scripts de la comunidad** para Proxmox (*community-scripts*, antes conocidos como los de *tteck*) facilitan muchísimo crear la VM de HA y los LXC más habituales. Son muy populares en el grupo, pero lee lo que hace cada script antes de ejecutarlo en tu servidor.

---

## 🐳 4. ¿Y Docker?

Docker aparece mucho en el grupo, sobre todo para **servicios al lado de HA** (AdGuard, Pi-hole, Nginx Proxy Manager…) dentro de un LXC o en un NAS. Para el propio Home Assistant, **la versión Container solo compensa si ya vives en Docker**: pierdes la tienda de complementos y la gestión de backups integrada.

---

## 🔁 5. Migrar es fácil (si tienes backup)

Lo mejor que hice al cambiar de la Pi al T630 fue confiar en las **copias de seguridad de Home Assistant**: instalas HA en el equipo nuevo, en el asistente inicial eliges **restaurar desde copia**, y en unos minutos tienes todo, histórico incluido.

Dos cosas a tener en cuenta:
* Los **dispositivos USB** cambian de ruta. Usa siempre rutas `/dev/serial/by-id/...` en la configuración.
* Guarda copias **fuera** de la máquina: en un NAS, en la nube (Nabu Casa, Google Drive con un complemento…) o al menos en otro disco.

---

## ✅ Resumen

| Situación | Recomendación |
| :--- | :--- |
| Empiezo y quiero gastar poco | Thin client de segunda mano + HA OS |
| Quiero algo nuevo y con margen | Mini PC N100/N150 + HA OS |
| Quiero un homelab con varios servicios | Mini PC N100 o superior + Proxmox + HA OS en VM |
| Ya tengo una Pi 4/5 | Úsala, pero **con SSD** |
| Domino Docker y no quiero complementos | HA Container |

La mejor máquina para Home Assistant es la que **no te da problemas en las actualizaciones** y de la que tienes **backup fuera**. El resto es afinar.

*Gracias a la comunidad del grupo de Telegram **Un Loco y su Tecnología**, especialmente a sus canales de Proxmox y Docker.*
