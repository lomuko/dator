---
layout: single
title: "Solar Home-Lab VI: Cómo montar una batería LiFePO₄ DIY desde cero"
header:
  overlay_image: /assets/images/solar/solar9.jpg
  overlay_filter: 0.5
sidebar:
  nav: "home_lab_nav"
date: 2026-09-14
collection: porche-solar
tags: [solar, homelab, baterias, lifepo4, diy, jk-bms, deye, autoconsumo]
excerpt: "De 16 celdas sueltas a una batería de 15 kWh por la mitad de precio que una comercial: compra, balanceo, compresión, BMS y conexión al inversor."
toc: true
toc_sticky: true
slug: baterias-diy
order: 6
---

Ya conté en la [selección de hardware](/home-lab/hardware-selection/) que mi banco de unos 15 kWh me costó **1.047 €**. La pregunta que más me hacen desde entonces es la misma: *"¿y eso cómo se monta?"*. Este post es la respuesta larga.

No está escrito solo con mi experiencia. Llevo tiempo leyendo el grupo de Telegram **Solar Diy**, donde cientos de personas han montado (y a veces roto) sus baterías, y aquí recojo lo que se repite una y otra vez: los aciertos y, sobre todo, los errores que conviene no repetir.

> ⚠️ **Aviso:** una batería de 48 V y 300 Ah almacena tanta energía como para soldar una llave inglesa en un cortocircuito. Nada de esto es peligroso si se hace con cabeza, pero tampoco es un juguete. Herramientas aisladas, sin anillos ni relojes, y sin prisas.

---

## 🧭 1. ¿Merece la pena montarla uno mismo?

La comparativa es sencilla:

| | Comercial (rack 15 kWh) | DIY (16 celdas + JK BMS) |
| :--- | :--- | :--- |
| **Precio orientativo** | 2.000 – 3.000 € | 1.000 – 1.500 € |
| **Reparabilidad** | Módulo cerrado | Cambias la celda o el BMS que falle |
| **Soporte** | Garantía del fabricante | Tú y la comunidad |
| **Tiempo** | Enchufar | Un fin de semana + días de balanceo |

En el grupo hay de todo: quien la monta con sus manos, quien compra un **kit con caja metálica** y solo atornilla, y quien prefiere que se la monte otra persona ya probada y balanceada. Si no te ves con un polímetro y una llave dinamométrica, esta última opción es perfectamente sensata.

---

## 🛒 2. Lista de la compra

### Las celdas
El estándar para vivienda es **LiFePO₄ prismática de 3,2 V**, en configuración **16S** (16 en serie = 51,2 V nominales), que es lo que esperan los inversores de "bajo voltaje" tipo Deye.

| Celda | Capacidad | Energía 16S | Precio orientativo* |
| :--- | :--- | :--- | :--- |
| EVE LF280K | 280 Ah | ~14,3 kWh | 60 – 75 $ /ud |
| EVE MB31 | 314 Ah | ~16 kWh | 71 – 80 $ /ud |
| EVE MB56 | 628 Ah | ~32 kWh | ~130 $ /ud |

\* *Precios vistos en el grupo entre agosto y octubre de 2026, con envío desde almacén europeo. Cambian casi cada mes.*

Algunos datos reales de compañeros: 16 celdas EVE de 280 Ah por **~820 € con envío**, o 16 celdas de 320 Ah por **745 €** desde Polonia.

**¿Celdas de 628 Ah?** Es el debate del momento. A favor: un solo BMS para 32 kWh y nada de paralelos. En contra: el banco pesa **más de 200 kg**, si falla una celda pierdes el doble, y si llegan con distinta carga el balanceador tarda una eternidad. La opinión mayoritaria: **dos baterías de 16 kWh mejor que una de 32**, porque si una falla, la otra te sigue dando servicio.

### Grado A vs Grado B
* **Grado A:** celdas de primera, capacidad y resistencia interna muy igualadas, con QR trazable. Son las que se pelean los fabricantes de coches eléctricos.
* **Grado B:** pueden ser nuevas pero fuera de tolerancia, sobrantes o de lote secundario.

