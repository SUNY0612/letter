// ===== 랜딩 페이지 버튼 기능 =====
const startBtn = document.getElementById("start-btn");
if (startBtn) {
  startBtn.addEventListener("click", () => {
    window.location.href = "survey.html";
  });
}

// ===== 설문조사 기능 =====
const questions = [
  "친구 이름은 무엇인가요?",
  "관계 기간은 얼마나 되나요?",
  "서로의 첫인상은 어땠나요?",
  "함께 여행 가고 싶은 곳은 어디인가요?",
  "마지막으로 꼭 전하고 싶은 말은 무엇인가요?"
];

let currentIndex = 0;

function showQuestion(index) {
  const cardContainer = document.getElementById("card-container");
  if (cardContainer) {
    cardContainer.innerHTML = `
      <div class="card">
        <p>${questions[index]}</p>
        <input type="text" id="answer${index}" placeholder="답변을 입력하세요">
      </div>
    `;
  }
}

const nextBtn = document.getElementById("next-btn");
if (nextBtn) {
  nextBtn.addEventListener("click", function() {
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      showQuestion(currentIndex);
    } else {
      alert("설문이 끝났습니다! 답변이 저장되었습니다.");
    }
  });
}

// 첫 질문 표시
showQuestion(currentIndex);

// ===== 편지지 꾸미기 기능 =====
const applyBtn = document.getElementById("apply-btn");
if (applyBtn) {
  applyBtn.addEventListener("click", function() {
    const bgUrl = document.getElementById("background").value;
    const font = document.getElementById("font").value;
    const preview = document.getElementById("letter-preview");

    if (bgUrl) {
      preview.style.backgroundImage = `url(${bgUrl})`;
      preview.style.backgroundSize = "cover";
    }
    preview.style.fontFamily = font;
  });
}
