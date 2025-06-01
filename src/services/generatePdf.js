import { jsPDF } from "jspdf";

const loadImageAsBase64 = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = reject;
    img.src = url;
  });

export const generatePDF = async (reserva, extras, reservations) => {
  const doc = new jsPDF();

  const today = new Date();
  const formattedDate = today.toLocaleDateString();
  const formattedTime = today.toLocaleTimeString();

  // Título
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Confirmación de Reserva de Extras", 20, 20);

  doc.setLineWidth(0.5);
  doc.line(20, 25, 190, 25); // línea divisoria

  // Información general
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Número de reserva: ${reserva.extra_reservation_number}`, 20, 40);
  doc.text(`Fecha: ${formattedDate}`, 20, 50);
  doc.text(`Hora: ${formattedTime}`, 20, 60);
  doc.text(`Estado: Procesado`, 20, 70);

  doc.line(20, 75, 190, 75); // línea divisoria

  // Lista de extras
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Extras reservados:", 20, 85);

  let y = 100;
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  reservations[0].extras.forEach((extra) => {
    const extraInfo = extras.find(
      (item) => item.id === parseInt(extra.extra_id)
    );
    if (extraInfo) {
      doc.text(
        `• ${extraInfo.name} x${extra.quantity} - ${(
          extraInfo.price * extra.quantity
        ).toFixed(2)}€`,
        25,
        y
      );
      y += 10;
    }
  });

  doc.line(20, y, 190, y); // línea divisoria final
  y += 10;

  // Total
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(`Total a pagar: ${reserva.totalPrice.toFixed(2)}€`, 20, y);
  y += 20;

  // --- Imagen y datos del hotel ---
  try {
    const logoBase64 = await loadImageAsBase64("/imgs/hotel/HotelDarder.png");

    const imageHeight = 40; // altura deseada de la imagen
    const imageWidth = 50;
    const imageX = 20;
    const spacingBelowTotal = 15; // espacio debajo del total
    const imageY = y + spacingBelowTotal;

    // Añadir imagen
    doc.addImage(logoBase64, "PNG", imageX, imageY, imageWidth, imageHeight);

    // Datos del hotel a la derecha de la imagen
    const infoX = imageX + imageWidth + 10; // margen entre imagen y texto
    const infoY = imageY + 5;
    const lineHeight = 5;

    const infoLines = [
      "Hotel Emili Darder",
      "Telf: +34 971505050",
      "Email: hotel_darder@gmail.com",
      "Web: https://www.hotel_darder.com",
      "Comunidad Autónoma: Illes Balears",
      "Ciudad: Palma",
      "Dirección: Carrer de la Mar, 14",
    ];

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    infoLines.forEach((line, i) => {
      doc.text(line, infoX, infoY + i * lineHeight);
    });
  } catch (error) {
    console.error("Error al cargar la imagen:", error);
  }

  // Aviso legal o nota al final
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(100); // Un gris suave
  doc.text(
    "La reserva está sujeta a disponibilidad y deberá ser confirmada por el hotel el mismo día de la solicitud. Será el establecimiento quien le informará si la fecha deseada está disponible.",
    20,
    290,
    { maxWidth: 170 } // Para que haga salto de línea si es necesario
  );

  doc.save(`reserva_extras_${reserva.extra_reservation_number}.pdf`);
};