Conclusión práctica del grupo: a estos precios, una buena grado B sirve para una vivienda, porque no exiges los ciclos de un coche. Lo importante es **comprar a un proveedor con trayectoria** y que te las cambie si alguna llega mal. Las compras a ciegas en AliExpress han dado más de un susto: bornes quemados con marcas de arco antes incluso de usar la batería.

### El BMS
El rey indiscutible es el **JK BMS** (modelo *PB2A16S20P*, versión V19), con **balanceo activo de 2 A** y pantalla táctil opcional. Ronda los **115 – 130 €**.

Por qué balanceo activo: en vez de quemar en resistencias la energía de las celdas más cargadas, la mueve a las más descargadas. Con celdas de 280–314 Ah, el balanceo pasivo de unos pocos mA no hace prácticamente nada.

### La caja
Tres caminos:
1. **Kit metálico completo** (caja + JK + pantalla + magnetotérmico): ~450 – 490 $.
2. **Caja de rack sin BMS** (JKESS, Yixiang, Tewaycell…): ~160 € puesta en casa.
3. **Caja propia** de madera o perfilería: 20 – 50 € de material. Más trabajo, pero ahí está el orgullo.

### El resto
* Busbars flexibles (normalmente vienen con las celdas).
* Separadores aislantes entre celdas (lámina epoxi, fibra o kevlar).
* Cable de batería **siliconado** (aguanta más temperatura) y terminales de calidad.
* Protección DC: **fusible** (NH o clase T) cerca del positivo y un **magnetotérmico DC** de maniobra.
* **Llave dinamométrica**, polímetro de 4 dígitos y, si puedes, una fuente de laboratorio.

### Ejemplo de presupuesto real
Desglose de un compañero del grupo para una batería de 14 kWh con caja de madera:

| Concepto | Coste |
| :--- | ---: |
| 16 celdas 280 Ah | 827 € |
| JK BMS V19 + pantalla | 126 € |
| Madera | 50 € |
| Magnetotérmico 160 A | 19 € |
| Conectores | 13 € |
| Frontal impreso en 3D | 6 € |
| Varilla roscada + tapones + cables | 11 € |
| **Total** | **1.052 €** |

> 💡 **Ojo con el IVA:** si el proveedor no envía desde un almacén dentro de la UE, o no te da factura, Hacienda puede reclamarte el 21 % más tarde. Pide siempre factura.

---

## 📦 3. Recepción: comprobar antes de montar

Cuando llegan las celdas, **antes de atornillar nada**:

1. **Escanea los QR** para comprobar modelo y fecha de fabricación. *(Que ponga "LiFePO4 B" se refiere a la química, no al grado.)*
2. **Mide la tensión de cada celda.** Deberían llegar muy parejas, en torno a 3,2 – 3,3 V. Si tienes celdas a 3,20 V y otras a 2,94 V, no pasa nada grave, pero **no las montes así sin balancear antes**.
3. **Revisa los bornes**: ni golpes, ni roscas dañadas, ni marcas de arco. Si algo no cuadra, reclama ahora; después será tu palabra contra la suya.
4. **Opcional, pero recomendado:** mide la resistencia interna y agrupa las celdas parecidas.

---

## ⚖️ 4. El top balance (el paso que más problemas evita)

Este es el consejo que más se repite en el grupo, y el error más común de quien empieza.

La curva de tensión del LiFePO₄ es **plana**: entre el 20 % y el 90 % de carga todas las celdas marcan 3,25 – 3,35 V, estén igualadas o no. **Por debajo de 3,40 V es imposible saber si una batería está balanceada.** Las diferencias solo aparecen arriba del todo, en la "rodilla" de carga.

### Cómo se hace
1. Pon **las 16 celdas en paralelo**: todos los positivos juntos y todos los negativos juntos, con busbars o cable grueso.
2. Cárgalas con una **fuente de laboratorio limitada en corriente** hasta **3,60 – 3,65 V**.
3. Deja que la corriente caiga casi a cero y reposen unas horas.

Paciencia: con un cargador de 5 A, un compañero tardó **3 días** en llevar sus celdas de 2,5 V a 3,65 V. Son 280 Ah por celda.

