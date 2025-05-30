export default function groupByCategory(products) {
  const grouped = {};

  for (const product of products) {
    const cat = product.category || "Other";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(product);
  }

  // ✅ Return array of { category, items } objects
  return Object.entries(grouped).map(([category, items]) => ({
    category,
    items
  }));
}