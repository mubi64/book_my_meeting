import frappe
from frappe import _
from datetime import datetime, timedelta
import random
import string

def generate_otp(length=6):
    return ''.join(random.choices(string.digits, k=length))

def send_email_otp(email):
    try:
        now = datetime.now()

        # Check for existing, non-expired OTP
        otp_doc = frappe.db.get_value(
            "Email OTP Verification",
            filters={
                "email": email,
                "expiry": [">", now]
            },
            fieldname=["name"],
            as_dict=True
        )

        if otp_doc:
            doc = frappe.get_doc("Email OTP Verification", otp_doc.name)
            doc.verified = 0
            doc.save(ignore_permissions=True)
            # Do not send email again — just reset verified
            return {
                "success": True,
                "message": _("Please verify the most recent OTP sent to your email in order to continue.")
            }
        
        otp = generate_otp()
        expiry_time = datetime.now() + timedelta(minutes=15)

        # Check if record already exists
        existing = frappe.db.exists("Email OTP Verification", {"email": email})
        if existing:
            doc = frappe.get_doc("Email OTP Verification", existing)
            doc.otp = otp
            doc.expiry = expiry_time
            doc.verified = 0
            doc.save()
        else:
            doc = frappe.get_doc({
                "doctype": "Email OTP Verification",
                "email": email,
                "otp": otp,
                "expiry": expiry_time,
                "verified": 0
            })
            doc.insert()

        frappe.sendmail(
            recipients=[email],
            subject="Your OTP Code for Book My Meeting",
            message=f"Your OTP is <b>{otp}</b>. It will expire in 15 minutes."
        )
        return {
                "success": True,
                "message": _("We've sent you a one-time password via email. Please verify it to continue.")
            }
        
    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Error sending OTP email")
        return {
                "success": False,
                "message": _("Error sending OTP email. Please try again later.")
            }
    
def verify_email_otp(email, input_otp):
    record = frappe.get_doc("Email OTP Verification", {"email": email})
    if not record:
        return {"status": "not_found", "message": "No OTP record found"}

    if record.verified:
        return {"status": "already_verified", "message": "OTP has already been verified"}

    if record.expiry < datetime.now():
        return {"status": "expired", "message": "OTP has expired. Please request a new one."}

    if record.otp == input_otp:
        record.verified = 1
        record.save()
        return {"status": "verified"}
    else:
        return {"status": "invalid_otp"}