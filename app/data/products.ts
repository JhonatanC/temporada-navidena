import type { StaticImageData } from "next/image";
import productsData from "./products.json";

// Imágenes de los productos. Se importan de forma estática (igual que el hero
// y el video) para que Next.js las optimice en build.
import caminoDeMesaRojo from "../assets/camino-de-mesa-rojo.jpeg";
import caminoDeMesaRosado from "../assets/camino-de-mesa-rosado.jpeg";
import cobreSillasRojo from "../assets/cobre-sillas-rojo.jpeg";
import cojinBlancoNavidad from "../assets/cojin-blanco-navidad.jpeg";
import cojinGnomos from "../assets/cojin-gnomos.jpeg";
import cojinMenecosDeNieve from "../assets/cojin-menecos-de-nieve.jpeg";
import cojinMunecoHieloRosado from "../assets/cojin-muneco-hielo-rosado.jpeg";
import cojinMunecoNieve from "../assets/cojin-muneco-nieve.jpeg";
import cojinNoelRojo from "../assets/cojin-noel-rojo.jpeg";
import cojinNoelRosado from "../assets/cojin-noel-rosado.jpeg";
import cojinRenoCafe from "../assets/cojin-reno-cafe.jpeg";
import cojinRojo from "../assets/cojin-rojo.jpeg";
import cortineroG from "../assets/cortinero-g.jpeg";
import cortineroH from "../assets/cortinero-h.jpeg";
import cortineroP from "../assets/cortinero-p.jpeg";
import cortineroReno from "../assets/cortinero-reno.jpeg";
import cubreSillas2 from "../assets/cubre-sillas-2.jpeg";
import cubreSillasClaros from "../assets/cubre-sillas-claros.jpeg";
import individualRosado from "../assets/individual-rosado.jpeg";
import individualesClaros from "../assets/invididuales-claros.jpeg";
import monoAmarilloDecorativo from "../assets/mono-amarillo-decorativo.jpeg";
import monoRojoDecorativo from "../assets/mono-rojo-decorativo.jpeg";
import munecoNoelRojo from "../assets/muneco-noel-rojo.jpeg";
import munecoRenoMacho from "../assets/muneco-reno-macho.jpeg";
import munecoRenoMujer from "../assets/muneco-reno-mujer.jpeg";
import papaNoelDecoracion from "../assets/papa-noel-decoracion.jpeg";
import pieDeArbolRojo1 from "../assets/pie-de-arbol-rojo-1.jpeg";
import pieDeArbolRosado from "../assets/pie-de-arbol-rosado.jpeg";
import reloj from "../assets/reloj.jpeg";
import renoParejas from "../assets/reno-parejas.jpeg";

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
  "camino-de-mesa-rojo.jpeg": caminoDeMesaRojo,
  "camino-de-mesa-rosado.jpeg": caminoDeMesaRosado,
  "cobre-sillas-rojo.jpeg": cobreSillasRojo,
  "cojin-blanco-navidad.jpeg": cojinBlancoNavidad,
  "cojin-gnomos.jpeg": cojinGnomos,
  "cojin-menecos-de-nieve.jpeg": cojinMenecosDeNieve,
  "cojin-muneco-hielo-rosado.jpeg": cojinMunecoHieloRosado,
  "cojin-muneco-nieve.jpeg": cojinMunecoNieve,
  "cojin-noel-rojo.jpeg": cojinNoelRojo,
  "cojin-noel-rosado.jpeg": cojinNoelRosado,
  "cojin-reno-cafe.jpeg": cojinRenoCafe,
  "cojin-rojo.jpeg": cojinRojo,
  "cortinero-g.jpeg": cortineroG,
  "cortinero-h.jpeg": cortineroH,
  "cortinero-p.jpeg": cortineroP,
  "cortinero-reno.jpeg": cortineroReno,
  "cubre-sillas-2.jpeg": cubreSillas2,
  "cubre-sillas-claros.jpeg": cubreSillasClaros,
  "individual-rosado.jpeg": individualRosado,
  "invididuales-claros.jpeg": individualesClaros,
  "mono-amarillo-decorativo.jpeg": monoAmarilloDecorativo,
  "mono-rojo-decorativo.jpeg": monoRojoDecorativo,
  "muneco-noel-rojo.jpeg": munecoNoelRojo,
  "muneco-reno-macho.jpeg": munecoRenoMacho,
  "muneco-reno-mujer.jpeg": munecoRenoMujer,
  "papa-noel-decoracion.jpeg": papaNoelDecoracion,
  "pie-de-arbol-rojo-1.jpeg": pieDeArbolRojo1,
  "pie-de-arbol-rosado.jpeg": pieDeArbolRosado,
  "reloj.jpeg": reloj,
  "reno-parejas.jpeg": renoParejas,
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
