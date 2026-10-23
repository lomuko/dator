---
layout: single
title: "Solar Home-Lab VII: Deye y JK BMS en Home Assistant por cable (RS485)"
header:
  overlay_image: /assets/images/solar/solar3.jpg
  overlay_filter: 0.5
sidebar:
  nav: "home_lab_nav"
date: 2026-10-05
collection: porche-solar
tags: [homeassistant, rs485, modbus, deye, jk-bms, kellerza, mqtt, domotica]
excerpt: "Adiós al dongle WiFi y al Bluetooth: cómo conecto el inversor Deye y el JK BMS a Home Assistant con dos adaptadores USB-RS485 y cable de red."
toc: true
toc_sticky: true
slug: home-assistant-rs485
order: 7
---

En el [capítulo de Home Assistant](/home-lab/home-assistant/) conté *por qué* pasé del WiFi y el Bluetooth al cable. Este post es el *cómo*: qué compré, cómo hice los cables, qué addons uso y cómo los configuré.

Spoiler: son dos adaptadores USB de pocos euros, dos cables de red y dos addons. Lo difícil no es montarlo, es entender **quién manda en el bus RS485**. Eso es lo que más confunde en el grupo de Telegram **Solar Diy**, y es lo que intento dejar claro aquí.

<!-- 📷 FOTO: vista general — HP T630, los dos adaptadores USB-RS485 y los cables hacia el Deye y la batería -->

---

## 📡 1. El punto de partida: WiFi + Bluetooth

Mi primera versión era la que monta casi todo el mundo:

| Equipo | Conexión | Problema |
| :--- | :--- | :--- |
| **Deye** | Dongle WiFi (Solarman) | Datos cada varios minutos, pasando por la nube china |
| **JK BMS** | Bluetooth al servidor de HA | Desconexiones aleatorias, huecos en las gráficas y **pitidos del inversor** cada vez que se perdía la conexión |

Es la experiencia más repetida en el grupo: *"a mí se me desconectaba mucho el BT, por eso pasé a versiones cableadas RS485"*. El Bluetooth vale para echar un vistazo con el móvil, pero no para un sistema que tiene que funcionar 24/7.

---

## 🧰 2. Hardware

* **Servidor Home Assistant OS** (en mi caso un HP T630) **físicamente cerca** del inversor y la batería. RS485 aguanta tiradas largas, pero cuanto más corto, menos problemas.
* **2 adaptadores USB a RS485**, uno por equipo. Cada bus tiene su maestro, así que no los compartas (lo explico en la sección 3).
* **2 cables de red** a los que cortas un extremo.

### Qué adaptador comprar
Funcionan los de chip **CH340, FTDI o CP2102**, que en Linux aparecen como `/dev/ttyUSB0`. **Evita los que aparecen como `ttyACM0`**: el addon del JK los desaconseja expresamente.

Si puedes, coge uno que tenga **borne de GND** y protección (diodos TVS, fusible rearmable), como los de Waveshare. Los baratos de solo 2 hilos (A y B) suelen funcionar, pero son más sensibles al ruido.

