---
title: "Configurar un inversor Deye híbrido paso a paso"
date: 2026-11-27
categories: [energia-solar]
tags: [solar, deye, inversor, bateria, vertido-cero, configuracion]
excerpt: "Puertos GRID, LOAD y GEN, la pinza, el modo de trabajo, la programación horaria y los ajustes de batería: lo que hay que entender para que un Deye haga lo que quieres."
toc: true
toc_sticky: true
header:
  overlay_color: "#1f2933"
  overlay_filter: 0.5
---

El Deye híbrido es, con diferencia, el inversor más popular en el grupo de Telegram **Solar Diy**: barato, admite baterías de cualquier marca (incluidas las DIY), funciona conectado a red y en aislada, y es silencioso. Pero su pantalla tiene **decenas de parámetros**, y el tema *Inversores* del grupo, con unos 16.000 mensajes, está lleno de dudas del tipo *"¿por qué hace esto mi Deye?"*.

Este post recoge la configuración básica de un Deye monofásico de baja tensión (las series de 5, 6 y 8 kW), y los problemas que más se repiten.

> 📝 Los nombres de los menús pueden variar algo entre modelos y versiones de firmware, y la traducción al español de la pantalla no siempre ayuda. Ten el manual de tu modelo a mano.

<!-- 📷 CAPTURA: pantalla principal del Deye -->

---

## 🔌 1. Los tres puertos de alterna

Es la primera fuente de confusión. El Deye tiene **tres conexiones de alterna** y cada una tiene un papel:

| Puerto | Qué se conecta | Qué pasa si se va la luz |
| :--- | :--- | :--- |
| **GRID** | La red de la compañía | Se queda sin tensión |
| **LOAD** (*backup*) | Las cargas que quieres que **sigan funcionando sin red** | Sigue funcionando con paneles y batería |
| **GEN** | Un **generador**, **microinversores** o **cargas inteligentes** | Según cómo lo configures |

La decisión importante es **qué cuelgas de LOAD**. Mucha gente del grupo pone **toda la casa** en LOAD: si se va la luz, ni se entera. El límite es la potencia del inversor: un Deye de 6 kW no puede dar más de 6 kW por LOAD, y si lo superas en modo isla, se para.

Lo que no cuelgue de LOAD (por ejemplo, un cargador de coche de 7 kW) se queda en el lado de GRID: funciona con red, pero no en un apagón.

### El puerto GEN, tres en uno
En la configuración del puerto GEN eliges para qué lo usas:
* **Entrada de generador:** para cargar la batería y alimentar la casa con un grupo electrógeno (lo cuento en el [post del generador](/energia-solar/generador-apoyo-deye/)).
* **Entrada de microinversores:** para aprovechar una instalación antigua de microinversores o un inversor de red (*AC coupling*). El Deye la gestiona como producción solar.
* **Salida de carga inteligente** (*Smart Load*): una salida que se activa solo cuando sobra energía. Útil para un termo o una bomba.

---

## 📏 2. La pinza (o el medidor)

Para saber cuánto consumes de la red, el Deye necesita una **pinza amperimétrica (CT)** o un **medidor** (los Chint de carril DIN son los habituales). Sin ella, no puede hacer vertido cero ni saber el consumo de la casa.

Errores típicos del grupo:
* **La pinza tiene que abrazar la fase de entrada desde el contador**, antes de cualquier derivación. Si la pones después de una derivación (por ejemplo, la del cargador del coche), el Deye no verá ese consumo.
* **La flecha de la pinza** tiene que apuntar en la dirección correcta (normalmente, hacia el inversor). Si está al revés, verás que "vierte" cuando consumes.
* **Alejarla mucho** del inversor alargando el cable da lecturas raras. Un compañero la movió 13 metros para meter un cargador de coche y empezó a tener problemas. Para distancias largas, mejor un **medidor por RS485**.

---

## ⚙️ 3. El modo de trabajo

En el menú de modo de trabajo del sistema (*System Work Mode*) hay tres opciones principales:

