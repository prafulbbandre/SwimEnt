let entries = [];

// Load existing entries from local storage
const storedEntries = localStorage.getItem('entries');
if (storedEntries) {
    entries = JSON.parse(storedEntries);
}

function addEntry() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const date = document.getElementById('date').value;

    entries.push({ name, age, date });
    localStorage.setItem('entries', JSON.stringify(entries)); // Save entries to local storage
    alert('Entry added successfully!');
}

function generatePDF(entries) {
    const {jsPDF} = window.jspdf;
    const doc = new jsPDF
    doc.text(20, 20, 'Swimming Pool Entry Details');

    let y = 30;
    entries.forEach(entry => {
        doc.text(20, y, `Name: ${entry.name}`);
        doc.text(20, y + 10, `Age: ${entry.age}`);
        doc.text(20, y + 20, `Date: ${entry.date}`);
        y += 30;
    });
   
      // Get current date and time
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 10); // YYYY-MM-DD format
      const formattedTime = now.toTimeString().slice(0, 8).replace(/:/g, '-'); // HH-MM-SS format

      // Combine date and time for filename
      const filename = `pool_entries_${formattedDate}_${formattedTime}.pdf`;
    doc.save(filename);
}

function generateDailyPDF() {
    if (entries.length === 0) {
        alert('No entries to generate PDF.');
        return;
    }

    generatePDF(entries);
    entries = []; // Clear entries for the next day
    localStorage.removeItem('entries'); // Clear entries from local storage
}

function savePDFNow() {
    if (entries.length === 0) {
        alert('No entries to save.');
        return;
    }

    generatePDF(entries, 'current_pool_entries.pdf');
}
