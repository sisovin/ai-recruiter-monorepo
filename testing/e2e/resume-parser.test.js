const { test, expect } = require('@playwright/test');

test('Resume Parser - Upload and Parse', async ({ page }) => {
  // Navigate to the resume upload page
  await page.goto('http://localhost:3000/resume-upload');

  // Upload a sample resume PDF file
  const filePath = 'path/to/sample-resume.pdf';
  await page.setInputFiles('input[type="file"]', filePath);

  // Click the upload button
  await page.click('button:has-text("Upload")');

  // Wait for the success message
  await page.waitForSelector('text=File uploaded successfully.');

  // Verify the parsed resume data
  const parsedData = await page.evaluate(() => {
    return fetch('/api/parse-resume')
      .then(response => response.json())
      .then(data => data);
  });

  expect(parsedData).toEqual({
    name: 'John Doe',
    email: 'john.doe@example.com',
    skills: ['JavaScript', 'Python', 'React']
  });
});
