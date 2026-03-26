import { getToken } from "./auth.api.js";

async function getAllEvents() {
  try {
  

    const res = await fetch("http://localhost:3000/event", {
      method: "GET",
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.error || data.message);
    }

    return Array.isArray(data) ? data : [];
  } catch (err) {
    throw err;
  }
}

async function getAllAvailableEvents() {
  try {
    const res = await fetch("http://localhost:3000/event/available", {
      method: "GET",
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.error || data.message);
    }

    return Array.isArray(data) ? data : [];
  } catch (err) {
    throw err;
  }
}

async function getEventById(id) {
  try {
    const res = await fetch(`http://localhost:3000/event/${id}`, {
      method: "GET",
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

async function createEvent(title, date, time, price, img, maxReservations) {
  try {
    const token = getToken();
    const res = await fetch("http://localhost:3000/event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        date,
        time,
        price: Number(price),
        img: img || null,
        maxReservations: Number(maxReservations),
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

async function updateEventById(
  id,
  { title, date, time, price, img, maxReservations }
) {
  try {
    const token = getToken();
    const res = await fetch(`http://localhost:3000/event/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        date,
        time,
        price: Number(price),
        img: img || null,
        maxReservations: Number(maxReservations),
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

async function deleteEventById(id) {
  try {
    const token = getToken();
    const res = await fetch(`http://localhost:3000/event/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 204) {
      return "Event deleted succesfully";
    }
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.error || data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
}

async function deleteAllEvents() {
  try {
    const token = getToken();
    const res = await fetch(`http://localhost:3000/event`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
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

export {
  getAllEvents,
  getAllAvailableEvents,
  getEventById,
  createEvent,
  updateEventById,
  deleteEventById,
  deleteAllEvents,
};
