const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const csv = require('csv-parser');
const { createCanvas, loadImage } = require('canvas');

async function createIDPDF(templatePath, csvFilePath, photoDirectory, outputPath) {
    try {
        const template = await loadImage(templatePath);
        const employeeData = [];

        await new Promise((resolve, reject) => {
            fs.createReadStream(csvFilePath)
                .pipe(csv())
                .on('data', (row) => {
                    employeeData.push(row);
                })
                .on('end', resolve)
                .on('error', reject);
        });

        const pdfDoc = await PDFDocument.create();

        for (const employee of employeeData) {
            const page = pdfDoc.addPage([template.width, template.height]);
            const ctx = createCanvas(template.width, template.height).getContext('2d');
            ctx.drawImage(template, 0, 0, template.width, template.height);

            const photoPath = `${photoDirectory}/${employee.photo}`;
            const photo = await loadImage(photoPath);
            ctx.drawImage(photo, 175, 19, 122, 120); // Adjust coordinates and dimensions as needed

            const name = employee.name;
            const title = employee.title;

            ctx.font = '18px Arial';
            ctx.fillStyle = '#000000';
            ctx.fillText(name, 110, 180); // Adjust coordinates as needed
            ctx.fillText(title, 90, 200); // Adjust coordinates as needed

            const canvasPDF = await pdfDoc.embedPng(ctx.canvas.toBuffer());
            page.drawImage(canvasPDF, {
                x: 0,
                y: 0,
                width: template.width,
                height: template.height
            });
        }

        const pdfBytes = await pdfDoc.save();
        await fs.promises.writeFile(outputPath, pdfBytes);
        console.log('PDF created successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
}

// Usage example
const templatePath = './public/ute_id_template.png';
const csvFilePath = './employee_data.csv';
const photoDirectory = './photos';
const outputPath = 'output.pdf';

createIDPDF(templatePath, csvFilePath, photoDirectory, outputPath);
