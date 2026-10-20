import type { StaticImageData } from "next/image";
import productsData from "./products.json";

// Imágenes de los productos. Se importan de forma estática (igual que el hero
// y el video) para que Next.js las optimice en build.
import caminoDeMesaRojo from "../assets/camino-de-mesa-rojo.webp";
import caminoDeMesaRosado from "../assets/camino-de-mesa-rosado.webp";
import cobreSillasRojo from "../assets/cobre-sillas-rojo.webp";
import cojinBlancoNavidad from "../assets/cojin-blanco-navidad.webp";
import cojinGnomos from "../assets/cojin-gnomos.webp";
import cojinMenecosDeNieve from "../assets/cojin-menecos-de-nieve.webp";
import cojinMunecoHieloRosado from "../assets/cojin-muneco-hielo-rosado.webp";
import cojinMunecoNieve from "../assets/cojin-muneco-nieve.webp";
import cojinNoelRojo from "../assets/cojin-noel-rojo.webp";
import cojinNoelRosado from "../assets/cojin-noel-rosado.webp";
import cojinRenoCafe from "../assets/cojin-reno-cafe.webp";
import cojinRojo from "../assets/cojin-rojo.webp";
import cortineroG from "../assets/cortinero-g.webp";
import cortineroH from "../assets/cortinero-h.webp";
import cortineroP from "../assets/cortinero-p.webp";
import cortineroReno from "../assets/cortinero-reno.webp";
import cubreSillas2 from "../assets/cubre-sillas-2.webp";
import cubreSillasClaros from "../assets/cubre-sillas-claros.webp";
import escapularioNavideno from "../assets/escapulario-navideno.webp";
import individualRosado from "../assets/individual-rosado.webp";
import individualesClaros from "../assets/invididuales-claros.webp";
import monoAmarilloDecorativo from "../assets/mono-amarillo-decorativo.webp";
import monoRojoDecorativo from "../assets/mono-rojo-decorativo.webp";
import munecoNoelRojo from "../assets/muneco-noel-rojo.webp";
import munecoDeNieve from "../assets/muneco-de-nieve.webp";
import munecoDeNieveConRenoBebe from "../assets/muneco-de-nieve-con-reno-bebe.webp";
import munecoRenoMacho from "../assets/muneco-reno-macho.webp";
import munecoRenoMujer from "../assets/muneco-reno-mujer.webp";
import munecoRenoNordico from "../assets/muneco-reno-nordico.webp";
import munecosDeNieve from "../assets/munecos-de-nieve.webp";
import munecosRenos from "../assets/munecos-renos.webp";
import munecoNieveSentado from "../assets/muneco-nieve-sentado.webp";
import papaNoelDecoracion from "../assets/papa-noel-decoracion.webp";
import pieDeArbolRojo1 from "../assets/pie-de-arbol-rojo-1.webp";
import pieDeArbolRosado from "../assets/pie-de-arbol-rosado.webp";
import reloj from "../assets/reloj.webp";
import renoParejas from "../assets/reno-parejas.webp";

/** Taxonomía de estilo del catálogo (usada en el pop-up "Cómo es tu Navidad"). */
export type ProductStyle = "Clásica" | "Natural" | "Brillante";

/**
 * Estilos del catálogo en el orden en que se muestran en los filtros.
 * Debe mantenerse en sincronía con el tipo `ProductStyle`.
 */
export const productStyles: ProductStyle[] = ["Clásica", "Natural", "Brillante"];

/** Descripciones del producto: corta para las tarjetas, larga para el pop-up. */
export interface ProductDescriptions {
  /** Texto corto: se muestra en las tarjetas del catálogo. */
  short: string;
  /** Texto largo: se muestra en el pop-up de detalle del producto. */
  long: string;
}