### ¿Y si no tengo fuente?
Puedes montarlo todo y dejar que el JK balancee, pero tienes que mantener la batería **en la ventana de balanceo** (por encima de 3,40–3,45 V por celda) el mayor tiempo posible. Si solo llegas arriba una hora al día con el sol, igualar celdas que vinieron con cargas distintas puede llevar **semanas**. Con celdas del mismo lote y carga parecida, menos de una semana.

**Objetivo:** con las celdas por encima de 3,45 V, una diferencia entre la más alta y la más baja (*delta*) de **10 mV o menos**.

---

## 🔩 5. Montaje mecánico: compresión y apriete

### La compresión no es opcional
Las celdas prismáticas **se hinchan** al ciclar. Los fabricantes especifican trabajar con las celdas **comprimidas**: el datasheet de la EVE LF280K habla de unos **300 kgf** de precarga. En la práctica casi ninguna batería DIY (ni muchas comerciales) llega a esas cifras, pero hay que acercarse:

* Celdas **juntas, sin huecos**, con separadores aislantes entre ellas.
* Placas finales rígidas unidas con **varilla roscada** o perfiles en las esquinas, no con cuatro tornillos para madera.
* Si haces la caja de madera, **refuérzala**. En el grupo hay fotos de cajas reventadas por la expansión, con tornillos arrancados.

### El apriete de los busbars
* Usa la **llave dinamométrica** y el par que indica el datasheet de **tu** celda. Ni a ojo ni "bien fuerte": hay compañeros que han **arrancado el borne** con una carraca pequeña, y esa celda queda inservible.
* Limpia los bornes antes de colocar los busbars.
* **Un busbar flojo** es la causa número uno de desbalanceos raros, calentamientos y lecturas erróneas del BMS. Si siempre es la misma celda la que se descuadra, revisa primero su apriete.

---

## 🧠 6. Cableado y configuración del JK BMS

### Conexión
1. Cables de muestreo (*balance leads*) **en orden**, de B0 (negativo de la celda 1) a B16. Algunos arneses traen un hilo extra en la celda 9: es normal, es para medir mejor esa celda.
2. Sondas de temperatura pegadas a las celdas.
3. Negativo general de la batería → **entrada B− del BMS**. El positivo va directo de la celda 16 al fusible y al magnetotérmico.

### Parámetros que funcionan
Valores habituales en el grupo para 16S, sin apurar la batería para que dure más:

| Parámetro | Por celda | Batería 16S |
| :--- | :--- | :--- |
| Protección sobretensión (OVP) | 3,65 V | 58,4 V |
| Carga completa (bulk / RCV) | 3,45 – 3,50 V | 55,2 – 56,0 V |
| Flotación | 3,40 – 3,45 V | 54,4 – 55,2 V |
| Inicio de balanceo | 3,40 – 3,45 V | — |
| Corte por baja tensión | 2,90 – 3,00 V | 46,4 – 48,0 V |

* **Capacidad:** pon la capacidad de **esa** batería (p. ej. 280 Ah), aunque tengas otras en paralelo. Si las comunicas entre sí, la pantalla maestra ya sumará el total.
* **Calibración del SOC:** el BMS calcula el porcentaje contando la energía que entra y sale, y necesita llegar a **100 % real de vez en cuando** para recalibrarse. Si pasas semanas sin llenarla (típico en invierno), el SOC se descuadra y verás cosas como *"marca 43 % y se ha cortado por vacía"*. Cargarla al 100 % no la estropea; muchos la limitan al 75 % en verano y la suben al 100 % una vez por semana.

---

## 🔌 7. Conexión al inversor

### Sección de cable
Dimensiona según la **corriente máxima del inversor**, no según la batería. Un Deye de 6 kW no pasa de unos 135 A. Como referencia del grupo, **50 mm² aguantan 200–220 A** en tramos de un par de metros. Si dudas, sube de sección: el cable sobredimensionado nunca ha quemado nada.

### Precarga de condensadores
El inversor tiene condensadores enormes en la entrada de batería. Si cierras el magnetotérmico en frío, el pico de corriente produce un chispazo que castiga contactos y condensadores. Lo correcto, y poca gente lo hace, es **precargar**: conectar primero a través de una resistencia de potencia durante unos segundos, comprobar con el polímetro que la tensión se ha igualado y entonces cerrar el magnetotérmico.

