/**
 * El catálogo. Añadir un tema = añadir un objeto aquí; la ficha de producto,
 * la página de catálogo, el sitemap y los datos estructurados se generan solos.
 *
 * estado:
 *   'publicado'  → se vende, tiene demo y enlace de pago
 *   'gratis'     → se entrega a cambio del correo
 *   'produccion' → anunciado con fecha, acumula lista de espera
 */

export type Estado = 'publicado' | 'gratis' | 'produccion';

export interface Presentacion {
  slug: string;
  titulo: string;
  subtitulo: string;
  especialidad: string;
  rotacion: string;
  estado: Estado;
  actualizado: string;
  version: string;
  secciones: number;
  herramientas: string[];
  incluye: string[];
  baseEvidencia: string[];
  demo?: string;
  descarga?: string;
  enlacePago?: string;
  resumen: string;
  temario: string[];
}

export const presentaciones: Presentacion[] = [
  {
    slug: 'insuficiencia-cardiaca-2026',
    titulo: 'Insuficiencia cardiaca',
    subtitulo: 'Dos fenotipos, cuatro pilares y la brecha de implementación',
    especialidad: 'Cardiología',
    rotacion: 'Medicina interna · Cardiología · Urgencias',
    estado: 'gratis',
    actualizado: 'septiembre 2026',
    version: '2.0',
    secciones: 15,
    herramientas: [
      'Clasificador por FEVI',
      'Interpretador de NT-proBNP',
      'Bloqueo secuencial de la nefrona',
      'Simulador de seis casos clínicos',
      'Autoevaluación con retroalimentación',
    ],
    incluye: [
      'Presentación HTML interactiva (un solo archivo, funciona sin internet)',
      'PowerPoint editable con la misma estructura',
      'Handout en PDF de 2 páginas con el algoritmo y las referencias',
    ],
    baseEvidencia: ['Guía ESC 2026', '2.ª Definición Universal de IC'],
    demo: '/demos/insuficiencia-cardiaca-2026.html',
    descarga: '/demos/insuficiencia-cardiaca-2026.html',
    resumen:
      'La revisión completa que cambió de sitio la conversación: del «FEVI reducida o preservada» a dos fenotipos con implicaciones terapéuticas distintas, los cuatro pilares iniciados rápido y simultáneos, y por qué el problema hoy no es la evidencia sino la implementación.',
    temario: [
      'La carga de la enfermedad y su proyección',
      'Qué cambia en 2026: los dos fenotipos',
      'Estadios A a D',
      'Péptidos natriuréticos y ecocardiografía',
      'Etiología dirigida = tratamiento dirigido',
      'Terapia médica fundamental',
      'Rápido y simultáneo: la evidencia de ir deprisa',
      'Descongestión paso a paso',
      'FEVI preservada: de «no hay tratamiento» a cuatro decisiones',
      'Comorbilidades: el pronóstico se decide fuera del corazón',
      'Dispositivos y terapias avanzadas',
      'IC aguda: perfil, desencadenante y descongestión',
      'Controversias abiertas',
      'Ocho mensajes para el lunes en consulta',
      'Fuentes y lecturas recomendadas',
    ],
  },
  {
    slug: 'sindrome-coronario-agudo',
    titulo: 'Síndrome coronario agudo',
    subtitulo: 'Del electrocardiograma a la sala de hemodinamia',
    especialidad: 'Cardiología',
    rotacion: 'Urgencias · Medicina interna · Cardiología',
    estado: 'produccion',
    actualizado: 'octubre 2026',
    version: '1.0',
    secciones: 14,
    herramientas: [
      'Calculadora GRACE y TIMI',
      'Lector de ECG por territorio',
      'Reloj de tiempos puerta-balón',
      'Simulador de casos',
    ],
    incluye: [
      'Presentación HTML interactiva',
      'PowerPoint editable',
      'Handout en PDF',
    ],
    baseEvidencia: ['Guía ESC 2023 SCA', 'Actualización AHA/ACC'],
    resumen:
      'Estratificación de riesgo que de verdad cambia conductas, tiempos de reperfusión, antiagregación y las decisiones que se toman en los primeros noventa minutos.',
    temario: [
      'Definición universal de infarto',
      'El ECG en los primeros 10 minutos',
      'Troponina de alta sensibilidad: algoritmos 0/1 h',
      'Estratificación del riesgo',
      'Reperfusión: tiempos y estrategia',
      'Antiagregación y anticoagulación',
      'Complicaciones mecánicas',
      'Prevención secundaria al alta',
    ],
  },
  {
    slug: 'sepsis-y-shock-septico',
    titulo: 'Sepsis y shock séptico',
    subtitulo: 'La primera hora decide el desenlace',
    especialidad: 'Cuidado crítico',
    rotacion: 'Urgencias · UCI · Medicina interna',
    estado: 'produccion',
    actualizado: 'octubre 2026',
    version: '1.0',
    secciones: 13,
    herramientas: [
      'Calculadora SOFA y qSOFA',
      'Simulador de reanimación por horas',
      'Selector de antibiótico empírico por foco',
    ],
    incluye: [
      'Presentación HTML interactiva',
      'PowerPoint editable',
      'Handout en PDF',
    ],
    baseEvidencia: ['Surviving Sepsis Campaign', 'Sepsis-3'],
    resumen:
      'Qué hay que hacer en la primera hora, qué se ha caído de las recomendaciones, y cómo se decide el volumen y el vasopresor sin adivinar.',
    temario: [
      'Sepsis-3: qué define y qué ya no',
      'Tamizaje: qSOFA, NEWS y sus límites',
      'El paquete de la primera hora',
      'Reanimación con líquidos: cuánto y hasta cuándo',
      'Vasopresores y su secuencia',
      'Antibiótico empírico por foco',
      'Control del foco',
      'Corticoides y terapias coadyuvantes',
    ],
  },
  {
    slug: 'epoc-exacerbado',
    titulo: 'EPOC exacerbado',
    subtitulo: 'Cuándo ventilar, cuándo antibiótico, cuándo esteroide',
    especialidad: 'Neumología',
    rotacion: 'Urgencias · Medicina interna · Neumología',
    estado: 'produccion',
    actualizado: 'noviembre 2026',
    version: '1.0',
    secciones: 12,
    herramientas: [
      'Clasificador GOLD',
      'Decisor de ventilación no invasiva',
      'Interpretador de gases arteriales',
    ],
    incluye: [
      'Presentación HTML interactiva',
      'PowerPoint editable',
      'Handout en PDF',
    ],
    baseEvidencia: ['GOLD 2026'],
    resumen:
      'La exacerbación que llega a urgencias: gases, indicación real de ventilación no invasiva, y las tres decisiones farmacológicas que cambian la estancia.',
    temario: [
      'Definición y gravedad de la exacerbación',
      'Diagnóstico diferencial del disneico',
      'Gases arteriales sin memorizar fórmulas',
      'Broncodilatación y esteroide sistémico',
      'Antibiótico: a quién sí',
      'Ventilación no invasiva: indicaciones y fracaso',
      'Criterios de alta y prevención de reingreso',
    ],
  },
  {
    slug: 'neumonia-adquirida-en-comunidad',
    titulo: 'Neumonía adquirida en comunidad',
    subtitulo: 'Dónde se trata, con qué y por cuánto tiempo',
    especialidad: 'Infectología',
    rotacion: 'Urgencias · Medicina interna',
    estado: 'produccion',
    actualizado: 'noviembre 2026',
    version: '1.0',
    secciones: 12,
    herramientas: [
      'Calculadora CURB-65 y PSI',
      'Selector de esquema antibiótico',
      'Simulador de casos',
    ],
    incluye: [
      'Presentación HTML interactiva',
      'PowerPoint editable',
      'Handout en PDF',
    ],
    baseEvidencia: ['ATS/IDSA', 'Consensos latinoamericanos'],
    resumen:
      'La decisión de ingreso, el esquema empírico según el escenario local y por qué la duración del tratamiento se ha acortado.',
    temario: [
      'Diagnóstico y estudios que sí aportan',
      'Escalas de gravedad y sitio de atención',
      'Microbiología esperable en LatAm',
      'Tratamiento empírico por escenario',
      'Duración: la evidencia de acortar',
      'Falla terapéutica: cómo se aborda',
      'Vacunación y prevención',
    ],
  },
  {
    slug: 'dengue-grave',
    titulo: 'Dengue grave',
    subtitulo: 'Las fases, los signos de alarma y el manejo de líquidos',
    especialidad: 'Infectología tropical',
    rotacion: 'Urgencias · Medicina interna · Pediatría',
    estado: 'produccion',
    actualizado: 'diciembre 2026',
    version: '1.0',
    secciones: 12,
    herramientas: [
      'Clasificador por fase y grupo',
      'Calculadora de líquidos por peso',
      'Curva de hematocrito y plaquetas',
    ],
    incluye: [
      'Presentación HTML interactiva',
      'PowerPoint editable',
      'Handout en PDF',
    ],
    baseEvidencia: ['OMS/OPS', 'Guías nacionales de Colombia'],
    resumen:
      'El tema que más se presenta en temporada y para el que menos material decente existe en español: fases, signos de alarma y la reanimación que evita el choque.',
    temario: [
      'Epidemiología y serotipos en la región',
      'Las tres fases de la enfermedad',
      'Clasificación por grupos A, B y C',
      'Signos de alarma: qué significan',
      'Manejo de líquidos por fase',
      'Choque por dengue y su reanimación',
      'Hemorragia y transfusión',
      'Criterios de egreso',
    ],
  },
];

export const publicadas = presentaciones.filter(
  (p) => p.estado === 'publicado' || p.estado === 'gratis',
);

export const enProduccion = presentaciones.filter((p) => p.estado === 'produccion');

export function porSlug(slug: string) {
  return presentaciones.find((p) => p.slug === slug);
}

export const etiquetaEstado: Record<Estado, string> = {
  publicado: 'Disponible',
  gratis: 'Gratis',
  produccion: 'En producción',
};
