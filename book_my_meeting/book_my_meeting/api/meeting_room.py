import frappe
from datetime import datetime, timedelta
import random
from frappe import _

@frappe.whitelist(allow_guest=True)
def get_meeting_rooms():
    rooms = frappe.get_all("Meeting Room", fields=["name", "room_name", "capacity", "location", "image_url"])

    result = []
    for idx, room in enumerate(rooms, start=1):
        doc = frappe.get_doc("Meeting Room", room.name)
        amenities = []
        if doc.smart_tv:
            amenities.append("Smart TV")
        if doc.refreshments:
            amenities.append("Refreshments")
        if doc.video_conferencing:
            amenities.append("Video conferencing")
        if doc.whiteboard:
            amenities.append("Whiteboard")
        if doc.projector:
            amenities.append("Projector")

        result.append({
            "id": doc.name,
            "name": doc.room_name,
            "capacity": doc.capacity,
            "amenities": amenities,
            "imageUrl": doc.image_url if doc.image_url else "",
            "location": doc.location
        })

    return result

@frappe.whitelist(allow_guest=True)
def get_meeting_room_by_name(name, date=None):
    doc = frappe.get_doc("Meeting Room", name)

    # Check allowed future booking days
    allowed_days = doc.allowed_future_booking_days
    if allowed_days is not None:
        if not date:
            frappe.throw(_("Date is required."))
        requested_date = datetime.strptime(date, "%Y-%m-%d").date()
        max_allowed_date = datetime.today().date() + timedelta(days=allowed_days)
        if requested_date > max_allowed_date:
            return {
                "success": False,
                "message": _("Bookings not opened for this day yet.")
            }

    # Amenities
    amenities = []
    if doc.smart_tv:
        amenities.append("Smart TV")
    if doc.refreshments:
        amenities.append("Refreshments")
    if doc.video_conferencing:
        amenities.append("Video conferencing")
    if doc.whiteboard:
        amenities.append("Whiteboard")
    if doc.projector:
        amenities.append("Projector")

    # Parse provided date
    if not date:
        frappe.throw("Date is required.")
    requested_date = datetime.strptime(date, "%Y-%m-%d")
    today = datetime.today()
    now = datetime.now()
    is_today = requested_date.date() == today.date()

    # Working hours and slot duration
    from_time = datetime.strptime(str(doc.from_time), "%H:%M:%S").time()
    to_time = datetime.strptime(str(doc.to_time), "%H:%M:%S").time()
    slot_duration = int(doc.slot_duration)

    start_dt = datetime.combine(requested_date.date(), from_time)
    end_dt = datetime.combine(requested_date.date(), to_time)

    # Get bookings for that room on that date (in draft state)
    bookings = frappe.get_all(
        "Meeting Room Booking",
        filters={
            "meeting_room": name,
            "date": requested_date.date(),
            "docstatus": 0
        },
        fields=["start_time", "end_time"]
    )

    # Prepare booking intervals
    booking_intervals = []
    for b in bookings:
        start_time = b["start_time"]
        end_time = b["end_time"]

        # Ensure types are correct
        if isinstance(start_time, timedelta):
            start_time = (datetime.min + start_time).time()
        if isinstance(end_time, timedelta):
            end_time = (datetime.min + end_time).time()

        booking_intervals.append((
            datetime.combine(requested_date.date(), start_time),
            datetime.combine(requested_date.date(), end_time)
        ))

    # Function to check overlap
    def is_overlapping(slot_start, slot_end):
        for booking_start, booking_end in booking_intervals:
            if slot_start < booking_end and slot_end > booking_start:
                return True
        return False

    # Generate time slots
    timeslots = []
    current_time = start_dt
    slot_id = 1

    while current_time + timedelta(minutes=slot_duration) <= end_dt:
        slot_start = current_time
        slot_end = current_time + timedelta(minutes=slot_duration)

        # Check if slot is in the past (only if today)
        in_past = is_today and slot_start < now
        has_conflict = is_overlapping(slot_start, slot_end)
        is_available = not in_past and not has_conflict

        timeslots.append({
            "id": f"slot-{slot_id}",
            "startTime": slot_start.strftime("%H:%M"),
            "endTime": slot_end.strftime("%H:%M"),
            "isAvailable": is_available
        })

        current_time = slot_end
        slot_id += 1

    return {
        "id": doc.name,
        "name": doc.room_name,
        "capacity": doc.capacity,
        "amenities": amenities,
        "imageUrl": doc.image_url or "",
        "location": doc.location,
        "timeslots": timeslots
    }

