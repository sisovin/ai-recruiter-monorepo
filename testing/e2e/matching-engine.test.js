const { test, expect } = require('@playwright/test');

test.describe('Matching Engine End-to-End Tests', () => {
  test('should return matching candidates for a given job description', async ({ request }) => {
    const jobDescription = 'Software engineer with experience in Python and JavaScript';
    const candidates = [
      { name: 'Alice', resume: 'Experienced software engineer with Python and JavaScript skills' },
      { name: 'Bob', resume: 'Junior developer with Java skills' },
      { name: 'Charlie', resume: 'Senior developer with Python and JavaScript experience' },
    ];

    const response = await request.post('/match-candidates', {
      data: { jobDescription, candidates },
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody).toEqual([
      { name: 'Charlie', resume: 'Senior developer with Python and JavaScript experience' },
      { name: 'Alice', resume: 'Experienced software engineer with Python and JavaScript skills' },
    ]);
  });
});
