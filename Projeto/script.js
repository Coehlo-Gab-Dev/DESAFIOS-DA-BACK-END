function abrirPagina() {
  window.location.href = "inscricao.html";
}

function voltarPagina() {
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const trilhas = document.querySelectorAll(".pai-trilha");
  const inscrever = document.querySelector(".increver");

  function verificarScroll() {
    trilhas.forEach((trilha) => {
      const trilhaTop = trilha.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (trilhaTop < windowHeight - 100) {
        trilha.classList.add("show");
      }
    });

    const inscreverTop = inscrever.getBoundingClientRect().top;
    if (inscreverTop < window.innerHeight - 100) {
      inscrever.classList.add("show");
    }
  }

  window.addEventListener("scroll", verificarScroll);
  verificarScroll();
});

// Lógica de seleção única nos checkboxes de trilhas
document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll(".trilha-checkbox");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        checkboxes.forEach((otherCheckbox) => {
          if (otherCheckbox !== this) {
            otherCheckbox.checked = false;
          }
        });
      }
      validarCampos(); // Revalida o formulário após mudança nos checkboxes
    });
  });
});

// Exibir nome do arquivo selecionado
document.addEventListener("DOMContentLoaded", function () {
  function handleFileInputChange(inputId, displayId) {
    const fileInput = document.getElementById(inputId);
    const fileNameDisplay = document.getElementById(displayId);

    fileInput.addEventListener("change", function () {
      if (this.files && this.files.length > 0) {
        fileNameDisplay.textContent = `Arquivo selecionado: ${this.files[0].name}`;
      } else {
        fileNameDisplay.textContent = "";
      }
      validarCampos(); // Revalida o formulário após mudança no arquivo
    });
  }

  handleFileInputChange("file-residencia", "file-residencia-name");
  handleFileInputChange("file-identidade", "file-identidade-name");
});

// Verificação do formulário antes de enviar
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const btnInscricao = document.getElementById("btn-inscricao");
  const modal = document.getElementById("modal-confirmacao");
  const modalContent = document.querySelector(".modal-content p");
  const closeModal = document.querySelector(".close-modal");

  function validarCampos() {
    const camposObrigatorios = document.querySelectorAll(
      "input[required], select[required]"
    );
    const trilhasSelecionadas =
      document.querySelectorAll(".trilha-checkbox:checked").length > 0;
    
    const termoAssinado = 
      document.querySelectorAll(".termo-assing:checked").length >0;

    const todosPreenchidos = Array.from(camposObrigatorios).every(
      (campo) => campo.value.trim() !== ""
    );
    document.getElementById("email").addEventListener("input",function(){
      const email = this.value;
      const mensagemErro = document.getElementById("mensagemErro");
      if (email && !validarEmail(email)){
        mensagemErro.style.display ="block";
      }else{
        mensagemErro.style.display ="none";
      }
    });
    function validarEmail(email){
      const regex = /^[^|s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }

    const valido = todosPreenchidos && trilhasSelecionadas && termoAssinado ;
    btnInscricao.disabled = !valido; // Ativa ou desativa o botão de inscrição
    return valido;
  }

  form.addEventListener("input", validarCampos);
  form.addEventListener("change", validarCampos); // Para os checkboxes e uploads de arquivo

  btnInscricao.addEventListener("click", function (event) {
    event.preventDefault();

    if (validarCampos()) {
      modalContent.innerText = "Inscrição realizada com sucesso!";
      modal.style.display = "block";
      form.reset(); // Limpa o formulário
      btnInscricao.disabled = true; // Desabilita o botão novamente
    } else {
      modalContent.innerText =
        "Preencha todos os campos obrigatórios e selecione uma trilha antes de continuar!";
      modal.style.display = "block";
    }
  });

  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
