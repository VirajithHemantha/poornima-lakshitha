var SPREADSHEET_ID = "13FAuchExKQu-yBqpFD771W5h8vcaPYQXOViwUWGqy6w";

function doPost(e) {
  return handleRequest(e);
}

function doGet(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  try {
    var sheetName = e.parameter.sheet;
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      if (sheetName === "rsvp") {
        sheet.appendRow(["Date", "Name", "Guests", "Notes"]);
      } else if (sheetName === "wish") {
        sheet.appendRow(["Date", "Name", "Message"]);
      }
    }
    
    if (sheetName === "rsvp") {
      sheet.appendRow([
        e.parameter.date || new Date().toLocaleString(),
        e.parameter.name,
        e.parameter.guests,
        e.parameter.notes
      ]);
    } else if (sheetName === "wish") {
      sheet.appendRow([
        e.parameter.date || new Date().toLocaleString(),
        e.parameter.name,
        e.parameter.message
      ]);
    }
    
    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  } catch (error) {
    return ContentService.createTextOutput("Error: " + error.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}
