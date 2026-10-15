// Product names, contents, images and prices transcribed from Uphaaram Diwali Brocher (1).pdf.
// Where the brochure heading and description disagree on size, the heading is used.
export type Product = {
  id: string;
  name: string;
  collection: string;
  price: number;
  starting?: boolean;
  image: string;
  gallery?: string[];
  contents: string[];
  description: string;
};
const image = (id: string) => `/assets/products/${id}.webp`;
export const products: Product[] = [
  {id:"mini-4-cavity",name:"4 Cavity Hamper",collection:"Mini Gift Collection",price:439,contents:["Cashews", "Almonds", "Pistachios", "Raisins"],description:"Premium dry fruits, beautifully presented in an elegant four-section gift box.",image:image("mini-4-cavity")},
  {id:"mini-2-jar",name:"2 Jar Hamper",collection:"Mini Gift Collection",price:499,contents:["Cashews", "Raisins"],description:"A thoughtful duo of premium dry fruits in an elegant designer gift box.",image:image("mini-2-jar")},
  {id:"mini-3-jar",name:"3 Jar Hamper",collection:"Mini Gift Collection",price:729,contents:["Cashews", "Raisins", "Almonds"],description:"A delightful trio of premium dry fruits, beautifully packed in three elegant jars.",image:image("mini-3-jar")},
  {id:"basic-8x8",name:"Basic 8 × 8 Hamper",collection:"Basic Hamper Collection",price:669,contents:["Cashews", "Almonds", "2 diyas", "Shubh-Labh pair", "Sweet box"],description:"Festive flavours and traditions, thoughtfully brought together in an elegant basket.",image:image("basic-8x8")},
  {id:"basic-10x10",name:"Basic 10 × 10 Hamper",collection:"Basic Hamper Collection",price:819,contents:["Cashews", "Almonds", "Handmade chocolates", "4 diyas", "Shubh-Labh pair", "Sweet box"],description:"A generous blend of festive flavours, handmade chocolates and traditional details.",image:image("basic-10x10")},
  {id:"basic-12x12",name:"Basic 12 × 12 Hamper",collection:"Basic Hamper Collection",price:1179,contents:["Cashews", "Almonds", "Handmade chocolates", "Chevda", "4 diyas", "Shubh-Labh pair", "Sweet box"],description:"Sweet and savoury favourites with festive accents, beautifully arranged for sharing.",image:image("basic-12x12")},
  {id:"classic-8x8",name:"Classic 8 × 8 Hamper",collection:"Classic Hamper Collection",price:729,contents:["Cashews", "Sweet box", "Shubh-Labh pair", "6 gel candles"],description:"Festive charm, sweet treats and beautiful gel candles to light up a celebration.",image:image("classic-8x8")},
  {id:"classic-10x10",name:"Classic 10 × 10 Hamper",collection:"Classic Hamper Collection",price:1249,contents:["Makhana", "Cashews", "Almonds", "Shubh-Labh pair", "Matka candle"],description:"Festive flavours and traditional charm, finished with a beautiful matka candle.",image:image("classic-10x10")},
  {id:"classic-12x12",name:"Classic 12 × 12 Hamper",collection:"Classic Hamper Collection",price:1339,contents:["Makhana", "Cashews", "Raisins", "4 decorative candles", "Handmade chocolates", "Sweets", "Shubh-Labh pair"],description:"A celebratory selection of treats and thoughtful traditions for a memorable festive gift.",image:image("classic-12x12")},
  {id:"premium-8x8",name:"Premium 8 × 8 Hamper",collection:"Premium Hamper Collection",price:999,contents:["Cashews", "Shubh-Labh", "4 modak candles", "Handmade dry fruit chocolates"],description:"Festive sweetness and divine blessings, curated with handmade treats and modak candles.",image:image("premium-8x8")},
  {id:"premium-10x10",name:"Premium 10 × 10 Hamper",collection:"Premium Hamper Collection",price:1619,contents:["Cashews", "Almonds", "Shubh-Labh", "Flower candle", "Handmade dry fruit chocolates", "Sweet box"],description:"A thoughtful selection of festive flavours, handmade dry fruit chocolates and a flower candle.",image:image("premium-10x10")},
  {id:"premium-12x12",name:"Premium 12 × 12 Hamper",collection:"Premium Hamper Collection",price:1939,contents:["Cashews", "Shubh-Labh", "Golden leaf candle", "Handmade dry fruit chocolates", "Sweet box", "Popcorn", "Pringles"],description:"A generous festive hamper with sweet and savoury treats and a golden leaf candle.",image:image("premium-12x12")},
  {id:"mandir-toran",name:"Mandir Toran",collection:"Traditional Hamper Collection",price:859,starting:true,contents:["Small Mandir Toran", "Shubh-Labh pair"],description:"A thoughtful festive addition to bring elegance and positivity to your sacred space.",image:image("mandir-toran"),gallery:[image("mandir-toran-set")]},
  {id:"god-figure-toran",name:"God Figure Toran & Shubh Labh",collection:"Traditional Hamper Collection",price:1950,starting:true,contents:["Main gate toran featuring an idol", "Matching Shubh-Labh pair"],description:"An elegant festive adornment to welcome prosperity, positivity and divine blessings into your home.",image:image("god-figure-toran"),gallery:[image("god-figure-set")]},
  {id:"classic-toran",name:"Classic Toran & Shubh Labh",collection:"Traditional Hamper Collection",price:1650,starting:true,contents:["Classic main gate toran", "Matching Shubh-Labh pair"],description:"A timeless festive adornment to welcome positivity and prosperity into your home.",image:image("classic-toran")},
];
export const productHref = (id: string) => `#product/${id}`;
export const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;
export const collectionNames = [...new Set(products.map(product => product.collection))];
