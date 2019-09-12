// $(document).on("turbolinks:load", function() {
//   var inputForm = $("#user-search-field")
//   var searchResult = $('#user-search-result');


//   function buildHTML(data) {
//     var html = `<div class="chat-group-user clearfix">
//                   <p class="chat-group-user__name">${data.name}</p>
//                   <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</div>
//                 </div>`
//     searchResult.append(html);
//   };

//   function appendErrMsgToHTML(msg) {
//     var html = `<div class="chat-group-user clearfix">
//                   <p class="chat-group-user__name">${msg}</p>
//                 </div>`
//     searchResult.append(html);
//   }

//   inputForm.on('keyup', function(){
//     var target = inputForm.val();
//     if (target.length !== 0){
//       $.ajax({
//         type: 'GET',
//         url: '/users',
//         data: {keyword: target},
//         dataType: 'json'
//       })
      
//       .done(function(data){
//         searchResult.empty();
//         if (data.length !== 0){
//           data.forEach(function(data){
//             buildHTML(data);
//             $(document).on('click', '.user-search-add', function(data){
//               var theUser = $(this).parent();
//               $(theUser).remove();

//               var userName = $(this).prev(".chat-group-user__name");
//               console.log(userName)
              
//               function buildUserHTML(userName){
//                 var userhtml = `<div class='chat-group-user'>
//                                   <input name='group[user_ids][]' type='hidden' value='ユーザーのid'>
//                                   <p class='chat-group-user__name'>$</p>
//                                   <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
//                                 </div>`
//                 $('').append(userhtml)
//               }
//               buildUserHTML();
//             })
//           });
//         } else {
//         appendErrMsgToHTML("一致するユーザーはいません");
//         }
//       })
//       .fail(function(){
//         alert('検索に失敗しました')
//       })
//     } else{
//       searchResult.empty();
//     }
//   });
// });

$(document).on("turbolinks:load",function(){

  // 検索結果のhtml
  function t(t){
    const e=`<div class="chat-group-user clearfix">\n
              <p class="chat-group-user__name">${t.name}</p>\n
              <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${t.id}" data-user-name="${t.name}">\u8ffd\u52a0</a>\n
            </div>`;
    i.append(e)
  }

  // チャットメンバーのhtml
  function e(t){
    const e=`<div class="chat-group-user clearfix">\n
              <p class="chat-group-user__name">${t}</p>\n
            </div>`;
    i.append(e)
  }


  // 追加済みが検索されたとき
  function n(t,e){
    const n=`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${e}'>\n
              <input name='group[user_ids][]' type='hidden' value='${e}'>\n
              <p class='chat-group-user__name'>${t}</p>\n
              <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>\u524a\u9664</a>\n
            </div>`;
    $(".js-add-user").append(n)
  }


  // 配列定義
  let r=[];

  
  const i=$("#user-search-result");
  $(".js-chat-member").each(function(t,e){
    r.push(e.getAttribute("id"))
  }),
  

  $("#user-search-field").on("input",function(n){
    n.preventDefault();
    const o=$("#user-search-field").val();
    0!=o.length?
    
    $.ajax({
      type:"GET",
      url:"/users",
      dataType:"json",
      data:{keyword:o,user_ids:r}
    })

    .done(function(n){
      i.empty(),

      0!==n.length?n.forEach(function(e){
        t(e)}):e("\u4e00\u81f4\u3059\u308b\u30e6\u30fc\u30b6\u30fc\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093")
      })
      
    .fail(function(){
      alert("\u30e6\u30fc\u30b6\u30fc\u691c\u7d22\u306b\u5931\u6557\u3057\u307e\u3057\u305f")}):i.empty()
    }),
  
  i.on("click",".chat-group-user__btn--add",function(){
    const t=$(this).attr("data-user-name"),
    e=$(this).attr("data-user-id");
    r.push(e),
    $(this).parent().remove(),n(t,e)
  }),

  
  $(".js-add-user").on("click",".js-remove-btn",function(){
    const t=$(this).siblings("input").val();
    r=r.filter(e=>e!=t),
    $(this).parent().remove()
  })
});