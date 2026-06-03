const startBtn = document.getElementById("start-btn");
if (startBtn) {
  startBtn.addEventListener("click", () => {
    window.location.href = "survey.html";
  });
}

const questions = [
  {
    title: "편지를 받을 사람은 누구인가요?",
    helper: "관계를 고르면 편지 톤을 잡기 쉬워요.",
    type: "choice",
    options: ["친구", "가족", "선생님", "연인"]
  },
  {
    title: "전하고 싶은 마음에 가장 가까운 것은?",
    helper: "가장 먼저 떠오르는 감정을 골라주세요.",
    type: "choice",
    options: ["고마움", "응원", "미안함", "축하"]
  },
  {
    title: "함께 떠오르는 장면은 무엇인가요?",
    helper: "짧게 적어도 충분합니다.",
    type: "text",
    placeholder: "예: 같이 야자 끝나고 걸어가던 날"
  },
  {
    title: "편지의 분위기는 어떤 쪽이 좋나요?",
    helper: "나중에 편지지 디자인을 고를 때도 참고할 수 있어요.",
    type: "choice",
    options: ["차분하게", "따뜻하게", "귀엽게", "담백하게"]
  },
  {
    title: "마지막으로 꼭 넣고 싶은 한마디는?",
    helper: "이 문장이 편지의 중심 문장이 됩니다.",
    type: "text",
    placeholder: "예: 네가 있어서 정말 든든했어"
  }
];

let currentIndex = 0;
const surveyAnswers = {};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getAnswerMarkup(question, index) {
  const savedAnswer = surveyAnswers[index] || "";

  if (question.type === "text") {
    return `
      <textarea class="survey-answer" data-index="${index}" rows="5" placeholder="${question.placeholder}">${escapeHtml(savedAnswer)}</textarea>
    `;
  }

  return `
    <div class="choice-grid">
      ${question.options.map((option) => {
        const checked = savedAnswer === option ? "checked" : "";
        return `
          <label class="choice-option">
            <input type="radio" name="answer${index}" value="${option}" ${checked}>
            <span>${option}</span>
          </label>
        `;
      }).join("")}
    </div>
  `;
}

function updateSurveyProgress(index) {
  const progressText = document.getElementById("progress-text");
  const progressBar = document.getElementById("progress-bar");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  if (progressText) {
    progressText.textContent = `${index + 1} / ${questions.length}`;
  }

  if (progressBar) {
    progressBar.style.width = `${((index + 1) / questions.length) * 100}%`;
  }

  if (prevBtn) {
    prevBtn.disabled = index === 0;
  }

  if (nextBtn) {
    nextBtn.textContent = index === questions.length - 1 ? "완료" : "다음";
  }
}

function showQuestion(index, direction = "next") {
  const cardContainer = document.getElementById("card-container");
  if (!cardContainer) return;

  const question = questions[index];
  const slideClass = direction === "prev" ? "from-left" : "from-right";

  cardContainer.innerHTML = `
    <article class="survey-card ${slideClass}">
      <span class="question-count">Question ${index + 1}</span>
      <h2>${question.title}</h2>
      <p>${question.helper}</p>
      ${getAnswerMarkup(question, index)}
    </article>
  `;

  requestAnimationFrame(() => {
    const card = cardContainer.querySelector(".survey-card");
    if (card) {
      card.classList.add("is-visible");
    }
  });

  updateSurveyProgress(index);
}

function showSurveyComplete() {
  const cardContainer = document.getElementById("card-container");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");

  if (!cardContainer) return;

  cardContainer.innerHTML = `
    <article class="survey-card from-right is-visible completion-card">
      <span class="question-count">Complete</span>
      <h2>설문이 끝났습니다</h2>
      <p>답변을 바탕으로 편지 내용을 정리해보세요. 이제 편지지 꾸미기로 넘어가도 좋습니다.</p>
      <a class="primary-link" href="decorate.html">편지지 꾸미러 가기</a>
    </article>
  `;

  if (nextBtn) nextBtn.disabled = true;
  if (prevBtn) prevBtn.disabled = true;
}

const cardContainer = document.getElementById("card-container");
if (cardContainer) {
  cardContainer.addEventListener("input", (event) => {
    if (event.target.classList.contains("survey-answer")) {
      surveyAnswers[event.target.dataset.index] = event.target.value;
    }
  });

  cardContainer.addEventListener("change", (event) => {
    if (event.target.matches("input[type='radio']")) {
      surveyAnswers[currentIndex] = event.target.value;
    }
  });
}

const prevBtn = document.getElementById("prev-btn");
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      showQuestion(currentIndex, "prev");
    }
  });
}

const nextBtn = document.getElementById("next-btn");
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      showQuestion(currentIndex);
    } else {
      showSurveyComplete();
    }
  });
}

showQuestion(currentIndex);

const applyBtn = document.getElementById("apply-btn");
if (applyBtn) {
  applyBtn.addEventListener("click", () => {
    const paper = document.getElementById("paper").value;
    const font = document.getElementById("font").value;
    const message = document.getElementById("letter-message").value.trim();
    const preview = document.getElementById("letter-preview");
    const safeMessage = escapeHtml(message || "전하고 싶은 마음을 여기에 적어보세요.").replaceAll("\n", "<br>");

    preview.hidden = false;
    preview.className = `letter-preview ${paper} is-applied`;
    preview.style.fontFamily = font;
    preview.innerHTML = `
      <div class="letter-meta">For you</div>
      <p>${safeMessage}</p>
      <footer>from. 대신 전해드립니다</footer>
    `;
  });
}