@frappe.whitelist(allow_guest=True)
def save_meeting_room_booking(meeting_room, date, start_time, end_time, name, email, phone, purpose):
    # Fetch the Meeting Room document
    meeting_room_doc = frappe.get_doc("Meeting Room", meeting_room)

    # Check allowed future booking days
    allowed_days = meeting_room_doc.allowed_future_booking_days
    if allowed_days is not None:
        booking_date = datetime.strptime(date, "%Y-%m-%d").date()
        max_allowed_date = datetime.today().date() + timedelta(days=allowed_days)
        if booking_date > max_allowed_date:
            return {
                "success": False,
                "message": _("Bookings are only allowed up to {0} days in advance.").format(allowed_days)
            }

    # Check if email exists in contacts
    contact_exists = frappe.db.exists("Contact", {"email_id": email})
    if not contact_exists:
        return {
            "success": False, 
            "message": _("The provided email is not registered with us. Please contact support.")
        }

    # Check for overlapping bookings
    overlapping_booking = frappe.db.exists(
        "Meeting Room Booking",
        {
            "meeting_room": meeting_room,
            "date": date,
            "docstatus": 0,  # Draft state
            "status": "Confirmed",
            "start_time": ("<", end_time),
            "end_time": (">", start_time)
        }
    )
    if overlapping_booking:
        return {
            "success": False, 
            "message": _("The selected time slot is already booked. Please choose a different time.")
        }
        
    # Check for user's other bookings in same day
    overlapping_booking = frappe.db.exists(
        "Meeting Room Booking",
        {
            "email": email,
            "date": date,
            "docstatus": 0,  # Draft state,
            "status": "Confirmed",
        }
    )
    if overlapping_booking:
        return {
            "success": False, 
            "message": _("You have already booked a slot for this date.")
        }
        
    # Create a new Meeting Room Booking document
    booking = frappe.get_doc({
        "doctype": "Meeting Room Booking",
        "meeting_room": meeting_room,
        "date": date,
        "start_time": start_time,
        "end_time": end_time,
        "booked_for": name,
        "email": email,
        "phone": phone,
        "purpose": purpose,
        "docstatus": 0  # Draft state
    })

    # Save the booking
    booking.insert(ignore_permissions=True)
    frappe.db.commit()

    return {"success": True, "message": _("Meeting room booking saved successfully.")}

@frappe.whitelist(allow_guest=True)
def get_bookings_by_email(email):
    if not email:
        frappe.throw(_("Email is required."))

    # Check if email exists in contacts
    contact_exists = frappe.db.exists("Contact", {"email_id": email})
    if not contact_exists:
        return {
            "success": False,
            "message": _("The provided email is not registered with us. Please contact support.")
        }

    # Fetch bookings associated with the email
    bookings = frappe.get_all(
        "Meeting Room Booking",
        filters={"email": email, "docstatus": 0},  # Draft state
        fields=["name", "room_name", "booked_for", "email", "phone", "date", "start_time", "end_time", "purpose", "creation", "status"],
        order_by="date desc, start_time desc"
    )

    # Format the response
    formatted_bookings = []
    for booking in bookings:
        formatted_bookings.append({
            "id": booking["name"],
            "roomName": booking["room_name"],
            "email": booking["email"],
            "phone": booking["phone"],
            "name": booking["booked_for"],
            "date": booking["date"],
            "startTime": datetime.strptime(str(booking["start_time"]), "%H:%M:%S").strftime("%H:%M"),
            "endTime": datetime.strptime(str(booking["end_time"]), "%H:%M:%S").strftime("%H:%M"),
            "purpose": booking["purpose"],
            "status": booking["status"],
            "creation": booking["creation"]
        })

    return {
        "success": True,
        "message": formatted_bookings
    }