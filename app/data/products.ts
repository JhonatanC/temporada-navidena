import type { StaticImageData } from "next/image";
import productsData from "./products.json";

// Imágenes de los productos. Se importan de forma estática (igual que el hero
// y el video) para que Next.js las optimice en build.
import caminoDeMesaRojo from "../assets/camino-de-mesa-rojo.jpeg";
import cobreSillasRojo from "../assets/cobre-sillas-rojo.jpeg";
import cojinBlancoNavidad from "../assets/cojin-blanco-navidad.jpeg";
import cojinMunecoHieloRosado from "../assets/cojin-muneco-hielo-rosado.jpeg";
import cojinNoelRojo from "../assets/cojin-noel-rojo.jpeg";
import cojinNoelRosado from "../assets/cojin-noel-rosado.jpeg";
import cojinRojo from "../assets/cojin-rojo.jpeg";
import cortineroG from "../assets/cortinero-g.jpeg";
import cortineroH from "../assets/cortinero-h.jpeg";
import cortineroP from "../assets/cortinero-p.jpeg";
import individualRosado from "../assets/individual-rosado.jpeg";
import individualesClaros from "../assets/invididuales-claros.jpeg";
import munecoNoelRojo from "../assets/muneco-noel-rojo.jpeg";
import munecoRenoMacho from "../assets/muneco-reno-macho.jpeg";
import munecoRenoMujer from "../assets/muneco-reno-mujer.jpeg";
import munecosSala from "../assets/munecos-sala.jpeg";
import pieDeArbolRojo1 from "../assets/pie-de-arbol-rojo-1.jpeg";
import pieDeArbolRojo from "../assets/pie-de-arbol-rojo.jpeg";
import pieDeArbolRosado from "../assets/pie-de-arbol-rosado.jpeg";
import renoParejas from "../assets/reno-parejas.jpeg";

/** Producto del catálogo, ya con la imagen resuelta y lista para usar. */
export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  specs: Record<string, string>;
  image: StaticImageData;
}

/** Producto tal como viene en el JSON: la imagen es solo el nombre del archivo. */
interface RawProduct extends Omit<Product, "image"> {
  image: string;
}

// Mapa nombre de archivo -> imagen importada.
const productImages: Record<string, StaticImageData> = {
  "camino-de-mesa-rojo.jpeg": caminoDeMesaRojo,
  "cobre-sillas-rojo.jpeg": cobreSillasRojo,
  "cojin-blanco-navidad.jpeg": cojinBlancoNavidad,
  "cojin-muneco-hielo-rosado.jpeg": cojinMunecoHieloRosado,
  "cojin-noel-rojo.jpeg": cojinNoelRojo,
  "cojin-noel-rosado.jpeg": cojinNoelRosado,
  "cojin-rojo.jpeg": cojinRojo,
  "cortinero-g.jpeg": cortineroG,
  "cortinero-h.jpeg": cortineroH,
  "cortinero-p.jpeg": cortineroP,
  "individual-rosado.jpeg": individualRosado,
  "invididuales-claros.jpeg": individualesClaros,
  "muneco-noel-rojo.jpeg": munecoNoelRojo,
  "muneco-reno-macho.jpeg": munecoRenoMacho,
  "muneco-reno-mujer.jpeg": munecoRenoMujer,
  "munecos-sala.jpeg": munecosSala,
  "pie-de-arbol-rojo-1.jpeg": pieDeArbolRojo1,
  "pie-de-arbol-rojo.jpeg": pieDeArbolRojo,
  "pie-de-arbol-rosado.jpeg": pieDeArbolRosado,
  "reno-parejas.jpeg": renoParejas,
};

// Une los datos del JSON con las imágenes importadas.
// El doble cast es porque TS infiere el JSON como una unión de formas con
// propiedades opcionales, que no encaja directo con RawProduct.
export const products: Product[] = (
  productsData as unknown as RawProduct[]
).map((product) => ({
  ...product,
  image: productImages[product.image],
}));
