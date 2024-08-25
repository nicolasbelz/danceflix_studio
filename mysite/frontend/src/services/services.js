
export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


export async function getOffers() {
    const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    }
    const response = await fetch("/api/offers/", requestOptions);
    return await response.json();
}


export async function getVideos() {
    const requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    }
    const response = await fetch("/api/get-videos/", requestOptions);
    return await response.json();
}


export async function getVideo(resource_key, authHeader) {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authHeader
        }
    }

    const response = await fetch(`/api/video/${resource_key}`, requestOptions);
    return await response.json();
}


export async function sendRegisterForm(data) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }
    const response = await fetch("/api/register/", requestOptions);
    return await response.json();
}


export async function sendCheckoutForm(authHeader, data) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Authorization": authHeader,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    const response = await fetch("/api/checkout/", requestOptions);
    return await response.json();
}



export async function getLastSubscriptions(authHeader) {
    const requestOptions = {
        method: "GET",
        headers: {
            "Authorization": authHeader,
            "Content-Type": "application/json"
        },
    }
    const response = await fetch("/api/last-user-subs/", requestOptions);
    return response;
}


export async function changePassword(authHeader, data) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Authorization": authHeader,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    const response = await fetch("/auth/password/change/", requestOptions);
    return response;
}


export async function getCurrentSubscription(authHeader) {
    const requestOptions = {
        method: "GET",
        headers: {
            "Authorization": authHeader,
            "Content-Type": "application/json"
        },
    }
    const response = await fetch("/api/get-current-subscription/", requestOptions);
    return response;
}

export async function getHomepageVideo() {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }
    const response = await fetch("/api/get-homepage-video/", requestOptions);
    return response;
}