---
title: "Eficiencia en casa con energía solar: consumir más, pero mejor"
date: 2026-12-04
categories: [energia-solar]
tags: [solar, eficiencia, domotica, homeassistant, autoconsumo, bomba-de-calor, termo, excedentes]
excerpt: "Desde que tengo paneles y batería consumo más electricidad, y la casa es más eficiente que nunca. Agua caliente, climatización, humedad y domótica: cómo sustituir lo que compras por lo que produces."
toc: true
toc_sticky: true
header:
  overlay_color: "#1f2933"
  overlay_filter: 0.5
---

Cuando diseñé mi instalación calculé que la casa consumía unos **7 kWh al día**. Hoy los datos dicen que consume **9–10 kWh**. Un 30–40 % más.

Parece una contradicción, pero la casa es **más eficiente que nunca**. Este post explica por qué, y recoge las ideas que he ido aplicando (y las que tengo en la lista) para sacar el máximo partido a la energía que produzco.

---

## ☀️ 1. El punto de partida: energía que se pierde

Mi instalación no vierte a la red. Cuando la batería está llena y la casa no consume, **el inversor recorta la producción**: esa energía no llega a generarse.

Los datos de mi [página de datos solares](/solar-data/) lo dejan claro: en verano los paneles podrían dar **21–27 kWh al día**, pero la casa aprovecha unos 10. **Más de la mitad se pierde.**

Con ese panorama, la eficiencia ya no consiste en *consumir menos*.

---

## 🎯 2. Qué significa eficiencia con autoconsumo

Durante años, ser eficiente en casa ha sido apagar luces y vigilar la factura. Con paneles y batería, la eficiencia tiene **tres caras**, y las tres apuntan en la misma dirección:

| | Antes | Ahora |
| :--- | :--- | :--- |
| **Económica** | Consumir menos para pagar menos | **Sustituir lo que compras** (gas, red, gasolina) por lo que produces |
| **Energética** | Gastar menos kWh | **Aprovechar los kWh que se perdían**, y usar aparatos de alto rendimiento |
| **Calidad de vida** | Renunciar a comodidad para ahorrar | Más confort **con energía que ya es tuya** |

Y una cuarta que no sale en los números: **independencia**. Sin contrato de gas, sin términos fijos, sin depender de las subidas de precio.

La regla es sencilla: **consumir lo justo y necesario, y que lo necesario salga, en lo posible, de tu propio tejado**.

---

## 🚿 3. Sustituir el gas: agua caliente y cocina

### El agua caliente
Puse un **termo eléctrico de 100 litros delante del calentador de gas**, no en su lugar:

```
Agua fría ──▶ TERMO ELÉCTRICO (100 L) ──▶ válvula termostática (45 °C)
                                              │
                         ¿agua del termo < 45 °C?
                         │                      │
                        SÍ                     NO
                         ▼                      ▼
              CALENTADOR DE GAS         directo a la salida
              (la termina de calentar)         │
                         │                      │
                         └──────────┬───────────┘
                                    ▼
                      MEZCLADOR TERMOSTÁTICO (máx. 60 °C)
                                    ▼
                       Distribución de agua caliente
```

* **El termo** calienta con electricidad solar. Calentar 100 litros cuesta unos **5 kWh**: es una **batería de agua caliente**, la más barata que existe.
* **La válvula termostática:** si el agua del termo está a **más de 45 °C**, va directa a la distribución y el gas ni se entera. Si está por debajo, pasa al **calentador de gas**, que la termina de calentar (y como llega precalentada, gasta menos). La válvula existe porque **muchos calentadores de gas no admiten agua de entrada muy caliente**: mira el manual del tuyo antes de copiarlo.
* **El mezclador termostático** evita que el agua salga a **más de 60 °C**. Seguridad, y además los 100 litros rinden más.

El termo no lo enciendo yo: lo decide **Home Assistant** según los excedentes, con la herramienta que cuento más abajo, en el apartado de domótica.

<!-- 📷 FOTO: el termo y el calentador, con las conexiones -->
<!-- 📷 FOTO: la válvula termostática y el mezclador -->

### La cocina
Tenemos una **placa mixta de gas e inducción**: **inducción** cuando sobra electricidad (casi siempre en primavera y verano) y **gas** los días que vamos justos. La única excepción fija es la cafetera italiana de aluminio, que no funciona en inducción: un café para dos cada dos o tres días.

---

## 🌡️ 4. Climatización: la bomba de calor como multiplicador

Esta es, probablemente, la mejora de eficiencia **con más potencial**. Un aire acondicionado moderno es una **bomba de calor**: por cada kWh de electricidad mueve **3 o 4 kWh de calor** (es lo que se llama COP o SCOP). Una caldera de gas, en el mejor de los casos, da algo menos de 1 kWh de calor por cada kWh de gas.

Con energía solar, eso se traduce en:

