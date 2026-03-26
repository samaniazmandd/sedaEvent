import { getToken } from "./auth.api.js";
import { getUserId } from "./user.api.js";

async function createReservation(eventId, amountOfSeats) {
  const token = getToken();
  if (!token) {
    throw new Error("Not logged in");
  }

  if (!amountOfSeats || amountOfSeats < 1) {
    throw new Error("You must reserve at least 1 seat/ticket");
  }

  try {
    const res = await fetch("http://localhost:3000/reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        eventId: Number(eventId),
        amountOfSeats: Number(amountOfSeats),
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.error || data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
}

async function getActiveReservations() {
  const token = getToken();
  if (!token) {
    throw new Error("Not logged in");
  }

  try {
    const res = await fetch("http://localhost:3000/reservation/active", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
     
      throw new Error(data.error || data.message);
    }

    const user=getUserId();
    const array=Array.isArray(data) ? data:[];
   
    return array.filter(reservation => Number(reservation.userId)===user);
  } catch (err) {
    throw err;
  }
}

async function cancelReservation(id) {
  const token = getToken();
  if (!token) {
    throw new Error("Not logged in");
  }

  try {
    const res = await fetch(`http://localhost:3000/reservation/${id}/cancel`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });


    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
  
      throw new Error(data.error || data.message);
    }

    
    return data;
  } catch (err) {
    throw err;
  }
}
export { createReservation, getActiveReservations, cancelReservation };
