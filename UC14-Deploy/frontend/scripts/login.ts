import { api } from "../service/api"; // Importe sua instância do Axios

const loginForm = document.getElementById("login-form") as HTMLFormElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const passwordInput = document.getElementById("password") as HTMLInputElement;
const errorMessage = document.getElementById("error-message") as HTMLElement;
const eye = document.getElementById("eye-btn") as HTMLElement

if(eye && passwordInput){
eye.addEventListener("click", () => {
  const isPassword =  passwordInput.type === "password"
  passwordInput.type = isPassword ? 'text' : 'password'
  
eye.setAttribute("data-lucide", isPassword ? "eye-off" : "eye");

})
}

loginForm?.addEventListener("submit", async (event: Event) => {
    event.preventDefault();

    // Reset visual de erro
    errorMessage.classList.add("hidden");
    errorMessage.innerText = "";

    const data = {
        email: emailInput.value,
        password: passwordInput.value
    };

    try {
        
        const response = await api.post("/auth/login", data);

        // Com Axios, a resposta tratada já fica em response.data
        const { token, user } = response.data;

        // Salva dados no localStorage
        localStorage.setItem("@TaskManager:token", token);
        localStorage.setItem("@TaskManager:user", JSON.stringify(user));

        alert("Login realizado com sucesso!");
        
        // Redireciona
        window.location.href = "/tasks.html";

    } catch (error: any) {
        // O Axios captura respostas de erro da API (400, 401, 500) em error.response
        if (error.response) {
            errorMessage.innerText = error.response.data.error || error.response.data.message || "Error logging in";
        } else if (error.request) {
            // Se o backend estiver desligado (ERR_CONNECTION_REFUSED)
            errorMessage.innerText = "Error connecting to the server";
        } else {
            errorMessage.innerText = "Error processing request";
        }

        errorMessage.classList.remove("hidden");
    }
});