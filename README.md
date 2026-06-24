# MecaDáctilo 🖮

Aplicación web interactiva para aprender y practicar mecanografía, diseñada para instituciones educativas. Combina un teclado virtual con manos animadas en 3D que muestran la digitación correcta, retroalimentación en tiempo real y un panel docente para monitoreo de alumnos.

## ✨ Características

- **Lecciones progresivas** — de teclas sueltas a texto libre, con niveles de dificultad
- **Teclado virtual interactivo** — resalta la tecla a presionar y muestra errores al instante
- **Manos animadas** — guía visual de qué dedo usar para cada tecla
- **Métricas en vivo** — PPM (bruto/neto), precisión, KPM, meta de velocidad
- **Dos roles** — alumno (practica y ve su progreso) y profesor (crea lecciones, monitorea grupo)
- **Autenticación** — login con email/contraseña vía Firebase Auth
- **Reportes PDF** — exporta resultados de lecciones
- **Despliegue automático** — GitHub Actions publica en GitHub Pages en cada push a `main`

## 🚀 Demo

[https://rgelabertf.github.io/mecadactilo/](https://rgelabertf.github.io/mecadactilo/)

## 🛠 Tecnologías

| Capa | Tecnología |
|------|-----------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS 4, D3.js |
| Backend | Firebase Auth, Firestore |
| Despliegue | GitHub Pages + GitHub Actions |

## 📦 Desarrollo local

```bash
git clone https://github.com/rgelabertf/mecadactilo.git
cd mecadactilo
npm install
npm run dev
```

### Configuración de Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita **Authentication** (email/contraseña) y **Firestore Database**
3. Copia `.env.example` como `.env` y completa las variables:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_TEACHER_EMAIL=
```

## 📁 Estructura

```
src/
├── components/     # Componentes React
├── data/           # Lógica de negocio y sonidos
├── firebase/       # Configuración y servicios Firebase
├── pages/          # Vistas principales (Login, Student, Teacher)
├── types/          # Tipos TypeScript
└── App.tsx         # Punto de entrada con rutas
```

## 🤝 Contribuir

1. Haz fork del repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Uso educativo — Universidad Autónoma del Carmen