* **Verano: aire acondicionado con el sol.** Lo bueno es que el calor y la producción solar coinciden: los días más calurosos son los de más paneles. **Pre-enfriar la casa a mediodía**, cuando sobra energía, y dejar que la propia casa conserve el fresco por la tarde.
* **Entretiempo e invierno: calefacción con aire.** En otoño y primavera, y en los días soleados de invierno, la bomba de calor puede **sustituir a los radiadores de gas**. La misma idea: **precalentar la casa con los excedentes** de las horas centrales, y que los muros y suelos guarden ese calor para la noche.
* **Domótica para decidir:** subir o bajar la consigna del termostato según la batería y la producción. Por ejemplo, con batería llena y sol, consigna 22 °C; sin excedentes, 19 °C o apagado.

Un ejemplo de cómo podría quedar un día de invierno soleado con esta lógica:

| Hora | Situación | Qué hace la casa |
| :--- | :--- | :--- |
| 08:00 | Poco sol, batería al 40 % | Calefacción mínima (19 °C) |
| 12:00 | Sol pleno, batería al 90 % | Bomba de calor a 22 °C: se "carga" de calor la casa |
| 15:00 | Batería llena, aún hay sol | Mantiene 22 °C y calienta el termo |
| 18:00 | Se va el sol | Baja la consigna a 20 °C; la casa conserva el calor acumulado |
| 23:00 | Noche | 18 °C, o los radiadores de gas solo si hace mucho frío |

La casa funciona como una **batería térmica**: almacenas calor (o fresco) cuando la energía es gratis y lo vas gastando cuando no.

---

## 💧 5. Humedad: el deshumidificador inteligente

En Cantabria, la humedad es un enemigo constante: moho, ropa que no se seca, sensación de frío. Un deshumidificador gasta unos **200–400 W**, que es un consumo perfecto para los excedentes.

En casa, el deshumidificador se enciende solo **cuando hay excedentes**, y Home Assistant me avisa por Telegram (*"Deshumidificador activado. Batería al 95 %"*). Lo gestiono con **PV Excess Control**, que explico en el siguiente apartado.

Si prefieres empezar con algo más sencillo, una automatización a mano que lo encienda cuando la humedad es alta y la batería está casi llena sería así:

```yaml
automation:
  - alias: "Deshumidificador con excedentes"
    trigger:
      - platform: numeric_state
        entity_id: sensor.humedad_salon
        above: 65
      - platform: numeric_state
        entity_id: sensor.ss_battery_soc
        above: 94
    condition:
      - condition: numeric_state
        entity_id: sensor.humedad_salon
        above: 65
      - condition: numeric_state
        entity_id: sensor.ss_battery_soc
        above: 94
    action:
      - service: switch.turn_on
        target:
          entity_id: switch.deshumidificador
      - service: notify.telegram
        data:
          message: "Deshumidificador activado. Batería al 95 %"

  - alias: "Deshumidificador OFF"
    trigger:
      - platform: numeric_state
        entity_id: sensor.humedad_salon
        below: 55
      - platform: numeric_state
        entity_id: sensor.ss_battery_soc
        below: 80
    action:
      - service: switch.turn_off
        target:
          entity_id: switch.deshumidificador
```

*Ajusta los nombres de las entidades a los tuyos.* Fíjate en los **umbrales distintos** para encender y apagar (humedad 65 % / 55 %, batería 94 % / 80 %): evitan que el aparato se encienda y apague cada minuto.


---

## 🏠 6. Domótica: que la casa decida sola

### PV Excess Control: un "director de orquesta" para los excedentes
Cuando tienes varios aparatos que quieres alimentar con lo que sobra (termo, deshumidificadores, depuradora, coche…), escribir una automatización para cada uno se complica: ¿quién va primero?, ¿qué pasa si no hay para todos?, ¿cómo evito que se enciendan y apaguen sin parar?

