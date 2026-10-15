import { collectionNames, products } from "./catalog";

// Categories are exclusively the collection headings in the supplied Diwali brochure.
export const giftCategories = collectionNames.map(name => {
  const items = products.filter(product => product.collection === name);
  return {
    name,
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    group: "Diwali Collection",
    description: `${items.length} gifts · From ₹${Math.min(...items.map(product => product.price)).toLocaleString("en-IN")}`,
    image: items[0].image,
  };
});
export const categoryHref = (slug: string) => `#category/${slug}`;

export const faqs = [
  ["What products does Uphaaram offer?", "Uphaaram offers thoughtfully curated gifting solutions, including Diwali and festive hampers, kids' budget gifts, home décor such as torans, door hangings and diyas, gifts for him and her, wedding hampers, return gifts, and corporate gifting."],
  ["Can I customize my gift hampers?", "Yes! We offer customization options based on your occasion, preferences, budget, and gifting requirements. Contact us to discuss your ideas and create a hamper that feels personal."],
  ["Do you accept bulk and corporate gifting orders?", "Absolutely! We cater to bulk gifting requirements for companies, employees, clients, festive celebrations, and special corporate occasions. Please contact us with your quantity, budget, and delivery timeline."],
  ["Do you provide wedding hampers and return gifts?", "Yes, we curate wedding hampers, guest welcome gifts, return favours, bridesmaid gifts, and other gifting solutions for weddings and special celebrations."],
  ["What is the starting price of your gifts?", "Our pricing varies depending on the product, hamper contents, packaging, and customization. We offer options across different budgets. Contact us to explore the collections that suit your requirements."],
  ["Do you deliver outside Vadodara?", "Yes, we offer Pan-India shipping. Delivery availability and timelines may vary depending on the destination and the type of order."],
  ["How can I place an order?", "You can contact us through Instagram, email, or WhatsApp. Share the product you're interested in, your budget, quantity, and delivery location, and our team will guide you through the ordering process."],
  ["How early should I place my order?", "We recommend placing orders in advance, especially for festivals, weddings, customized hampers, and bulk gifting. This gives us sufficient time to curate, personalize, and package your order."],
  ["Can I order gifts for a specific occasion or recipient?", "Of course! Whether you're shopping for a birthday, anniversary, festival, wedding, housewarming, or a special surprise for him or her, we can help you find a thoughtful gifting option."],
  ["Can I request personalized packaging or message cards?", "Yes, personalization may be available depending on the product and order requirements. You can enquire about customized packaging, name tags, greeting cards, and special messages while placing your order."],
];
