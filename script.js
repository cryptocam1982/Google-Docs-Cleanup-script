function deleteBetweenSectionHeaders() {
    const docId = "YOUR_DOCUMENT_ID_HERE"; // <-- your Google Doc ID
    const doc = DocumentApp.openById(docId);
    const body = doc.getBody();

    const startHeader = "Andere cases:"; // <-- change if your header is different
    const endHeader = "Positieve interacties:"; // <-- change if your header is different

    const total = body.getNumChildren();
    let startIndex = -1;
    let endIndex = -1;

    // 1. Find start and end indexes
    for (let i = 0; i < total; i++) {
        const element = body.getChild(i);
        if (element.getType() === DocumentApp.ElementType.PARAGRAPH) {
            const text = element.asParagraph().getText().trim();
            if (text === startHeader && startIndex === -1) {
                startIndex = i;
            } else if (text === endHeader && startIndex !== -1) {
                endIndex = i;
                break;
            }
        }
    }

    // 2. Delete all content between startIndex and endIndex, exclusive
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
        for (let i = endIndex - 1; i > startIndex; i--) {
            body.removeChild(body.getChild(i));
        }
        Logger.log(
            `Deleted everything between "${startHeader}" (index ${startIndex}) and "${endHeader}" (index ${endIndex}).`
        );
    } else {
        Logger.log("Could not find both headers or headers in the wrong order.");
    }
}