Para eso uso **[PV Excess Control](https://github.com/nicorusti/ha-advanced-blueprints)**, un *blueprint* de Home Assistant que funciona con **pyscript** (se instala desde HACS). Lo que hace:

* **Reparte los excedentes por prioridades.** Creas una automatización por aparato, cada uno con su prioridad, y el optimizador decide a cuál le toca según lo que sobra.
* **Funciona con inversores híbridos y en vertido cero.** Usa la potencia de los paneles, el consumo de la casa y el nivel de la batería; con vertido cero se apoya en la **previsión de Solcast** para estimar lo que podrías producir.
* **Protege la batería:** intenta que llegue a un nivel de carga objetivo al final del día, teniendo en cuenta tu consumo habitual.
* **Regula, no solo enciende:** para aparatos que lo admiten (como un cargador de coche), ajusta la **corriente** entre un mínimo y un máximo.
* **"Solo encender"** para aparatos como lavadoras o lavavajillas, que no deben apagarse a mitad de programa.

En mi casa gestiona el **termo** y los **deshumidificadores**. El resultado es que el sistema aprovecha mucho mejor la energía que antes se perdía, sin que yo tenga que pensar en ello.

Un par de avisos: hay que configurar pyscript para permitir todas las importaciones, y cuando cambias un ajuste, hay que **ejecutar la automatización a mano** una vez para que se aplique. El propio autor avisa de que el objetivo de batería se cumple con un margen del 5–10 %, no al milímetro.

<!-- 📷 CAPTURA: configuración de PV Excess Control para el termo -->

### Ahorrar sin gastar más
No todo es *encender cosas cuando sobra*. La domótica también ahorra **evitando desperdicios**:

* **Persianas inteligentes.** En invierno, **subirlas** en las horas de sol en las fachadas soleadas: calefacción gratis. En verano, **bajarlas** en las horas de más calor: menos aire acondicionado.
* **Ventana abierta = clima apagado.** Un sensor de apertura en las ventanas que apague el aire o la calefacción si alguien deja una abierta.
* **Consumos fantasma.** Enchufes inteligentes con medida para localizar los aparatos que gastan en reposo (televisores, consolas, cargadores…) y cortarlos de noche. Ojo con el más grande, que a veces es el propio inversor: unos **80–100 W** solo por estar encendido, más de **2 kWh al día**.
* **Medir para decidir.** No se puede mejorar lo que no se mide: un medidor por circuito (o enchufes con medida en los aparatos grandes) te dice dónde va la energía.
* **Avisos útiles.** Que la casa te avise cuando la batería está llena (*"buen momento para poner la lavadora"*) o cuando un aparato termina.

---

## 🧹 7. Las pequeñas cosas

Además de los cambios grandes, muchos pequeños van en la misma dirección:

* **Aspiradora en vez de escoba.** Más cómodo, más limpio, y energía que de otra forma no se aprovechaba.
* **Herramientas de jardín a batería.** Cortacésped, desbrozadora o un **robot cortacésped** que se cargan con el sol y sustituyen a los de gasolina: sin humo, sin ruido de motor y sin comprar combustible.
* **Electrodomésticos a mediodía.** Lavadora, lavavajillas y secadora en las horas de sol.
* **Secar la ropa en días de lluvia.** En el norte, tender en invierno es una lotería. Una **secadora de bomba de calor** (gasta mucho menos que una de resistencia) funcionando con excedentes, o el deshumidificador en el cuarto de tender, evitan la ropa húmeda durante días.
* **Batch cooking con sol.** Horno, olla lenta o freidora de aire a mediodía para cocinar varios días de golpe.
* **Cargar todo de día.** Patinetes, bicis eléctricas, portátiles, herramientas… y el coche, si lo hay.

Casi todo se puede **automatizar**: lo cuento con el código de Home Assistant en el [post de automatizaciones con excedentes](/home-lab/automatizaciones-excedentes/).

---

## 📉 8. El resultado

* **Electricidad:** de abril a septiembre, **cero kWh comprados a la red**.
* **Gas:** el año pasado, **una sola bombona de butano de 11 kg**, y no la terminamos. Cubrió el calentador en los días sin excedentes, los radiadores y la cocina. Unos 140 kWh en todo el año.
* **Contratos:** **ninguno de gas**. Ni término fijo, ni permanencias.

<!-- TODO: cuántas bombonas al año gastabais antes, para comparar -->

Más consumo eléctrico, sí. Pero menos gas, menos dinero, más confort y **más independencia**.

---

## ⚠️ 9. Antes de copiar estas ideas

* **Legionela.** Si pones un termo, asegúrate de que alcanza **60 °C o más con regularidad** (al menos una vez por semana).
* **Fontanería segura.** Válvula de seguridad en el termo y, si tu presión de red es alta, vaso de expansión sanitario.
* **Electricidad bien dimensionada.** Termo, inducción, aire acondicionado… son cargas importantes: circuitos adecuados y relés o contactores del tamaño correcto si los controla la domótica (lo explico en el [post de protecciones](/home-lab/protecciones-cableado/)).
* **No dejes sin agua caliente ni calefacción a nadie si falla la domótica.** Los aparatos deben tener su propio termostato como respaldo; la domótica solo decide *cuándo*.
* **Mantén un plan B.** En invierno, en el norte, habrá semanas sin excedentes. Por eso seguimos teniendo calentador y placa de gas.

---

## ✅ Conclusión

Si vas a poner paneles, **cuenta con que tu consumo eléctrico va a subir**. No es derroche: es **sustitución y aprovechamiento**. Cada kWh de más que sale de tu tejado es gas, gasolina o energía perdida que dejas de pagar o de tirar.

La eficiencia, con autoconsumo, no es gastar menos electricidad. Es **usar mejor la que produces**: en el momento adecuado, con los aparatos más eficientes y con una casa que decide sola.

👉 **¿El siguiente paso?** El **coche eléctrico**, aunque sin prisa: no lo cambiaré hasta que el de combustión diga basta. Con los excedentes del verano saldrían unos 60–100 km gratis al día, y PV Excess Control ya sabe regular la corriente de un cargador. Hice los números en el [post de automatizaciones con excedentes](/home-lab/automatizaciones-excedentes/).
