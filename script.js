let allMemo = JSON.parse(localStorage.getItem("allMemo"));
allMemo = allMemo ?? [];
render();

const memoText = document.querySelector("textarea");
const titleText = document.getElementById("title");
const saveBtn = document.getElementById("save-btn");
const clearBtn = document.getElementById("clear-btn");

// 저장된 메모가 있는지 확인
if (localStorage.getItem("memo")) {
  memoText.value = localStorage.getItem("memo");
}
// 저장 버튼 클릭 이벤트
saveBtn.addEventListener("click", () => {
  localStorage.setItem("memo", memoText.value);
  alert("메모가 저장되었습니다.");
});
// 초기화 버튼 클릭 이벤트
clearBtn.addEventListener("click", () => {
  localStorage.removeItem("memo");
  titleText.value = "";
  memoText.value = "";
  alert("메모가 초기화되었습니다.");
});

// 저장
function saveNote() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  allMemo.push({ title, content, len: allMemo.length });

  localStorage.setItem("allMemo", JSON.stringify(allMemo));
  render();
}

// 추가할 때 나타나는 동작과 스타일
function render() {
  const display = document.getElementById("display");
  display.innerHTML = "";

  for (const item of allMemo) {
    const saveTitle = document.createElement("h2");
    const saveContent = document.createElement("p");
    const saveId = document.createElement("p");
    const deleteMemoBtn = document.createElement("button");

    saveTitle.textContent = item.title;
    saveContent.textContent = item.content;
    // saveId.textContent = item.len + 1;
    deleteMemoBtn.textContent = "삭제";
    deleteMemoBtn.setAttribute("id", item.len);
    deleteMemoBtn.setAttribute("onclick", "remove()");
    deleteMemoBtn.style.background = "#53535f";
    deleteMemoBtn.style.color = "white";
    deleteMemoBtn.style.width = "40px";
    deleteMemoBtn.style.height = "40px";
    deleteMemoBtn.style.padding = "0";

    display.style.width = "200px";
    display.style.padding = "20px";
    display.style.boxShadow = "5px 5px 7px rgba(33, 33, 33, .7)";
    display.style.color = "#000";
    display.style.background = "#ffc";
    display.style.display = "inline-block";
    display.style.transform = "rotate(-3deg)";
    display.style.transition = "transform .15s linear";
    display.style.wordBreak = "break-all";

    display.appendChild(saveId);
    display.appendChild(saveTitle);
    display.appendChild(saveContent);
    display.appendChild(deleteMemoBtn);
  }
}

// 삭제 버튼
function remove() {
  const idx = allMemo.find((item) => item.len == event.srcElement.id);
  if (idx) {
    allMemo.splice(
      allMemo.findIndex((item) => item.len == idx.len),
      1
    );
  }
  localStorage.setItem("allMemo", JSON.stringify(allMemo));
  render();
}
