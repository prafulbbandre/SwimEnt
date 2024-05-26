let entries = [];

function addEntry() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;

    const now = new Date();
    const formattedDateTime = now.toLocaleString();

    const entry = {
        Name: name,
        Age: age,
        Timestamp: formattedDateTime
    };

    entries.push(entry);
    console.log(entries);
}

function saveAsExcel() {

    const worksheet = XLSX.utils.json_to_sheet(entries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Entries");

    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 10); // YYYY-MM-DD format
    const formattedTime = now.toTimeString().slice(0, 8).replace(/:/g, '-'); // HH-MM-SS format
    const filename = `pool_entries_${formattedDate}_${formattedTime}.xlsx`;

    XLSX.writeFile(workbook, filename);
}

function updateDateTime() {
    const dateTimeElement = document.getElementById('dateTime');
    const now = new Date();
    const formattedDateTime = now.toLocaleString(); // "MM/DD/YYYY, HH:MM:SS AM/PM" format

    dateTimeElement.textContent = formattedDateTime;
}

// Update the date and time immediately
updateDateTime();

// Update the date and time every second (1000 milliseconds)
setInterval(updateDateTime, 1000);
