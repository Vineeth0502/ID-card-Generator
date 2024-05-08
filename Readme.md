# Employee ID Card Generator

## This project provides a script to generate a PDF file containing employee ID cards, each card on a separate page. The cards are generated using a predefined template and employee data provided in a CSV file.

## Features
1. Customizable Template: Uses a predefined ID card template image.
2. Automated PDF Creation: Generates a single PDF file with each employee ID card on a separate page.
3. Dynamic Content: Incorporates employee names, titles, and photos from a CSV file.

## Prerequisites
Before you begin, ensure you have the following installed:
Node.js 
Any text editor for code (e.g., VSCode, Sublime Text)
Setup
To run this project, install it locally using npm:

git clone https://your-repository-url
cd your-project-directory
npm install

## Usage
1. Prepare your employee_data.csv with columns for name, title, and photo (location of ID photo).
2. Place your employee photos in the designated photo directory.
3. Update the templatePath, csvFilePath, photoDirectory, and outputPath in the script as per your directory structure.

To run the script, execute:
node generateIDPDF.js
The script will read the data, compile the ID cards, and output them into a PDF file located at the specified outputPath.

## Configuration 
You can adjust the settings within the script to change the size of images, text placement, or add additional information to the ID cards as required.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.