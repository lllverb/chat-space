$(document).on("turbolinks:load", function() {
  var inputForm = $("#user-search-field")
  var searchResult = $('#user-search-result');

  function buildHTML(data) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${data.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</div>
                </div>`
    searchResult.append(html);
  };

  inputForm.on('keyup', function(){
    var target = inputForm.val();
    console.log(target)
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: target},
      dataType: 'json'
    })
    .done(function(data){

      searchResult.empty();
      if (data.length !== 0){
        data.forEach(function(data){
          buildHTML(data);
        });
      }
    })
      // else {
      //   ("一致するユーザーはいません")
      // }
    // .fail(function(){
    //   alert('検索に失敗しました')
    // })
  });
});