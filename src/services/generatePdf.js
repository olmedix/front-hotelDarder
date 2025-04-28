import { jsPDF } from "jspdf";

export const generatePDF = (reserva, extras, reservations) => {
  {
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
    doc.text(`Estado: ${reserva.status}`, 20, 70);

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
    doc.text(
      `Total a pagar en el hotel: ${reserva.totalPrice.toFixed(2)}€`,
      20,
      y
    );

    // Guardar
    doc.save(`reserva_extras_${reserva.extra_reservation_number}.pdf`);
  }
};
