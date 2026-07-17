# S.Bank-Project
AI-Powered Financial Document Processing Prototype

<img width="1387" height="795" alt="image" src="https://github.com/user-attachments/assets/a0ba76c0-3bab-466f-a4e6-17b245c37390" />

I built this project to show how technology can automate a slow, manual process in corporate banking: financial "spreading" (taking data from PDFs and turning it into structured financial statements).

This is a front-end prototype designed to simulate the exact user experience an analyst goes through when uploading client documents, running them through an AI pipeline, and reviewing an automated credit risk assessment.

▪️ Key Features
File Drop-Zone: Simulates uploading client PDFs, Excel sheets, or images.

6-Stage Loading Pipeline: Features an animated timer that mimics real-world text extraction (OCR), line-item matching, and data validation.

Financial Dashboard: Generates clean, side-by-side Profit & Loss tables and Balance Sheets.

AI Credit Insights: Automatically highlights positive financial signals and flags potential risk warnings for the company.

Excel Export: Includes a working function that converts the financial tables into a CSV file that automatically downloads to your browser.

⚙️ Tech Stack
React: Functional components and React Hooks (useState, useRef).

Custom Styling: Built using inline styles to keep it fully portable as a single file. Designed with a clean, modern dark-mode "glassmorphic" theme.

Icons: Lucide React.

⚠️ Limitations (By Design)
Because this is a front-end simulation to showcase the user journey, there are a few limitations:

Mock Data: It does not actually read or parse the text inside your uploaded files. Every file uploaded will trigger the same realistic mock data model (ABC Manufacturing Ltd).

No Active Backend: There is no live OCR server or AI API processing the files in the background.

CSV Only: The export button generates a standard .csv file, not a fully formatted native .xlsx workbook.

📈 Future Roadmap
If I had more time or access to corporate backend infrastructure, here is how I would scale this project:

Connect a Real API: Link the React front-end to a tool like AWS Textract or OpenAI's API so it actually reads and processes real documents on the fly.

SheetJS Integration: Use a library like SheetJS to upgrade the export function so it creates beautifully formatted, multi-tab Excel workbooks.

Trend Analysis: Expand the app to let users upload multiple years of data at once to track company performance trends over time.
