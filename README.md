# GuideCobbleEs 🎮✨

> **Plataforma Integral y Pokédex en Español para Cobblemon v1.8.4 (Minecraft 1.21.1 / 1.20.1)**  
> Desarrollado con React 19, Vite, TypeScript, Tailwind CSS y Three.js.

![CobbleES Preview](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png)

---

## 🌟 Características Principales

- 📖 **Pokédex Interactiva Completa (851 Pokémon):**
  - Modelos oficiales de Cobblemon renderizados en 3D interactivo en tiempo real con Three.js.
  - Animaciones de Blockbench: respiración en tierra (*Ground Idle*), vuelo, natación y poses.
  - Sistema de iluminación adaptativo y colores dinámicos según el tipo elemental.
- ✨ **Mega Evoluciones & Expansiones Addon (50 Formas):**
  - Compatibilidad detallada con los mods de la comunidad **Cobblemon: Mega Showdown** y **Ascension Megamons**.
  - Detalle de la Megapiedra requerida (con sprite oficial), cambio de tipos elementales, nueva habilidad con descripción y desglose de estadísticas (+100 BST).
- 🗺️ **Explorador de Biomas de Minecraft:**
  - Mapeo de más de 50 biomas de Minecraft repartidos en Overworld, Nether y The End.
  - Filtro por dimensión, rareza de aparición y condiciones climáticas/horarias.
  - Navegación horizontal fluida con botones `<` `>`, soporte de rueda del ratón y vista expandida en cuadrícula.
- 🐎 **Módulo de Monturas Oficiales:**
  - Catálogo de monturas aéreas, terrestres y acuáticas con estadísticas de velocidad punta, salto y estamina.
- ⚔️ **Constructor de Equipos (Team Builder):**
  - Análisis de balance elemental, cálculo de debilidades y resistencias compartidas, y sugerencias estratégicas.
- 📚 **Academia CobbleES & Guías:**
  - Guía completa de comandos in-game con ejemplos listos para copiar.
  - Guía de crianza y herencia genética en bloques de pastoreo (*Pasture Block*).
  - Tabla de drops y producción pasiva de recursos mediante pastoreo.
  - Fabricación de jugos de Bonguri (*Aprijuice*) para potenciar monturas.
- ⚖️ **Cumplimiento Legal:**
  - Suite con Aviso Legal, Términos de Servicio y Política de Privacidad de uso comunitario no lucrativo (*Fair Use*).

---

## 🚀 Instalación y Ejecución Local

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- `npm` o `pnpm`

### Pasos
```bash
# 1. Clonar el repositorio
git clone https://github.com/LJprogram657/GuideCobbleEs.git
cd GuideCobbleEs

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo local
npm run dev

# 4. Compilar para producción
npm run build
```

El servidor local se iniciará automáticamente en `http://localhost:5173/`.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Empaquetador:** [Vite 8](https://vitejs.dev/)
- **Estilos:** [Tailwind CSS 4](https://tailwindcss.com/)
- **3D & Gráficos:** [Three.js](https://threejs.org/) con `GLTFLoader` y `OrbitControls`
- **Iconografía:** [Lucide React](https://lucide.dev/)

---

## ⚖️ Aviso Legal / Disclaimer

*Pokémon* y los nombres de las criaturas son marcas registradas de Nintendo, Game Freak y Creatures Inc.  
*Minecraft* es una marca registrada de Mojang AB y Microsoft Corporation.  
*Cobblemon* es un mod de código abierto creado por el Cobblemon Team.  
**GuideCobbleEs** es un proyecto comunitario independiente de fans, sin fines de lucro, desarrollado con fines educativos y de consulta bajo los principios de Uso Legítimo (*Fair Use*).
