---
title: "De 120.000 mensajes de Telegram a una serie de posts, con IA"
date: 2026-11-06
categories: [ia]
tags: [ia, llm, python, telegram, blog, productividad]
excerpt: "Cómo he usado un asistente de IA para destilar años de conversaciones de grupos de Telegram en posts técnicos, y dónde hay que tener cuidado."
toc: true
toc_sticky: true
header:
  overlay_color: "#1f2933"
  overlay_filter: 0.5
---

Llevaba tiempo con una lista de posts pendientes para la [serie Solar Home](/home-lab/): baterías DIY, protecciones, Home Assistant por RS485, legalización… Y tenía una mina de información sin explotar: los grupos de Telegram donde paso el rato, con **años de conversaciones de gente montando exactamente lo mismo que yo**.

El grupo **Solar Diy** tiene unos 120.000 mensajes desde 2022. El de domótica **Un Loco y su Tecnología**, más de 250.000. Leerlos a mano es imposible. Así que probé a hacerlo con un asistente de IA, y este post cuenta cómo, qué salió bien y qué no.

---

## 🧭 1. El flujo de trabajo

### Paso 1: exportar el chat
Telegram Desktop permite exportar un grupo en **JSON** (*Exportar historial del chat* → formato JSON). Sin fotos ni vídeos, el fichero ocupa entre 60 y 160 MB y contiene cada mensaje con su fecha, autor, texto y a qué mensaje responde.

Primera lección: **el export tarda**. La primera vez le pasé al asistente el fichero cuando Telegram aún lo estaba escribiendo, y el JSON llegó cortado. Espera a que Telegram diga que ha terminado.

### Paso 2: reconstruir los temas
Los supergrupos modernos están organizados en **temas** (*Baterías DIY*, *Inversores*, *Domótica*…), pero el JSON no dice directamente a qué tema pertenece cada mensaje. Solo indica a qué mensaje responde. Hay que **seguir la cadena de respuestas** hasta llegar al mensaje que creó el tema.

Este es el script que generó el asistente para eso, con una pequeña caché para no recorrer las mismas cadenas mil veces:

```python
import json

data = json.load(open("result.json", encoding="utf-8"))
msgs = data["messages"]
by_id = {m["id"]: m for m in msgs}
topics = {m["id"]: m["title"] for m in msgs if m.get("action") == "topic_created"}

memo = {}
def topic_of(msg):
    path, cur = [], msg
    while True:
        if cur["id"] in memo:
            result = memo[cur["id"]]; break
        if cur["id"] in topics:
            result = cur["id"]; break
        parent = cur.get("reply_to_message_id")
        if parent is None or parent not in by_id:
            result = None; break       # mensaje del tema "General"
        path.append(cur["id"]); cur = by_id[parent]
    for i in path + [msg["id"]]:
        memo[i] = result
    return topics.get(result, "General")
```

Con eso, contar mensajes por tema ya da una idea clara de qué preocupa a la gente: en Solar Diy, después del general, **Baterías DIY** e **Inversores**. Y buscando palabras clave, el tema más hablado de todos resultó ser **protecciones y cableado**, que acabó siendo [un post](/home-lab/protecciones-cableado/).

### Paso 3: filtrar, no resumir todo
Pasarle 120.000 mensajes a un modelo no tiene sentido. Lo que funcionó fue:

1. **Filtrar por tema y palabras clave** (por ejemplo `rs485|kellerza|modbus|pinout` para el post de RS485).
2. **Quedarse con los mensajes largos**, que suelen ser explicaciones, y descartar los "gracias" y "a mí también me pasa".
3. **Medir tendencias por año** (cuántas veces se menciona cada coordinador Zigbee en 2023, 2024, 2025…), que da datos que ningún resumen manual daría.

Con unos cientos de mensajes relevantes, el asistente ya puede extraer los patrones: los consejos que se repiten, los errores más comunes, los debates sin consenso.

### Paso 4: escribir en el formato de la web
El asistente leyó mis posts anteriores para copiar el estilo: *front matter* de Jekyll, emojis en los títulos, tablas, separadores, el tono. Y escribió cada post directamente en la carpeta de mi web.