| Modo | Qué hace | Cuándo |
| :--- | :--- | :--- |
| **Selling First** | Prioriza vender a la red | Casi nunca en una vivienda |
| **Zero Export to Load** | Solo produce lo que consumen las cargas de LOAD | Si **toda la casa** está en LOAD y no necesitas pinza |
| **Zero Export to CT** | Produce lo que consume toda la casa, medido con la pinza | **El más habitual**: casa en GRID y/o LOAD con pinza |

Y dos ajustes que lo acompañan:
* **Solar Export / Max Sell Power:** si permites verter excedentes a la red y cuántos vatios como máximo. Con **autoconsumo sin excedentes**, desactívalo (la normativa exige antivertido; lo cuento en el [post de legalización](/home-lab/legalizacion/)).
* **Energy Pattern:** *Battery First* (lo que sobra de los paneles va primero a la batería) o *Load First* (primero a las cargas, y lo que sobra a la batería). Con batería, lo normal es *Load First*.

---

## 🕐 4. La programación horaria (Time of Use)

Es la parte más potente y la que más dudas genera. Hay **seis franjas** horarias y en cada una defines:

| Columna | Significado |
| :--- | :--- |
| **Hora de inicio** | Desde cuándo aplica la franja (hasta el inicio de la siguiente) |
| **Potencia** | Potencia máxima de descarga de la batería en esa franja |
| **SOC (o tensión)** | **Hasta dónde puede bajar** la batería en esa franja… o **hasta dónde cargarla** si marcas carga |
| **Grid** | Si está marcada, **carga la batería desde la red** hasta ese SOC |
| **Gen** | Igual, pero desde el generador |

Ejemplo típico con tarifa de tres periodos:

| Franja | SOC | Grid | Para qué |
| :--- | :---: | :---: | :--- |
| 00:00 – 08:00 (valle) | 30 % | ☐ | Usa la batería por la noche, pero guarda un 30 % |
| 08:00 – 18:00 | 20 % | ☐ | Día: el sol carga, la batería cubre picos |
| 18:00 – 00:00 (punta) | 20 % | ☐ | Usa la batería en las horas caras |

En invierno, si mañana va a hacer mal día, puedes marcar **Grid** en la franja valle con un SOC objetivo para cargar barato de madrugada. Mejor aún: que lo decida **Home Assistant** según la previsión solar, como cuento en el [post de automatizaciones](/home-lab/automatizaciones-excedentes/).

> ⚠️ Hay que activar la casilla de **Time of Use** para que las franjas se apliquen. Si no está activada, el Deye las ignora.

**Peak Shaving** (*Grid Peak Shaving*) es otra opción relacionada: limita lo que el inversor puede tirar de la red. Útil si tienes poca potencia contratada, pero ojo: un compañero del grupo vio cómo, al forzar una carga de batería desde red, el Deye **se saltaba el límite de Peak Shaving**. Si dependes de él para no superar tu potencia contratada, pruébalo antes con cuidado.

---

## 🔋 5. Ajustes de batería

En el menú de batería (*Battery Setting*):

### Tipo de control
* **Lithium:** el Deye habla con el BMS (por **CAN**, normalmente con protocolo compatible Pylontech). Es lo recomendado: el inversor sabe el SOC real, los límites de corriente y las alarmas del BMS.
* **Use Batt V:** trabaja por tensión, sin comunicación.
* **Use Batt %:** trabaja por porcentaje estimado. El menos fiable.

En el grupo hay un debate eterno entre trabajar **por voltaje** o **por comunicación** (lo resumí en el [post de baterías DIY](/home-lab/baterias-diy/)). La conclusión práctica: **comunicación** si tu BMS y tu inversor se entienden bien; **voltaje** como plan B. Y un detalle: con comunicación, comprueba que aparece **"Li"** junto al icono de la batería en la pantalla; si no aparece, no está comunicando.

Para conectar un JK BMS al Deye por CAN, en el JK se elige el protocolo compatible (Pylontech de baja tensión) y se usa un cable con los pines de CAN correctos en los dos extremos. Si además quieres leer el inversor desde Home Assistant por el mismo conector, mira el [cable en Y que uso yo](/home-lab/home-assistant-rs485/).

