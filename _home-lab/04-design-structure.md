---
layout: single
title: "Solar Home-Lab (IV): Diseño estructural y montaje"
header:
  overlay_image: /assets/images/solar/solar4.jpg
  overlay_filter: 0.5
sidebar:
  nav: "home_lab_nav"
date: 2026-04-07
collection: porche-solar
tags: [construccion, estructura, bricolaje, soldadura, solar, protecciones]
excerpt: "Del teclado al electrodo: Crónica de cómo levantar una estructura de acero y madera, lidiar con cables cortados y fugas de agua inesperadas."
toc: true
toc_sticky: true
slug: design-structure
order: 4
---

## 🏗️ De los bits a los átomos: El reto físico

Después de meses diseñando, llegó el momento de la verdad. Pasar del diseño en pantalla a la obra real, y mover vigas de más de cuatro metros que no entran en la furgoneta es el primer baño de realidad. Este proyecto no ha sido solo un reto energético; ha sido un curso intensivo de logística, metalurgia y paciencia.

### 📦 El primer obstáculo: El inversor "fantasma"
No todo empezó bien. Compré el inversor en China, pero cuando el envío llegó a Alemania, me informaron de que **habían robado el paquete**. Todo el proyecto se detuvo durante dos meses. Tras pelear la devolución del dinero, decidí comprar el segundo inversor directamente en Alemania para evitar más riesgos. Lección aprendida: a veces lo barato sale caro en tiempo.

---

## 🛠️ Estructura: Precisión milimétrica

Sobre la soldadura, como solemos decir: *"El que no sabe, es como el que no ve"*. No soy soldador profesional, pero con una escuadra magnética y paciencia logré que los pilares quedaran a 90 grados exactos. Una unión bien fundida da la misma satisfacción que compilar un código complejo sin errores a la primera.

Soy perfeccionista, y en una estructura de este tamaño, el error se paga caro. Las vigas de madera se cortaron y ajustaron para que fueran perfectamente paralelas entre sí y perpendiculares a la pared. 

> **Detalle técnico:** Dejé un margen de **3 cm entre placas**. Este espacio es crítico por dos razones: permite que el tornillo de las **grapas universales** baje limpio hacia el centro de la viga y, sobre todo, permite la **dilatación térmica**. Un panel al sol de agosto puede dilatarse varios milímetros; sin ese hueco, los marcos de aluminio acabarían combándose.

---

## ⚓ Cimentación y Estanqueidad: La batalla contra el agua

Para fijar los pilares metálicos al suelo y pared, utilicé **anclaje químico**. A diferencia de un taco de nylon, esto crea una unión molecular con el hormigón. En la pared, instalé un **perfil en L** sobredimensionado para apoyar las vigas. La estructura está calculada para soportar mucho más de los **250 kg** que pesan los paneles. No hay pandeo y es inmune a las galernas de viento de Cantabria.

### El reto del tejado: Ni una gota de agua
Para que el porche sea funcional, el sellado debe ser perfecto. 
* **Sellado:** Utilicé **Polímero MS** en todas las uniones. A diferencia de la silicona, el MS tiene una adherencia brutal sobre metal y madera, es elástico y soporta la radiación UV sin cuartearse. 
* **La realidad de la obra:** Tras el montaje, descubrí que se colaba agua entre placa y placa y en la unión con la fachada. Tuve que volver a subir al tejado para realizar remates a conciencia hasta que el sistema fue totalmente estanco. Ahora, por fin, podemos estar debajo sin miedo a la lluvia.

---

## 🔌 El sistema eléctrico: No todo fue "conectar y listo"

La parte eléctrica fue fluida hasta que cometí el error de manual: **haciendo las rozas para pasar los cables, corté sin querer los cables de la propia casa.**
> **Resultado:** Un día entero sin luz en casa, haciendo empalmes de urgencia. Un recordatorio de que, aunque seas informático senior, un disco de diamante no entiende de capas de red. Desde entonces, el detector de metales es mi mejor amigo antes de picar.

### Configuración técnica
Utilicé **cable de 6 mm²** solar y configuré la instalación en **dos strings de 6 placas** (~10A y 365V). Con este voltaje me aseguro de superar siempre el **voltaje de arranque** del inversor, permitiendo que la producción comience mucho más temprano, incluso en días nublados.

---

## 🛡️ Protecciones: Seguridad de grado profesional

Mi instalación sigue un esquema pensado al detalle para ser resiliente:
* **DC:** Magnetotérmico de **125A** para la batería, **20A** para strings y **sobretensiones de 500V**.
* **AC:** Manguera de **10 mm²** a la acometida y un diferencial **superinmunizado de 300mA** para evitar saltos falsos por la electrónica del inversor.
* **El detalle "Pro":** Instalé un **relé de conmutación NC**. Cuando el sistema entra en modo aislado (Off-grid), el relé se desexcita y une automáticamente el **Neutro con la Tierra**. Esto garantiza que las protecciones de la casa sigan detectando derivaciones y nos protejan de electrocución aunque no haya red externa.

---

## 🔥 Conclusión: Robustez y Resiliencia

La estructura no solo aguanta el peso y el viento; ha sobrevivido a errores de montaje y problemas logísticos. Ver el porche terminado, estanco y funcionando después de haber cortado la luz de mi propia casa y de que me robaran un inversor, hace que el resultado sea mucho más satisfactorio.

👉 **[Solar Home-Lab (V): Precio, amortización y conclusiones](/home-lab/precio-final/)**