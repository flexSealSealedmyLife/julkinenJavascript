$(document).ready(function() {
  $("#searchUser").on("keyup", function(e) {
    let enteredUser = e.target.value;

    //make request to github
    $.ajax({
      url: "https://api.github.com/users/" + enteredUser,
      data: {
        client_id: "ab4d599ad08ecfcfb130",
        client_secret: "6dc993fb9b377e5c0dfd4f60fb934b0a564e9623"
      }
    }).done(function(user) {
      $.ajax({
        url: "https://api.github.com/users/" + enteredUser + "/repos",
        data: {
          client_id: "ab4d599ad08ecfcfb130",
          client_secret: "6dc993fb9b377e5c0dfd4f60fb934b0a564e9623",
          sort: "created: asc",
          per_page: 5
        }
      }).done(function(repos) {
        $.each(repos, function(index, repo) {
          $("#repos").append(`
                    <div class="card">
                        <div class="row">
                        <div class="col-md-7">
                            <strong>${repo.name}</strong> : ${repo.description}
                    </div>
                    <div class="col-md-3">
                    <span class="badge badge-dark">Forks: ${
                      repo.forks_count
                    }</span>
                <span class="badge badge-primary">Watchers: ${
                  repo.watchers_count
                }</span>
                <span class="badge badge-success">Stars: ${
                  repo.stargazers_count
                }</span>
                        
                    </div>
                    <div class="col-md-2">
                        <a href="${
                          repo.html_url
                        }" target="_blank" class ="btn btn-dark">Repository Page</a>
                    </div>
                    </div>
                    </div>
                `);
        });
      });
      $("#profile").html(`
        <div class="card panel-default">
            <div class="card-heading">
                <h3 class="card-title">${user.name}</h3>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-3">
                        <img class="thumbnail avatar"  src="${user.avatar_url}">
                        <a target="_blank" class="btn btn-primary btn-block" href="${
                          user.html_url
                        }">View profile</a>
                     </div>
                <div class="col-md-9">
                <span class="badge badge-dark">Public Repositories: ${
                  user.public_repos
                }</span>
              <span class="badge badge-primary">Public Gists: ${
                user.public_gists
              }</span>
              <span class="badge badge-success">Followers: ${
                user.followers
              }</span>
              <span class="badge badge-info">Following: ${user.following}</span>
                <br><br>
                <ul class="list-group">
                    <li class="list-group-item">Company: ${user.company}</li>
                    <li class="list-group-item">Blog: ${user.blog}</li>
                    <li class="list-group-item">Location: ${user.location}</li>
                    <li class="list-group-item">Member sinxe: ${
                      user.created_at
                    }</li>

                </div>
            </div>
        </div>
        </div>
        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>
      `);
    });
  });
});
