---
layout: single
title: "Solar Home-Lab IX: Automatizaciones con excedentes en Home Assistant"
header:
  overlay_image: /assets/images/solar/solar6.jpg
  overlay_filter: 0.5
sidebar:
  nav: "home_lab_nav"
date: 2026-10-23
collection: porche-solar
tags: [homeassistant, automatizacion, excedentes, termo, deye, forecast, pvpc]
excerpt: "Termo con el sol, carga nocturna según la previsión de mañana y coche con lo que sobra: las automatizaciones que convierten los datos en ahorro."
toc: true
toc_sticky: true
slug: automatizaciones-excedentes
order: 9
---

En el [capítulo anterior de Home Assistant](/home-lab/home-assistant-rs485/) dejamos el Deye y el JK BMS hablando por cable con Home Assistant. Tener datos al segundo está muy bien, pero los datos solos no ahorran ni un euro. Lo que ahorra es **usarlos para decidir**.

Este post recoge las automatizaciones que más se repiten en el grupo **Solar Diy** y las que a mí me han funcionado, con el YAML para copiar y adaptar.

> 📝 **Sobre los nombres de las entidades:** uso los del addon de Kellerza con el prefijo `SS` (por ejemplo `sensor.ss_battery_soc`). Los tuyos pueden variar según tu prefijo y versión. Búscalos en **Herramientas para desarrolladores → Estados** antes de copiar nada. Y **comprueba el signo** de las potencias de red y batería: según la configuración, importar puede ser positivo o negativo.

---

## 🧠 1. Primero, cambia el chip: con batería, "excedente" es otra cosa

Una frase del grupo que resume bien la idea:

> *"En el momento que tienes batería la película cambia. Tú enciende el termo todos los días a la misma hora que hay sol y listo."*

Sin batería, todo lo que no consumes en el momento se vierte a la red (y te lo pagan a pocos céntimos) o se pierde. Ahí un **gestor de excedentes** tiene todo el sentido.

Con batería, la energía solar tiene **tres destinos posibles**, por este orden de valor:

1. **Consumo directo** de la casa.
2. **Cargar la batería** para la noche.
3. **Excedente real:** batería llena y sigue sobrando.

El objetivo de las automatizaciones es **mover consumos flexibles** (termo, depuradora, lavadora, coche) a las horas de sol, sin dejar la batería vacía para la noche.

### ⚠️ La trampa del vertido cero
Si tu Deye está en **Zero Export** (sin vertido), el inversor **recorta la producción** de los paneles cuando la batería está llena y no hay consumo. El excedente existe, pero **no lo ves**: no aparece como exportación porque el inversor directamente no produce.

Por eso, con vertido cero, no te sirve la regla de "si estoy exportando X W, enciende". Necesitas otra señal:

* **SOC alto** (batería casi llena), y
* **producción solar alta** según la hora o la previsión.

Si enciendes una carga en ese momento, el inversor simplemente "despierta" la producción que estaba recortando.

---

## 🔥 2. El termo: el mejor acumulador de calor que ya tienes

El termo eléctrico es **la batería térmica más barata del mundo**: 1,5–2 kW de consumo que puedes mover a cualquier hora sin que nadie lo note.

La estrategia más extendida en el grupo tiene **dos niveles**:

1. **Mínimo garantizado:** el termo mantiene una temperatura baja (unos 40 °C) siempre, pase lo que pase.
2. **Calentar a tope solo con sol:** cuando la batería está llena y hay producción, se sube al máximo.

Necesitas un relé o contactor para controlar el termo desde HA. Un **Shelly** o similar con contactor si el termo pasa de 2 kW (ver la nota sobre contactores en el [post de protecciones](/home-lab/protecciones-cableado/)).

```yaml
# Encender el termo cuando la batería está llena y hay sol
automation:
  - alias: "Termo ON con excedente solar"
    trigger:
      - platform: numeric_state
        entity_id: sensor.ss_battery_soc
        above: 95
        for: "00:05:00"
    condition:
      - condition: numeric_state
        entity_id: sensor.ss_pv_power
        above: 2500          # W; ajusta a tu instalación
      - condition: sun
        after: sunrise
        before: sunset
    action:
      - service: switch.turn_on
        target:
          entity_id: switch.termo

  - alias: "Termo OFF si la batería baja"
    trigger:
      - platform: numeric_state
        entity_id: sensor.ss_battery_soc
        below: 85
      - platform: numeric_state
        entity_id: sensor.ss_pv_power
        below: 1000
        for: "00:10:00"
    action:
      - service: switch.turn_off
        target:
          entity_id: switch.termo
```

**Por qué dos umbrales (95 % para encender, 85 % para apagar):** para evitar que el termo se encienda y apague cada minuto cuando el SOC ronda un único valor. Se llama histéresis y es la clave de cualquier automatización de este tipo.

### ¿Y si quiero aprovechar cada vatio?
Los relés todo/nada encienden el termo entero (por ejemplo 2 kW) aunque solo sobren 800 W. Para modular la potencia existen **derivadores de excedentes** con regulador (SSR o dimmer). En el grupo el más citado es **FreeDS**, un proyecto libre con ESP32. Tiene sentido sobre todo en instalaciones **sin batería** o con vertido.

<!-- 📷 CAPTURA: gráfica del día con el termo arrancando cuando la batería llega al 95 % -->

---

## 🌙 3. Cargar la batería de noche según la previsión de mañana

Esta es la automatización con más impacto en invierno, y la que más se comenta en el grupo.

**La idea:** si mañana va a hacer mal día, carga la batería **de la red en horario valle** (barato). Si mañana va a hacer sol, no lo hagas, porque los paneles la llenarán gratis.

