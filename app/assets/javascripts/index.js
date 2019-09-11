document.addEventListener("turbolinks:load", function() {
  $('#user-search-field').on('keyup', function(){
    var input = $('#user-search-field').val();
    console.log(input)

    $.ajax({
      type: 'GET',
      url: '/users/index/',
      data: {keyword: input},
      dataType: 'json'
    })

    .done(function(users){
      $('#user-search-result')
      if (users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません")
      }
    })
  });
});