const questionId = getParamAndValidateObjectId("id", "/subjects");
var questionName;
const getQuestionsById = async () => {
  const data = await getQuestionsByIdService();
  if (data) {
    let questionHtml = "";

    if (!data || !data.data) {
      questionHtml = `
      <div class="mt-5 text-center">
        <p class="text-danger">Oops! Something went wrong ❌. Please try again later.</p>
      </div>`;
    } else {
      let questionObj = data.data;
      // console.log(questionObj);
      let questions = questionObj.question;
      questionName = questions[0];
      questionHtml = `
      <h1>❓ Question</h1>`;
      questions.forEach((questionLine) => {
        questionHtml += `
          <p class="lead">${questionLine}</p>
        `;
      });
    }

    document.getElementById("question").innerHTML = questionHtml;
  }
};

const getAnswersById = async () => {
  const data = await getAnswersByIdService();
  if (data) {
    let answersHtml = "";

    if (!data || !data.data.docs) {
      answersHtml = `
      <div class="mt-5 text-center">
        <p class="text-danger">Oops! Something went wrong ❌. Please try again later.</p>
      </div>`;
    } else {
      let answers = data.data.docs;
      answersHtml = `
      <div class="row my-3">
        <a href="/subjects/questions/answer/?questionId=${questionId}&question=${
        questionName || ""
      }">
          <button class="btn btn-sm btn-outline-secondary">Answer this question 🚀</button>
        </a>
      </div>
      `;
      if (answers.length === 0) {
        answersHtml += `
        <div>
          There are no answers as yet.
        </div>
        `;
      }
      answers.forEach((answerObj, idx) => {
        let inner = ``;

        answers[answers.length - idx - 1].answer.forEach((answerLine, idx) => {
          inner += `<p class="mt-1 mb-0">${answerLine}</p>`;
        });
        answersHtml += `
        <div class="mb-3 rounded shadow mb-2 p-3">
          <p class="mb-0 fw-bold">✅ Answer ${answers.length - idx}</p>
          ${inner}
        </div>
        `;
      });
    }

    document.getElementById("answers").innerHTML = answersHtml;
  }
};

const getQuestionsByIdService = async () => {
  try {
    let res = await fetch(`/api/v1/questions/${questionId}`, {
      method: "GET",
    });
    if (res.status === 200) {
      const resData = await res.json();
      // console.log(resData.data);
      return resData;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getAnswersByIdService = async () => {
  try {
    let res = await fetch(`/api/v1/answers/?parentId=${questionId}`, {
      method: "GET",
    });
    if (res.status === 200) {
      const resData = await res.json();
      // console.log(resData.data);
      return resData;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

getQuestionsById();
getAnswersById();
