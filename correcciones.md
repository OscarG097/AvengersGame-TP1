- **Muy buena organización del proyecto en carpetas** 👍👍

- **Buena implementación de Drag and Drop** 👍👍

- Lo primero que noté en cuanto a la UX del juego es que los botones son difíciles de reconocer como botones, parecen simplemente texto. Le agregaría algunas ayudas visuales para que el usuario comprenda fácilmente que debe clickear ahí para realizar una acción. Por ejemplo: Un diseño con más forma de botón y un `cursor: pointer` en el `.css`.

- Al entrar a `credits.html` no hay manera de regresar al `index.html` o de ir a alguna otra _page_.

- Deberías permitir también una línea de 4 iguales (y que sume más puntos), podría ser una posible _feature_ a futuro

- Para evitar el movimiento de la pieza aunque no estés haciendo un movimiento ganador, tenés que chequear si `checkRowForThree()` antes de finalizar el `drag`.
