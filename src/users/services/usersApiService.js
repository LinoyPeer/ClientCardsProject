import axios from "axios";
import { useSnack } from "../../providers/SnackbarProvider";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../providers/UserProvider";

const apiUrl = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users";

export const login = async (userLogin) => {
  try {
    const response = await axios.post(apiUrl + "/login", userLogin);
    const data = response.data;
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const signup = async (normalizedUser) => {
  try {
    const { data } = await axios.post(apiUrl, normalizedUser);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const editUser = async () => {
  const setSnack = useSnack();
  const navigate = useNavigate();
  const { user, token } = useCurrentUser();

  useEffect(() => {
    if (user && user._id) {
      const myHeaders = new Headers();
      myHeaders.append("x-auth-token", token);

      fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${user._id}?=${token}`, {
        method: "GET",
        headers: myHeaders,
      })
        .then((response) => response.json())
        .then((userData) => {
          setData({
            first: userData.name.first,
            middle: userData.name.middle,
            last: userData.name.last,
            phone: userData.phone,
            url: userData.image.url,
            alt: userData.image.alt,
            state: userData.address.state,
            country: userData.address.country,
            city: userData.address.city,
            street: userData.address.street,
            houseNumber: userData.address.houseNumber,
            zip: userData.address.zip,
          });
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [user, setData]);

  const handleFormSubmit = async () => {
    const myHeaders = new Headers();
    myHeaders.append("x-auth-token", token);
    myHeaders.append("Content-Type", "application/json");

    const userData = {
      "name": {
        "first": data.first,
        "middle": data.middle || "",
        "last": data.last,
      },
      "phone": data.phone,
      "image": {
        "url": data.url || "",
        "alt": data.alt || "",
      },
      "address": {
        "state": data.state || "",
        "country": data.country,
        "city": data.city,
        "street": data.street,
        "houseNumber": data.houseNumber,
        "zip": data.zip,
      },
    };

    try {
      const response = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/${user._id}?=${token}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          console.log("Error data:", errorData);
          setSnack("error", `Error: ${errorData.message || "Failed to update profile"}`);
        } else {
          const errorText = await response.text();
          console.log("Error text:", errorText);
          setSnack("error", `Error: ${errorText || "Failed to update profile"}`);
        }
      } else {
        setSnack("success", "Profile updated successfully!");
        navigate(ROUTES.ROOT);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setSnack("error", "Unexpected error occurred");
    }
  };
}