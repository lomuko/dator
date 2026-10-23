---
title: "ESPHome: de un ESP32 de 5 € a un sensor en Home Assistant"
date: 2026-11-20
categories: [domotica]
tags: [homeassistant, esphome, esp32, domotica, diy]
excerpt: "Tu primer dispositivo ESPHome paso a paso: temperatura, un relé y un proxy Bluetooth, sin escribir una línea de C++."
toc: true
toc_sticky: true
header:
  overlay_color: "#1f2933"
  overlay_filter: 0.5
---

Si Zigbee es la forma más cómoda de añadir dispositivos comprados, **ESPHome** es la forma de **fabricarte los tuyos**. Un microcontrolador **ESP32** cuesta unos pocos euros, tiene WiFi y Bluetooth, y con ESPHome lo programas escribiendo un fichero YAML, no código.

En el canal de ESPHome del grupo **Un Loco y su Tecnología** hay de todo: controladores de aire acondicionado, ventiladores de rack con control de temperatura, contadores de agua, pantallas con la producción solar, lectores Modbus para inversores… Este post es el primer escalón para llegar ahí.

---

## 🧰 1. Qué necesitas

* **Un ESP32.** El clásico *ESP32 DevKit* (unos 5 €) o un **ESP32-C3** si quieres algo diminuto. El ESP8266 (Wemos D1 mini) sigue funcionando, pero tiene poca memoria: para algo nuevo, ESP32.
* **Un cable USB de datos** (no solo de carga; es el error más común).
* **El complemento "ESPHome Device Builder"** en Home Assistant (Ajustes → Complementos → Tienda).
* Para el ejemplo: un sensor de temperatura y humedad **SHT31** (I²C) y un módulo de **relé**.

---

## 🔌 2. Primer flasheo

La primera vez hay que grabar el ESP32 por USB. Después, todas las actualizaciones van **por WiFi (OTA)**.

1. Abre ESPHome Device Builder y pulsa **+ New device**.
2. Ponle nombre (por ejemplo `sensor-salon`) y elige **ESP32**.
3. Conecta el ESP32 al ordenador por USB y elige **instalar → conectado a este ordenador**. Se hace desde el propio navegador (Chrome o Edge, que soportan acceso al puerto serie).
4. Cuando termine, Home Assistant lo descubrirá solo: **Ajustes → Dispositivos → ESPHome → Configurar**.

Si tu placa no entra en modo de grabación, mantén pulsado el botón **BOOT** mientras empieza la subida.

---

## 📝 3. El fichero YAML

Esta es la configuración completa del ejemplo. Lo de arriba es la base que ESPHome genera; lo nuevo son los bloques `i2c`, `sensor` y `switch`.

```yaml
esphome:
  name: sensor-salon
  friendly_name: Sensor Salón

esp32:
  board: esp32dev
  framework:
    type: esp-idf

logger:

api:
  encryption:
    key: !secret api_key_salon

ota:
  - platform: esphome
    password: !secret ota_password

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password
  ap:            # punto de acceso de emergencia si no encuentra tu WiFi
    ssid: "Sensor-Salon Fallback"

captive_portal:

# Sensor de temperatura y humedad por I2C
i2c:
  sda: 21
  scl: 22

sensor:
  - platform: sht3xd
    temperature:
      name: "Temperatura"
    humidity:
      name: "Humedad"
    address: 0x44
    update_interval: 60s

# Relé en el GPIO26
switch:
  - platform: gpio
    pin: GPIO26
    name: "Relé"
    restore_mode: RESTORE_DEFAULT_OFF
```

Tres detalles importantes:

* **`!secret`**: las contraseñas van en el fichero `secrets.yaml` de ESPHome, no en cada dispositivo. Así puedes compartir tus YAML sin compartir tu WiFi. Ojo al pegar configuraciones en foros: en el grupo se ven claves de API y contraseñas que deberían haberse quedado en casa.
* **`restore_mode`**: qué hace el relé al arrancar el ESP32 tras un corte de luz. Para un relé que mueve algo importante (una bomba, una caldera), **piénsalo bien**.
* **El relé:** para cargas de 230 V, módulos de relé con optoacoplador o **relés de estado sólido**, y nunca trabajes con el circuito en tensión. Si no te ves con soltura en 230 V, empieza por sensores.

Guardas, pulsas **Install → Wirelessly**, y en un minuto tienes en Home Assistant un dispositivo con temperatura, humedad y un interruptor.

---

## 📶 4. Bonus: proxy Bluetooth

Uno de los usos más populares en el grupo: convertir un ESP32 en un **proxy Bluetooth** para Home Assistant. Así los dispositivos Bluetooth (termómetros Xiaomi, básculas, cerraduras, el BMS de una batería…) se comunican a través del ESP32 más cercano, en vez de depender de que el servidor de HA esté a tiro.

Basta con añadir esto al YAML:

```yaml
esp32_ble_tracker:
  scan_parameters:
    active: true

bluetooth_proxy:
  active: true
```

Reparte dos o tres por la casa y el Bluetooth deja de ser un problema de alcance.

> En mi caso acabé sacando el BMS de la batería del Bluetooth y pasándolo a cable RS485 ([lo cuento aquí](/home-lab/home-assistant-rs485/)), pero para sensores pequeños un proxy funciona muy bien.

---

## 🚀 5. Ideas para el siguiente paso

Proyectos que se repiten en el grupo, de menos a más difícil:

* **Sensor de presencia por radar** (mmWave, como el LD2410): detecta a una persona quieta, no solo movimiento.
* **Medidor de consumo** con un PZEM o una pinza amperimétrica.
* **Ventilador de rack** controlado por PWM según la temperatura.
* **Pantalla** con LVGL que muestre la producción solar leyendo sensores de Home Assistant.
* **Lectura Modbus** de un inversor o un aire acondicionado.
* **Liberar dispositivos Tuya**: algunos llevan chips que se pueden flashear con ESPHome (vía LibreTiny) o sustituir por un ESP32-C3, para que funcionen en local sin la nube de Tuya.

---

## 🩺 6. Problemas típicos

| Problema | Causa habitual |
| :--- | :--- |
| El ordenador no ve el ESP32 | Cable USB solo de carga, o falta el driver del chip USB (CH340/CP2102) |
| Error de memoria al compilar | El servidor de HA tiene poca RAM. Compila desde otro ordenador o usa ESP32 en vez de ESP8266 |
| Se desconecta del WiFi | Señal débil, o routers mesh que cambian al ESP de nodo. Prueba a fijar el punto de acceso o usa IP fija |
| Tras actualizar ESPHome no compila | Cambios de sintaxis entre versiones. Lee las notas de la versión antes de actualizar todos los dispositivos de golpe |

---

## ✅ Conclusión

ESPHome es el punto donde la domótica deja de ser "comprar cacharros" y pasa a ser **fabricar exactamente lo que necesitas**. Con un ESP32, un sensor y veinte líneas de YAML tienes un dispositivo local, sin nube, sin cuotas y que puedes modificar cuando quieras.

*Gracias a la comunidad del grupo de Telegram **Un Loco y su Tecnología**, cuyo canal de ESPHome es una fuente inagotable de proyectos.*