### Límites
* **Corriente máxima de carga y descarga:** no más de lo que permita el BMS (y la sección de los cables).
* **Shutdown / Low Batt / Restart:** a qué nivel se apaga, a cuál avisa de batería baja y a cuál vuelve a arrancar. Si el nivel de *Restart* está muy alto, en aislada te puedes quedar **sin luz hasta que el sol suba la batería** a ese nivel, aunque ya haya algo de carga. Es una consulta frecuente en el grupo.
* **Activate Battery:** intenta "despertar" una batería que el BMS ha cortado por tensión demasiado baja. Útil para recuperarla tras una descarga profunda.

### El problema de la flotación con JK por CAN
Un problema reportado varias veces con **Deye + JK por CAN conectado a red**: tras llegar a la tensión de carga, el inversor entra en flotación y la batería va **perdiendo SOC lentamente durante la tarde**, aunque haya sol. Las soluciones que se comentan pasan por revisar los parámetros de carga y flotación del BMS, y en algún caso trabajar por tensión. Si te pasa, en el tema *JK BMS* del grupo hay muchas vueltas a este asunto.

---

## 🏝️ 6. Modo isla y seguridad

Si cuelgas la casa de **LOAD**, cuando se va la red el Deye pasa a **modo isla**. Dos cosas a tener en cuenta (más detalle en el [post de protecciones](/home-lab/protecciones-cableado/)):

* **Neutro y tierra:** en isla, el neutro de la casa queda desconectado del de la compañía. El Deye tiene una salida **ATS** que, con la *señal de modo isla* activada, puede gobernar un contactor que una neutro y tierra solo en ese momento, para que los diferenciales funcionen.
* **Diferenciales que saltan al conmutar:** si el contactor no es lo bastante rápido, algunos diferenciales saltan en el cambio. Alimentarlo desde la salida ATS del Deye suele resolverlo.

---

## 🩺 7. Problemas típicos

| Síntoma | Causa habitual |
| :--- | :--- |
| No lee el consumo de la casa ni lo que importo | Falta la pinza o está mal colocada / al revés |
| "Vierte" cuando consumo | Pinza al revés |
| Las franjas horarias no hacen nada | Falta activar *Time of Use* |
| La batería no se carga al 100 % y el SOC se descuadra | Parámetros de carga/flotación del BMS, o falta de calibración del SOC |
| En aislada, sin luz por la mañana aunque hay algo de batería | Nivel de *Restart* demasiado alto |
| Pasa a *off-grid* cada poco | Inestabilidad en la red, ajustes de red (grid code) o conexiones de GRID |
| No reconoce el generador | Frecuencia o tensión inestables del generador; ver el [post del generador](/energia-solar/generador-apoyo-deye/) |

---

## 🛡️ 8. Garantía: compra en el canal oficial

Un aviso que circuló en el grupo en agosto de 2026: según las circulares que recibieron algunas tiendas, **Deye España solo atendería garantías de equipos comprados a través de su canal de distribución oficial en España**. No he podido confirmarlo en una fuente oficial, pero el consejo es sensato igualmente: **compra a un distribuidor oficial en España y guarda la factura**. Lo barato de un importador desconocido puede salir caro si el inversor falla.

---

## ✅ Conclusión

Un Deye bien configurado es un inversor excelente, pero no es *plug and play*. Si tuviera que quedarme con cinco ajustes:

1. **Qué va en LOAD** (lo que quieres que funcione sin red).
2. **La pinza**, en la entrada y en la dirección correcta.
3. **Zero Export to CT** y *Solar Export* según tu modalidad legal.
4. **Time of Use activado**, con SOC mínimos razonables.
5. **Batería en modo Lithium**, comunicando, con "Li" en pantalla.

*Gracias a la comunidad del grupo **Solar Diy** de Telegram, cuyo tema de inversores es la mejor documentación no oficial del Deye.*