### Las lucecitas del adaptador
Los adaptadores tienen dos LEDs, **TX** (envía) y **RX** (recibe), y son la mejor herramienta de diagnóstico que vas a tener. El addon del JK tiene una [animación que lo explica muy bien](https://raw.githubusercontent.com/jean-luc1203/jkbms-rs485-addon/main/images/Fonctionnement-LED-cable-rs485.gif). Resumen:

* **Parpadean TX y RX:** Home Assistant pregunta y el equipo contesta. Todo bien.
* **Solo parpadea TX:** HA pregunta pero nadie contesta. Revisa A/B invertidos, el puerto equivocado o la configuración del equipo.
* **No parpadea nada:** el addon no está usando ese adaptador. Revisa la ruta del puerto.

<!-- 📷 FOTO: primer plano del adaptador USB-RS485 con los LEDs encendidos -->

---

## 🧠 3. Lo que hay que entender: un maestro por bus

RS485 con Modbus funciona así: **en cada bus hay un único maestro** que pregunta, y todos los demás son **esclavos** que solo contestan cuando se les pregunta por su dirección.

Esto explica casi todos los "no me funciona":

* No puedes colgar dos maestros (por ejemplo Home Assistant y un cargador de coche V2C) en el mismo puerto RS485 del Deye.
* Si tienes varios JK en paralelo, el **JK maestro** ya está preguntando a los esclavos por su propio RS485. Si metes Home Assistant como otro maestro en ese bus, chocan.

Por eso uso **dos buses separados**, uno para el inversor y otro para la batería, cada uno con su adaptador.

---

## ⚡ 4. El inversor Deye con el addon de Kellerza

### Por qué Kellerza
Hay muchas opciones para leer un Deye: ESP32 con ESPHome, gateways Modbus-TCP, el dongle modificado… En el grupo la que más se recomienda es el **[addon de Kellerza](https://kellerza.github.io/sunsynk/)**, y es la que uso:

* Lee y **escribe**: puedes cambiar el modo de trabajo o los horarios de carga desde HA.
* Datos **cada segundo** si quieres.
* Tiene un **preprocesador**: decides por sensor cada cuánto se lee y cuándo se publica. Así no inundas la base de datos de HA con valores repetidos. Para mí este es su mayor valor añadido.
* Soporta Deye, Sunsynk y Turbo Energy (que son Deye con otra pegatina), monofásicos y trifásicos.

### El cable: un mismo RJ45 para la batería y para Home Assistant
Aquí está el detalle que más me costó entender. En mi Deye, la **batería y Home Assistant tienen que compartir el mismo conector**.

El Deye habla con el **JK BMS por CAN**. Por ese cable el inversor recibe en tiempo real todo lo que sabe el BMS: el SOC, la tensión, la corriente, los límites de carga y descarga… y así carga y descarga la batería con datos reales en vez de con estimaciones. Esa conexión **no se puede quitar**.

El problema es que el puerto de comunicaciones del Deye es un **RJ45 "2 en 1"**: dentro del mismo conector van, por pines distintos, el **CAN** de la batería y el **RS485** que necesita Home Assistant. Según la documentación de Kellerza, en ese puerto combinado:

| Pin RJ45 | Color (T568B) | Señal | Va a… |
| :---: | :--- | :--- | :--- |
| 1 | Blanco-naranja | RS485 **B−** | Adaptador USB-RS485 → Home Assistant |
| 2 | Naranja | RS485 **A+** | Adaptador USB-RS485 → Home Assistant |
| 3 | Blanco-verde | **GND** | Adaptador (si tiene borne de GND) |
| 4 | Azul | **CAN-H** | Batería (JK BMS) |
| 5 | Blanco-azul | **CAN-L** | Batería (JK BMS) |

La distribución puede variar según el modelo y el firmware, así que **compruébala en el manual de tu inversor** antes de cortar nada.

### Mi solución: un cable en Y
Como un cable de red normal no puede ir a dos sitios a la vez, hice **un cable dividido**:

* Un **RJ45 macho** que entra en el puerto de comunicaciones del Deye.
* Una rama con los **pines de CAN** que termina en otro RJ45, conectado a la **batería**.
* Otra rama con los **pines de RS485**, pelados y atornillados al **adaptador USB-RS485** de Home Assistant.

<!-- TODO: confirmar qué pines exactos llevan el RS485 en mi cable (1-2 o 7-8) -->

Así la batería sigue hablando con el inversor por CAN, sin enterarse de nada, y Home Assistant lee el inversor por RS485 por los otros pines del mismo conector. Son dos protocolos distintos que no se mezclan: **nunca unas los hilos de CAN y de RS485 entre sí**.

> ⚠️ **No desconectes la batería** para conectar Home Assistant. Si el Deye pierde la comunicación CAN con el BMS, deja de saber el estado real de la batería. Si tu modelo tiene un puerto RS485 independiente, úsalo y te ahorras el cable en Y.

<!-- 📷 FOTO: puerto de comunicaciones del Deye con el cable en Y conectado -->
<!-- 📷 FOTO: el cable en Y: rama CAN hacia la batería y rama RS485 atornillada al adaptador (A+, B−, GND) -->

### Instalación
1. En Home Assistant: **Ajustes → Complementos → Tienda → ⋮ → Repositorios** y añades `https://github.com/kellerza/hass-addons`.
2. Instalas **"Sunsynk/Deye Inverter Add-on (multi)"**.
3. Necesitas un broker MQTT: en Home Assistant OS, el complemento **Mosquitto** con la integración MQTT.
4. Buscas la ruta del adaptador en **Ajustes → Sistema → Hardware → Todo el hardware** (algo como `/dev/ttyUSB0`).

### Configuración
Esta es la base que uso (los valores van en la pestaña *Configuración* del addon, en modo YAML):

```yaml
SENSOR_DEFINITIONS: single-phase   # three-phase si tu Deye es trifásico
INVERTERS:
  - SERIAL_NR: "XXXXXXXXXX"        # nº de serie del inversor, SIEMPRE entre comillas
    HA_PREFIX: SS
    MODBUS_ID: 1
    PORT: /dev/ttyUSB0
SENSORS:
  - energy_management
  - power_flow_card
  - pv1
  - pv2
SENSORS_FIRST_INVERTER:
  - settings                       # para poder cambiar parámetros desde HA
READ_SENSORS_BATCH_SIZE: 20
```

* `SERIAL_NR` tiene que coincidir con el número de serie real; el addon lo comprueba al arrancar.
* El grupo `power_flow_card` trae justo los sensores que necesita la [Sunsynk Power Flow Card](https://github.com/slipx06/sunsynk-power-flow-card), la tarjeta que imita la pantalla del inversor y que monta medio grupo.
* Con `settings` aparecen entidades para cambiar el modo de trabajo, los horarios de carga o los límites de corriente. **Úsalas con respeto**: estás escribiendo directamente en el inversor.

<!-- 📷 CAPTURA: configuración del addon de Kellerza en HA -->
<!-- 📷 CAPTURA: Sunsynk Power Flow Card funcionando -->

### Alternativa sin USB: gateway Modbus-TCP
Si tu servidor no está cerca del inversor, el grupo usa mucho un **gateway RS485 a Ethernet** (tipo Waveshare, mejor con PoE). Se cuelga del RS485 del Deye y en el addon solo cambias el puerto:

```yaml
PORT: tcp://192.168.1.50:502
```

Si usas un gateway WiFi barato (tipo USR-W610/W630), baja `READ_SENSORS_BATCH_SIZE` a 8 o menos.

---

## 🔋 5. El JK BMS con el addon SmartPhoton

Para el JK uso el addon **[SmartPhoton JK-BMS RS485](https://github.com/jean-luc1203/jkbms-rs485-addon)** de jean-luc1203, que encontré a través del [foro de DomoSimple](https://domosimple.eu/forum/thread-917.html). Es compatible con los JK de la serie PB (el *PB2A16S20P* que usa casi todo el grupo) con firmware 14, 15 o 19, y gestiona **hasta 15 BMS**.

Antes se usaban sobre todo ESP32 con ESPHome (los proyectos de *syssi* por Bluetooth, y de *txubelaxu* o *Sleeper85* por RS485). Funcionan, pero exigen flashear y mantener un ESP32. El addon se instala en HA y listo.

### El cable
El JK PB tiene varios RJ45 en el frontal. El RS485 es el que usan los BMS para hablar entre ellos en paralelo, y el **CAN es otro** (el segundo por la izquierda), que es el que normalmente va al inversor. Hay que usar el **RS485**.

Igual que en el Deye: cable de red cortado, **A y B** al adaptador. En el grupo comentan que el JK lleva B y A en los pines 1 y 2, como el Deye, pero **compruébalo en el manual de tu versión**. Dos avisos del propio autor del addon:

* Si no hay comunicación, lo primero es **probar a invertir A y B**.
* En su montaje de referencia el GND **no** va conectado.

<!-- 📷 FOTO: frontal del JK BMS señalando el puerto RS485 y el CAN -->

### Modo de trabajo: ¿quién es el maestro?
Aquí está la clave (sección 3). El addon tiene dos modos, que se eligen con `bms_broadcasting`:

| Modo | `bms_broadcasting` | Quién manda | Puedes cambiar parámetros |
| :--- | :---: | :--- | :--- |
| **Sondeo activo** | `false` | El addon pregunta a cada BMS | ✅ Sí |
| **Escucha (broadcast)** | `true` | Un JK maestro (DIP a `0000`) envía los datos de todos cada ~5 s | ❌ Solo lectura |

* **Una sola batería, o quieres poder tocar parámetros:** sondeo activo.
* **Varias baterías ya funcionando como maestro + esclavos** (con el maestro hablando con el Deye por CAN): modo escucha. Así no rompes la comunicación entre los BMS ni con el inversor.

### Instalación y configuración
1. **Ajustes → Complementos → Tienda → ⋮ → Repositorios** y añades `https://github.com/jean-luc1203/jkbms-rs485-addon`.
2. Instalas el addon y configuras:

```yaml
path: /dev/serial/by-id/usb-1a86_USB_Serial-if00-port0   # el tuyo
nb_jkbms: 1
use_gateway: false
bms_broadcasting: false
mqttaddress: core-mosquitto
mqttport: 1883
mqttuser: "tu_usuario"
mqttpass: "tu_contraseña"
```

> 💡 **Usa la ruta `/dev/serial/by-id/...`** y no `/dev/ttyUSB0`. Con dos adaptadores conectados, `ttyUSB0` y `ttyUSB1` pueden **intercambiarse al reiniciar** y cada addon acabaría hablando con el equipo equivocado. La ruta *by-id* es fija para cada adaptador. Para distinguirlos, conéctalos de uno en uno y mira cuál aparece.

Lo mismo vale para Kellerza: si tus dos adaptadores son iguales, usa también ahí una ruta estable.

Cada BMS aparece como un dispositivo en HA por MQTT Discovery: tensión de cada celda, delta, corriente de balanceo, temperaturas, SOC, ciclos y alarmas. El addon publica además una entidad de **salud de la comunicación** (`healthy` / `degraded` / `communication_error`), muy útil para saber si el problema es la batería o el cable.

<!-- 📷 CAPTURA: dispositivo JK en HA con las 16 celdas -->
<!-- 📷 CAPTURA: configuración del addon SmartPhoton -->

---

## 🩺 6. Problemas típicos

| Síntoma | Revisa |
| :--- | :--- |
| El addon arranca pero no lee nada | LEDs del adaptador; A y B invertidos; puerto RJ45 equivocado |
| "No such file" en el puerto | Ruta del adaptador; mejor `/dev/serial/by-id/...` |
| Tras reiniciar, datos cruzados o errores | `ttyUSB0`/`ttyUSB1` intercambiados. Usa rutas by-id |
| El Deye deja de hablar con la batería | Has tocado el puerto de la batería, o los pines 4–5 (CAN) |
| Lecturas a medias con un gateway WiFi | Baja `READ_SENSORS_BATCH_SIZE` a 8 |
| No puedo cambiar parámetros del JK | Estás en modo escucha, o el JK está como maestro |
| Quiero añadir un cargador V2C al RS485 del Deye | Ese puerto ya tiene maestro (HA). Solo puede haber uno por bus |

---

## 🧠 Conclusión

Desde que todo va por cable, **se acabaron los huecos en las gráficas y los pitidos**. Tengo datos al segundo, sin nube, y si se cae internet la casa sigue sabiendo cuánta energía tiene.

Lo único que hay que tener claro es la regla de oro del RS485: **un maestro por bus**. Entendido eso, el resto son tres hilos y un par de ficheros YAML.

👉 **Siguiente paso:** con los datos ya en Home Assistant, toca usarlos. Automatizaciones con excedentes, cargas en horario barato y el dashboard que tengo pendiente de enseñaros.

*Gracias a la comunidad del grupo **Solar Diy** de Telegram y a los autores de los addons: Johann Kellerman ([kellerza/sunsynk](https://github.com/kellerza/sunsynk)) y jean-luc1203 ([SmartPhoton](https://github.com/jean-luc1203/jkbms-rs485-addon)).*
