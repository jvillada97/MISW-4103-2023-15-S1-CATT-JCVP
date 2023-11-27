# Participantes

Juan Camilo Villada Peñaranda - j.villadap@uniandes.edu.co
Carlos Andrés Tiguaque Tocora - c.tiguaque@uniandes.edu.co

# Pruebas automatizadas con Kraken

Este proyecto de prueba utiliza Kraken para realizar ejecuciones de 15 escenarios. Las pruebas simulan la navegación y la interacción del usuario con elementos en la página web "http://localhost:XXXX/ghost/". Se ejecutan pruebas en las versiones v4.44.0 y v5.68.0 de GHOST, adicionalmente se realiza la ejecucón de Resemble.js y BackstopJS para las pruebas de regresión visual comparando los resultados obtenidos en cada una de las versiones de GHOTS mencionadas

XXXX: Corresponde al puerto donde se encuentre corriendo la aplicación, por defecto en las pruebas se definió el puerto 3001 para la versión 4.44.0 y 2368 para la versión 5.68.0, en caso de requerir utilizar otro puerto para alguna de las versiones se debe modificar en cada feature el paso: "Given I navigate to page "http://localhost:3001/ghost/"" colocando el puerto correspondiente.

- La ejecución de las pruebas en la versión 4.44.0 se realizó con docker:

  ```bash
  docker run -d -e url=http://localhost:3001 -p 3001:2368 --name ghost_4.44 ghost:4.44

  ```

- La ejecución de las pruebas en la versión 5.68.0 se realizó con instalación local de GHOST.

## Requisitos

Asegúrate de tener instaladas las siguientes herramientas:

- [Ghost](https://github.com/TryGhost/Ghost) v5.68.0 y v4.44.0
- [Node.js](https://nodejs.org/) v18.18.1.
- [NPM](https://www.npmjs.com/) v8.19.4
- [Android Debug Bridge](https://developer.android.com/tools/adb?hl=es-419) v1.0.41
- [Chrome](https://www.google.com/intl/es-419/chrome/) v.119.0.x

## Instalación GHOST 4.44.0

Sigue estos pasos para configurar el entorno de prueba:

1. Descarga este repositorio en tu sistema.

2. Abre una terminal y navega al directorio del proyecto y ubicate en la carpeta "GHOST_4_44_0/Kraken".

3. Ejecuta el siguiente comando para instalar las kraken-node:

   ```bash
   npm install kraken-node

   ```

4. Ejecuta el siguiente comando para instalar las dependencias del proyecto:

   ```bash
   npm install

   ```

5. Instala la biblioteca chai ejecutando el siguiente comando:

   ```bash
   npm install chai

   ```

6. Instala la biblioteca appium ejecutando el siguiente comando:

   ```bash
   npm install -g appium

   ```

7. Asegurate de ingresar los datos "EMAIL" y "PASSWORD" correspondientes al usuario administrador de GHOST en el archivo "GHOST_4_44_0/Kraken/properties.json".

8. Si deseas modificar los datos de ejemplo puedes modificarlos en el archivo "GHOST_4_44_0/Kraken/properties.json", sin embargo, esto no es necesario para ejecutar las pruebas.

## Ejecución de pruebas

Para ejecutar las pruebas, sigue estos pasos:

1. Asegurate que esta corriendo correctamente el aplicativo GHOST en la versión correspondiente en el puerto según lo indicado anteriormente.

2. Abre una terminal en el directorio "GHOST_4_44_0/Kraken" del proyecto.

3. Lanza las pruebas con el siguiente comando:

   ```bash
    ./node_modules/kraken-node/bin/kraken-node run

   ```

4. Se abrirá el navegador y comenzarán a ejecutarse las pruebas. No realices ninguna acción en la máquina mientras las pruebas estén en ejecución, ya que esto podría detener la ejecución y producir resultados incompletos.

5. Al finalizar la ejecución, podrás ver los resultados en la terminal, también encontraras evidencia de las ejecuciones en la carpeta "GHOST_4_44_0/Kraken/reports".

6. Asegurate de que en la carpeta "GHOST_4_44_0/Kraken/reports" solo se encuentren las carpetas con los siguientes nombre:

"Delete_Page", "Delete_Post", "Delete_Tag", "Delete_Member", "Edit_name_blog", "Edit_Page","Edit_Post","Edit_Tag","Login","New_member","New_Page","New_Post","New_Tag","Unpublish_Page","Unpublish_post"

Cualquier carpeta o archivo con un nombre diferente se debe eliminar.

## Observaciones

Se creó un archivo .feature por cada escenario con el fin de que la ejecución se realice de forma secuencial, un escenario posterior al otro. Se recomienda inicialmente solo dejar el archivo "0 login.feature" en la carpeta GHOST_4_44_0/Kraken/features y ejecutar la prueba, posteriormente quitar este archivo y dejar todos los demas, esto se debe realizar debido a que la herramienta al tener examples dispara de forma paralela todos los feature y puede presentar bloqueos o resultados no esperados.

En caso de reejecutar las pruebas se recomienda eliminar los post, paginas, tags creados por la aplicación antes de lanzar una reejecución o en su defecto modificar los valores del archivo properties.json, en caso de no realizarlo, se generan errores controlados indicando que ya existen los componentes.

Elementos properties.json:

    "EMAIL": Hace referencia al correo configurado en ghost como administrador
    "PASSWORD": Hace referencia al password del administrador de ghost
    "POST": Nombre del nuevo post a crear, escenario de crear post
    "POST2": Nombre del nuevo post a crear, escenario de despublicar un post
    "TEXT-POST": Texto a ingresar en el post, escenario de crear post y de despublicar post
    "TEXT-POST2": Nuevo nombre del post, escenario editar post
    "PAGE": Nombre de la nueva pagina a crear, escenario de crear pagina
    "PAGE2": Nombre de la nueva pagina a crear, escenario de despublicar una pagina
    "TEXT-PAGE": Texto a ingresar en la pagina, escenario de crear pagina y de despublicar pagina
    "TEXT-PAGE2": Nuevo nombre de la pagina, escenario editar pagina
    "TAG": Nombre del nuevo tag a crear, escenario de crear tag
    "TEXT-TAG":  Texto a ingresar en el tag, escenario de crear tag
    "TEXT-TAG2":  Nuevo nombre del tag, escenario editar tag
    "NAME-BLOG": Nuevo nombre del blog, escenario modificar nombre del blog
    "NAME-BLOG": Nuevo nombre del blog, escenario modificar nombre del blog,
    "NAME-MEMBER": Nombre del nuevo miembro
    "EMAIL-MEMBER": correo del nuevo miembro
    "TEXT-MEMBER": Notas del nuevo miembro

## Instalación GHOST 5.68.0

Sigue estos pasos para configurar el entorno de prueba:

1. Descarga este repositorio en tu sistema.

2. Abre una terminal y navega al directorio del proyecto y ubicate en la carpeta "GHOST_5_68_0/Kraken".

3. Ejecuta el siguiente comando para instalar las kraken-node:

   ```bash
   npm install kraken-node

   ```

4. Ejecuta el siguiente comando para instalar las dependencias del proyecto:

   ```bash
   npm install

   ```

5. Instala la biblioteca chai ejecutando el siguiente comando:

   ```bash
   npm install chai

   ```

6. Instala la biblioteca appium ejecutando el siguiente comando:

   ```bash
   npm install -g appium

   ```

7. Asegurate de ingresar los datos "EMAIL" y "PASSWORD" correspondientes al usuario administrador de GHOST en el archivo "GHOST_5_68_0/Kraken/properties.json".

8. Si deseas modificar los datos de ejemplo puedes modificarlos en el archivo "GHOST_5_68_0/Kraken/properties.json", sin embargo, esto no es necesario para ejecutar las pruebas.

## Ejecución de pruebas

Para ejecutar las pruebas, sigue estos pasos:

1. Asegurate que esta corriendo correctamente el aplicativo GHOST en la versión correspondiente en el puerto según lo indicado anteriormente.

2. Abre una terminal en el directorio "GHOST_5_68_0/Kraken" del proyecto.

3. Lanza las pruebas con el siguiente comando:

   ```bash
    ./node_modules/kraken-node/bin/kraken-node run

   ```

4. Se abrirá el navegador y comenzarán a ejecutarse las pruebas. No realices ninguna acción en la máquina mientras las pruebas estén en ejecución, ya que esto podría detener la ejecución y producir resultados incompletos.

5. Al finalizar la ejecución, podrás ver los resultados en la terminal, también encontraras evidencia de las ejecuciones en la carpeta "GHOST_5_68_0/Kraken/reports".

6. Asegurate de que en la carpeta "GHOST_5_68_0/Kraken/reports" solo se encuentren las carpetas con los siguientes nombre:

"Delete_Page", "Delete_Post", "Delete_Tag", "Delete_Member", "Edit_name_blog", "Edit_Page","Edit_Post","Edit_Tag","Login","New_member","New_Page","New_Post","New_Tag","Unpublish_Page","Unpublish_post"

Cualquier carpeta o archivo con un nombre diferente se debe eliminar.

## Observaciones

Se creó un archivo .feature por cada escenario con el fin de que la ejecución se realice de forma secuencial, un escenario posterior al otro. Se recomienda inicialmente solo dejar el archivo "0 login.feature" en la carpeta GHOST_5_68_0/Kraken/features y ejecutar la prueba, posteriormente quitar este archivo y dejar todos los demas, esto se debe realizar debido a que la herramienta al tener examples dispara de forma paralela todos los feature y puede presentar bloqueos o resultados no esperados.

En caso de reejecutar las pruebas se recomienda eliminar los post, paginas, tags creados por la aplicación antes de lanzar una reejecución o en su defecto modificar los valores del archivo properties.json, en caso de no realizarlo, se generan errores controlados indicando que ya existen los componentes.

Elementos properties.json:

    "EMAIL": Hace referencia al correo configurado en ghost como administrador
    "PASSWORD": Hace referencia al password del administrador de ghost
    "POST": Nombre del nuevo post a crear, escenario de crear post
    "POST2": Nombre del nuevo post a crear, escenario de despublicar un post
    "TEXT-POST": Texto a ingresar en el post, escenario de crear post y de despublicar post
    "TEXT-POST2": Nuevo nombre del post, escenario editar post
    "PAGE": Nombre de la nueva pagina a crear, escenario de crear pagina
    "PAGE2": Nombre de la nueva pagina a crear, escenario de despublicar una pagina
    "TEXT-PAGE": Texto a ingresar en la pagina, escenario de crear pagina y de despublicar pagina
    "TEXT-PAGE2": Nuevo nombre de la pagina, escenario editar pagina
    "TAG": Nombre del nuevo tag a crear, escenario de crear tag
    "TEXT-TAG":  Texto a ingresar en el tag, escenario de crear tag
    "TEXT-TAG2":  Nuevo nombre del tag, escenario editar tag
    "NAME-BLOG": Nuevo nombre del blog, escenario modificar nombre del blog
    "NAME-BLOG": Nuevo nombre del blog, escenario modificar nombre del blog,
    "NAME-MEMBER": Nombre del nuevo miembro
    "EMAIL-MEMBER": correo del nuevo miembro
    "TEXT-MEMBER": Notas del nuevo miembro

# Pruebas automatizadas con Playwright

## Requisitos

Asegúrate de tener instaladas las siguientes herramientas:

- [Ghost](https://github.com/TryGhost/Ghost) v5.68.0
- [Ghost](https://github.com/TryGhost/Ghost) v4.44.0
- [Node.js](https://nodejs.org/) >= v18.17.0
- [NPM](https://www.npmjs.com/) >= v10.2.0

## Instalación

Sigue estos pasos para configurar el entorno de prueba:

1. Descarga este repositorio en tu sistema.

2. Abre una terminal y entra a la raiz del proyecto con cd MISW-4103-2023-15-S1-CATT-JCVP . Dentro de la raiz del proyecto ingresar a la carpeta correspondiente de las pruebas en la versión que quiera ejecutar. Si desea correr las pruebas de la versión 5.68.0 utilice: cd GHOST_5_68_0/playwright_ts/ . Si desea ejecutar la versión 4.44.0 utilice: cd GHOST_4_44_0/playwright_ts/. Si se desean ejecutar las pruebas para las tecnicas de generación de datos se debe usar: cd GHOST_5_68_0/playwright_ts/

3. Ejecuta el siguiente comando para instalar Playwright: npm install playwright, esto debe hacerse en los directorios de ambas versiones.

4. En el mismo folder ejecutar el siguiente comando para descargar faker: npm install @faker-js/faker, esto debe hacerse en los directorios de ambas versiones.

5. Ejecuta el siguiente comando para instalar la dependencia 'node-fetch', esta es necesaria para hacer las solicitudes HTTP a la API de mockaroo: npm install node-fetch 

## Ejecución de pruebas

Para ejecutar las pruebas, sigue estos pasos:

1. Asegurate que esta corriendo correctamente el aplicativo GHOST localmente en el puerto 2368 y 3002 para cada una de las versiones.

2. Dentro de la raiz del proyecto ingresar a la carpeta correspondiente de las pruebas en la versión que quiera ejecutar. Si desea correr las pruebas de la versión 5.68.0 utilice: cd GHOST_5_68_0/playwright_ts/ . Si desea ejecutar la versión 4.44.0 utilice: cd GHOST_4_44_0/playwright_ts/ .

3. Ejecuta el comando: npx playwright test. Este comando ejecutara todas los tests que se encuentran en los archivos dentro del folder "test" dentro de cada una de las carpetas de las versiones.

## Observaciones

Es importante que en caso de que ghost no reconozca el usuario, se debe cambiar por un email valido creado anteriormente en ghost en la sentencia: await page.locator('[id="identification"]').fill('CORREO_VALIDO_AQUI');
y tambien la correspondiente contraseña en la siguiente sentencia: await page.locator('[id="password"]').fill('PASSWORD_AQUI');. Se recomienda hacer este cambio con la ayuda del editor de codigo VS code en todos los archivos dentro del folder "test"

# Pruebas de regresión visual RESEMBLEJS

## Requisitos

Asegúrate de tener instaladas las siguientes herramientas:

- [Node.js](https://nodejs.org/) >= v18.17.0
- [NPM](https://www.npmjs.com/) >= v10.2.0

## Instalación

Sigue estos pasos para configurar el entorno de prueba:

1. Descarga este repositorio en tu sistema.

2. Abre una terminal y navega al directorio del proyecto, adicional hay que ingresar a la carpeta Resemble. Dado que es la raiz del proyecto.

3. Ejecuta el siguiente comando para instalar Playwright:

   ```bash
   npm install playwright

   ```

4. Ejecuta el siguiente comando para instalar resemblejs:

   ```bash
   npm install resemblejs
   ```

## Ejecución de pruebas

Para ejecutar las pruebas, sigue estos pasos:

1. Abre una terminal en el directorio "Resemble" del proyecto.

2. Asegurate que en las carpetas GHOST_4_44_0/Kraken/reports y GHOST_5_68_0/Kraken/reports solo existan carpetas con los nombres:

"Delete_Page", "Delete_Post", "Delete_Tag", "Delete_Member", "Edit_name_blog", "Edit_Page","Edit_Post","Edit_Tag","Login","New_member","New_Page","New_Post","New_Tag","Unpublish_Page","Unpublish_post"

Cualquier archivo o carpeta con un nombre diferente en estas ubicaciones, debe ser eliminado antes de correr las pruebas de regresión visual.

3. Ejecuta el comando para realizar las comparación:

   ```bash
   node index.js

   ```

4. En la carpeta "Resemble/results" se genera una carpeta con la fecha de ejecución, en esta carpeta podrás encontrar las imagenes de cada comparación y un archivo "report.html" con el reporte que se genera como resultado de la ejecución de las pruebas d regresión visual.

# Pruebas de regresión visual Backstop.JS

## Requisitos

Asegúrate de tener instaladas las siguientes herramientas:

- [Node.js](https://nodejs.org/) >= v18.17.0
- [NPM](https://www.npmjs.com/) >= v10.2.0
- [Python](https://www.python.org/) >= 3.11.0

## Instalación

1. Descarga este repositorio en tu sistema.

2. Abre una terminal y navega al directorio del proyecto, adicional hay que ingresar a la carpeta Backstop. Dado que es la raiz del proyecto.

3. Dentro de la carpeta Backstop se debe ejecutar el siguiente comando: npm install -g backstopjs.

## Ejecución de pruebas

1. En este punto hay que verificar que la versión de python instalada en el computador sea >= 3.11.0 Esto se hace con el comando python --version o python3 --version.

2. Utilizando el prefijo que utilizó en el paso anterior (python o python3) ejecute el siguiente comando: python(3) execute.py . Esto ejecutara el script que ejecuta las pruebas de comparación visual entre los screenshots proporcionados por la herramienta Kraken, para cada una de las versiones de ghost.

## Observaciones

Los reportes html generados para cada una de los escenarios de prueba se encontraran en la ruta './backstop_data/' teniendo en cuenta que estamos en la carpeta Backstop del repositorio.

### SEMANA 7

## Instalación GHOST 5.68.0

Sigue estos pasos para configurar el entorno de prueba:

1. Descarga este repositorio en tu sistema.

2. Abre una terminal y navega al directorio del proyecto y ubicate en la carpeta "GHOST_5_68_0/Kraken".

3. Ejecuta el siguiente comando para instalar las kraken-node:

   ```bash
   npm install kraken-node

   ```

4. Ejecuta el siguiente comando para instalar las dependencias del proyecto:

   ```bash
   npm install

   ```

5. Instala la biblioteca chai ejecutando el siguiente comando:

   ```bash
   npm install chai

   ```

6. Instala la biblioteca appium ejecutando el siguiente comando:

   ```bash
   npm install -g appium

   ```

7. Instala la biblioteca csv ejecutando el siguiente comando:

   ```bash
   npm install csv-parser

   ```

8. Instala la biblioteca axios ejecutando el siguiente comando:

   ```bash
   npm install axios

   ```

9. Asegurate de ingresar los datos "EMAIL" y "PASSWORD" correspondientes al usuario administrador de GHOST en el archivo "GHOST_5_68_0/Kraken/properties.json" y en el "GHOST_5_68_0/Kraken/feature/csv/datos.csv". TEN EN CUENTA QUE AL FINALIZAR LAS PRUEBAS SE VA A MODIFICAR TU CORREO Y CONTRASEÑA, LOS PODRAS ENCONTRAR EN EL MISMO ARCHIVO AL FINALIZAR LA EJECUCIÓN.

## Ejecución de pruebas

Para ejecutar las pruebas, sigue estos pasos:

1. Asegurate que esta corriendo correctamente el aplicativo GHOST en la versión correspondiente en el puerto según lo indicado anteriormente.

2. Abre una terminal en el directorio "GHOST_5_68_0/Kraken" del proyecto.

3. Lanza las pruebas con el siguiente comando:

   ```bash
    ./node_modules/kraken-node/bin/kraken-node run

   ```

4. Se abrirá el navegador y comenzarán a ejecutarse las pruebas. No realices ninguna acción en la máquina mientras las pruebas estén en ejecución, ya que esto podría detener la ejecución y producir resultados incompletos.

5. Al finalizar la ejecución, podrás ver los resultados en la terminal, también encontraras evidencia de las ejecuciones en la carpeta "GHOST_5_68_0/Kraken/reports".

## Observaciones

Se creó un archivo .feature por cada escenario con el fin de que la ejecución se realice de forma secuencial, un escenario posterior al otro. Se recomienda inicialmente solo dejar el archivo "0 login.feature" en la carpeta GHOST_5_68_0/Kraken/features y ejecutar la prueba, posteriormente quitar este archivo y dejar todos los demas, esto se debe realizar debido a que la herramienta al tener examples dispara de forma paralela todos los feature y puede presentar bloqueos o resultados no esperados.

En caso de reejecutar las pruebas se recomienda eliminar los post, paginas, tags creados por la aplicación antes de lanzar una reejecución o en su defecto modificar los valores del archivo properties.json, en caso de no realizarlo, se generan errores controlados indicando que ya existen los componentes.

Elementos properties.json:

    "EMAIL": Hace referencia al correo configurado en ghost como administrador
    "PASSWORD": Hace referencia al password del administrador de ghost
