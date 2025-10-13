# RedColabora - Marketplace Social para PYMEs

RedColabora es una plataforma digital de tipo marketplace social diseñada para conectar pequeñas y medianas empresas (PYMEs), proveedores y consumidores en Santiago, Chile, con un enfoque en promover la economía colaborativa.

## 🎯 Objetivo del Proyecto

Abordar las dificultades que enfrentan las PYMEs locales para ganar visibilidad digital y competir en un mercado dominado por grandes plataformas de e-commerce como Mercado Libre o Amazon. La plataforma busca fortalecer la economía local al facilitar la interacción, confianza y colaboración entre negocios y usuarios en un entorno digital accesible, seguro e inclusivo.

## 🚀 Características Principales

- **Registro de Usuarios**: Sistema de autenticación con Supabase Auth
  - Tipos de usuario: PYME o Consumidor
  - Campos personalizados: comuna, consentimiento RGPD (Ley 19.628)
  - Confirmación por email

- **Búsqueda de Negocios**: Filtros por comuna y categoría
  - Grid responsive de resultados
  - Links a perfiles detallados

- **Perfiles de Negocio**: Páginas dinámicas con SSR
  - Información completa del negocio
  - Sistema de reseñas (rating 1-5 estrellas)
  - Sistema de recomendaciones
  - Edición para dueños

- **Dashboard**: Panel personalizado según tipo de usuario
  - Vista de perfil
  - Gestión de negocios (para PYMEs)

- **Página de Cotizaciones**: Información sobre el servicio

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 15 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **UI Components**: Radix UI + shadcn/ui
- **Deployment**: Vercel

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase (gratuita)
- Cuenta de Vercel (opcional, para deploy)

## 🔧 Instalación y Configuración

### 1. Clonar el Repositorio

\`\`\`bash
git clone <tu-repositorio>
cd redcolabora
\`\`\`

### 2. Instalar Dependencias

\`\`\`bash
npm install
\`\`\`

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key

# Development Redirect URL (para confirmación de email)
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/search
\`\`\`

**¿Dónde encontrar estas variables?**

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. Ve a Settings > API
3. Copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ NUNCA expongas esta key en el cliente)

### 4. Configurar Base de Datos en Supabase

Ejecuta los siguientes scripts SQL en orden en el SQL Editor de Supabase:

#### Script 1: Crear tabla de usuarios
\`\`\`sql
-- Ubicación: scripts/001_create_users_table.sql
-- Crea la tabla users con campos: type, comuna, consent_rgpd
-- Incluye Row Level Security (RLS) policies
\`\`\`

#### Script 2: Crear tabla de negocios
\`\`\`sql
-- Ubicación: scripts/002_create_businesses_table.sql
-- Crea la tabla businesses con información de PYMEs
-- Incluye RLS policies
\`\`\`

#### Script 3: Seed de negocios (datos de ejemplo)
\`\`\`sql
-- Ubicación: scripts/003_seed_businesses.sql
-- Inserta 10 negocios de ejemplo para testing
\`\`\`

#### Script 4: Crear tabla de reseñas
\`\`\`sql
-- Ubicación: scripts/004_create_reviews_table.sql
-- Crea la tabla reviews con rating y comentarios
-- Incluye RLS policies
\`\`\`

#### Script 5: Crear tabla de recomendaciones
\`\`\`sql
-- Ubicación: scripts/005_create_recommendations_table.sql
-- Crea la tabla recommendations
-- Incluye RLS policies
\`\`\`

#### Script 6: Trigger de perfil automático
\`\`\`sql
-- Ubicación: scripts/006_create_user_profile_trigger.sql
-- Crea un trigger que automáticamente crea el perfil del usuario
-- cuando se registra en auth.users
\`\`\`

**Instrucciones para ejecutar scripts:**

1. Ve a tu proyecto en Supabase Dashboard
2. Navega a SQL Editor
3. Crea una nueva query
4. Copia y pega el contenido de cada script en orden
5. Ejecuta cada script (botón "Run")
6. Verifica que no haya errores

### 5. Configurar Autenticación en Supabase

1. Ve a Authentication > Providers en Supabase Dashboard
2. Asegúrate de que "Email" esté habilitado
3. En Authentication > URL Configuration:
   - Site URL: `http://localhost:3000` (desarrollo) o tu dominio de producción
   - Redirect URLs: Agrega `http://localhost:3000/search` y tu URL de producción