### ¿Por voltaje o por comunicación?
El eterno debate del grupo:

* **Por comunicación (CAN / RS485):** el BMS le dice al inversor el SOC y los límites de corriente. En Deye funciona muy bien con el protocolo **Pylontech LV por CAN**. Aprovechas mejor la batería y el inversor sabe exactamente cuánto le queda. Comprueba que en la pantalla del inversor aparece **"Li"** junto al icono de batería; si no, no está comunicando.
* **Por voltaje:** el inversor carga y descarga según tensiones fijas. Es más simple y robusto, sin depender de un cable ni de un protocolo, pero con una pega: ante un pico fuerte de consumo con la batería baja, la tensión cae de golpe y el inversor corta **aunque quede un 20–30 % de energía**.

Mi recomendación: **comunicación** si tu inversor y tu BMS se entienden, y voltaje como plan B.

---

## 🔗 8. Varias baterías en paralelo

* **Solo paralelo.** Los JK no están pensados para poner baterías en serie (dos de 24 V para hacer 48 V). Si un día pasas de 24 V a 48 V, lo sensato es montar una 16S nueva con un solo BMS.
* **Balancea cada batería por separado** (top balance, delta ≤ 10 mV) **antes** de unirlas, y únelas con las dos cargadas.
* **Cables de igual longitud y sección** desde cada batería hasta el embarrado. Toma el positivo general de una batería y el negativo de la otra, o mejor aún, usa un busbar común con un cable principal grueso hasta el inversor.
* Mezclar una batería vieja con una nueva, o 302 Ah con 306 Ah, **funciona**. En paralelo la tensión es la misma por fuerza física; simplemente la de más capacidad aportará algo más de corriente.
* Que dos BMS marquen SOC distintos (10–15 % de diferencia) es **muy habitual** y casi siempre es un problema de cálculo, no de las celdas. Si te obsesiona, un **shunt** (tipo Victron SmartShunt) en el cable general te da un SOC fiable de todo el banco.

---

## 🩺 9. Problemas típicos (y su causa más probable)

| Síntoma | Causa habitual |
| :--- | :--- |
| Una celda siempre más baja que las demás | Busbar flojo o celda distinta (grado B, de otro lote) |
| Delta alto al llegar a 3,5 V | Falta de top balance o poco tiempo en ventana de balanceo |
| El SOC se descuadra en invierno | No llega al 100 % y el BMS no recalibra |
| Corta de noche con SOC "alto" | Pico de consumo con batería baja (modo voltaje) o SOC mal calibrado |
| La batería no carga tras un frío intenso | Protección por temperatura (no cargues LiFePO₄ por debajo de 0 °C) o sonda del inversor mal leída |
| Celda muy descargada y el BMS no deja cargar | Protección por subtensión; en el JK existe la opción *Emergency charge* para recuperarla con cuidado |
| La caja se abre o se deforma | Compresión insuficiente |

Y uno que no es de la batería pero confunde mucho: **el inversor consume solo por estar encendido**, unos 80–100 W. Doce horas de noche suponen más de 1 kWh que no ves en el consumo de la casa.

---

## 🧠 Conclusión

Montar una batería LiFePO₄ no tiene ninguna magia: son 16 celdas en serie, un BMS que las vigila y una caja que las sujeta. La diferencia entre una batería que dura 15 años y una que da guerra cada semana está en cuatro detalles poco vistosos:

1. **Top balance** antes de empezar.
2. **Compresión** de verdad.
3. **Apriete con dinamométrica.**
4. **Llevarla al 100 %** de vez en cuando para que el BMS sepa dónde está.

Lo mejor del camino DIY no es ahorrarse 1.500 €, que también. Es que cuando algo falla sabes **dónde mirar**: qué celda, qué busbar, qué parámetro. Y eso no viene en ninguna batería comercial.

*Gracias a la comunidad del grupo **Solar Diy** de Telegram, de donde sale buena parte de la experiencia que he recogido aquí.*
