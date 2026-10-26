// คำนวณข้อมูลสรุปของคลังสินค้า (ข้อ 2.3)
export function getInventorySummary(products) {
  return {
    totalProducts: products.length,
    // มูลค่ารวมของสินค้าคงเหลือ = ผลรวมของ price × stock ทุกรายการ
    stockValue: products.reduce(
      (sum, product) => sum + product.price * product.stock,
      0
    ),
    outOfStock: products.filter(product => product.stock === 0).length
  }
}
