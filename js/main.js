const mySwiper = new Swiper('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  speed: 300,
  spaceBetween: 50,
  slidesPerView: 1,
  loop: true,
  autoplay:{
    delay:5000,
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar',
  // },
  breakpoints: {
    767: {
      slidesPerView: 2,
      spaceBetween: 0
    },
    960:{
      slidesPerView: 4,
      spaceBetween: 0,
      centeredSlides:true,
    }
  },
});

// -------------------ハンバーガーメニュークリック時の挙動
document.querySelector('.mobile__btn').addEventListener('click', function () {
  // console.log('クリックされました');
  this.classList.toggle('menu__open');
  $('.mobile__btn a[href]').on('click',function(event) {
    $('.mobile__btn').trigger('click');
  });

});


// −−−−−−−−−−−−−−−−−−−−−−−−ドロップダウンメニューの実装

// max-heightを使用したドロップダウン開閉 height:auto;のとき使用
const button = document.querySelectorAll('.qa__ttl');
const openClass = 'is-open';
const openMenu = document.querySelector('.qa__ttl');
openMenu.classList.add(openClass);
let nextOpenmenu = openMenu.nextElementSibling
// console.log(nextOpenmenu);
nextOpenmenu.classList.toggle(openClass);

let openStyle = {
  maxHeight: '300px',
}
for (let prop in openStyle) {
  nextOpenmenu.style[prop] = openStyle[prop];
};


// openMenu.nextElementSibling.style.height = '200px';
Array.prototype.forEach.call(button, (el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    const contents = el.nextElementSibling;
    const outerHeight = contents.clientHeight;
    // 子要素の高さを取得
    const innerHeight = contents.children[0].clientHeight;
    el.classList.toggle(openClass);
    // console.log(el);
    contents.classList.toggle(openClass);

    // 子要素の高さを親要素のmax-heightに設定
    console.log(outerHeight);
    console.log(innerHeight);
    contents.style.maxHeight = outerHeight === 0 ? `${innerHeight}px` : 0;
  });
});

// −−−−−−−−−−−−−−−−−−−−−−−−プライバシーポリシーにチェックが入っていないとsubmitできないようにする
$(document).ready(function () {

  const $submitBtn = $('#js-submit')
  $('#form input,#form textarea').on('change', function () {
    if (
      $('#form input[type="text"]').val() !== "" &&
      $('#form input[type="email"]').val() !== "" &&
      $('#form input[type="checkbox"]').val() !== "" &&
      $('#form #privacyCheck').prop('checked') === true
    ) {
      $submitBtn.css('opacity','1');
      $submitBtn.val('送信する');
      $submitBtn.prop('disabled', false);
      
    } else {
      $submitBtn.css('opacity','0.5');
      $submitBtn.prop('disabled', true);
      // $submitBtn.val('未入力の項目があります');
    }
  });
});

// −−−−−−−−−−−−−−−−−−−−−−−−スムーススクロール
$(function() {
  // お問い合わせボタンをクリック
  $(".js_link").click(function() {
    // リンク先までの距離を取得
    let target = $($(this).attr("href")).offset().top;
    // headerのpadding要素分を減らす
    const headerHeight = $('header').outerHeight();
    // console.log(headerHeight);
    // const headerHeight = 94;
    target -= headerHeight;
    // コンテンツへスクロール
    $("html,body").animate({scrollTop:target},500);
    return false;
  });
});

// −−−−−−−−−−−−−−−−−−−−−−−− AOS.js
AOS.init({
  offset:120,
  delay:100,
  duration:800,
  easing:'ease',
  once:true,
});

// ---------------------------------googleformのお問い合わせ完了メッセージ
$(document).ready(function () {

  $('#form').submit(function (event) {
    var formData = $('#form').serialize();
    $.ajax({
      url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSffdKP_4vx3lySB8EzOke0O4nif5iZAfwqRVe4RqAivX-UtWg/formResponse",
      data: formData,
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          $(".end__message").slideDown();
          $(".contact__form-submit").fadeOut();
          // window.location.href = "thanks.html";
        },
        200: function () {
          $(".false-message").slideDown();
        }
      }
    });
    event.preventDefault();
  });

});
