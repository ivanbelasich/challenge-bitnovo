# Bitnovo Crypto Payment Gateway

Este proyecto es una pasarela de pago con criptodivisas desarrollada en un entorno de testnet. Permite a los merchants crear pagos con diferentes criptomonedas y generar un QR para que los clientes realicen la transacción. Se ha desarrollado en **React.js con hooks y Next.js (pages router)**.

## Mejoras y Consideraciones
Estos son algunos puntos que considero importantes para mejorar el proyecto:
- Testeo unitario e integración: Implementar pruebas unitarias y de integración para garantizar el correcto funcionamiento de los componentes y la aplicación en su conjunto.
- Estructura y nomenclatura de archivos: Mejorar la organización del código siguiendo convenciones claras y separando responsabilidades de manera efectiva.
- Principios SOLID y Clean Architecture: Aplicar estos principios para mejorar la mantenibilidad, escalabilidad y claridad del código.
- Manejo de errores: Mejorar la captura y gestión de errores para evitar fallos inesperados y proporcionar feedback adecuado al usuario.

## 🚀 Tecnologías utilizadas
- **React.js**
- **Next.js (Pages Router)**
- **WebSockets**
- **Wagmi (para integración con wallets como Metamask)**
- **Bitnovo API (Testnet)**
- **TailwindCSS** (para estilos)
- **Vercel** (para despliegue)

## 📌 Características principales
### 1️⃣ Creación de pagos
✅ Los merchants pueden crear un pago indicando:
  - **Importe**
  - **Concepto**
  - **Criptodivisa**

### 2️⃣ Pasarela de pago QR
- Se obtiene la información del pago.
- Se muestra un **QR** con los datos de la transacción.
- La pantalla se actualiza en tiempo real.

✅ Manejo de estados:
- **EX** / **OC**: El pago ha expirado, redirige a una pantalla ❌ KO.
- **CO** / **AC**: El pago se ha realizado correctamente, redirige a una pantalla ✅ OK.

### 3️⃣ Integración con Web3
🔹 Se permite la conexión con wallets como **Metamask** para realizar pagos directamente desde la aplicación.

---

## 📖 Instalación y uso
### 🔧 Requisitos previos
- Node.js 18.8+
- npm o yarn
```
2️⃣ Instala las dependencias:
npm install
```
3️⃣ Crea un archivo **.env.local** con la siguiente configuración:
```sh
NEXT_PUBLIC_API_BASE_URL
NEXT_PUBLIC_DEVICE_ID
NEXT_PUBLIC_WS_URL
NEXT_PUBLIC_PROJECT_ID
```
4️⃣ Inicia el servidor en modo desarrollo:
```sh
npm run dev
```
5️⃣ Abre en el navegador:
```sh
http://localhost:3000
```

---

## 🚀 Despliegue en Vercel
El proyecto está desplegado en **Vercel**. Puedes acceder a la versión en vivo en el siguiente enlace:
https://challenge-bitnovo-seven.vercel.app/

---

## 🔍 Pruebas de pago
Puedes utilizar los siguientes recursos para probar los pagos:
- Web de **XRP testnet** : https://test.xrptoolkit.com/connect-wallet
- Aplicación de test de **BTC** : https://play.google.com/store/apps/details?id=de.schildbach.wallet_test&hl=en&gl=US



