$(document).ready(function() {
  $("#inputLarge").on("keypress", e => {
    if (e.which === 13) {
      let bla = $("#inputLarge").val();
      addComment(bla);
    }
  });
  if (localStorage.length !== 0) {
    addExistingComments();
  }
});

function addExistingComments() {
  console.log(localStorage.length);
  for (let index = 0; index < localStorage.length; index++) {
    console.log(index);
    $("#comments").append(localStorage[index]);
  }
}

function addComment(comment) {
  if (comment.includes("<")) {
    console.log("oli");
    comment = comment.replace("<", "Lol");
    comment = comment.replace(":", "Lol");
    comment = comment.replace(">", "Lol");
    comment = comment.replace("=", "Lol");
    comment = comment.replace("}", "Lol");
    comment = comment.replace("{", "Lol");
    comment = comment.replace("p", "P");
    comment = comment.replace("$", "Dollaruus");
  }
  let tempAdd;
  let toAdd = `
    
    <div class="card text-white bg-primary mb-3" id="singleComment" style="max-width: 20rem;">
    <div class="card-header">Comment</div>
  <div class="card-body">
    <h4 class="card-title">Comment from a visitor</h4>
    <p class="card-text">${comment}</p>
  </div>
</div>`;

  $("#comments").append(toAdd);

  localStorage.setItem(localStorage.length, toAdd);
}

/*`<div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
<div class="card-header">Header</div>
<div class="card-body">
  <h4 class="card-title">Primary card title</h4>
  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
</div>
</div>
</div>`*/