### 6. Ejecutar en Desarrollo

\`\`\`bash
npm run dev
\`\`\`

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

\`\`\`
redcolabora/
├── app/                          # App Router de Next.js
│   ├── layout.tsx               # Layout principal con Navbar
│   ├── page.tsx                 # Página de inicio
│   ├── register/                # Registro de usuarios
│   │   ├── page.tsx            # Formulario de registro
│   │   └── success/            # Página de éxito post-registro
│   ├── login/                   # Inicio de sesión
│   │   └── page.tsx            # Formulario de login
│   ├── search/                  # Búsqueda de negocios
│   │   └── page.tsx            # Página con filtros y resultados
│   ├── business/[id]/           # Perfil dinámico de negocio
│   │   ├── page.tsx            # Página de detalle (SSR)
│   │   └── not-found.tsx       # 404 personalizado
│   ├── dashboard/               # Panel de usuario
│   │   └── page.tsx            # Dashboard personalizado
│   ├── profile/                 # Perfil de usuario
│   │   └── page.tsx            # Página de perfil
│   ├── error.tsx                # Error boundary global
│   ├── loading.tsx              # Loading state global
│   ├── not-found.tsx            # 404 global
│   └── globals.css              # Estilos globales + tema Tailwind
│
├── components/                   # Componentes reutilizables
│   ├── navbar.tsx               # Navegación principal
│   ├── logout-button.tsx        # Botón de cerrar sesión
│   ├── protected-route.tsx      # HOC para rutas protegidas
│   ├── error-boundary.tsx       # Error boundary component
│   ├── performance-monitor.tsx  # Monitor de rendimiento
│   ├── business-edit-form.tsx   # Formulario de edición de negocio
│   ├── review-form.tsx          # Formulario de reseñas
│   └── recommendation-button.tsx # Botón de recomendación
│
├── lib/                          # Utilidades y configuración
│   ├── supabase/
│   │   ├── client.ts            # Cliente Supabase para browser
│   │   ├── server.ts            # Cliente Supabase para server
│   │   └── middleware.ts        # Helper para middleware
│   └── auth-helpers.ts          # Funciones de autenticación
│
├── scripts/                      # Scripts SQL para Supabase
│   ├── 001_create_users_table.sql
│   ├── 002_create_businesses_table.sql
│   ├── 003_seed_businesses.sql
│   ├── 004_create_reviews_table.sql
│   ├── 005_create_recommendations_table.sql
│   └── 006_create_user_profile_trigger.sql
│
├── public/                       # Assets estáticos
│   ├── manifest.json            # PWA manifest
│   └── icon-*.jpg               # Iconos PWA
│
├── middleware.ts                 # Middleware de Next.js (auth refresh)
├── next.config.mjs              # Configuración de Next.js
├── tailwind.config.ts           # Configuración de Tailwind
├── tsconfig.json                # Configuración de TypeScript
└── package.json                 # Dependencias del proyecto
\`\`\`

## 🗄️ Esquema de Base de Datos

### Tabla: users
\`\`\`sql
- id: uuid (PK, referencia a auth.users)
- type: text ('pyme' | 'consumer')
- comuna: text
- consent_rgpd: boolean
- created_at: timestamp
\`\`\`

### Tabla: businesses
\`\`\`sql
- id: uuid (PK)
- user_id: uuid (FK → users.id)
- name: text
- description: text
- category: text
- comuna: text
- address: text
- phone: text
- email: text
- website: text
- created_at: timestamp
\`\`\`

### Tabla: reviews
\`\`\`sql
- id: uuid (PK)
- business_id: uuid (FK → businesses.id)
- user_id: uuid (FK → users.id)
- rating: integer (1-5)
- comment: text
- created_at: timestamp
\`\`\`

### Tabla: recommendations
\`\`\`sql
- id: uuid (PK)
- business_id: uuid (FK → businesses.id)
- user_id: uuid (FK → users.id)
- created_at: timestamp
\`\`\`

## 🔒 Seguridad

- **Row Level Security (RLS)**: Todas las tablas tienen políticas RLS habilitadas
- **Autenticación**: Supabase Auth con confirmación de email
- **Variables de entorno**: Service role key nunca expuesta al cliente
- **HTTPS**: Obligatorio en producción (Vercel lo maneja automáticamente)

## ♿ Accesibilidad

El proyecto cumple con WCAG 2.1 AA:
- ARIA labels en todos los elementos interactivos
- Navegación por teclado optimizada
- Contraste de colores adecuado
- Roles semánticos (role="list", role="navigation", etc.)
- Focus states visibles
- Alt text en imágenes

## 🚀 Deploy en Vercel

### Opción 1: Deploy desde v0

1. Haz clic en el botón "Publish" en la interfaz de v0
2. Conecta tu cuenta de Vercel
3. Configura las variables de entorno en Vercel
4. Deploy automático

### Opción 2: Deploy manual

1. Instala Vercel CLI:
\`\`\`bash
npm i -g vercel
\`\`\`

2. Deploy:
\`\`\`bash
vercel
\`\`\`

3. Configura las variables de entorno en Vercel Dashboard:
   - Ve a tu proyecto en Vercel
   - Settings > Environment Variables
   - Agrega todas las variables de `.env.local`

4. Actualiza la URL de redirect en Supabase:
   - Ve a Authentication > URL Configuration
   - Agrega tu URL de producción de Vercel

## 📝 Comandos Útiles

\`\`\`bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Ejecutar build localmente
npm run start

# Linting
npm run lint
\`\`\`

## 🐛 Troubleshooting

### Error: "Email not confirmed"
- Revisa tu email para el link de confirmación
- Verifica que la URL de redirect esté configurada en Supabase
- Usa el botón "Reenviar email" en la página de login

### Error: "supabase.from is not a function"
- Asegúrate de usar `await createClient()` en server components
- Verifica que las variables de entorno estén configuradas

### Error: "new row violates row-level security policy"
- Verifica que todos los scripts SQL se hayan ejecutado correctamente
- Asegúrate de que el trigger de perfil automático esté creado

### La página se refresca constantemente
- Verifica que el middleware no tenga loops de redirección
- Revisa la consola del navegador para errores

## 📚 Requisitos Funcionales (RF) Implementados

- **RF-01**: Registro de usuarios con campos personalizados
- **RF-02**: Búsqueda de negocios con filtros
- **RF-03**: Sistema de reseñas con rating
- **RF-04**: Sistema de recomendaciones
- **RF-05**: Perfiles de negocio con información completa
- **RF-06**: Edición de negocios para dueños
- **RF-07**: Dashboard personalizado
- **RF-08**: Página de cotizaciones

## 📊 Requisitos No Funcionales (RNF) Implementados

- **RNF-01**: Tiempo de carga < 2s (SSR + optimizaciones)
- **RNF-02**: Accesibilidad WCAG 2.1 AA
- **RNF-03**: Responsive design (mobile-first)
- **RNF-04**: PWA-ready (manifest + service worker)
- **RNF-05**: Seguridad (RLS + HTTPS + validaciones)
- **RNF-06**: SEO optimizado (meta tags + SSR)

## 🤝 Contribuir

1. Crea una rama para tu feature: `git checkout -b feature/nueva-funcionalidad`
2. Commit tus cambios: `git commit -m 'Agrega nueva funcionalidad'`
3. Push a la rama: `git push origin feature/nueva-funcionalidad`
4. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y confidencial.

## 👥 Equipo

Desarrollado para el curso de Ingeniería de Software - Universidad de Chile

---

**¿Necesitas ayuda?** Revisa la sección de Troubleshooting o contacta al equipo de desarrollo.
