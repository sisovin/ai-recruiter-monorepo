from fastapi import FastAPI, UploadFile, File, HTTPException
from typing import Dict
import uvicorn
from core import extract_text_from_pdf, parse_resume

app = FastAPI()

@app.post("/parse-resume")
async def parse_resume_endpoint(file: UploadFile = File(...)) -> Dict[str, str]:
    try:
        contents = await file.read()
        with open("temp.pdf", "wb") as f:
            f.write(contents)
        text = extract_text_from_pdf("temp.pdf")
        parsed_data = parse_resume(text)
        return parsed_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
