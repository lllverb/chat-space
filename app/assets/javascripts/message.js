document.addEventListener("turbolinks:load", function() {

  // 新規メッセージのhtml
  function buildHTML(message){
    var withImage = message.image? `<img class="lower-message__image" src="${message.image}" alt="${message.image}">` : ``;

    var aMessage = `<div class="upper-main">
                      <div class="upper-main__username">
                      ${message.user_name}
                      </div>
                      <div class="upper-main__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-main">
                      <p class="lower-message__content">
                        ${message.content} 
                      </p>
                      ${withImage}
                    </div>`
    html = aMessage
    return html
    };


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
      
      $('#new_message')[0].reset()
      
      scrollBottom();
    })
    .fail(function(){
      alert('error');
    })
  })

  
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.lower-message__content:last').data();
    console.log(last_message_id)
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: 'api/messages',
      
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(data) {
      console.log('a')
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      data.each(function(){
        buildMessageHTML(d)
        //メッセージが入ったHTMLを取得
        insertHTML = insertHTML + html
        //メッセージを追加
      })
      $('.main').append(insertHTML);
      scrollBottom();
    })
    .fail(function() {
      console.log('error');
    });
  };
  var buildMessageHTML = function(message) {
    
    var messageContent = message.content? `'<p class="lower-message__content">' +
                                              ${message.content} + 
                                            '</p>' +` : ``;
    
    var imageUrl      = image.url?         `'<img src="' + ${message.image.url} + '" class="lower-message__image" >' +` : ``;

    
    var html = '<div class="message" data-id=' + message.id + '>' +
                  '<div class="upper-message">' +
                    '<div class="upper-message__user-name">' +
                      message.user_name +
                    '</div>' +
                    '<div class="upper-message__date">' +
                      message.created_at +
                    '</div>' +
                  '</div>' +
                  '<div class="lower-message">' +
                    $(messageContent)
                    $(imageUrl)
                  '</div>' +
                '</div>'
    return html;
  };
  
  var url = location.href;
  if (url.includes('messages')){
    setInterval(reloadMessages, 2000);
  }
});