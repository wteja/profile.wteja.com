export default function contact() {
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", sendmail);
}

function sendmail(e) {
  e.preventDefault();

  const { name, email, message } = e.target;

  fetch("/.netlify/functions/sendmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name.value.trim(),
      email: email.value.trim(),
      message: message.value.trim(),
    }),
  })
    .then(() => {
      alert("Thank you, Your message has been sent!");
      name.value = "";
      email.value = "";
      message.value = "";
    })
    .catch((err) => {
      alert("Woof! there are something wrong. Sorry, please try again later.");
      console.error(err);
    });
}
