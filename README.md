# Tienda-de-videojuegos

### 🛠️ **Autores** 🛠️
* Luis Enrique Spezzia Jacome
* Marco Antonio Morales Ramoz
* Jesus Antonio Baquero Sacramento

### 🧾 **Introduccion**
Este código es una **aplicación móvil de tienda de videojuegos** desarrollada con **React Native**, usando **JavaScript** y ejecutada o demostrada a través de **Snack ([https://snack.expo.dev](https://snack.expo.dev))**, una plataforma de desarrollo y prueba para apps React Native.

---

### 🛠️ **Tecnologías y librerías utilizadas**

| Tecnología / Librería                         | Descripción                                                            |
| --------------------------------------------- | ---------------------------------------------------------------------- |
| **React Native**                              | Framework para crear apps móviles nativas usando React.                |
| **JavaScript (ES6+)**                         | Lenguaje base del código.                                              |
| **Expo / Snack**                              | Entorno de desarrollo para probar y compartir apps React Native.       |
| **React Navigation (`@react-navigation`)**    | Manejo de navegación entre pantallas (Drawer Navigation en este caso). |
| **react-native-vector-icons** (MaterialIcons) | Íconos usados en UI (carrito, menú, estrellas, etc.).                  |

---

### 📱 **Resumen de funcionalidades de la app**

Es una tienda de videojuegos con las siguientes pantallas y funciones:

#### 1. **Inicio / HomeScreen**

* Lista de productos destacados (scroll horizontal).
* Lista completa de productos con búsqueda.
* Botones para "Agregar al carrito" y "Ver detalles".
* Barra de búsqueda.
* Acceso al menú lateral y carrito.

#### 2. **Detalles del Producto**

* Imagen, título, precio, descripción.
* Reseñas con puntuación (estrellas).
* Botón para agregar al carrito.

#### 3. **Carrito de compras**

* Muestra productos agregados.
* Permite eliminar productos.
* Calcula el total de productos y precio.
* Botón para ir al método de pago.

#### 4. **Método de pago**

* Selección entre tarjeta, PayPal u otros.
* Al seleccionar, navega a confirmación.

#### 5. **Confirmación de compra**

* Muestra el método elegido.
* Botón para finalizar compra (alerta de éxito).

#### 6. **Menú lateral (Drawer Navigation)**

* Navegación a Inicio o Carrito.
* Opción para cerrar el menú.

---

### ✅ **Estado actual del código**

El código está en **buen estado funcional y estructuralmente completo**. Aquí una evaluación detallada:

| Aspecto                          | Estado                                                                                        |
| -------------------------------- | --------------------------------------------------------------------------------------------- |
| ✅ Navegación entre pantallas     | Funciona perfectamente con `Drawer.Navigator`.                                                |
| ✅ Flujo de carrito de compras    | Correcto: agrega, elimina, muestra totales.                                                   |
| ✅ Manejo de estados (`useState`) | Bien implementado con `cart`, `searchQuery`.                                                  |
| ✅ Estilo visual y accesibilidad  | Cuidado con detalles, colores, `accessibilityLabel`.                                          |
| ✅ Modularidad de componentes     | Bien hecho aunque se podrían extraer más componentes reutilizables.                           |
| ✅ Datos de prueba (mock)         | Correctos: `PRODUCTS` incluye imágenes, descripciones y reseñas.                              |
| ❗️Escalabilidad y reusabilidad   | Moderada. Todo está en un solo archivo, lo cual no es ideal para mantenimiento a largo plazo. |
| ❗️Persistencia de datos          | No tiene almacenamiento local (no guarda el carrito si se cierra la app).                     |

---

### 🧠 Posibles mejoras

* Separar componentes (Producto, Reseña, Header, etc.) en archivos distintos.
* Añadir persistencia (por ejemplo, con `AsyncStorage`) para guardar el carrito.
* Añadir validación en el método de pago.
* Incluir autenticación de usuario.
* Incluir más pantallas, como historial de pedidos o perfil.

---

### 🧾 Conclusión

Este es un **proyecto funcional de e-commerce móvil** en React Native que:

* Está completo en cuanto a funciones básicas.
* Usa tecnologías modernas y accesibles.
* Es una buena base para una tienda real con posibilidad de escalar.

### VALORACIÓN PERSONAL 
* ¿Qué fue lo más fácil de implementar?R= Lo más fácil fue implementar las imágenes, botones y los tamaños.
* ¿Qué fue lo más difícil de implementar?R= Lo que estuvo difícil de implementar fue la reacción de los botones, ya que tenían características especiales.
* ¿Qué aprendiste al hacer esta app?R= Aprendi a programar más rápido y a entender mejor a utilizar javascript.
* ¿Qué mejoras implementarias en una siguiente versión?R= Que se puedan ver videos del producto en los comentarios.

<a href="https://ibb.co/HfSB6K6L"><img src="https://i.ibb.co/jPNbm8m9/page1.jpg" alt="page1" border="0"></a>
<a href="https://ibb.co/Kj0BLDsZ"><img src="https://i.ibb.co/kgHz9JDn/page2.jpg" alt="page2" border="0"></a>
<a href="https://ibb.co/fzTNCTyw"><img src="https://i.ibb.co/NdGNLGJB/page3.jpg" alt="page3" border="0"></a>
<a href="https://ibb.co/tpQ761KV"><img src="https://i.ibb.co/yFdwCxPH/page4.jpg" alt="page4" border="0"></a>
<a href="https://ibb.co/bRRxWMrK"><img src="https://i.ibb.co/3YYwr90C/page5.jpg" alt="page5" border="0"></a>
<a href="https://ibb.co/SXPQSj4B"><img src="https://i.ibb.co/ynXh29cq/page6.jpg" alt="page6" border="0"></a>

<a href="https://ibb.co/XZCRNmtg"><img src="https://i.ibb.co/ynQjGLq1/capcodigo1.jpg" alt="capcodigo1" border="0"></a>
<a href="https://ibb.co/d0p5WjYn"><img src="https://i.ibb.co/HDPHFB8m/capcodigo2.jpg" alt="capcodigo2" border="0"></a>
<a href="https://ibb.co/wh5HGj3Y"><img src="https://i.ibb.co/VYfyn5r3/capcodigo3.jpg" alt="capcodigo3" border="0"></a>
<a href="https://ibb.co/2YS9mLxx"><img src="https://i.ibb.co/vvhFgrpp/capcodigo4.jpg" alt="capcodigo4" border="0"></a>
<a href="https://ibb.co/3DKv4GY"><img src="https://i.ibb.co/DxdYzsg/capcodigo5.jpg" alt="capcodigo5" border="0"></a>
<a href="https://ibb.co/k2f2fHG0"><img src="https://i.ibb.co/3mqmqrTW/capcodigo6.jpg" alt="capcodigo6" border="0"></a>
<a href="https://ibb.co/8L0h68rJ"><img src="https://i.ibb.co/ZpVZWTB3/capcodigo7jpg.jpg" alt="capcodigo7jpg" border="0"></a>
<a href="https://ibb.co/ksLRDbHn"><img src="https://i.ibb.co/9kxF4K8X/capcodigo8.jpg" alt="capcodigo8" border="0"></a>
<a href="https://ibb.co/WvMpDX3z"><img src="https://i.ibb.co/DfvgGFbM/capcodigo9.jpg" alt="capcodigo9" border="0"></a>