### Ingredientes
* **Previsión solar:** la integración **Forecast.Solar** (viene con HA) crea un sensor con la producción estimada de mañana, normalmente `sensor.energy_production_tomorrow`. Solcast (vía HACS) es más precisa pero requiere registro.
* **Precio de la luz** (opcional): la integración **PVPC** de HA (`sensor.esios_pvpc`) si estás en tarifa regulada.
* **Control del inversor:** con `settings` activado en Kellerza tienes entidades para los programas de horario del Deye (*System Mode*): SOC objetivo de cada franja y si puede cargar de red.

### La versión escalonada
Un compañero del grupo lo tiene así, y me parece la mejor forma de pensarlo: a las 22:00 mira la previsión y fija el SOC objetivo de la franja de madrugada.

| Previsión mañana | SOC objetivo cargando de red |
| :--- | :--- |
| < 7 kWh | 100 % |
| 7 – 15 kWh | 65 % |
| 15 – 18 kWh | 45 % |
| 18 – 20 kWh | 35 % |
| > 20 kWh | No cargar de red |

Los números **dependen totalmente de tu consumo y tu producción**. Con ~7 kWh/día de consumo y 5 kWp, mis umbrales no se parecerán a los de una casa con aerotermia.

{% raw %}
```yaml
automation:
  - alias: "Carga nocturna según previsión"
    trigger:
      - platform: time
        at: "22:00:00"
    variables:
      prevision: "{{ states('sensor.energy_production_tomorrow') | float(0) }}"
      objetivo: >
        {% if prevision < 7 %} 100
        {% elif prevision < 15 %} 65
        {% elif prevision < 18 %} 45
        {% elif prevision < 20 %} 35
        {% else %} 15
        {% endif %}
    action:
      # SOC objetivo de la franja nocturna (programa 1 del Deye)
      - service: number.set_value
        target:
          entity_id: number.ss_prog1_capacity
        data:
          value: "{{ objetivo | int }}"
      # Permitir o no la carga desde red en esa franja
      - service: select.select_option
        target:
          entity_id: select.ss_prog1_charge
        data:
          option: "{{ 'Allow Grid' if prevision < 20 else 'No Grid or Gen' }}"
```
{% endraw %}

> Los nombres y las opciones exactas de las entidades de programa (`prog1_...`) dependen de tu versión del addon y de tu modelo. Míralas antes en la ficha del dispositivo en HA. Y asegúrate de que la franja horaria del programa 1 en el inversor coincide con tu horario valle.

### Otra regla útil: forzar el 100 % de vez en cuando
Como vimos en el [post de baterías](/home-lab/baterias-diy/), el BMS necesita llegar al **100 % real** periódicamente para recalibrar el SOC. En invierno puedes pasar semanas sin llegar. Un compañero del grupo fuerza la carga nocturna completa cuando el SOC de sus dos baterías **difiere más de un 5 %**, señal de que los BMS se han descalibrado. Otra opción más simple: forzarla si han pasado más de 7 días sin llegar al 100 %.

---

## 🚗 4. El coche eléctrico con lo que sobra

El coche es el **consumo flexible más grande** de una casa: 7 kW durante horas. Dos formas de abordarlo, según el grupo:

* **Integración directa cargador–inversor.** Algunos cargadores (el V2C es el más comentado) hablan con el Deye por RS485 y ajustan solos la potencia a lo que sobra. Ojo con la regla del [maestro único por bus](/home-lab/home-assistant-rs485/): si ya tienes Home Assistant como maestro en el RS485 del Deye, no puedes colgar el cargador ahí mismo.
* **Control desde Home Assistant.** HA lee la exportación (o el SOC y la producción) y ajusta la corriente máxima del cargador cada pocos segundos. Es más flexible (puedes decidir prioridades: primero batería, luego coche) y no depende de que el cargador sea compatible con tu inversor.

---

## 💧 5. Otros consumos que se mueven solos

* **Depuradora:** es la automatización más agradecida. La bomba tiene que funcionar X horas al día; que lo haga en horas de sol.
* **Lavadora y lavavajillas:** si son "inteligentes", programa el inicio a mediodía. Si no, un enchufe con medida de consumo te avisa cuando acaban.
* **Ventiladores del inversor:** un compañero del grupo controla los ventiladores del Deye con un ESP32 según la temperatura interna DC que da el propio inversor. Menos ruido y menos consumo que con el termostato de serie.

---

## 🛡️ 6. Reglas de oro

1. **Histéresis siempre.** Umbrales distintos para encender y apagar, y condiciones `for:` de varios minutos.
2. **Un fallo de HA no puede dejarte sin agua caliente.** El termo debe tener su termostato propio como respaldo; HA solo lo enciende y apaga.
3. **Prioridades claras:** casa > batería > termo > coche. Escríbelas antes de programar.
4. **Escribe en el inversor con cuidado.** Cambiar programas del Deye desde HA es muy potente, pero un error puede dejarte la batería sin cargar. Empieza leyendo y notificando, y automatiza cuando lleves unos días viendo que la lógica acierta.
5. **Mide antes y después.** La gracia de tener los datos es comprobar si la automatización realmente ahorra.

---

## 🧠 Conclusión

Con batería, la mejor automatización no es la más sofisticada, sino la que **mueve los consumos grandes a las horas de sol** y **decide la víspera** si merece la pena cargar de la red.

Es donde la instalación deja de ser "paneles que producen" y pasa a ser un sistema que **piensa por adelantado**: mira el cielo de mañana, el precio de esta noche y el estado de la batería, y decide solo.

👉 **Siguiente capítulo:** queda el papeleo. Cómo se legaliza todo esto.

*Gracias a la comunidad del grupo **Solar Diy** de Telegram, especialmente al canal de domótica, de donde salen varias de estas ideas.*
