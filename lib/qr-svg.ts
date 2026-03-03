import QRCode from 'qrcode';

export function generateQrSvg(text: string, size: number = 120): string {
  try {
    const qr = QRCode.create(text, { errorCorrectionLevel: 'M' });
    const modules = qr.modules;
    const moduleCount = modules.size;
    const cellSize = size / moduleCount;

    let paths = '';
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (modules.get(row, col)) {
          const x = col * cellSize;
          const y = row * cellSize;
          paths += `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${cellSize.toFixed(2)}" height="${cellSize.toFixed(2)}"/>`;
        }
      }
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="#fff"/><g fill="#000">${paths}</g></svg>`;
  } catch {
    return '';
  }
}