### Paso 5: contrastar con fuentes oficiales
Lo que dice un grupo de Telegram no es palabra de Dios. Para cada post, el asistente contrastó lo técnico con la **documentación oficial** (la de los addons de Home Assistant, el BOE para la normativa de autoconsumo, la Agencia Tributaria para las deducciones) y me dio la lista de fuentes.

---

## ✅ 2. Lo que funcionó muy bien

* **Encontrar el consenso.** Cuando cien personas distintas recomiendan poner el dongle Zigbee con un alargador USB, es un consejo sólido. La IA es muy buena detectando esas repeticiones.
* **Datos cuantitativos.** "El tema más hablado del grupo son las protecciones, con más de 2.000 mensajes" es una frase que yo nunca habría podido escribir leyendo a mano.
* **Experiencias reales.** Los mejores párrafos de los posts son casos concretos: la caja de madera que reventó por la expansión de las celdas, el diferencial que salta al limpiar los paneles, el borne arrancado por apretar sin dinamométrica.
* **El trabajo aburrido.** Adaptar el formato, añadir las entradas al menú, enlazar los posts entre sí.

---

## ⚠️ 3. Dónde hay que tener cuidado

### Privacidad
Los mensajes son de personas reales en un grupo **no público**. Reglas que seguimos:
* **Ningún nombre de usuario** en los posts. Se cita "un compañero del grupo", nunca a quién.
* **Ninguna foto ajena.** El export no incluía fotos, pero aunque las hubiera incluido, no se publica el trabajo de otros sin permiso.
* **Ningún vendedor concreto** recomendado con nombre propio a partir de mensajes del grupo.

### La IA no sabe lo que no está en los datos
Varias veces el asistente se paró a decir "esto no lo puedo confirmar":
* El **pinout del puerto RS485 del JK BMS**: en el grupo se dice que es pin 1 y 2, pero el manual no estaba accesible. En el post quedó escrito así, con el aviso de comprobarlo.
* Los **nombres exactos de las entidades** de Home Assistant: dependen de la versión del addon y del prefijo de cada uno. El post avisa de comprobarlos.
* **Detalles de mi propia instalación** que no estaban en ningún sitio. Los dejó marcados como pendientes en vez de inventarlos.

Esa es la actitud que hay que exigir: **una IA que dice "no lo sé" es mucho más útil que una que rellena huecos con algo que suena bien**.

### Los errores técnicos también existen
El fallo más curioso: el post de automatizaciones incluía plantillas de Home Assistant con condiciones `if` / `elif` entre llaves y porcentajes. **Jekyll usa la misma sintaxis de plantillas (Liquid)** e intentó ejecutarlas, y la web dejó de compilar con un `Unknown tag 'elif'`. La solución es envolver esos bloques de código en las etiquetas `raw` / `endraw` de Liquid, para que Jekyll los muestre tal cual. Un error que yo tampoco habría visto venir, pero que hay que revisar.

Y otro muy humano: tenía el fichero abierto en VS Code mientras el asistente lo corregía, guardé, y **pisé su corrección**. Si una IA está editando tus ficheros, no los tengas abiertos con cambios en el editor.

### La revisión final es tuya
Todo lo que publica la web lleva mi nombre. Por eso ningún post sale sin pasar por mí: leerlo entero, corregir lo que no cuadra con mi experiencia y añadir mis fotos y detalles. Los borradores llegan con las fotos y los datos que faltan marcados como pendientes, precisamente para eso. **La IA hace el borrador y la investigación; el criterio y la responsabilidad siguen siendo míos.**

---

## 🧠 Conclusión

Lo que me ha sorprendido no es que la IA escriba bien (eso ya se daba por hecho), sino que permite **aprovechar conocimiento que estaba atrapado** en conversaciones imposibles de leer. Años de experiencia colectiva de un grupo, convertidos en guías ordenadas, contrastadas y con fuentes.

Mi fórmula, si quieres probarlo:

1. **Datos propios y concretos** (un export, tus notas, tu código), no "escríbeme un post sobre X".
2. **Filtrar con código** antes de pedir que resuma.
3. **Contrastar** lo técnico con fuentes oficiales.
4. **Privacidad** por defecto: nada de nombres ni material ajeno.
5. **Revisar y firmar tú.**

*Y sí: este post también lo he preparado con ayuda de la IA, a partir de la propia conversación en la que hicimos todo lo anterior.*
