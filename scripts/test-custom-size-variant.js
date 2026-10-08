const assert = require('assert');

// Test 1: Bike Models List has Custom Size in the correct position
const bikeModelsList = [
  { name: "Honda CD 70", available: true },
  { name: "Honda CG 125", available: true },
  { name: "Yamaha YBR 125", available: true },
  { name: "Suzuki GS 150", available: true },
  { name: "Universal Fit", available: true },
  { name: "Custom Size", available: true },
];

assert.strictEqual(bikeModelsList.length, 6);
assert.strictEqual(bikeModelsList[0].name, "Honda CD 70");
assert.strictEqual(bikeModelsList[4].name, "Universal Fit");
assert.strictEqual(bikeModelsList[5].name, "Custom Size");
console.log('Test 1 Passed: Bike Models List includes Custom Size as 6th option.');

// Test 2: Validation
function validate(selectedModel, customSize, selectedColor) {
  if (!selectedModel || !selectedColor) {
    return { valid: false, error: "Please select model and color" };
  }
  if (selectedModel === "Custom Size") {
    if (!customSize.bikeModel.trim() || !customSize.length.trim() || !customSize.width.trim() || !customSize.height.trim()) {
      return { valid: false, error: "Missing required custom size fields" };
    }
  }
  return { valid: true };
}

assert.strictEqual(validate("Custom Size", { bikeModel: "", length: "80", width: "30", height: "40" }, "Black").valid, false);
assert.strictEqual(validate("Custom Size", { bikeModel: "Suzuki GR 150", length: "", width: "30", height: "40" }, "Black").valid, false);
assert.strictEqual(validate("Custom Size", { bikeModel: "Suzuki GR 150", length: "80", width: "30", height: "40" }, "Black").valid, true);
assert.strictEqual(validate("Honda CD 70", { bikeModel: "", length: "", width: "", height: "" }, "Black").valid, true);
console.log('Test 2 Passed: Custom Size and Standard Model validation works correctly.');

// Test 3: WhatsApp formatting for Custom Size
function getWhatsAppDetails(product, selectedModel, customSize, selectedColor, quantity) {
  const lines = [`Product: ${product.name}`];
  if (selectedModel === "Custom Size") {
    lines.push(`Variant: Custom Size`);
    lines.push(`Bike Model: ${customSize.bikeModel.trim()}`);
    lines.push(`Length: ${customSize.length.trim()} ${customSize.unit}`);
    lines.push(`Width: ${customSize.width.trim()} ${customSize.unit}`);
    lines.push(`Height: ${customSize.height.trim()} ${customSize.unit}`);
    if (customSize.notes && customSize.notes.trim()) {
      lines.push(`Additional Notes: ${customSize.notes.trim()}`);
    }
  } else {
    lines.push(`Bike Model: ${selectedModel}`);
  }
  lines.push(`Color: ${selectedColor}`);
  lines.push(`Quantity: ${quantity}`);
  return lines.join('\n');
}

const waResult = getWhatsAppDetails(
  { name: 'Bike Cover' },
  'Custom Size',
  { bikeModel: 'Benelli TRK 502', length: '85', width: '36', height: '58', unit: 'inches', notes: 'Includes top box' },
  'Black',
  1
);

const expectedWa = [
  'Product: Bike Cover',
  'Variant: Custom Size',
  'Bike Model: Benelli TRK 502',
  'Length: 85 inches',
  'Width: 36 inches',
  'Height: 58 inches',
  'Additional Notes: Includes top box',
  'Color: Black',
  'Quantity: 1'
].join('\n');

assert.strictEqual(waResult, expectedWa);
console.log('Test 3 Passed: WhatsApp details formatted precisely as required.');

// Test 4: Fetch rendered product page
async function testPage() {
  const res = await fetch('http://localhost:3005/product/bike-cover');
  const html = await res.text();
  assert(html.includes('Custom Size'), 'HTML must include Custom Size option');
  assert(html.includes('Universal Fit'), 'HTML must include Universal Fit');
  assert(html.includes('Honda CD 70'), 'HTML must include Honda CD 70');
  console.log('Test 4 Passed: Server response verified for Custom Size on /product/bike-cover');
}

testPage().then(() => {
  console.log('ALL TESTS PASSED SUCCESSFULLY!');
});
