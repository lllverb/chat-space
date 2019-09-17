document.addEventListener("turbolinks:load", function() {
  // 新規メッセージのhtml
  function buildHTML(message){
    var withImage = message.image.url != null? `<img class="lower-main__image" src="${message.image.url}" alt="${message.image.url}">` : ``;
    var aMessage = `<div class="upper-main">
                      <div class="upper-main__username">
                        ${message.username}
                      </div>
                      <div class="upper-main__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-main">
                      <p class="lower-main__content" data-id= ${message.id} data-group_id="${message.group_id}" >
                        ${message.content} 
                      </p>
                      ${withImage}
                    </div>`
    html = aMessage
    return html
  };
  function buildLeftHTML (message){
      var lastMessage = message.image.url != null? `画像が投稿されています` : `${message.content}`;
      var lefthtml = `<div class="group--talk" data-id= ${message.id} data-group_id="${message.group_id}" >
                        ${lastMessage}
                      </div>`
      return lefthtml
    }
  // 投稿したらボトムまでスクロール
  function scrollBottom(){
    $('.main').animate({scrollTop: $('.main')[0].scrollHeight});
  };
  
  // 投稿ボタンを２回押せるように
  $('.form__submit').removeAttr('data-disable-with')
  
  
  // 送信ボタンが押されたときの挙動
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    href = window.location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main').append(html);

      var lefthtml = buildLeftHTML(data);
      $(`.group--talk[data-group_id="${data.group_id}"]`).remove();
      $(`.group[data-group_id="${data.group_id}"]`).append(lefthtml);
    
      
      $('#new_message')[0].reset();
      
      scrollBottom();
    })
    .fail(function(){
      alert('投稿に失敗しました');
    })
  })
  
  
  
  // 自動更新機能
  var reloadMessages = function() {
    var url = window.location.href;
    var last_message_id = $('.lower-main__content:last').data('id');
    if (url.includes('messages') && last_message_id != null){
      
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: 'api/messages',
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        messages.forEach(function(message){
          //メッセージが入ったHTMLを取得
          insertHTML = buildHTML(message);
          //メッセージを追加
          $('.main').append(insertHTML);
          if (insertHTML != null){
            scrollBottom();
          } else{
            
          }
        })
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    } else {
    }
  };
  // urlにmessagesが含まれるときだけ自動更新メソッドを実行
  setInterval(reloadMessages, 5000);
});
