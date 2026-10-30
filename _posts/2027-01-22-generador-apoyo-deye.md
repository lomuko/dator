---
title: "Un generador de apoyo para los días sin sol: cómo conectarlo a un Deye"
date: 2027-01-22
categories: [energia-solar]
tags: [solar, generador, deye, aislada, invierno, bateria]
excerpt: "Qué generador comprar, dónde se conecta en un Deye, cómo se configura la carga y por qué a veces el inversor no lo reconoce. Con experiencias del grupo Solar Diy."
toc: true
toc_sticky: true
header:
  overlay_color: "#1f2933"
  overlay_filter: 0.5
---

Una frase del grupo **Solar Diy** que cualquiera del norte entiende: *"Como siga así el tiempo, me va a hacer falta… ¡4 días de niebla casi sin irse!"*.

Hay semanas de invierno en las que los paneles no dan para llenar la batería. Si estás conectado a red, no pasa nada: el inversor tira de la red. Pero si vives en **aislada**, o quieres aguantar un **apagón largo**, o simplemente no quieres depender de la red en las rachas malas, la respuesta clásica es un **generador de apoyo**.

Es algo que yo también estoy valorando: un generador pequeño, de uso muy esporádico, que pueda cargar la batería a unos 2 kW. Este post recoge lo que he aprendido mirando opciones y leyendo los cientos de mensajes del grupo sobre generadores.

---

## 🔌 1. Qué tipo de generador

La recomendación más repetida del grupo es clara: **generador inverter**.

* Los generadores **convencionales** (los de obra, más baratos) dan una tensión y una frecuencia que **bailan** con la carga. Los inversores solares son exigentes con eso y muchos rechazan esa energía.
* Los **inverter** generan una **onda senoidal pura y estable en frecuencia**. Son más silenciosos, consumen menos a media carga y son los que mejor se llevan con los inversores híbridos.

Algunas marcas venden modelos "preparados para apoyo solar", con **arranque eléctrico** y entrada para **arranque automático** por contacto seco. Si quieres que arranque solo cuando la batería baje, necesitas uno de esos.

### ¿Qué potencia?
Depende de para qué lo quieres:

* **Solo cargar la batería:** la potencia de carga que quieras **más un margen** del 20–30 %. Para cargar a ~2 kW, un inverter de 2,5–3 kW va holgado.
* **Cargar y alimentar la casa a la vez:** súmale tu consumo simultáneo. Ahí ya hablamos de 4–6 kW o más.

Un generador funcionando al 100 % de forma continua sufre. Mejor que trabaje al 70–80 %.

---

## 🏠 2. Dónde se conecta en un Deye

El Deye híbrido tiene un puerto dedicado: **GEN** (lo explico en el [post de configuración del Deye](/energia-solar/configurar-inversor-deye/)).

| Tu instalación | Dónde conectar el generador |
| :--- | :--- |
| **Conectada a red** | Puerto **GEN**, configurado como entrada de generador |
| **Aislada (sin red)** | Puerto **GEN**, o el puerto **GRID** si no lo usas para otra cosa |

> ⚠️ **Nunca conectes el generador directamente a la instalación de la casa** sin un conmutador que la separe de la red. Si se va la luz y el generador alimenta la línea, puede **devolver tensión a la red** de la calle: es un peligro mortal para quien esté reparando la avería. Si no pasa por el inversor, tiene que pasar por un **conmutador de transferencia**.

---

## ⚙️ 3. Configurar la carga

En el Deye, la carga desde el generador se controla en dos sitios:

1. **Ajustes de batería (*Gen charge*):** activar la carga desde el generador, la **corriente máxima** y a qué nivel de batería empieza y deja de cargar.
2. **Programación horaria (*Time of Use*):** en cada franja hay una casilla **Gen**, igual que la de Grid. Así decides **en qué horas** se permite cargar con el generador (por ejemplo, nunca de noche por el ruido).

### Ajusta la corriente al generador
Si el generador es pequeño, **limita la corriente de carga** para que la suma de carga de batería más consumo de la casa no lo sobrecargue. Recuerda que el Deye **alimenta primero las cargas** y luego carga la batería con lo que sobra: si enciendes el horno mientras carga, la batería recibe menos.

---

## 🩺 4. "El Deye no reconoce el generador"

Es el problema más repetido. El generador arranca, la tensión llega a los bornes… y el Deye no lo acepta, o carga un rato y se desconecta. Causas y soluciones que se han visto en el grupo:

* **Frecuencia o tensión inestables.** Típico de generadores convencionales, o de inverters en modo *eco* (bajan las revoluciones con poca carga y la frecuencia se mueve). Prueba a desactivar el modo eco.
* **Rangos de tensión y frecuencia del inversor.** Si el generador está en el límite, el inversor lo rechaza. Algunos inversores permiten ampliar el rango aceptado en la entrada de generador.
* **Un caso curioso con baterías DIY.** Un compañero con un Deye de 6 kW y un generador inverter no conseguía que cargara. Tras muchos intentos, contactó con el servicio técnico de Deye, que se conectó en remoto a su inversor y le **cambió la gestión de la batería a modo voltaje** (en lugar de comunicación con el BMS). Según el técnico, la combinación de su batería con JK no era del todo compatible en ese escenario. Después de eso, el generador funcionó.
* **Generador demasiado pequeño** para la corriente de carga configurada: se ahoga, cae la tensión y el inversor lo desconecta.

---

## 🔀 5. La alternativa: un cargador directo a la batería

Si el inversor y el generador no se entienden, hay un plan B que se comenta en el grupo: un **cargador de baterías** de 230 V a 48 V conectado **directamente a la batería** (pasando por el BMS, por supuesto), y el generador alimentando solo ese cargador.

* **Ventajas:** independiente del inversor, funciona con casi cualquier generador y puedes elegir la potencia de carga.
* **Inconvenientes:** otro aparato más, y el inversor no sabe que la batería se está cargando por otro lado (el SOC del BMS sí lo sabrá).

---

## 🧮 6. ¿Merece la pena?

Antes de comprar un generador, haz la cuenta de **cuántos días al año lo vas a usar**. Para una instalación conectada a red, la respuesta suele ser "casi ninguno": la red es tu generador, y más barata. Tiene sentido si:

* Vives en **aislada**: entonces no es opcional.
* Quieres resistir **apagones largos** (zonas rurales, temporales).
* Quieres no depender de la red en las peores semanas del invierno, aun sabiendo que **no va a ser rentable**.

En mi caso, conectado a red, el generador sería un seguro para casos raros, no un ahorro. Por eso tiene sentido mirar **segunda mano** y modelos pequeños.

<!-- TODO: si al final compro el generador, añadir modelo, cómo lo he conectado y cómo se comporta -->

---

## ✅ Resumen

1. **Generador inverter**, no convencional.
2. **Potencia:** la de carga deseada + 20–30 %, o más si también va a alimentar la casa.
3. **Puerto GEN** del Deye; **nunca** directo a la instalación sin conmutador.
4. **Limita la corriente de carga** a lo que aguanta el generador y permite la carga solo en las franjas que quieras.
5. Si no lo reconoce: revisa frecuencia, modo eco y rangos, y como último recurso, un **cargador directo** a la batería.

*Gracias a la comunidad del grupo **Solar Diy** de Telegram, especialmente a quienes viven en aislada y saben de verdad lo que es un mes de niebla.*
