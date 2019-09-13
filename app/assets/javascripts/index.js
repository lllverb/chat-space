$(document).on("turbolinks:load", function() {

  
  var inputForm = $("#user-search-field");
  var searchResult = $('#user-search-result');


  //検索結果のhtml
  function buildHTML(data) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${data.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${data.id}" data-user-name="${data.name}">追加</div>
                </div>`;
    searchResult.append(html)
  }


  //一致するユーザーがいない場合のhtml
  function buildErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`;
    searchResult.append(html)
  }


  // チャットメンバーのhtml
  function buildMemberHTML(dataUserName,dataUserId){
    var html=`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${dataUserId}'>
                <input name='group[user_ids][]' type='hidden' value='${dataUserId}'>
                <p class='chat-group-user__name'>${dataUserName}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`;
    $(".js-add-user").append(html)
  }
  
  //グループメンバー用の配列を定義。idを入れていく。
  var ids = [];
  

  //文字が検索フォームに入力された時
  inputForm.on('keyup', function(e){
    e.preventDefault();
    var target = inputForm.val();
    
    // 文字が入力されている時
    if (target.length !== 0){
      $.ajax({
        type: 'GET',
        url: '/users',
        data: {keyword: target, user_ids: ids},
        dataType: 'json'
      })
      

      .done(function(data){
        searchResult.empty();
        if (data.length !== 0){
          data.forEach(function(data){
            buildHTML(data);
          });
        } else {
        buildErrMsgToHTML("一致するユーザーはいません");
        }
      })
      .fail(function(){
        alert('検索に失敗しました')
      })

      // 文字が入力されていない時
    } else{
      searchResult.empty();
    }
  });





  // 追加ボタンが押されたときの処理
  searchResult.on("click", ".chat-group-user__btn--add", function(){
    var dataUserName = $(this).attr("data-user-name");
    var dataUserId   = $(this).attr("data-user-id");
    // 配列にidを追加
    ids.push(dataUserId);
    $(this).parent().remove();
    buildMemberHTML(dataUserName, dataUserId)
  }),




  // 削除ボタンが押されたときの処理
  $(".js-add-user").on("click", ".js-remove-btn", function(){
    // 削除ボタンに対応するuserのidを取得
    var inputSiblings = $(this).siblings("input").val();
    // idを配列から除外
    ids = ids.filter(x => x != inputSiblings),
    $(this).parent().remove()
  })
});