/** Producto del catálogo, ya con la imagen resuelta y lista para usar. */
export interface Product {
  id: string;
  title: string;
  category: string;
  style: ProductStyle;
  price: number;
  /**
   * Etiqueta de unidad que se muestra después del precio, p. ej. "c/u" (cada
   * uno) cuando el valor es por pieza y no por el conjunto de la foto.
   * Opcional: los productos que no la definan muestran solo "Desde $X".
   */
  unit?: string;
  /**
   * Si es `false`, el precio se muestra como valor estándar ("$X") en vez de
   * "Desde $X". Por defecto (sin definir) se muestra con "Desde".
   */
  priceFrom?: boolean;
  /** Textos del producto: corto (tarjetas del catálogo) y largo (pop-up). */
  descriptions: ProductDescriptions;
  image: StaticImageData;
}

/**
 * Producto tal como viene en el JSON: la imagen es solo el nombre del archivo.
 * Los productos aún no migrados traen una única `description`, que se usa como
 * respaldo para ambos textos.
 */
interface RawProduct extends Omit<Product, "image" | "descriptions"> {
  image: string;
  /** Formato antiguo: una sola descripción. Se mantiene como respaldo. */
  description?: string;
  /** Formato nuevo: descripción corta (tarjeta) y larga (pop-up). */
  descriptions?: ProductDescriptions;
}

// Mapa nombre de archivo -> imagen importada.
const productImages: Record<string, StaticImageData> = {
  "camino-de-mesa-rojo.webp": caminoDeMesaRojo,
  "camino-de-mesa-rosado.webp": caminoDeMesaRosado,
  "cobre-sillas-rojo.webp": cobreSillasRojo,
  "cojin-blanco-navidad.webp": cojinBlancoNavidad,
  "cojin-gnomos.webp": cojinGnomos,
  "cojin-menecos-de-nieve.webp": cojinMenecosDeNieve,
  "cojin-muneco-hielo-rosado.webp": cojinMunecoHieloRosado,
  "cojin-muneco-nieve.webp": cojinMunecoNieve,
  "cojin-noel-rojo.webp": cojinNoelRojo,
  "cojin-noel-rosado.webp": cojinNoelRosado,
  "cojin-reno-cafe.webp": cojinRenoCafe,
  "cojin-rojo.webp": cojinRojo,
  "cortinero-g.webp": cortineroG,
  "cortinero-h.webp": cortineroH,
  "cortinero-p.webp": cortineroP,
  "cortinero-reno.webp": cortineroReno,
  "cubre-sillas-2.webp": cubreSillas2,
  "cubre-sillas-claros.webp": cubreSillasClaros,
  "escapulario-navideno.webp": escapularioNavideno,
  "individual-rosado.webp": individualRosado,
  "invididuales-claros.webp": individualesClaros,
  "mono-amarillo-decorativo.webp": monoAmarilloDecorativo,
  "mono-rojo-decorativo.webp": monoRojoDecorativo,
  "muneco-noel-rojo.webp": munecoNoelRojo,
  "muneco-reno-macho.webp": munecoRenoMacho,
  "muneco-reno-mujer.webp": munecoRenoMujer,
  "muneco-de-nieve.webp": munecoDeNieve,
  "muneco-de-nieve-con-reno-bebe.webp": munecoDeNieveConRenoBebe,
  "muneco-reno-nordico.webp": munecoRenoNordico,
  "munecos-de-nieve.webp": munecosDeNieve,
  "munecos-renos.webp": munecosRenos,
  "muneco-nieve-sentado.webp": munecoNieveSentado,
  "papa-noel-decoracion.webp": papaNoelDecoracion,
  "pie-de-arbol-rojo-1.webp": pieDeArbolRojo1,
  "pie-de-arbol-rosado.webp": pieDeArbolRosado,
  "reloj.webp": reloj,
  "reno-parejas.webp": renoParejas,
};

// Une los datos del JSON con las imágenes importadas.
// El doble cast es porque TS infiere el JSON como una unión de formas con
// propiedades opcionales, que no encaja directo con RawProduct.
export const products: Product[] = (
  productsData as unknown as RawProduct[]
).map(({ image, description, descriptions, ...product }) => ({
  ...product,
  // Migración en curso: si el producto aún no tiene `descriptions`, su
  // `description` única se usa como texto corto y largo a la vez.
  descriptions: descriptions ?? {
    short: description ?? "",
    long: description ?? "",
  },
  image: productImages[image],
}));
