from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import JSONResponse

import os
import shutil
import hashlib

router = APIRouter()

UPLOAD_FOLDER = "uploaded_evidence"

# CREATE FOLDER

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


@router.post("/upload-evidence")
async def upload_evidence(

    file: UploadFile = File(...),

    uploaded_by: str = Form(...),

    notes: str = Form(...)
):

    try:

        # =========================
        # VALIDATION
        # =========================

        if not file:

            return JSONResponse(

                status_code=400,

                content={
                    "error": "No file selected"
                }
            )

        # =========================
        # FILE SAVE PATH
        # =========================

        file_path = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        # =========================
        # SAVE FILE
        # =========================

        with open(file_path, "wb") as buffer:

            shutil.copyfileobj(
                file.file,
                buffer
            )

        # =========================
        # SHA256 HASH
        # =========================

        sha256_hash = hashlib.sha256()

        with open(file_path, "rb") as f:

            for chunk in iter(
                lambda: f.read(4096),
                b""
            ):

                sha256_hash.update(chunk)

        file_hash = sha256_hash.hexdigest()

        # =========================
        # RESPONSE
        # =========================

        return {

            "message": "Evidence uploaded successfully",

            "filename": file.filename,

            "uploaded_by": uploaded_by,

            "notes": notes,

            "sha256": file_hash
        }

    except Exception as e:

        return JSONResponse(

            status_code=500,

            content={
                "error": str(e)
            }
        )